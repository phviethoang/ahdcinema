import React from "react";
import { NavLink } from "react-router-dom";
import NavDropdown from "./NavDropdown";

const Sidebar = () => {
  return (
    <div
      className="d-flex flex-column vh-100 bg-dark text-white p-3"
      style={{ width: "250px" }}
    >
      <h2 className="text-center">
        <NavLink
          to="/admin"
          className={({ isActive }) =>
            `nav-link ${isActive ? "active" : "text-white"}`
          }
        >
          Admin Panel
        </NavLink>
      </h2>
      <nav>
        <ul className="nav nav-pills flex-column">
          <li className="nav-item">
            <NavLink
              to="/admin/UploadMovie"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : "text-white"}`
              }
            >
              Upload Movie
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/admin/MovieList"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : "text-white"}`
              }
            >
              Movie List
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/admin/UserList"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : "text-white"}`
              }
            >
              User List
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/admin/RevenueReport"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : "text-white"}`
              }
            >
              Revenue Report
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/admin/Dashboard"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : "text-white"}`
              }
            >
              Dashboard
            </NavLink>
          </li>
          <NavDropdown></NavDropdown>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
