import React from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedRoute = ({ user, isAdmin, children }) => {
  if (!user) {
    toast.error("Please log in to access this page.", {
      position: "top-right",
      autoClose: 3000,
    });
    return <Navigate to="/login" />;
  }

  if (isAdmin && user.role !== "admin") {
    toast.error("You need to be an admin to access this page.", {
      position: "top-left",
      autoClose: 2000,
    });
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
