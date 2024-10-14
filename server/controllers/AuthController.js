const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

// @desc login, public route, POST, generates both tokens on login
const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password, "inside server");
  console.log(req.body);

  if (!username || !password) {
    return res.status(400).json({ message: "All fields required!" });
  }

  const foundUser = await User.findOne({ username }).exec();
  const match = await bcrypt.compare(password, foundUser.password);

  if (!foundUser || !foundUser.active || !match) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  //jwt.sign(payload, secretOrPrivateKey, [options, callback]);

  const accessToken = jwt.sign(
    {
      UserInfo: {
        username: foundUser.username,
        roles: foundUser.roles,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "10m",
    }
  );

  const refreshToken = jwt.sign(
    {
      username: foundUser.username,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1d" }
  );

  // create secure cookie with refresh token
  res.cookie("jwt", refreshToken, {
    httpOnly: true, //accessible only by web server
    secure: true, //https
    sameSite: "None", //cross-site cookie
    maxAge: 7 * 24 * 60 * 60 * 1000, // cookie expiry match refresh token
  });

  res.json({ accessToken });
});

// access token is expired so we send refresh token to generate a new access token
const refresh = asyncHandler(async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.status(401).json({ message: "Unauthorized" });

  const refreshToken = cookies.jwt;

  //jwt.verify(token, secretOrPublicKey, [options, callback])
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    asyncHandler(async (err, decoded) => {
      //   token expires
      if (err) return res.status(403).json({ message: "Forbidden" });

      // refreshtoken has username, we access it from the token itself
      const foundUser = await User.findOne({
        username: decoded.username,
      }).exec();

      if (!foundUser) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const accessToken = jwt.sign(
        {
          UserInfo: {
            username: foundUser.username,
            roles: foundUser.roles,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "10s" }
      );

      res.json({ accessToken });
    })
  );
});

// For security purpose, we need to clear cookies
const logout = asyncHandler(async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(204); //no content
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });

  res.json({ message: "cookie cleared " });
});

module.exports = {
  login,
  refresh,
  logout,
};
