import React from "react";
import { NavLink } from "react-router-dom";

function TopNav() {
  return (
    <nav>
      <ul className="nav nav-pills justify-content-center">
        <li className="nav-item">
          <NavLink to="/" exact activeClassName="active" className="nav-link">
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/about" activeClassName="active" className="nav-link">
            About
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default TopNav;
