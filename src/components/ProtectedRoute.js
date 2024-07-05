// src/components/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return children;
};