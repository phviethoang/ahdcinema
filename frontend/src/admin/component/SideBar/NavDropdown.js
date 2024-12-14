import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const NavDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Kiểm tra nếu URL hiện tại nằm trong các đường dẫn của dropdown
  const isActive = [
    "/admin/statistics/movies",
    "/admin/statistics/members",
    "/admin/statistics/genres",
    "/admin/statistics/showtimes",
  ].includes(location.pathname);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <li className={`nav-item dropdown ${isActive ? "active" : ""}`}>
      <button
        className={`nav-link dropdown-toggle text-white ${
          isActive ? "active" : ""
        }`}
        id="statisticsDropdown"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded={isOpen}
        onClick={toggleDropdown}
      >
        Thống kê
      </button>
      <ul
        className={`dropdown-menu ${isOpen ? "show" : ""}`}
        aria-labelledby="statisticsDropdown"
      >
        <li>
          <NavLink to="/admin/MovieStatistics" className="dropdown-item">
            Tổng doanh thu và vé phim
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/MemberStatistics" className="dropdown-item">
            Thành viên tích cực
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/GenreStatistics" className="dropdown-item">
            Top lượt xem theo thể loại
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/ShowtimeStatistics" className="dropdown-item">
            Top bán chạy theo suất vé
          </NavLink>
        </li>
      </ul>
    </li>
  );
};

export default NavDropdown;
