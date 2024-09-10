import React from "react";
import { Link, Outlet } from "react-router-dom";
import DashHeader from "../components/DashHeader";
import DashFooter from "../components/DashFooter";

const DashLayout = () => {
  return (
    <div className="flex flex-col w-full h-screen">
      <DashHeader />
      <main className="flex-grow">
        <Outlet />
      </main>

      <DashFooter />
    </div>
  );
};

export default DashLayout;
