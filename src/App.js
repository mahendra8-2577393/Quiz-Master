import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import QuizList from "./components/QuizList";
import QuizPage from "./components/QuizPage";
import AdminPage from "./components/AdminPage";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Login from "./components/Login";
import Register from "./components/Signup";
import ProtectedRoute from "./utils/ProtectedRoute"; // Ensure this path is correct
import "./App.css";

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });
  
  const [user, setUser] = useState(null);

  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("theme", newMode ? "dark" : "light");
      return newMode;
    });
  };

  useEffect(() => {
    document.body.className = isDarkMode ? "dark-mode" : "light-mode";
  }, [isDarkMode]);

  const handleLogin = (userData) => {
    setUser(userData.user);
    console.log("User logged in:", userData.user);
    localStorage.setItem("user", JSON.stringify(userData.user)); // Save user data in localStorage
    localStorage.setItem("token", userData.accessToken); // Save token if necessary
    console.log(userData.user);
    console.log(userData.accessToken);

  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const toggleSidebar = () => {
    setIsSidebarVisible((prevVisible) => !prevVisible);
  };

  return (
    <Router>
      <div className={isDarkMode ? "App dark-mode" : "App light-mode"}>
      <ToastContainer />
        <Navbar
          toggleTheme={toggleTheme}
          isDarkMode={isDarkMode}
          user={user}
          onLogout={handleLogout}
          isSidebarVisible={isSidebarVisible}
          onToggleSidebar={toggleSidebar}
        />
        <Sidebar
          isDarkMode={isDarkMode}
          isVisible={isSidebarVisible}
          toggleTheme={toggleTheme}
          user={user}
          handleLogout={handleLogout}
          onClose={toggleSidebar}
        />
        <Routes>
          <Route path="/" element={<Home user={user} />} />
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
            element={
              <ProtectedRoute user={user}>
                <QuizPage user={user} setUser={setUser} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute user={user} isAdmin={true}>
                <AdminPage />
              </ProtectedRoute>
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
