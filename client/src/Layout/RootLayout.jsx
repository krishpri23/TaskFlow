import React from "react";
import { Outlet } from "react-router-dom";

const rootLayout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default rootLayout;
