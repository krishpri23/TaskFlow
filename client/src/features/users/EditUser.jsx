import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectUsersById } from "./usersApiSlice";
import EditUserForm from "./EditUserForm";

const EditUser = () => {
  const { id } = useParams();
  const user = useSelector((state) => selectUsersById(state, id));

  console.log(user, "inside edit user");
  // confirm we have a user before having a edit user form
  const content = user ? (
    <EditUserForm user={user} id={id} />
  ) : (
    <p>Loading...</p>
  );

  return content;
};

export default EditUser;
