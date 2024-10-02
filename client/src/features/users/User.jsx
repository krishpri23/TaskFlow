/**
 * Instead of going through the arrays of users and finding the user with id, we use selectors defined
 */
import { useSelector } from "react-redux";
import { selectUsersById } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";

const User = ({ userId }) => {
  const user = useSelector((state) => selectUsersById(state, userId));

  const navigate = useNavigate();

  if (user) {
    const handleEdit = () => navigate(`/dash/users/${userId}`);

    const userRolesString = user.roles.toString().replaceAll(",", ",");

    const cellStatus = user.active ? "" : "inactive";

    return (
      <tr>
        <td> {user.username}</td>
        <td> {userRolesString} </td>
        <td>
          <button onClick={handleEdit}> Edit </button>
        </td>
      </tr>
    );
  } else return null;
};

export default User;
