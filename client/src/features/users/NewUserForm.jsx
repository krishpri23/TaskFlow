import React, { useEffect, useState } from "react";
import { useAddNewUserMutation } from "./usersApiSlice";
import { ROLES } from "../../config/roles";
import { useNavigate } from "react-router-dom";

const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

const NewUserForm = () => {
  // we get a function to invoke mutation
  const [addNewUser, { isLoading, isSuccess, isError, error }] =
    useAddNewUserMutation();
  const navigate = useNavigate();

  // states to have controlled components
  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState(["Employee"]); // can be set to many
  const [err, setErr] = useState("");

  useEffect(() => {
    if (isSuccess) {
      setPassword("");
      setUsername("");
      setRoles([]);

      navigate("/dash/users");
    }
  }, [isSuccess, navigate]);

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
    if (Boolean(validUsername)) {
      setErr("");
    }
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
    if (Boolean(validPassword)) {
      setErr("");
    }
  }, [password]);

  const onRolesChanged = (e) => {
    // To select multiple values
    const values = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );

    setRoles(values);
  };

  const onSave = async () => {
    if (
      [validPassword, validUsername, roles.length].every(Boolean) &&
      !isLoading
    ) {
      await addNewUser({ username, password, roles });
    } else {
      setErr(" Invalid username or password ! ");
    }
  };
  return (
    <div className="w-full h-full flex flex-col justify-start items-center ">
      <h2 className="font-bold text-2xl mb-5 mt-20"> Add a new user </h2>
      <form
        className="w-3/4 md:w-1/2 lg:w-1/3 flex flex-col gap-10  bg-sky-100 rounded-lg shadow-lg p-5"
        onSubmit={(e) => e.preventDefault()}
      >
        <p
          className={`${
            isError ? "text-red-600 text-xl px-10 text-center" : "hidden"
          }`}
        >
          {" "}
          {error?.data?.message}{" "}
        </p>
        <p className={`${err ? "text-red-600 text-3xl px-10 py-5" : "hidden"}`}>
          {" "}
          {err}{" "}
        </p>
        <div className="flex  flex-col gap-2  px-10">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            value={username}
            autoComplete="off"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2  px-10">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>{" "}
        <div className="flex flex-col gap-2  px-10">
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
        <button className="mx-auto" onClick={onSave}>
          {" "}
          Save{" "}
        </button>
      </form>
    </div>
  );
};

export default NewUserForm;
