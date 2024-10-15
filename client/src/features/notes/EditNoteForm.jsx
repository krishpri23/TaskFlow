// Actual edit happens in this component

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDeleteNoteMutation, useUpdateNoteMutation } from "./notesApiSlice";
import { useNavigate } from "react-router-dom";

const EditNoteForm = ({ note, users }) => {
  const [title, setTitle] = useState(note.title);
  const [body, setBody] = useState(note.text);
  const [completed, setCompleted] = useState(note.completed);
  const [err, setErr] = useState("");

  const navigate = useNavigate();

  const [updateNote, { isLoading, isSuccess, isError, error }] =
    useUpdateNoteMutation();

  const [
    deleteNote,
    {
      isLoading: isDelLoading,
      isSuccess: isDelSuccess,
      isError: isDelError,
      error: delError,
    },
  ] = useDeleteNoteMutation();
  const user = users
    .filter((user) => user._id === note.user)
    .map((user) => user._id);

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setTitle("");
      setBody("");
      navigate("/dash/notes");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  if (isLoading) {
    return <p> Loading...</p>;
  }

  const onSave = async () => {
    if (title && body) {
      await updateNote({ id: note.id, user, title, text: body, completed });
    } else {
      setErr("Invalid data");
      console.log("not updated");
    }
  };

  const onDelete = async () => {
    await deleteNote({ id: note.id });
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center ">
      <h2 className="font-bold text-xl mt-10 mb-5"> Edit Note </h2>
      <form
        className="w-3/4 md:w-1/2 lg:w-1/3 flex flex-col gap-10 p-5 bg-sky-100 shadow-lg"
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
        <div className="flex gap-2 px-10">
          <label htmlFor="work-complete"> Work complete</label>
          <input
            type="checkbox"
            name="work-complete"
            value={completed}
            onChange={() => setCompleted((prev) => !prev)}
          />
        </div>
        <div className="flex flex-col gap-2 px-10">
          <label htmlFor="assigned"> Assigned to</label>
          <select type="text" name="assgined">
            {users
              .filter((user) => user._id === note.user)
              .map((user) => (
                <option key={user._id} value={user.username}>
                  {" "}
                  {user.username}{" "}
                </option>
              ))}
          </select>
        </div>
        <div className="flex justify-between">
          <button type="submit" className="mx-auto" onClick={onSave}>
            {" "}
            Save{" "}
          </button>

          <button
            type="submit"
            className="bg-red-800 text-white  mx-auto disabled:bg-opacity-75 disabled:cursor-not-allowed"
            onClick={onDelete}
          >
            {" "}
            Delete
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditNoteForm;
