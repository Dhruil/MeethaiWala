import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import OwnerDashboard from "./OwnerDashboard";
import UserDashboard from "./UserDashboard";

const Dashboard = () => {
  const { user, token } = useAuth();

  if (!token || !user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold text-red-600">
          Unauthorized Access 🚫
        </h2>
        <p className="text-gray-600">Please login to view the dashboard.</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
    
          {user.role === "owner" ? (
            <>
              <OwnerDashboard user={user} token={token} />
            </>
          ) : (
            <>
              <UserDashboard user={user} token={token} />
            </>
          )}
    </>
  );
};

export default Dashboard;
