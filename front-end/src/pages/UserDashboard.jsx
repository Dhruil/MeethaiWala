import { useEffect, useState } from "react";
import axios from "axios";
import { ShoppingCart } from 'lucide-react';
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
export default function UserDashboard({ user }) {
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_URL}/sweets`)
      .then((res) => setSweets(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen mt-10 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="pt-20 px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 mb-6 text-center">
            Welcome back, {user.name} 👋
          </h1>

          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8">
            Discover Our Sweet Collection
          </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {sweets.map((sweet) => (
                <div
                  key={sweet.id}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden group"
                >
                  <div className="relative">
                    <img
                      src={sweet.image_url}
                      alt={sweet.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3 bg-indigo-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      ₹{sweet.price}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {sweet.name}
                    </h3>
                    <p className="text-indigo-600 font-medium mb-2">
                      {sweet.category}
                    </p>
                    <p className="text-gray-600 mb-4">
                      Stock: {sweet.quantity} pieces
                    </p>

                    <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-3 px-4 rounded-xl hover:from-indigo-700 hover:to-purple-800 transition-all duration-300 transform hover:scale-105 font-semibold shadow-lg flex items-center justify-center gap-2">
                      Add to Cart
                      <ShoppingCart />
                    </button>
                  </div>
                </div>
              ))}
            </div>

          {!loading && sweets.length === 0 && (
            <div className="text-center py-20">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                No Sweets Available
              </h3>
              <p className="text-gray-600">
                Check back later for our delicious collection!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
