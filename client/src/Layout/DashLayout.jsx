import React from "react";
import { Outlet } from "react-router-dom";
import DashHeader from "../components/DashHeader";
import DashFooter from "../components/DashFooter";

const DashLayout = () => {
  return (
    <>
      <DashHeader />
      <div>
        {/* dash intro */}
        <Outlet />
      </div>
      <DashFooter />
    </>
  );
};

export default DashLayout;
