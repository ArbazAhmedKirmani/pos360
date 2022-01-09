import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import MainLayout from "../Layout";
import Login from "../Pages/Authentication/Login";
import Dashboard from "../Pages/Dashboard";
import NotFound404 from "../Pages/Errors/NotFound404";
import Screen from "../Pages/PointOfSale/Screen";
import Roles from "../Pages/Setups/Roles";
import Users from "../Pages/Setups/Users";

const AppRoutes = () => {
  const location = useLocation();

  const RequireAuth = ({ children }) => {
    let storage = localStorage.getItem("posToken");
    if (storage != null) {
      return children;
    } else {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  };

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <RequireAuth>
            <MainLayout />
          </RequireAuth>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="setup">
          <Route path="users" element={<Users />} />
          <Route path="roles" element={<Roles />} />
        </Route>
      </Route>
      <Route path="/pos" element={<Screen />} />
      <Route path="*" element={<NotFound404 />} />
    </Routes>
  );
};

export default AppRoutes;
