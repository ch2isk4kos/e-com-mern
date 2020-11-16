import React from "react";
import { Link } from "react-router-dom";

const UserNav = () => {
  return (
    <nav>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link to="/user/profile" className="nav-link">
            Profile
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/user/edit-password" className="nav-link">
            Edit Password
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default UserNav;
