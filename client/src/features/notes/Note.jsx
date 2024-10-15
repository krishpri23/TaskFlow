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
    });
    const updated = new Date(note.createdAt).toLocaleString("en-US", {
      day: "numeric",
      month: "long",
    });

    const handleEdit = () => navigate(`/dash/notes/${noteId}`);

    return (
      <div className="w-11/12 lg:w-3/4 bg-sky-100 shadow-lg  px-7 py-5 rounded-xl relative">
        <h1 className="font-semibold text-lg pb-5 capitalize"> {note.title}</h1>
        <p className="font-light mb-10"> {note.text} </p>
        <span
          className={`font-bold px-5 py-1 rounded-br-xl rounded-tl-xl absolute right-0 bottom-0 ${
            note.completed
              ? "text-red-800 bg-red-100"
              : " text-green-700 bg-green-300"
          }`}
        >
          {" "}
          {note.completed ? "Completed" : "Open"}{" "}
        </span>

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
