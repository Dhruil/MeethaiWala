import { useEffect, useState } from "react";
import axios from "axios";
import { BadgeIndianRupee, Search, Filter, X } from "lucide-react";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function UserDashboard({ user , token}) {
  const [sweets, setSweets] = useState([]);
  const [filteredSweets, setFilteredSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [categories, setCategories] = useState([]);
  const [purchase, setPurchase] = useState(false);

  useEffect(() => {
    axios
      .get(`${API_URL}/sweets`)
      .then((res) => {
        setSweets(res.data);
        setFilteredSweets(res.data);
        // Extract unique categories
        const uniqueCategories = [
          ...new Set(res.data.map((sweet) => sweet.category)),
        ];
        setCategories(uniqueCategories);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [purchase]);

  // Filter sweets based on search, category, and price
  useEffect(() => {
    let filtered = sweets;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter((sweet) =>
        sweet.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter(
        (sweet) => sweet.category === selectedCategory
      );
    }

    // Price range filter
    if (priceRange.min !== "") {
      filtered = filtered.filter(
        (sweet) => sweet.price >= parseInt(priceRange.min)
      );
    }
    if (priceRange.max !== "") {
      filtered = filtered.filter(
        (sweet) => sweet.price <= parseInt(priceRange.max)
      );
    }

    setFilteredSweets(filtered);
  }, [sweets, searchTerm, selectedCategory, priceRange]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setPriceRange({ min: "", max: "" });
  };

  const hasActiveFilters =
    searchTerm || selectedCategory || priceRange.min || priceRange.max;

  const handlePurchase = async (sweetId) => {
    const qty = prompt("Enter quantity to purchase:");
    if (!qty || isNaN(qty) || parseInt(qty) <= 0) {
      alert("Invalid quantity!");
      return;
    }

    try {
      const res = await axios.post(
        `${API_URL}/sweets/${sweetId}/purchase`,
        { quantity: parseInt(qty) },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(`✅ ${res.data.message}\nTotal Price: ₹${res.data.total_price}`);

      // refresh sweets stock after purchase
      setPurchase(!purchase);
    } catch (err) {
      console.error("Purchase failed:", err);
      alert(err.response?.data?.message || "Purchase failed");
    }
  };

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

          {/* Search and Filter Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              {/* Search Bar */}
              <div className="relative flex-1 w-full lg:w-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search sweets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              {/* Category Filter */}
              <div className="relative w-full lg:w-48">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none bg-white"
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
              </div>

              {/* Price Range */}
              <div className="flex gap-2 w-full lg:w-auto">
                <input
                  type="number"
                  placeholder="Min ₹"
                  value={priceRange.min}
                  onChange={(e) =>
                    setPriceRange((prev) => ({ ...prev, min: e.target.value }))
                  }
                  className="w-24 px-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <input
                  type="number"
                  placeholder="Max ₹"
                  value={priceRange.max}
                  onChange={(e) =>
                    setPriceRange((prev) => ({ ...prev, max: e.target.value }))
                  }
                  className="w-24 px-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              {/* Clear Filters */}
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  <X className="h-4 w-4" />
                  Clear
                </button>
              )}
            </div>

            {/* Active Filters Display */}
            {hasActiveFilters && (
              <div className="mt-4 flex flex-wrap gap-2">
                {searchTerm && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                    Search: "{searchTerm}"
                    <button
                      onClick={() => setSearchTerm("")}
                      className="hover:bg-indigo-200 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {selectedCategory && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                    Category: {selectedCategory}
                    <button
                      onClick={() => setSelectedCategory("")}
                      className="hover:bg-purple-200 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {(priceRange.min || priceRange.max) && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    Price: ₹{priceRange.min || 0} - ₹{priceRange.max || "∞"}
                    <button
                      onClick={() => setPriceRange({ min: "", max: "" })}
                      className="hover:bg-green-200 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
              </div>
            )}
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
              <span className="ml-3 text-lg text-gray-600">
                Loading delicious sweets...
              </span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredSweets.map((sweet) => (
                <div
                  key={sweet.id}
                  className={`bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden group
                     ${
                          sweet.quantity === 0
                            ? "opacity-50 cursor-not-allowed"
                            : " hover:scale-105"
                        }`}
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

                    <button
                      className={`w-full py-3 px-4 rounded-xl font-semibold shadow-lg flex items-center justify-center gap-2 transition-all duration-300 transform bg-gradient-to-r from-indigo-600 to-purple-700 text-white hover:from-indigo-700 hover:to-purple-800
                        ${
                          sweet.quantity === 0
                            ? "opacity-50 cursor-not-allowed"
                            : " hover:scale-105"
                        }
                      `}
                      disabled={sweet.quantity === 0}
                      onClick={() => handlePurchase(sweet.id)}
                    >
                      Purchase
                      <BadgeIndianRupee />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

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
