import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import DashHeader from "../components/DashHeader";
import DashFooter from "../components/DashFooter";
import useAuth from "../hooks/useAuth";
import { IoIosLogOut } from "react-icons/io";
import {
  FaFile,
  FaUser,
  FaUserPlus,
  FaUserCog,
  FaRegEdit,
  FaHome,
} from "react-icons/fa";
import { CgFileAdd } from "react-icons/cg";
const DashLayout = () => {
  const { username, isAdmin, isManager, status } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };
  return (
    <>
      <section className="w-full h-full flex justify-start gap-5 ">
        {/* sidebar */}
        <div className="relative w-1/4 h-full rounded-lg">
          <div className="flex flex-col items-center">
            <span className="pt-5 font-semibold text-xl"> {username} </span>
            <span className="font-normal text-xs uppercase"> {status} </span>
          </div>
          <hr className="border-b-2 border-grey-300 w-full" />

          <ul className="flex flex-col justify-center items-center gap-5 ">
            {" "}
            {/* Relative routing which is takes to dash/users */}
            <NavLink to="/dash/notes" className="sidebar">
              {" "}
              <CgFileAdd className="icons" />
              <span>Notes</span>{" "}
            </NavLink>
            {/* only manager and admin can see these two */}
            {(isManager || isAdmin) && (
              <NavLink to="/dash/users" className="sidebar">
                {" "}
                <FaUserPlus className="icons" />
                <span> User Settings </span>
              </NavLink>
            )}{" "}
            {(isManager || isAdmin) && (
              <NavLink to="/dash/users/add" className="sidebar">
                <FaUserCog className="icons" />
                <span>Add User </span>
              </NavLink>
            )}
            <NavLink to="/dash/notes/new" className="sidebar">
              {" "}
              <FaRegEdit className="icons" />
              <span> Add Notes </span>
            </NavLink>
            <hr className="border-b-2 border-grey-300 w-full" />
            <NavLink to="/dash" className="sidebar">
              <FaHome className="icons" />
              <span>Home</span>
            </NavLink>
            <NavLink
              to="/logout"
              onClick={handleLogout}
              className="sidebar hover:bg-red-100"
            >
              <IoIosLogOut className="icons " />
              <span className="text-red-700 font-semibold">Logout</span>
            </NavLink>
          </ul>
        </div>

        {/* main content */}
        <div className="w-full h-full bg-sky-50">
          <Outlet />
        </div>
      </section>
    </>
  );
};

export default DashLayout;
