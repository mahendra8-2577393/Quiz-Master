import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import QuizList from "./components/QuizList";
import QuizPage from "./components/QuizPage";
import AdminPage from "./components/AdminPage";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Login from "./components/Login"; // Import Login component
import Register from "./components/Signup"; // Import Register component
import ProtectedRoute from "./utils/ProtectedRoute";
import "./App.css";

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false); // State to manage theme
  const [user, setUser] = useState(null); // State to manage user authentication
  const [isSidebarVisible, setIsSidebarVisible] = useState(false); // State to manage sidebar visibility

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode); // Toggle theme
  };

  const handleLogin = (userData) => {
    setUser(userData); // Update user state on login
    console.log("User logged in:", userData);
    localStorage.setItem("user", JSON.stringify(userData)); // Save user info in localStorage
    localStorage.setItem("token", userData.accessToken); // Save token for authentication
  };

  const handleLogout = () => {
    setUser(null); // Clear user state on logout
    localStorage.removeItem("token"); // Clear token if using local storage
    localStorage.removeItem("user"); // Optionally clear user info
  };

  const toggleSidebar = () => {
    setIsSidebarVisible((prevVisible) => !prevVisible); // Toggle sidebar visibility
  };

  return (
    <Router>
      <div className={isDarkMode ? "App dark-mode" : "App light-mode"}>
        <Navbar
          toggleTheme={toggleTheme}
          isDarkMode={isDarkMode}
          user={user} // Pass user to Navbar
          onLogout={handleLogout}
          isSidebarVisible={isSidebarVisible} // Pass handleLogout to Navbar
          onToggleSidebar={toggleSidebar} // Pass toggleSidebar to Navbar
        />
        <Sidebar
          isDarkMode={isDarkMode}
          isVisible={isSidebarVisible}
          toggleTheme={toggleTheme} 
          onClose={toggleSidebar} // Pass toggleSidebar to Sidebar
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/quizzes"
            element={
              <ProtectedRoute user={user}>
                <QuizList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/quiz/:quizId"
            element={<QuizPage user={user} setUser={setUser} />}
          />
          <Route
            path="/admin"
            element={
              user && user.isAdmin ? <AdminPage /> : <Navigate to="/login" />
            }
          />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
