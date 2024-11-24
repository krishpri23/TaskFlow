// // Registering as a new user

// import React, { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { ROLES } from "../../config/roles";

// const Register = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [role, setRole] = useState([]);
//   const [errMsg, setErrMsg] = useState("");
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [matchPassword, setMatchPassword] = useState(false);

//   useEffect(() => {
//     if (password === confirmPassword) {
//       setMatchPassword(true);
//       console.log("password matched!");
//     } else {
//       console.log("did not match");
//     }
//   }, [password, confirmPassword]);

//   const handleSelectedRoles = (e) => {
//     const selectedOptions = e.target.selectedOptions; //HTML collection
//     const values = Array.from(selectedOptions, (option) => option.value);
//     setRole(values);
//   };

//   const handleLogin = (e) => {
//     e.preventDefault();
//     console.log(username, password, role, "inside login");

//     if (username && password && role) {
//     }
//   };

//   return (
//     <section className="w-full h-full flex flex-col items-center">
//       <header>
//         <h1 className="font-bold text-xl mt-10 mb-5"> Register </h1>
//       </header>

//       <form
//         className=" w-3/4 md:w-1/2 lg:w-1/3 rounded-lg p-10 bg-sky-100 shadow-lg"
//         onSubmit={(e) => handleLogin(e)}
//       >
//         <p className={`${errMsg} ? "mb-5 bg-red-200 px-5 py-5" : "hidden"`}>
//           {" "}
//           {errMsg}{" "}
//         </p>
//         <div className="input-forms">
//           <label htmlFor="username"> Username </label>
//           <input
//             type="text"
//             id="username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//         </div>
//         <div className="input-forms">
//           <label htmlFor="user-password"> Password </label>
//           <input
//             type="password"
//             id="user-password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>
//         <div className="input-forms">
//           <label htmlFor="confirmPassword"> Confirm Password </label>
//           <input
//             type="password"
//             id="confirmPassword"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//           />
//         </div>
//         <div className="input-forms">
//           <label htmlFor="assigned"> Sign up as </label>
//           <select
//             type="text"
//             name="assgined"
//             multiple
//             onChange={handleSelectedRoles}
//           >
//             <option value="Employee"> Employee </option>
//             <option value="Admin"> Admin </option>
//             <option value="Manager"> Manager </option>
//           </select>
//         </div>
//         <button className="mt-5 mx-auto block">Register</button>
//       </form>
//     </section>
//   );
// };

// export default Register;
