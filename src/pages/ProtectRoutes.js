import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


export function ProtectedRoute({ children }) {
    if (localStorage.getItem("auth")) {
      return children;
    } else {
      return <Navigate to="/login" />;
    }
  }