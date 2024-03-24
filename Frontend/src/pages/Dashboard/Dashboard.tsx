import { useSelector } from "react-redux";
import AdminDashboard from "./AdminDashboard/AdminDashboard";
import SellerDashboard from "./SellerDashboard/SellerDashboard";

const Dashboard = () => {
  const userRole = useSelector((state) => state.auth.userData.role);
  return <>{userRole === "admin" ? <AdminDashboard /> : <SellerDashboard />}</>;
};

export default Dashboard;
