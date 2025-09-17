import db from "../utils/db.js";

export const getAllSweets = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM sweets");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
