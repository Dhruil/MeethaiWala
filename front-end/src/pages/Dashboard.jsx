import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

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
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 pt-20">
        <div className="bg-white shadow-lg rounded-lg p-8 w-96 text-center">
          <h2 className="text-3xl font-bold text-pink-600 mb-4">
            {user.role === "owner" ? "Owner Dashboard" : "User Dashboard"}
          </h2>

          {user.role === "owner" ? (
            <>
              <p className="text-gray-700 mb-4">
                Welcome back, <span className="font-semibold">{user.name}</span>{" "}
                🎉
              </p>
            </>
          ) : (
            <>
              <p className="text-gray-700 mb-4">
                Welcome back, <span className="font-semibold">{user.name}</span>{" "}
                🎉
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
