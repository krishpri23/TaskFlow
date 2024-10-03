import React from "react";
import { useSelector } from "react-redux";
import { selectNotesById } from "./notesApiSlice";
import { useNavigate } from "react-router-dom";

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
      <tr>
        <td>
          {" "}
          {note.completed ? <span> Completed </span> : <span> Open </span>}
        </td>
        <td> {created} </td>
        <td> {updated} </td>
        <td> {note.title} </td>
        <td>{note.username}</td>

        <td>
          <button onClick={handleEdit}>edit</button>
        </td>
      </tr>
    );
  } else return null;
};

export default Note;
