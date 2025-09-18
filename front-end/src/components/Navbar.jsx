import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 shadow-lg border-b border-gray-200">
      <div className="flex justify-between items-center p-6 mx-auto">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-full flex items-center justify-center overflow-hidden">
            <img
              src="/image.png"
              alt="Round logo with stylized sweets in pink and orange gradient, cheerful tone"
              className="w-8 h-8 object-contain"
            />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Meethai Wala</h1>
        </div>
        {user && (
          <div className="flex items-center space-x-4">
            <span className="text-gray-800 font-medium">
              Welcome, {user.name}
            </span>
            <button
              onClick={logout}
              className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
