import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import AppLayout from "./layouts/AppLayout";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/system-admin/Dashboard";
import SuperAdminDashboard from "./pages/super-admin/Dashboard";
import UserList from "./components/manage-users/UserList";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/admin"
        element={
          <PrivateRoute allowedRoles={["system-admin"]}>
            <AppLayout />
          </PrivateRoute>
        }
      >
        <Route path="dashboard" element={<AdminDashboard />} />
        {/* Add other nested admin routes */}
      </Route>

      <Route
        path="/school"
        element={
          <PrivateRoute allowedRoles={["super-admin"]}>
            <AppLayout />
          </PrivateRoute>
        }
      >
        <Route path="dashboard" element={<SuperAdminDashboard />} />
        <Route path="manage-users" element={<UserList />} />
        {/* Add other nested school routes */}
      </Route>

      <Route path="/unauthorized" element={<div>Access Denied</div>} />
    </Routes>
  );
};

export default AppRoutes;
