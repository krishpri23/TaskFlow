import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <img src="error.jpg" alt="error" className="mt-20" />

      <Link
        to="/login"
        className="bg-sky-700 px-5 py-2 rounded-lg text-white mt-10"
      >
        click here to Login
      </Link>
    </div>
  );
};

export default Unauthorized;
