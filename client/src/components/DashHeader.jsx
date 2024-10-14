import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSendLogoutMutation } from "../features/auth/authApiSlice";
import { IoIosLogOut } from "react-icons/io";
import useAuth from "../hooks/useAuth";
import {
  FaFile,
  FaUser,
  FaUserPlus,
  FaUserCog,
  FaRegEdit,
} from "react-icons/fa";
import { CgFileAdd } from "react-icons/cg";

const DASH_REGEX = /^\/dash(\/)?$/;
const NOTES_REGEX = /^\/dash\/notes(\/)?$/;
const USERS_REGEX = /^\/dash\/users(\/)?$/;

const DashHeader = () => {
  const { isManager, isAdmin } = useAuth();

  const token = useSelector((state) => state.auth.token);
  const [logout, { isSuccess, isError, error, isLoading }] =
    useSendLogoutMutation();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  if (isError) return <p>Error: {error.data?.message}</p>;

  const onNewNoteClicked = () => navigate("/dash/notes/new");
  const onNewUserClicked = () => navigate("/dash/users/add");
  const onNotesClicked = () => navigate("/dash/notes");
  const onUserClicked = () => navigate("/dash/users");

  const logoutBtn = (
    <button to="/logout" onClick={handleLogout}>
      {" "}
      <IoIosLogOut className="w-10 h-5 hover:scale-110 transition-transform duration-150" />
    </button>
  );
  let newNoteBtn = null;
  // notes list
  if (NOTES_REGEX.test(pathname)) {
    newNoteBtn = (
      <button onClick={onNewNoteClicked} title="New Note">
        {" "}
        <CgFileAdd className="w-10 h-5 hover:scale-110 transition-transform duration-150" />
      </button>
    );
  }

  let newUserBtn = null;
  // users list
  if (USERS_REGEX.test(pathname)) {
    newUserBtn = (
      <button onClick={onNewUserClicked} title="New User">
        {" "}
        <FaUserPlus className="w-10 h-5 hover:scale-110 transition-transform duration-150" />
      </button>
    );
  }

  let userBtn = null;
  if (isManager || isAdmin) {
    if (!USERS_REGEX.test(pathname) && pathname.includes("/dash")) {
      userBtn = (
        <button onClick={onUserClicked} title="Users">
          {" "}
          <FaUserCog className="w-10 h-5 hover:scale-110 transition-transform duration-150" />
        </button>
      );
    }
  }

  let noteBtn = null;
  if (!NOTES_REGEX.test(pathname) && pathname.includes("/dash")) {
    noteBtn = (
      <button title="Notes" onClick={onNotesClicked}>
        <FaRegEdit className="w-10 h-5 hover:scale-110 transition-transform duration-150" />
      </button>
    );
  }

  let btnContent;
  if (isLoading) {
    btnContent = <p>Logging out...</p>;
  } else {
    btnContent = (
      <>
        {newNoteBtn}
        {newUserBtn}
        {userBtn}
        {noteBtn}
        {logoutBtn}
      </>
    );
  }

  let content;
  content = (
    <>
      <nav className="flex justify-center items-center bg-stone-800 text-stone-100 ">
        <Link className="w-1/2 px-5" to="/">
          {" "}
          Notes App{" "}
        </Link>
        <ul className="w-full flex justify-end items-center gap-1 py-3 ">
          <Link to="/">Home</Link>
          {btnContent}
        </ul>
      </nav>
    </>
  );
  return content;
};

export default DashHeader;
