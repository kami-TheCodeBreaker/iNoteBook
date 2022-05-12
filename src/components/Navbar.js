import React from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";

const Navbar = (props) => {
  return (
    <div className="h-16 flex max-w-full px-5 bg-black text-white  font-baloo shadow-xl fixed top-0 left-0 right-0 z-10">
      <nav className="flex items-center justify-between w-full gap-9 ">
        <div className="icon">
          <Link to="/" className="flex flex-col justify-center ">
            <FontAwesomeIcon
              className="fill-white stroke-black h-7"
              icon={faBookOpen}
            />
            <p className="text-white text-md  font-semibold">{props.title} </p>
          </Link>
        </div>
        <div className="navgation w-1/2">
          <ul className="flex gap-6 items-center justify-center text-nav-link ">
            <li className="hover:cursor-pointer text-gray-200 hover:text-white ">
              <Link to="/">Home</Link>
            </li>
            <li className="hover:cursor-pointer text-gray-200 hover:text-white ">
              <Link to="/about">About</Link>
            </li>
            <li className="hover:cursor-pointer text-gray-200 hover:text-white ">
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        <div className="flex gap-3 items-center">
            <input className="w-1/2 h-7 rounded-sm " type="text" name="seacr" id="search" />
            <button className="bg-blue-700 py-4 px-5 rounded-md h-3 flex items-center">Search</button>
        </div>
      </nav>
    </div>
  );
};

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
  };

Navbar.defaultProps = {
    title: 'Set title'
  };
export default Navbar;
