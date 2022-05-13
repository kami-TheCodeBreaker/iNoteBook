import React from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
const Navbar = (props) => {
  const location = useLocation();
  return (
    <div className="h-16 flex px-5 bg-black text-white  font-baloo shadow-xl fixed top-0 left-0 right-0 z-10">
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
        <div className="flex 3 items-center w-fit gap-2 ">
          <input
            className="py-1 rounded-sm outline-0 text-black"
            type="text"
            name="search"
            id="search"
          />
          <button className="bg-blue-700 outline-0  py-1 px-3 rounded-md flex items-center hover:bg-blue-900">
            Search
          </button>
        </div>
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
