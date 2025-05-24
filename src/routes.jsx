import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import AppLayout from "./layouts/AppLayout";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/system-admin/Dashboard";
import SuperAdminDashboard from "./pages/super-admin/Dashboard";
import UserList from "./components/manage-users/UserList";
import SessionExpired from "./components/SessionExpired";
import Dashboard from "./pages/teacher/Dashboard";
import TeacherAppLayout from "./layouts/teacher/TeacherAppLayout";
import AssignStudents from "./pages/teacher/AssignStudents";
import AssignClassToTeacher from "./pages/system-admin/AssignClassToTeacher";

import AssignChapterLessons from "./pages/teacher/AssignLessonsChapters";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/session-expired" element={<SessionExpired />} />


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
        <Route path="manage-users" element={<UserList />} />
        <Route path="manage-assignstudents" element={<AssignClassToTeacher />} />
        
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
        {/* <Route path="assign-students" element={<AssignStudents />} />  */}
        <Route path="manage-assignstudents" element={<AssignClassToTeacher />} />
        {/* Add other nested school routes */}
      </Route>

      <Route
        path="/teacher"
        element={
          <PrivateRoute allowedRoles={["teacher"]}>
            <TeacherAppLayout />
          </PrivateRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard />} /> 
        <Route path="assign-students" element={<AssignClassToTeacher />} />
        <Route path="assign-lessons-chapters" element={<AssignChapterLessons />} />
        
        {/* Add other nested school routes */}
      </Route>

      <Route path="/unauthorized" element={<div>Access Denied</div>} />
    </Routes>
  );
};

export default AppRoutes;
