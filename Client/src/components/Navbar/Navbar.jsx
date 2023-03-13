import React from "react";
import * as PATHS from "../../utils/paths";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = (props) => {
  const { user } = props;

  return (
    <nav className="nav__authLinks">
      <Link to={PATHS.HOME_PAGE} className="nav__projectName">
        plant weblog
      </Link>
      <div>
        {props.user ? (
          <>
            <Link to={PATHS.USER_PROFILE} className="authLink">
              Profile
            </Link>
            <Link to={PATHS.CREATE_POST_PAGE} className="authLink">
              Create Post
            </Link>
            <button className="nav-logoutbtn" onClick={props.handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to={PATHS.SIGNUP_PAGE} className="authLink">
              Sign Up
            </Link>
            <Link to={PATHS.LOGIN_PAGE} className="authLink">
              Log In
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
