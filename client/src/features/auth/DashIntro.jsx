import React from "react";
import { Link, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const DashIntro = () => {
  const { username, isAdmin, isManager } = useAuth();
  return (
    <main className="w-full h-screen bg-sky-50 px-10 py-4">
      <h1> Welcome, {username}!</h1>

      <ul className="flex flex-col justify-center items-start gap-4 ">
        {/* Relative routing which is takes to dash/users */}
        <Link to="/dash/notes"> View notes </Link>
        {/* only manager and admin can see these two */}
        {(isManager || isAdmin) && (
          <Link to="/dash/users"> View user settings </Link>
        )}
        {(isManager || isAdmin) && (
          <Link to="/dash/users/add"> Add new User </Link>
        )}
        <Link to="/dash/notes/new"> Add new notes </Link>
      </ul>
    </main>

    // <main className="w-full h-screen bg-sky-300 flex justify-start">
    //   {/* sidebar */}
    //   <div className="bg-sky-400 w-1/4 h-full flex flex-col items-center">
    //     <ul className="flex flex-col justify-center items-start gap-4 ">
    //       {" "}
    //       {/* Relative routing which is takes to dash/users */}
    //       <Link to="/dash/notes"> View notes </Link>
    //       {/* only manager and admin can see these two */}
    //       {(isManager || isAdmin) && (
    //         <Link to="/dash/users"> View user settings </Link>
    //       )}{" "}
    //       {(isManager || isAdmin) && (
    //         <Link to="/dash/users/add"> Add new User </Link>
    //       )}
    //       <Link to="/dash/notes/new"> Add new notes </Link>
    //     </ul>
    //   </div>
    //   {/* main content */}
    //   <div className="bg-sky-100 w-full min-h-full">
    //     <h1> Welcome, {username}!</h1>
    //     <Outlet />
    //   </div>
    // </main>
  );
};

export default DashIntro;
