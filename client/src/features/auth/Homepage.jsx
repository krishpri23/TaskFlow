import React from "react";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();
  return (
    <main className="w-full h-screen bg-stone-50 px-10 text-stone-800 flex flex-col justify-center items-center md:flex-row md:justify-evenly ">
      <div className="w-full h-full text-center flex flex-col justify-center items-center ">
        <h1 className="font-bold text-3xl  ">Ticket Management System</h1>
        <p> Located in Sunnyvale, California</p>
        <button className="mt-5 px-5" onClick={() => navigate("/dash")}>
          {" "}
          Visit dashboard{" "}
        </button>
      </div>

      <div className="w-full bg-black">
        <img
          src="hero.png"
          alt="hero section"
          className="w-full h-full bg-transparent"
        />
      </div>
    </main>
  );
};

export default Homepage;
