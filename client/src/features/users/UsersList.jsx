import React from "react";
import { useGetUsersQuery } from "./usersApiSlice";
import User from "./User";

const UsersList = () => {
  // requery data when we remount the component
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery("usersList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;

  if (isLoading) content = <p> Loading...</p>;
  if (isError)
    content = (
      <p className={isError ? "bg-red-600" : ""}> {error?.data?.message} </p>
    );

  let tableContent;
  if (isSuccess) {
    // array of user ids
    const { ids } = users;
    tableContent = ids?.length
      ? ids.map((userId) => <User key={userId} userId={userId} />)
      : null;

    content = (
      <table className="w-full md:w-3/4 mx-auto table-fixed border-separate border-spacing-0 border-2 border-sky-100 rounded-lg mt-20 shadow-lg">
        <thead>
          <tr className="grid grid-cols-3 justify-between items-center gap-10 px-10 py-3 bg-sky-100 capitalize">
            <th> username </th>
            <th>roles</th>
            <th>edit</th>
          </tr>
        </thead>

        <tbody className="border-2 border-sky-500 ">{tableContent}</tbody>
      </table>
    );
  }

  return (
    <>
      <h1 className="text-2xl uppercase text-center font-bold mt-10">
        {" "}
        Users List
      </h1>
      {content}
    </>
  );
};

export default UsersList;
