import React from "react";
import PropTypes from "prop-types";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
const Navbar = (props) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    toast.warning("Logout Successfully ");
    navigate("/login");
  };
  const location = useLocation();
  return (
    <div className="h-16 flex px-5 bg-black text-white  font-baloo shadow-xl fixed top-0 left-0 right-0 z-10 ">
      <nav className="flex items-center justify-between w-full gap-9 ">
        <div className="icon">
          <Link to="/" className="flex flex-col justify-center ">
            <i className="fa-solid fa-note"></i>
            <FontAwesomeIcon
              className="fill-white stroke-black h-7"
              icon={faBookOpen}
            />
            <p className="text-white text-md  font-semibold">{props.title} </p>
          </Link>
        </div>
        <div className="navgation ">
          <ul className="flex gap-6 items-center justify-center text-nav-link text-gray-200 ">
            <li
              className={`hover:cursor-pointer  hover:text-white ${
                location.pathname === "/" ? "text-white" : ""
              }`}
            >
              <Link to="/">Home</Link>
            </li>
            <li
              className={`hover:cursor-pointer  hover:text-white ${
                location.pathname === "/about" ? "text-white" : ""
              }`}
            >
              <Link to="/about">About</Link>
            </li>
            <li
              className={`hover:cursor-pointer  hover:text-white ${
                location.pathname === "/contact" ? "text-white" : ""
              }`}
            >
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        {location.pathname === "/login" ? (
          <div></div>
        ) : !localStorage.getItem("auth-token") ? (
          <div className="flex 3 items-center w-fit gap-2 ">
            <Link
              to="/login"
              className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              Login
            </Link>
          </div>
        ) : (
          <button
            className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
      </nav>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
};

Navbar.defaultProps = {
  title: "Set title",
};
export default Navbar;
