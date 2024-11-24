import { useSelector } from "react-redux";
import { useGetNotesQuery } from "./notesApiSlice";
import Note from "./Note";
import useAuth from "../../hooks/useAuth";
import NoteNotFound from "../../components/NoteNotFound";

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

  console.log("note list", notes);

  let content;
  if (isLoading) content = <p>Loading...</p>;
  if (isError) {
    console.log("Error inside note list", error);
    content = (
      <p className="bg-red-300 rounded-lg py-3 w-1/4 text-center">
        {" "}
        {error?.data?.message}{" "}
      </p>
    );
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
      <div className="w-full h-full mb-10">
        {ids?.length === 0 ? <NoteNotFound /> : tableContent}
      </div>
    );
  }

  return (
    <>
      <h1 className="text-2xl uppercase text-center font-bold mt-10">
        {" "}
        Notes{" "}
      </h1>
      {content}
    </>
  );
};

export default NotesList;
