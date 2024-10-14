import React from "react";
import { FaHome } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

const DashFooter = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  let goHomeBtn = null;
  const handleGoHomeBtn = () => {
    navigate("/");
  };
  if (pathname !== "dash") {
    goHomeBtn = (
      <button onClick={handleGoHomeBtn}>
        {" "}
        <FaHome />{" "}
      </button>
    );
  }

  let content = (
    <footer className=" bg-indigo-400 p-5 absolute bottom-0 w-full">
      {" "}
      <div className="mt-2">{goHomeBtn}</div>
      <p> Current user :</p> <p>Status : </p>
    </footer>
  );
  return content;
};

export default DashFooter;
