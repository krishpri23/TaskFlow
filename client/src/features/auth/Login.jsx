import { useEffect, useState } from "react";
import { useLoginMutation } from "./authApiSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import usePersist from "../../hooks/usePersist";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [persist, setPersist] = usePersist();

  const [login, { isLoading }] = useLoginMutation();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setErrMsg("Please enter all fields");
      return;
    }

    try {
      const response = await login({ username, password }).unwrap();
      console.log(response, "res from login");
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
      } else if (error.status === 404) {
        setErrMsg("Not Found!");
      }
    }
  };

  if (isLoading) return <p>Loading...</p>;
  return (
    <section className="w-full h-full flex flex-col items-center">
      <header>
        <h1 className="font-bold text-xl mt-10 mb-5">Employee Login </h1>
      </header>

      <form
        className=" w-3/4 md:w-1/2 lg:w-1/3 rounded-lg p-10 bg-sky-100 shadow-lg"
        onSubmit={(e) => handleLogin(e)}
      >
        <p className={`${errMsg} ? "mb-5 bg-red-200 px-5 py-5" : "hidden"`}>
          {" "}
          {errMsg}{" "}
        </p>
        <div className="input-forms">
          <label htmlFor="username"> Username </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-forms">
          <label htmlFor="user-password"> Password </label>
          <input
            type="password"
            id="user-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="mt-5 mx-auto block">Login</button>
        <div className="flex gap-3 mt-5 justify-center ">
          <input
            type="checkbox"
            name="remember"
            id="remember"
            onChange={() => setPersist((prev) => !prev)}
            checked={persist}
          />
          <label htmlFor="remember" className="text-sm font-normal">
            Remember me
          </label>
        </div>
      </form>
    </section>
  );
};

export default Login;
