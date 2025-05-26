import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import AppLayout from "./layouts/AppLayout";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/system-admin/Dashboard";
import SuperAdminDashboard from "./pages/super-admin/Dashboard";
import UserList from "./components/manage-users/UserList";
import SessionExpired from "./components/SessionExpired";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import TeacherAppLayout from "./layouts/teacher/TeacherAppLayout";
import AssignStudents from "./pages/teacher/AssignStudents";
import AssignClassToTeacher from "./pages/system-admin/AssignClassToTeacher";

import AssignChapterLessons from "./pages/teacher/AssignLessonsChapters";
import LessonDetails from "./components/lessons/LessonDetails";

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
        <Route path="manage-assignlessons" element={<AssignChapterLessons />} />
        <Route path="lesson-details/:lessonSlug" element={<LessonDetails />} />
        
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
        <Route path="manage-assignlessons" element={<AssignChapterLessons />} />
        <Route path="lesson-details/:lessonSlug" element={<LessonDetails />} />
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
        <Route path="dashboard" element={<TeacherDashboard />} /> 
        <Route path="assign-students" element={<AssignClassToTeacher />} />
        <Route path="assign-lessons-chapters" element={<AssignChapterLessons />} />
        <Route path="lesson-details/:lessonSlug" element={<LessonDetails />} />
        
        
        {/* Add other nested school routes */}
      </Route>

      <Route path="/unauthorized" element={<div>Access Denied</div>} />
    </Routes>
  );
};

export default AppRoutes;
