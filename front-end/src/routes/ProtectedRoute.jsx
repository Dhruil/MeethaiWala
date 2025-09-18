import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, role }) => {
  const { user, token } = useAuth();

  if (!token) return <Navigate to="/login" />;
  if (role && user && user.role !== role) return <Navigate to="/login" />;

  return children;
};

export default ProtectedRoute;
