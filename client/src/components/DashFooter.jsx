import React from "react";
import useAuth from "../hooks/useAuth";

const DashFooter = () => {
  const { username, status } = useAuth();
  let content = (
    <footer className=" bg-sky-100 p-5 absolute bottom-0 w-full">
      <div className="flex gap-10">
        <p className="font-semibold">
          {" "}
          Current user : <span className="font-light">{username}</span>{" "}
        </p>
        <p className="font-semibold">
          Status : <span className="font-light">{status}</span>{" "}
        </p>
      </div>
    </footer>
  );
  return content;
};

export default DashFooter;
