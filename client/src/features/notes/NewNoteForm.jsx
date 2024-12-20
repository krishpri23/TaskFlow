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

      console.log("inside is success");

      navigate("/dash/notes");
    }
  }, [isSuccess, navigate]);

  if (isLoading) {
    return <p> Loading...</p>;
  }

  if (isError) {
    console.error("Error", error);
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
    <div className="w-full h-full flex flex-col justify-start items-center ">
      <h2> Add New Note</h2>
      <form
        className="w-3/4 md:w-1/2 lg:w-1/3 flex flex-col gap-10 shadow-lg p-5 bg-sky-50"
        onSubmit={(e) => e.preventDefault()}
      >
        <p className="text-red-600 text-lg px-10 text-center"> {err} </p>
        <div className="input-forms">
          <label htmlFor="title"> Title</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="input-forms">
          <label htmlFor="body"> Text</label>
          <textarea
            type="text"
            name="body"
            value={body}
            className="resize-none"
            onChange={(e) => setBody(e.target.value)}
          />
        </div>

        <div className="input-forms">
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
