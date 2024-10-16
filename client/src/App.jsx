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
import NewNote from "./features/notes/NewNote";
import PersistLogin from "./features/auth/PersistLogin";
import RequireAuth from "./features/auth/RequireAuth";
import { ROLES } from "./config/roles";
import NotFound from "./components/NotFound";
import Register from "./features/auth/Register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<DashIntro />} />
        <Route element={<PersistLogin />}>
          <Route
            element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}
          >
            <Route element={<Prefetch />}>
              <Route path="/dash" element={<DashLayout />}>
                <Route index element={<Homepage />} />
                <Route path="notes">
                  <Route index element={<NotesList />} />
                  <Route path=":id" element={<EditNote />} />
                  <Route path="new" element={<NewNote />} />
                </Route>
                <Route path="users">
                  <Route index element={<UsersList />} />
                  <Route path=":id" element={<EditUser />} />
                  <Route path="add" element={<NewUserForm />} />
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>

        <Route path="login">
          <Route index element={<Login />} />
        </Route>

        {/* <Route path="register">
          <Route index element={<Register />} />
        </Route> */}
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
