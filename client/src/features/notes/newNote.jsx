import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersApiSlice";
import NewNoteForm from "./NewNoteForm";

const newNote = () => {
  const users = useSelector(selectAllUsers);
  const content = users ? <NewNoteForm users={users} /> : <p> Loading... </p>;

  return content;
};

export default newNote;
