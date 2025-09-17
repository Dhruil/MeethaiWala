import db from "../utils/db.js";

export const getUserPurchases = async (req, res) => {
  try {
    const { userId } = req.params;
    const [rows] = await db.query(
      `SELECT p.id, s.name AS sweet_name, p.quantity, p.total_price, p.created_at
       FROM purchases p
       JOIN sweets s ON p.sweet_id = s.id
       WHERE p.user_id = ?`,
      [userId]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
