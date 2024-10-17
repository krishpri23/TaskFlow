// kind of like middleware to check if we have users to add note
// if we have users, then go to new note form

import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersApiSlice";
import NewNoteForm from "./NewNoteForm";

const NewNote = () => {
  const users = useSelector(selectAllUsers);

  console.log(users, "inside new note ");

  if (!users?.length) return <p> No users available to add note </p>;

  const content = users ? <NewNoteForm users={users} /> : <p> Loading... </p>;

  return content;
};

export default NewNote;
