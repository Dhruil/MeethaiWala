import { useEffect, useState } from "react";
import axios from "axios";
import { Plus, Edit, Trash2, ImageOff } from "lucide-react";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function OwnerDashboard({ user }) {
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingSweet, setEditingSweet] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
    description: "",
    image_url: "",
  });

  const token = localStorage.getItem("token");

  const fetchSweets = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/sweets/owner`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSweets(res.data);
    } catch (err) {
      console.error("Error fetching sweets:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Add / Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingSweet) {
        await axios.put(`${API_URL}/sweets/${editingSweet.id}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Sweet updated successfully!");
      } else {
        await axios.post(`${API_URL}/sweets`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Sweet added successfully!");
      }
      setShowForm(false);
      setEditingSweet(null);
      setFormData({
        name: "",
        category: "",
        price: "",
        quantity: "",
        description: "",
        image_url: "",
      });
      fetchSweets();
    } catch (err) {
      console.error("Error saving sweet:", err);
      alert(err.response?.data?.message || "Failed to save sweet");
    }
  };

  // Handle Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this sweet?")) return;
    try {
      await axios.delete(`${API_URL}/sweets/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchSweets();
    } catch (err) {
      console.error("Error deleting sweet:", err);
    }
  };

  // Handle Edit
  const handleEdit = (sweet) => {
    setEditingSweet(sweet);
    setFormData(sweet);
    setShowForm(true);
  };
  return (
    <div className="p-6 pt-30 min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <h1 className="text-3xl font-extrabold text-pink-700 mb-6 text-center">
        👋 Hello, {user.name} — Manage Your Shop
      </h1>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Your Sweet Inventory
        </h2>
        <button
          className="bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition flex"
          onClick={() => {
            setEditingSweet(null);
            setFormData({
              name: "",
              category: "",
              price: "",
              quantity: "",
              description: "",
              image_url: "",
            });
            setShowForm(true);
          }}
        >
          <Plus /> Add Sweet
        </button>
      </div>

      {loading ? (
        <p>Loading your sweets...</p>
      ) : sweets.length === 0 ? (
        <p className="text-gray-600 text-center mt-10 ">No sweets found. Add your first sweet!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sweets.map((sweet) => (
            <div
              key={sweet.id}
              className="bg-white rounded-2xl shadow-lg border border-violet-200 hover:shadow-2xl overflow-hidden  group p-4"
            >
              <div className="relative">
                <img
                  src={sweet.image_url || ""}
                  alt={sweet.name}
                  className="w-full h-48 object-cover rounded-lg hover:scale-105 transition-all duration-300"
                />
                <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center hidden">
                  <ImageOff className="w-8 h-8 text-gray-400" />{" "}
                </div>
                 <div className="absolute top-3 right-3 bg-indigo-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                    ₹{sweet.price}
                  </div>
              </div>
              <div className="mt-3">
                <h3 className="text-lg font-bold text-gray-800">
                  {sweet.name}
                </h3>
                <p className="text-sm text-indigo-600 font-medium">
                  Category: {sweet.category}
                </p>
                <p className="text-sm text-violet-700">
                  Stock: {sweet.quantity}
                </p>
                {sweet.description && (
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {sweet.description}
                  </p>
                )}
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg flex items-center gap-1 transition-colors"
                  onClick={() => handleEdit(sweet)}
                >
                  <Edit className="w-4 h-4" /> Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg flex items-center gap-1 transition-colors"
                  onClick={() => handleDelete(sweet.id)}
                >
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Form Modal */}
      {showForm && (
        <div className="fixed mt-15 inset-0 backdrop-blur-sm flex justify-center items-center">
          <div className="bg-white bg-opacity-80 backdrop-blur-lg rounded-lg shadow-lg p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              {editingSweet ? "Edit Sweet" : "Add Sweet"}
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <label className="flex flex-col text-sm font-medium text-gray-700">
                Name
                <input
                  type="text"
                  name="name"
                  placeholder="Sweet Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="border p-2 rounded mt-1"
                  required
                />
              </label>
              <label htmlFor="category" className="text-sm font-medium text-gray-700">Category</label>
              <input
                type="text"
                id="category"
                name="category"
                placeholder="Category"
                value={formData.category}
                onChange={handleChange}
                className="border p-2 rounded"
                required
              />
              <label htmlFor="price" className="text-sm font-medium text-gray-700">Price</label>
              <input
                type="number"
                id="price"
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleChange}
                className="border p-2 rounded"
                required
              />
              <label htmlFor="quantity" className="text-sm font-medium text-gray-700">Quantity</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                placeholder="Quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="border p-2 rounded"
                required
              />
              <label htmlFor="description" className="text-sm font-medium text-gray-700">Description</label>
              <textarea
                id="description"
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                className="border p-2 rounded"
              />
              <label htmlFor="image_url" className="text-sm font-medium text-gray-700">Image URL</label>
              <input
                type="text"
                id="image_url"
                name="image_url"
                placeholder="Image URL"
                value={formData.image_url}
                onChange={handleChange}
                className="border p-2 rounded"
              />

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
                >
                  {editingSweet ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
