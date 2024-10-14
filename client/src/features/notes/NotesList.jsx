import { useSelector } from "react-redux";
import { useGetNotesQuery } from "./notesApiSlice";
import Note from "./Note";
import useAuth from "../../hooks/useAuth";

const NotesList = () => {
  const { username, isManager, isAdmin } = useAuth();
  const {
    data: notes,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useGetNotesQuery("notesList", {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;
  if (isLoading) content = <p>Loading...</p>;
  if (isError) {
    content = <p> {error?.data?.message} </p>;
  }
  if (isSuccess) {
    const { ids, entities } = notes;

    let filteredIds;

    if (isManager || isAdmin) {
      filteredIds = [...ids];
    } else {
      filteredIds = ids.filter(
        (noteId) => entities[noteId].username === username
      );
    }

    const tableContent =
      ids?.length &&
      filteredIds.map((noteId) => <Note key={noteId} noteId={noteId} />);

    content = (
      <table className="">
        <thead>
          <tr>
            <th> username </th>
            <th>created</th>
            <th>updated</th>
            <th> title</th>
            <th>owner</th>
          </tr>
        </thead>

        <tbody>{tableContent}</tbody>
      </table>
    );
  }

  return content;
};

export default NotesList;
