import React from "react";
import { Link } from "react-router-dom";

const NoteNotFound = () => {
  return (
    <div className="w-full h-full px-10 bg-sky-50 flex flex-col mt-20 items-center ">
      <h1 className="font-semibold text-xl"> No notes found ! </h1>
      <span className="font-light text-lg py-3">
        {" "}
        Create your first note to streamline your note taking
      </span>
      <Link
        to="/dash/notes/new"
        className="bg-sky-700 px-4 py-2 rounded-lg text-white"
      >
        {" "}
        Create note{" "}
      </Link>
    </div>
  );
};

export default NoteNotFound;
