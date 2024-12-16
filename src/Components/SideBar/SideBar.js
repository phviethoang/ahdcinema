import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  const [showManage, setshowManage] = useState({
    manageMovies: false,
    manageCinemas: false,
    manageShowtimes: false,
    manageVouchers: false,
    manageAccounts: false,
    manageStatistic: false,
  });

  const toggleManage = (key) => {
    setshowManage((prevState) => {
      const newState = Object.keys(prevState).reduce((acc, currKey) => {
        acc[currKey] = currKey === key ? !prevState[currKey] : false;
        return acc;
      }, {});
      return newState;
    });
  };

  return (
    <div className={styles.sidebar}>
      <h2>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? styles.activeNavLink : styles.navLink
          }
        >
          Admin Panel
        </NavLink>
      </h2>
      <nav>
        <ul className="nav nav-pills flex-column">
          {/* Quản lý phim */}
          <li className={`${styles.navItem} nav-item`}>
            <div
              className={styles.navHeader}
              onClick={() => toggleManage("manageMovies")}
            >
              Manage Movies
              <span
                className={styles.arrow}
                style={{
                  transform: showManage.manageMovies
                    ? "rotate(90deg)"
                    : "rotate(0deg)",
                }}
              >
                ▶
              </span>
            </div>
            {showManage.manageMovies && (
              <ul className={styles.subMenu}>
                <li>
                  <NavLink
                    to="/AddMovies"
                    className={({ isActive }) =>
                      isActive ? styles.activeNavLink : styles.navLink
                    }
                  >
                    Add Movies
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/MoviesList"
                    className={({ isActive }) =>
                      isActive ? styles.activeNavLink : styles.navLink
                    }
                  >
                    Movies List
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

          {/* Quản lý rạp */}
          <li className={`${styles.navItem} nav-item`}>
            <div
              className={styles.navHeader}
              onClick={() => toggleManage("manageCinemas")}
            >
              Manage Cinemas
              <span
                className={styles.arrow}
                style={{
                  transform: showManage.manageCinemas
                    ? "rotate(90deg)"
                    : "rotate(0deg)",
                }}
              >
                ▶
              </span>
            </div>
            {showManage.manageCinemas && (
              <ul className={styles.subMenu}>
                <li>
                  <NavLink
                    to="/AddCinemas"
                    className={({ isActive }) =>
                      isActive ? styles.activeNavLink : styles.navLink
                    }
                  >
                    Add Cinemas
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/CinemasList"
                    className={({ isActive }) =>
                      isActive ? styles.activeNavLink : styles.navLink
                    }
                  >
                    Cinemas List
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

          {/* Quản lý suất chiếu */}
          <li className={`${styles.navItem} nav-item`}>
            <div
              className={styles.navHeader}
              onClick={() => toggleManage("manageShowtimes")}
            >
              Manage Showtimes
              <span
                className={styles.arrow}
                style={{
                  transform: showManage.manageShowtimes
                    ? "rotate(90deg)"
                    : "rotate(0deg)",
                }}
              >
                ▶
              </span>
            </div>
            {showManage.manageShowtimes && (
              <ul className={styles.subMenu}>
                <li>
                  <NavLink
                    to="/AddShowtimes"
                    className={({ isActive }) =>
                      isActive ? styles.activeNavLink : styles.navLink
                    }
                  >
                    Add Showtimes
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/ShowtimesList"
                    className={({ isActive }) =>
                      isActive ? styles.activeNavLink : styles.navLink
                    }
                  >
                    Showtimes List
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
          {/* Quản lý Voucher */}
          <li className={`${styles.navItem} nav-item`}>
            <div
              className={styles.navHeader}
              onClick={() => toggleManage("manageVouchers")}
            >
              Manage Vouchers
              <span
                className={styles.arrow}
                style={{
                  transform: showManage.manageVoucherVouchers
                    ? "rotate(90deg)"
                    : "rotate(0deg)",
                }}
              >
                ▶
              </span>
            </div>
            {showManage.manageVouchers && (
              <ul className={styles.subMenu}>
                <li>
                  <NavLink
                    to="/AddVouchers"
                    className={({ isActive }) =>
                      isActive ? styles.activeNavLink : styles.navLink
                    }
                  >
                    Add Vouchers
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/VouchersList"
                    className={({ isActive }) =>
                      isActive ? styles.activeNavLink : styles.navLink
                    }
                  >
                    Vouchers List
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
          {/* Quản lý người dùng */}
          <li className={`${styles.navItem} nav-item`}>
            <div
              className={styles.navHeader}
              onClick={() => toggleManage("manageAccounts")}
            >
              Manage Users
              <span
                className={styles.arrow}
                style={{
                  transform: showManage.manageAccounts
                    ? "rotate(90deg)"
                    : "rotate(0deg)",
                }}
              >
                ▶
              </span>
            </div>
            {showManage.manageAccounts && (
              <ul className={styles.subMenu}>
                <li>
                  <NavLink
                    to="/AddUser"
                    className={({ isActive }) =>
                      isActive ? styles.activeNavLink : styles.navLink
                    }
                  >
                    Add Users
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/UserList"
                    className={({ isActive }) =>
                      isActive ? styles.activeNavLink : styles.navLink
                    }
                  >
                    Users List
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
          {/* Quản lý thống kê */}
          <li className={`${styles.navItem} nav-item`}>
            <div
              className={styles.navHeader}
              onClick={() => toggleManage("manageStatistic")}
            >
              Statistic
              <span
                className={styles.arrow}
                style={{
                  transform: showManage.manageStatistic
                    ? "rotate(90deg)"
                    : "rotate(0deg)",
                }}
              >
                ▶
              </span>
            </div>
            {showManage.manageStatistic && (
              <ul className={styles.subMenu}>
                <li>
                  <NavLink
                    to="/GenreStatistics"
                    className={({ isActive }) =>
                      isActive ? styles.activeNavLink : styles.navLink
                    }
                  >
                    Genre Statistics
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/MemberStatistics"
                    className={({ isActive }) =>
                      isActive ? styles.activeNavLink : styles.navLink
                    }
                  >
                    Member Statistics
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/ShowtimeStatistics"
                    className={({ isActive }) =>
                      isActive ? styles.activeNavLink : styles.navLink
                    }
                  >
                    Showtime Statistics
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/MovieStatistics"
                    className={({ isActive }) =>
                      isActive ? styles.activeNavLink : styles.navLink
                    }
                  >
                    Movie Statistics
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
