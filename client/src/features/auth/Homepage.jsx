import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Homepage = () => {
  const { username } = useAuth();

  return (
    <section className="w-full h-full bg-sky-50 px-10 text-sky-800 flex flex-col justify-center items-center md:flex-row md:justify-evenly ">
      <div className="w-1/2 h-full text-center flex flex-col justify-center items-center gap-5 ">
        <h1 className="font-bold text-3xl">
          {" "}
          Welcome to TaskFlow, {username}!{" "}
        </h1>
        <p className="px-5 lg:px-20 ">
          To effortlessly manage Employee Notes and Assignments, start adding
          information to take control of your employee task management today
          with TaskFlow!
        </p>
      </div>
    </section>
  );
};

export default Homepage;
