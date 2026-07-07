import { Routes, Route } from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";
import MemberLayout from "../layouts/MemberLayout";
import ManagerLayout from "../layouts/ManagerLayout";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import MemberDashboard from "../pages/member/MemberDashboard";
import CreateReport from "../pages/member/CreateReport";
import ReportHistory from "../pages/member/ReportHistory";
import EditReport from "../pages/member/EditReport";

import ManagerDashboard from "../pages/manager/ManagerDashboard";
import Reports from "../pages/manager/Reports";
import Projects from "../pages/manager/Projects";

import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      {/* Authentication */}
      <Route element={<AuthLayout />}>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Member */}
      <Route

  path="/member"

  element={
     <ProtectedRoute allowedRoles={["MEMBER"]}>
     <MemberLayout />
    </ProtectedRoute>
   }
  >
        <Route path="dashboard" element={<MemberDashboard />} />
        <Route path="reports/new" element={<CreateReport />} />
        <Route path="reports" element={<ReportHistory />} />
        <Route path="reports/:id/edit" element={<EditReport />} />
      </Route>

      {/* Manager */}
      <Route
        path="/manager"
        element={
          <ProtectedRoute allowedRoles={["MANAGER"]}>
            <ManagerLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<ManagerDashboard />} />
        <Route path="reports" element={<Reports />} />
        <Route path="projects" element={<Projects />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;