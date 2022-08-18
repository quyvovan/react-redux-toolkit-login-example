import React from "react";
import { Link } from "react-router-dom";

const Home = () => {

  return (
    <nav className="navbar navbar-light bg-white">
      <div className="navbar-nav">
        <li className="nav-item">
          <Link to={"/register"} className="nav-link">
            Register
          </Link>
        </li>
        <li className="nav-item">
          <Link to={"/forgot_password"} className="nav-link">
            Forgot Password
          </Link>
        </li>
        <li className="nav-item">
          <Link to={"/login"} className="nav-link">
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link to={"/logout"} className="nav-link">
            Logout
          </Link>
        </li>
      </div>
    </nav>
  );
};

export default Home;
