// src/utils/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    alert("First you have to login to access QuizList ❤️❤️❤️");
    return <Navigate to="/login" />;
  }
  
  // If user exists, render the children components
  return children;
};

export default ProtectedRoute;
