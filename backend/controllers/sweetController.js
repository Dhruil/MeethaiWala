import db from "../utils/db.js";

// Get all sweets
const getAllSweets = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM sweets");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Search sweets
const searchSweets = async (req, res) => {
  try {
    const { name, category, minPrice, maxPrice } = req.query;
    let query = "SELECT * FROM sweets WHERE 1=1";
    let values = [];

    if (name) {
      query += " AND name LIKE ?";
      values.push(`%${name}%`);
    }
    if (category) {
      query += " AND category = ?";
      values.push(category);
    }
    if (minPrice) {
      query += " AND price >= ?";
      values.push(minPrice);
    }
    if (maxPrice) {
      query += " AND price <= ?";
      values.push(maxPrice);
    }

    const [rows] = await db.query(query, values);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}
export { searchSweets, getAllSweets };
