import React, { lazy, Suspense } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

const MainLayout = lazy(() => import("../Layout"));
const Login = lazy(() => import("../Pages/Authentication/Login"));
const Company = lazy(() => import("../Pages/Setups/Company"));
const Country = lazy(() => import("../Pages/Setups/Company"));
const Dashboard = lazy(() => import("../Pages/Dashboard"));
const NotFound404 = lazy(() => import("../Pages/Errors/NotFound404"));
const Variants = lazy(() => import("../Pages/Setups/Variants"));
const VariantType = lazy(() => import("../Pages/Setups/VariantType"));
const Category = lazy(() => import("../Pages/Setups/Category"));
const Department = lazy(() => import("../Pages/Setups/Department"));
const Area = lazy(() => import("../Pages/Setups/Area"));
const OrderType = lazy(() => import("../Pages/Setups/OrderType"));
const OrderGroup = lazy(() => import("../Pages/Setups/OrderGroup"));

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
    <Suspense fallback="Loading. Please wait... ">
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
            <Route path="Area" element={<Area />} />
            <Route path="OrderType" element={<OrderType />} />
            <Route path="OrderGroup" element={<OrderGroup />} />
            <Route path="Department" element={<Department />} />
            <Route path="Category" element={<Category />} />
            <Route path="variant" element={<Variants />} />
            <Route path="variantType" element={<VariantType />} />
          </Route>
        </Route>
        <Route path="/pos" element={<NotFound404 />} />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
