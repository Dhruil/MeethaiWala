import { useEffect, useState } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function OwnerDashboard({ user }) {
  const [sweets, setSweets] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/sweets`)
      .then(res => setSweets(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-pink-700 mb-4">
        Welcome, {user.name} 🍬
      </h1>

      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">Your Sweet Inventory</h2>
        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          ➕ Add Sweet
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sweets.map((sweet) => (
          <div key={sweet.id} className="border rounded-lg shadow-md p-4">
            <h3 className="text-lg font-bold">{sweet.name}</h3>
            <p>Category: {sweet.category}</p>
            <p>Price: ₹{sweet.price}</p>
            <p>Stock: {sweet.quantity}</p>
            <div className="flex gap-2 mt-2">
              <button className="bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
              <button className="bg-red-600 text-white px-3 py-1 rounded">Delete</button>
              <button className="bg-blue-600 text-white px-3 py-1 rounded">Restock</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
