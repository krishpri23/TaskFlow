import { useEffect, useState } from "react";
import { useLoginMutation } from "./authApiSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isSuccess }] = useLoginMutation();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setErrMsg("Please enter all fields");
      return;
    }

    console.log(username, password, "before login ");
    try {
      const { accessToken } = await login({ username, password }).unwrap();

      console.log("inside login", accessToken);

      dispatch(setCredentials({ accessToken }));
      setUsername("");
      setPassword("");
      navigate("/dash");
    } catch (error) {
      console.log("error in login", error);
      if (!error.status) {
        setErrMsg("No server response");
      } else if (error.status === 400) {
        setErrMsg("Missing username or password");
      } else if (error.status === 401) {
        setErrMsg("Unauthorized");
      }
    }
  };

  return (
    <section className="w-full h-screen flex flex-col justify-center items-center">
      <header>
        <h1 className="font-bold text-3xl">Login </h1>
      </header>

      <form
        className="border-2 border-slate-700 rounded-lg p-10"
        onSubmit={(e) => handleLogin(e)}
      >
        <p className={`${errMsg} ? "mb-5 bg-red-200 px-5 py-5" : "hidden"`}>
          {" "}
          {errMsg}{" "}
        </p>
        <div className="flex flex-col gap-2">
          <label htmlFor="username"> Username </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2 mt-5">
          <label htmlFor="user-password"> Password </label>
          <input
            type="password"
            id="user-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="mt-5">Login</button>
      </form>
    </section>
  );
};

export default Login;
