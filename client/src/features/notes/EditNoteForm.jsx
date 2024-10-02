// Actual edit happens in this component

const EditNoteForm = ({ note, users }) => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center ">
      <h2> Edit Note #id</h2>
      <form className="w-1/4 flex flex-col gap-10">
        <div className="flex flex-col gap-2 px-10">
          <label htmlFor="title"> Title</label>
          <input type="text" name="title" />
        </div>
        <div className="flex flex-col gap-2 px-10">
          <label htmlFor="body"> Text</label>
          <textarea type="text" name="body" className="resize-none" />
        </div>
        <div className="flex gap-2 px-10">
          <label htmlFor="work-complete"> Work complete</label>
          <input type="checkbox" name="work-complete" />
        </div>
        <div className="flex flex-col gap-2 px-10">
          <label htmlFor="assigned"> Assigned to</label>
          <select type="text" name="assgined"></select>
        </div>
        <div className="flex justify-between">
          <button className="mx-auto"> Save </button>

          <button className="bg-red-800 text-white font-bold mx-auto disabled:bg-opacity-75 disabled:cursor-not-allowed">
            {" "}
            Delete
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditNoteForm;
