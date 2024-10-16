import React from "react";
import { Link, useNavigate } from "react-router-dom";

const DashIntro = () => {
  const navigate = useNavigate();
  return (
    <section className="w-full h-full bg-sky-50 px-10 text-sky-800 flex flex-col justify-center items-center md:flex-row md:justify-evenly ">
      <div className="w-1/2 h-full text-center flex flex-col justify-center items-center gap-5 ">
        <h1 className="font-bold text-3xl"> Welcome to TaskFlow</h1>
        <p className="px-20 ">
          To effortlessly manage Employee Notes and Assignments, start adding
          information to take control of your employee task management today
          with TaskFlow!
        </p>
        <button onClick={() => navigate("/login")}> Login </button>
      </div>
    </section>
  );
};

export default DashIntro;
