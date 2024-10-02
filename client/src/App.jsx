import "./index.css";
import { Route, Routes } from "react-router-dom";
import RootLayout from "./Layout/RootLayout";
import Homepage from "./features/auth/Homepage";
import Login from "./features/auth/Login";
import NotesList from "./features/notes/NotesList";
import UsersList from "./features/users/UsersList";
import DashLayout from "./Layout/DashLayout";
import DashIntro from "./features/auth/DashIntro";
import EditUser from "./features/users/EditUser";
import EditNote from "./features/notes/EditNote";
import NewUserForm from "./features/users/NewUserForm";
import Prefetch from "./features/auth/Prefetch";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Homepage />} />

        <Route element={<Prefetch />}>
          <Route path="dash" element={<DashLayout />}>
            <Route index element={<DashIntro />} />
            <Route path="notes">
              <Route index element={<NotesList />} />
              <Route path=":id" element={<EditNote />} />
            </Route>
            <Route path="users">
              <Route index element={<UsersList />} />
              <Route path=":id" element={<EditUser />} />
              <Route path="add" element={<NewUserForm />} />
            </Route>
          </Route>
        </Route>

        <Route path="login">
          <Route index element={<Login />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
