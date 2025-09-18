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

// Update Sweet
async function updateSweet(req, res) {
  try {
    const { id } = req.params;
    const { name, category, price, quantity, description, image_url } = req.body;

    const [result] = await db.query(
      "UPDATE sweets SET name=?, category=?, price=?, quantity=?, description=?, image_url=? WHERE id=?",
      [name, category, price, quantity, description || "", image_url || "", id]
    );

    if (result.affectedRows === 0) return res.status(404).json({ message: "Sweet not found" });

    res.json({ message: "Sweet updated" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

// Delete Sweet (owner/admin only)
async function deleteSweet(req, res) {
  try {
    if (req.user.role !== "owner") {
      return res.status(403).json({ message: "Only owners/admins can delete sweets" });
    }

    const { id } = req.params;
    const [result] = await db.query("DELETE FROM sweets WHERE id=?", [id]);

    if (result.affectedRows === 0) return res.status(404).json({ message: "Sweet not found" });

    res.json({ message: "Sweet deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

// Add Sweet (owner/admin only)
async function addSweet(req, res) {
  try {
    if (req.user.role !== "owner") {
      return res.status(403).json({ message: "Only owners can add sweets" });
    }

    const { name, category, price, quantity, description, image_url } = req.body;
    if (!name || !category || !price || !quantity) {
      return res.status(400).json({ message: "Name, category, price, and quantity are required" });
    }

    const [result] = await db.query(
      "INSERT INTO sweets (name, category, price, quantity, description, image_url, owner_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, category, price, quantity, description || "", image_url || "", req.user.id]
    );

    return res.status(201).json({ message: "Sweet added", sweet_id: result.insertId });
  } catch (err) {
    console.error("Add Sweet error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

async function purchaseSweet(req, res) {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity <= 0) {
      return res.status(400).json({ message: "Quantity must be a positive number" });
    }

    const [sweetRows] = await db.query("SELECT * FROM sweets WHERE id=?", [id]);
    if (sweetRows.length === 0) {
      return res.status(404).json({ message: "Sweet not found" });
    }

    const sweet = sweetRows[0];
    if (sweet.quantity < quantity) {
      return res.status(400).json({ message: "Insufficient stock" });
    }

    const total_price = sweet.price * quantity;
    const query = "INSERT INTO purchases (user_id, sweet_id, quantity, unit_price, total_price) VALUES (?, ?, ?, ?, ?)";
    await db.query(query, [req.user.id, id, quantity, sweet.price, total_price]);
    const newQuantity = sweet.quantity - quantity;
    await db.query("UPDATE sweets SET quantity=? WHERE id=?", [newQuantity, id]);

    res.json({ message: "Purchase successful", sweet_id: id, quantity, total_price });
  } catch (err) {
    console.error("Purchase error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

async function restockSweet(req, res) {
  try {
    if (req.user.role !== "owner") {
      return res.status(403).json({ message: "Only owners/admins can restock sweets" });
    }
    const { id } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity <= 0) {
      return res.status(400).json({ message: "Quantity must be a positive number" });
    }
    const [sweetRows] = await db.query("SELECT * FROM sweets WHERE id=?", [id]);
    if (sweetRows.length === 0) {
      return res.status(404).json({ message: "Sweet not found" });
    }
    const sweet = sweetRows[0];
    await db.query("UPDATE sweets SET quantity=? WHERE id=?", [sweet.quantity + quantity, id]);
    res.json({ message: "Sweet restocked", sweet_id: id, new_quantity: sweet.quantity + quantity });
  } catch (err) {
    console.error("Restock error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

export { searchSweets, updateSweet, deleteSweet, addSweet, getAllSweets, purchaseSweet, restockSweet };
