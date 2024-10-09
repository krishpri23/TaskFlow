/**
 * Manually subscribe users and notes
 */

import React, { useEffect } from "react";
import { notesApiSlice } from "../notes/notesApiSlice";
import { usersApiSlice } from "../users/usersApiSlice";
import { Outlet } from "react-router-dom";
import { store } from "../../app/store";

const Prefetch = () => {
  useEffect(() => {
    console.log("subscribing");
    // makes api call to /notes and /users loading the dashboard
    // state wont expire in 10s or 60s
    const notes = store.dispatch(notesApiSlice.endpoints.getNotes.initiate());
    const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate());

    // runs only when component mounts 1. mount 2.unmount 3.remount
    return () => {
      console.log("unsubscribing");
      notes.unsubscribe();
      users.unsubscribe();
    };
  }, []);

  return <Outlet />;
};

export default Prefetch;
