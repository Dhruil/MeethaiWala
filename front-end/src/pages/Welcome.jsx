import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
export default function Welcome() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <Navbar />

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center text-center mt-10 px-6 py-20">
        <div className="max-w-4xl">
          <h1 className="text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 mb-6 flex items-center justify-center gap-3">
            Meethai Wala
          </h1>

          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
            Welcome to{" "}
            <span className="font-semibold text-indigo-600">Meethai Wala</span>{" "}
            — your ultimate destination for authentic Indian sweets! Discover a
            delightful collection of traditional and modern sweets, manage your
            orders with ease, and explore exclusive collections. Whether you're
            a sweet-loving customer or a passionate shop owner, we've got
            everything to satisfy your cravings.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              to="/register"
              className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-700 text-white rounded-xl shadow-lg hover:from-indigo-700 hover:to-purple-800 transition transform hover:scale-105 font-semibold text-lg"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="px-8 py-4 bg-white text-indigo-600 border-2 border-indigo-600 rounded-xl shadow-lg hover:bg-indigo-50 transition transform hover:scale-105 font-semibold text-lg"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Features Preview */}
        <div className="w-full max-w-7xl mx-auto px-6 mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            Why Choose Meethai Wala?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-6">
                <span className="text-3xl">🍪</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Diverse Collection
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Explore hundreds of traditional and contemporary Indian sweets,
                from Gulab Jamun to modern fusion treats.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                <span className="text-3xl">🏪</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Shop Management
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Powerful tools for shop owners to manage inventory, orders, and
                customer relationships seamlessly.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center md:col-span-2 lg:col-span-1">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-6">
                <span className="text-3xl">🔒</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Secure & Reliable
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Advanced security with 2-step authentication ensures your data
                and transactions are always protected.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white bg-opacity-50 backdrop-blur-sm py-8 px-6 text-center">
        <p className="text-gray-600">
          © 2025 Meethai Wala. Bringing sweetness to your doorstep with love and
          tradition.
        </p>
      </footer>
    </div>
  );
}
