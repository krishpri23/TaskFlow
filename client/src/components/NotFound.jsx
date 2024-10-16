import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <img src="/404.jpg" alt="error" className="w-1/2" />
      <div className="flex gap-10 justify-center">
        <button onClick={() => navigate("/dash")}> Go Home </button>
        <button onClick={() => navigate(-1)}>Go Back </button>
      </div>
    </div>
  );
};

export default NotFound;
