import React from "react";
import { Link } from "react-router-dom";
import { FaSun, FaMoon, FaBars, FaTimes } from "react-icons/fa"; // Import FaBars for the hamburger icon
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

const Navbar = ({
  toggleTheme,
  isDarkMode,
  user,
  onLogout,
  onToggleSidebar,
  isSidebarVisible,
}) => {
  // const handleAdminClick = (e) => {
  //   if (!user) {
  //     e.preventDefault(); // Prevent navigation
  //     toast.error("You need to login as an admin to access the admin panel.", {
  //       position: "top-bottom",
  //       autoClose: 3000,
  //     });
  //   } else {
  //     // If user is logged in, redirect to the Admin page
  //     window.location.href = "/admin";
  //   }
  

  return (
    <nav
      className="navbar navbar-expand-lg fixed-top"
      style={{ backgroundColor: "#ADFF2F", height: "60px" }}
    >
      <div className="container-fluid">
        <Link
          className={`navbar-brand ${isDarkMode ? "text-dark" : "text-dark"}`}
          to="/"
          style={{ fontSize: "1.5rem" }}
        >
          Quiz App
        </Link>

        <div className="d-flex justify-content-between w-1">
          {/* Hamburger icon positioned to the right */}
          <button
            className="btn btn-outline-secondary me-2 d-lg-none" // Only show on smaller screens
            onClick={onToggleSidebar}
            aria-label="Toggle Sidebar"
            style={{ fontSize: "1.5rem" }} // Increase font size for the sidebar toggle button
          >
            {isSidebarVisible ? <FaTimes /> : <FaBars />}
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul
              className="navbar-nav me-auto mb-2 mb-lg-0 me-5"
              style={{
                justifyContent: "center",
                width: "auto",
                fontSize: "1.2rem",
              }}
            >
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    isDarkMode ? "text-dark" : "text-dark"
                  }`}
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    isDarkMode ? "text-dark" : "text-dark"
                  }`}
                  to="/quizzes"
                >
                  Quizzes
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    isDarkMode ? "text-dark" : "text-dark"
                  }`}
                  to="/admin"
                
                >
                  Admin
                </Link>
              </li>
            </ul>
            <div className="navbar-actions d-flex">
              {user ? (
                <button
                  className="btn btn-outline-danger me-2"
                  onClick={onLogout}
                  style={{ fontSize: "1rem" }}
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="btn btn-outline-primary me-2"
                    style={{ fontSize: "1rem" }}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="btn btn-outline-secondary me-2"
                    style={{ fontSize: "1rem" }}
                  >
                    Register
                  </Link>
                </>
              )}
              <button
                className="btn btn-outline-warning theme-toggle"
                onClick={toggleTheme}
                aria-label="Toggle Theme"
                style={{ fontSize: "1.2rem" }}
              >
                {isDarkMode ? <FaSun /> : <FaMoon />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
