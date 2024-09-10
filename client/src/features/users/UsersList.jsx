import React from "react";
import { useGetUsersQuery } from "./usersApiSlice";
import User from "./User";

const UsersList = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery();

  let content;

  if (isLoading) content = <p> Loading...</p>;
  if (isError)
    content = (
      <p className={isError ? "bg-red-600" : ""}> {error?.data?.message} </p>
    );

  let tableContent;
  if (isSuccess) {
    const { ids } = users;
    tableContent = ids?.length
      ? ids.map((userId) => <User key={userId} userId={userId} />)
      : null;
  }

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
  return content;
};

export default UsersList;
