import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = ({ userRole, status }) => {
  if (!status) return <Navigate to="/login" />;
  if (userRole !== "admin" && userRole !== "seller") return <Navigate to="/" />;
  return <Outlet />;
};

export default ProtectedRoutes;
