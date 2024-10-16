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
      <tr className="grid grid-cols-3 text-center  justify-between items-center px-10 py-3 border-t-2 border-sky-100 ">
        <td> {user.username}</td>
        <td>
          {userRolesString &&
            userRolesString.split(",").map((role) => {
              let tags;
              if (role === "Admin") tags = "admin";
              if (role === "Employee") tags = "employee";
              if (role === "Manager") tags = "manager";
              return <span className={`roles ${tags}`}> {role} </span>;
            })}
        </td>
        <td>
          <button
            onClick={handleEdit}
            className="px-0 py-0 bg-transparent text-sky-700 "
          >
            {" "}
            <FaRegEdit className=" w-10 h-5 ml-5 hover:scale-110 transition-transform duration-150" />
          </button>
        </td>
      </tr>
    );
  } else return null;
};

export default User;
