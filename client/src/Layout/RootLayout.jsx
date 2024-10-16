import React from "react";
import { Outlet } from "react-router-dom";
import DashIntro from "../features/auth/DashIntro";

const rootLayout = () => {
  return (
    <>
      {/* <DashIntro /> */}
      <Outlet />
    </>
  );
};

export default rootLayout;
