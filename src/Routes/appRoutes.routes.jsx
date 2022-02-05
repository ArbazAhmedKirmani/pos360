import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import MainLayout from "../Layout";
import Login from "../Pages/Authentication/Login";
import Company from "../Pages/Setups/Company";
import Country from "../Pages/Setups/Country";
import Dashboard from "../Pages/Dashboard";
import NotFound404 from "../Pages/Errors/NotFound404";
import Variants from "../Pages/Setups/Variants";
import VariantType from "../Pages/Setups/VariantType";

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
          <Route path="country" element={<Country />} />
          <Route path="company" element={<Company />} />
          <Route path="variant" element={<Variants />} />
          <Route path="variantType" element={<VariantType />} />
        </Route>
      </Route>
      <Route path="/pos" element={<NotFound404 />} />
      <Route path="*" element={<NotFound404 />} />
    </Routes>
  );
};

export default AppRoutes;
