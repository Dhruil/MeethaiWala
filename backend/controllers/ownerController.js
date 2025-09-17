import db from "../utils/db.js";

export const getOwners = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT id, owner_name, shop_name, email FROM shop_owners");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
