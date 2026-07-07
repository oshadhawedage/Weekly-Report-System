import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useAuth();

  // Not logged in
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Wrong role
  if (!allowedRoles.includes(user.role)) {
    if (user.role === "MANAGER") {
      return <Navigate to="/manager/dashboard" replace />;
    }

    return <Navigate to="/member/dashboard" replace />;
  }

  return children;
}

export default ProtectedRoute;