import React from "react";
import { Link } from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa"; // Importing FaSun and FaMoon for theme toggle
import "../styles/Sidebar.css"; // Import the CSS file

const Sidebar = ({ isDarkMode, isVisible, toggleTheme, user, handleLogout }) => {
  return (
    <nav
      className={`sidebar ${
        isDarkMode ? "bg-dark text-white" : "bg-light text-dark"
      }`}
      style={{
        display: isVisible ? "block" : "none", // Toggle visibility based on state
      }}
    >
      <ul>
        <li>
          <Link to="/" className="sidebar-link">
            Home
          </Link>
        </li>
        <li>
          <Link to="/quizzes" className="sidebar-link">
            Quizzes
          </Link>
        </li>
        <li>
          <Link to="/admin" className="sidebar-link">
            Admin
          </Link>
        </li>

        {/* Conditional rendering based on whether the user is logged in */}
        {user ? (
          <li>
           <Link to="/" className="sidebar-link" onClick={handleLogout}>
                Logout
              </Link>
          </li>
        ) : (
          <>
            <li>
              <Link to="/login" className="sidebar-link">
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="sidebar-link">
                Register
              </Link>
            </li>
          </>
        )}

        <li>
          <button onClick={toggleTheme} className="theme-toggle-btn">
            {isDarkMode ? <FaSun size={24} /> : <FaMoon size={24} />}
            <span className="theme-text">
              {isDarkMode ? "Light Mode" : "Dark Mode"}
            </span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
