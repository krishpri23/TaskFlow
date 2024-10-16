import React, { useEffect, useState } from "react";
import { ROLES } from "../../config/roles";
import { useNavigate } from "react-router-dom";
import { useDeleteUserMutation, useUpdateUserMutation } from "./usersApiSlice";

const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

const EditUserForm = ({ user, id }) => {
  const navigate = useNavigate();

  const [updateUser, { isLoading, isSuccess, isError, error }] =
    useUpdateUserMutation();
  const [
    deleteUser,
    {
      isLoading: isDelLoading,
      isSuccess: isDelSuccess,
      isError: isDelError,
      error: delError,
    },
  ] = useDeleteUserMutation();

  // states to have controlled components
  const [username, setUsername] = useState(user.username);
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState([...user.roles]); // can be set to many
  const [active, setActive] = useState(user.active); // if user is active can't be deleted
  const [err, setErr] = useState("");

  console.log("password", password);

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setPassword("");
      setUsername("");
      setRoles([]);

      navigate("/dash/users");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
    if (Boolean(validUsername)) {
      setErr("");
    }
    console.log("valid username", validUsername);
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
    if (Boolean(validPassword)) {
      setErr("");
    }
    console.log("valid password", validPassword);
  }, [password]);

  const onRolesChanged = (e) => {
    // To select multiple values
    const values = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );

    setRoles(values);
  };

  const onSave = () => {
    if (
      [validPassword, validUsername, roles.length].every(Boolean) &&
      !isLoading
    ) {
      updateUser({ id, username, password, roles, active });
      console.log("updated!!! ");
    } else {
      setErr(" Invalid username or password ! ");
    }
  };

  const canDelete = Boolean(validPassword);

  const onDelete = () => {
    deleteUser({ id });
  };
  return (
    <div className="w-full h-full flex flex-col justify-center items-center ">
      <h2> Edit User Form </h2>
      <form
        className="w-3/4 md:w-1/2 bg-sky-50 shadow-lg p-5 flex flex-col gap-10"
        onSubmit={(e) => e.preventDefault()}
      >
        <p
          className={`${
            isError ? "text-red-600 text-xl px-10 py-5" : "hidden"
          }`}
        >
          {" "}
          {error?.data?.message}{" "}
        </p>
        <p className={`${err ? "text-red-600 text-3xl px-10 py-5" : "hidden"}`}>
          {" "}
          {err}{" "}
        </p>
        <div className="input-forms">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            value={username}
            autoComplete="off"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-forms">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>{" "}
        <div className="flex gap-3 justify-start items-center px-10 ">
          <label htmlFor="active">Active</label>
          <input
            type="checkbox"
            name="active"
            checked={active}
            onChange={() => setActive((prev) => !prev)}
          />
        </div>{" "}
        <div className="input-forms">
          <label htmlFor="roles">Assigned Roles :</label>
          <select
            name="roles"
            id="roles"
            multiple={true}
            size="3"
            value={roles}
            onChange={(e) => onRolesChanged(e)}
          >
            {Object.values(ROLES).map((role) => (
              <option key={role} value={role}>
                {" "}
                {role}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-between">
          <button className="mx-auto" onClick={onSave}>
            {" "}
            Save{" "}
          </button>

          <button
            disabled={!canDelete}
            className="bg-red-800 text-white font-bold mx-auto disabled:bg-opacity-75 disabled:cursor-not-allowed"
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

export default EditUserForm;
