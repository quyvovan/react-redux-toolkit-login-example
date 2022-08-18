import React from "react";
import { Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";

const Profile = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>Profile</strong> 
        </h3>
        <nav className="navbar navbar-light p-0">
          <div className="navbar-nav">
            <li className="nav-item">
              Email: {currentUser.username}
            </li>
            <li className="nav-item">
              Password: {currentUser.password}
            </li>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Profile;
