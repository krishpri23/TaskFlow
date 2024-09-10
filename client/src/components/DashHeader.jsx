import React from "react";
import { Link } from "react-router-dom";

const DashHeader = () => {
  return (
    <>
      <nav className=" flex justify-between items-center px-5  bg-teal-800 text-teal-100 ">
        <h1 className="w-1/2"> Notes App </h1>
        <ul className="w-full flex justify-end gap-10 py-3 px-5 ">
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
        </ul>
      </nav>
    </>
  );
};

export default DashHeader;
