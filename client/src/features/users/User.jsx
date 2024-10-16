/**
 * Instead of going through the arrays of users and finding the user with id, we use selectors defined
 */
import { useSelector } from "react-redux";
import { selectUsersById } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";

const User = ({ userId }) => {
  const user = useSelector((state) => selectUsersById(state, userId));

  const navigate = useNavigate();

  if (user) {
    const handleEdit = () => navigate(`/dash/users/${userId}`);

    const userRolesString = user.roles.toString().replaceAll(",", ",");

    const cellStatus = user.active ? "" : "inactive";

    return (
      <tr className="flex justify-between items-center px-10 py-3 bg-sky-100 mb-5 border-b-2 border-sky-600">
        <td> {user.username}</td>
        <td>
          <span className="bg-fuchsia-200 px-4 py-1 rounded-lg text-fuchsia-700">
            {" "}
            {userRolesString}{" "}
          </span>
        </td>
        <td>
          <button
            onClick={handleEdit}
            className="px-0 py-0 bg-transparent text-sky-700"
          >
            {" "}
            <FaRegEdit className=" w-10 h-5 hover:scale-110 transition-transform duration-150" />
          </button>
        </td>
      </tr>
    );
  } else return null;
};

export default User;
