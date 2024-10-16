import React from "react";
import { useSelector } from "react-redux";
import { selectNotesById } from "./notesApiSlice";
import { useNavigate } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";

const Note = ({ noteId }) => {
  const note = useSelector((state) => selectNotesById(state, noteId));
  const navigate = useNavigate();

  console.log("note inside note list", note);

  if (note) {
    const created = new Date(note.createdAt).toLocaleString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric", // Include the year if you want
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit", // Optional: Include seconds if needed
      hour12: true, // Optional: For 12-hour format (AM/PM)
    });
    const updated = new Date(note.createdAt).toLocaleString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric", // Include the year if you want
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit", // Optional: Include seconds if needed
      hour12: true, // Optional: For 12-hour format (AM/PM)
    });

    const handleEdit = () => navigate(`/dash/notes/${noteId}`);

    return (
      <div className="w-3/4 flex flex-col  mx-auto mt-10 bg-sky-100 shadow-lg  px-7 py-5 rounded-xl relative">
        <h1 className="font-semibold text-lg pb-5 capitalize"> {note.title}</h1>
        <p className="font-light mb-10 captitalize"> {note.text} </p>
        <span
          className={` font-bold px-5 py-1 rounded-br-xl rounded-tl-xl absolute right-0 bottom-0 ${
            note.completed
              ? "text-red-800 bg-red-100"
              : " text-green-700 bg-green-300"
          }`}
        >
          {" "}
          {note.completed ? "Completed" : "Open"}{" "}
        </span>

        {created && updated ? (
          <span className="hidden md:inline text-xs text-gray-400 absolute bottom-1">
            {" "}
            Updated on: {updated}
          </span>
        ) : (
          <span className="hidden md:inline text-xs text-gray-400 absolute bottom-1">
            {" "}
            Created on: {created}
          </span>
        )}
        <button
          onClick={handleEdit}
          className="px-0 py-0 bg-transparent text-sky-900 font-extrabold  h-10 rounded-xl absolute right-0 top-0"
        >
          {" "}
          <FaRegEdit />{" "}
        </button>
      </div>
    );
  } else return null;
};

export default Note;
