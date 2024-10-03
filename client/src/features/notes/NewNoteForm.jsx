// Actual edit happens in this component

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  useAddNoteMutation,
  useDeleteNoteMutation,
  useUpdateNoteMutation,
} from "./notesApiSlice";
import { useNavigate } from "react-router-dom";
import { selectAllUsers } from "../users/usersApiSlice";

const NewNoteForm = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [err, setErr] = useState("");
  const [user, setUser] = useState("");

  const navigate = useNavigate();

  const [addNote, { isLoading, isSuccess, isError, error }] =
    useAddNoteMutation();

  const users = useSelector(selectAllUsers);

  useEffect(() => {
    if (isSuccess) {
      setTitle("");
      setBody("");
      setUser("");

      navigate("/dash/notes");
    }
  }, [isSuccess, navigate]);

  if (isLoading) {
    return <p> Loading...</p>;
  }

  const onSave = async (e) => {
    e.preventDefault();
    if (title && body) {
      console.log(user, title, body, "before adding");
      await addNote({ user, title, text: body });
      console.log("added new note");
    } else {
      setErr("Invalid data");
      console.log("not updated");
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center ">
      <h2 className="font-bold text-3xl"> Add New Note</h2>
      <form
        className="w-1/4 flex flex-col gap-10"
        onSubmit={(e) => e.preventDefault()}
      >
        <p className="text-red-800 font-bold"> {err} </p>
        <div className="flex flex-col gap-2 px-10">
          <label htmlFor="title"> Title</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2 px-10">
          <label htmlFor="body"> Text</label>
          <textarea
            type="text"
            name="body"
            value={body}
            className="resize-none"
            onChange={(e) => setBody(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2 px-10">
          <label htmlFor="assigned"> Assigned to</label>
          <select
            type="text"
            name="assgined"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          >
            {users?.map((user) => (
              <option key={user.id} value={user.id}>
                {" "}
                {user.username}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="mx-auto" onClick={(e) => onSave(e)}>
          {" "}
          Save{" "}
        </button>
      </form>
    </div>
  );
};

export default NewNoteForm;
