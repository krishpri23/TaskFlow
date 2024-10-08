import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useSendLogoutMutation } from "../features/auth/authApiSlice";

const DashHeader = () => {
  const token = useSelector((state) => state.auth.token);
  const [logout, { isSuccess }] = useSendLogoutMutation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <>
      <nav className=" flex justify-between items-center px-5  bg-slate-800 text-teal-100 ">
        <h1 className="w-1/2"> Notes App </h1>
        <ul className="w-full flex justify-end items-center gap-10 py-3 px-5 ">
          <Link to="/">Home</Link>
          {token ? (
            <Link
              to="/logout"
              className="bg-red-700 px-6 py-3 text-white rounded-lg border-none "
              onClick={handleLogout}
            >
              {" "}
              Logout{" "}
            </Link>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </ul>
      </nav>
    </>
  );
};

export default DashHeader;
