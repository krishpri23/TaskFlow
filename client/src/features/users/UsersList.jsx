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
    console.log("success", users);
    // array of user ids
    const { ids } = users;
    tableContent = ids?.length
      ? ids.map((userId) => <User key={userId} userId={userId} />)
      : null;

    content = (
      <table>
        <thead>
          <tr>
            <th> username </th>
            <th>roles</th>
            <th>edit</th>
          </tr>
        </thead>

        <tbody>{tableContent}</tbody>
      </table>
    );
  }

  return content;
};

export default UsersList;
