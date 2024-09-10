import "./index.css";
import { Route, Routes } from "react-router-dom";
import RootLayout from "./Layout/RootLayout";
import Homepage from "./features/auth/Homepage";
import Login from "./features/auth/Login";
import NotesList from "./features/notes/NotesList";
import UsersList from "./features/users/UsersList";
import DashLayout from "./Layout/DashLayout";
import DashIntro from "./features/auth/DashIntro";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Homepage />} />

        <Route path="dash" element={<DashLayout />}>
          <Route index element={<DashIntro />} />
          <Route path="notes">
            <Route index element={<NotesList />} />
          </Route>
          <Route path="users">
            <Route index element={<UsersList />} />
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
