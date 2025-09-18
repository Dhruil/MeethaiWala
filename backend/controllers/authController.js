import db from "../utils/db.js";
import { signToken } from "../utils/jwt.js";

/**
 * Register
 * Accepts JSON:
 * {
 *   role: "user" or "owner",
 *   name: "User Name"  (for user -> user_name / for owner -> owner_name),
 *   email,
 *   password,
 *   shop_name (only for owner),
 * }
 */
async function register(req, res) {
  const { role, name, email, password, shop_name } = req.body;
  if (!role || !email || !password || !name) {
    return res.status(400).json({ message: "role, name, email and password are required" });
  }

  try {
    if (role === "owner") {
      const [existing] = await db.query("SELECT id FROM shop_owners WHERE email = ?", [email]);
      if (existing.length) return res.status(409).json({ message: "Owner email already registered" });

      const [result] = await db.query(
        "INSERT INTO shop_owners (owner_name, email, password, shop_name) VALUES (?, ?, ?, ?)",
        [name, email, password, shop_name || ""]
      );
      console.log(result);
      return res.status(201).json({ message: "Owner registered", owner_id: result.insertId });
    } else {
      const [existing] = await db.query("SELECT id FROM users WHERE email = ?", [email]);
      if (existing.length) return res.status(409).json({ message: "User email already registered" });

      const [result] = await db.query(
        "INSERT INTO users (user_name, email, password) VALUES (?, ?, ?)",
        [name, email, password]
      );
      return res.status(201).json({ message: "User registered", user_id: result.insertId });
    }

  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
}

/**
 * Login
 * Accepts JSON:
 * {
 *   email,
 *   password,
 *   type:"user" or "owner"
 * }
 */
async function login(req, res) {
  const { email, password, type } = req.body;
  if (!email || !password) return res.status(400).json({ message: "email and password required" });

  try {
    // If type specified, only check that table. Else try users first, then owners.
    if (type === "user") {
      const [rows] = await db.query("SELECT id, user_name, email, password FROM users WHERE email = ?", [email]);
      if (rows.length) {
        const user = rows[0];
        if (password !== user.password) return res.status(401).json({ message: "Invalid credentials" });

        const token = signToken({ id: user.id, role: "user", name: user.user_name, email: user.email, type: "user" });
        return res.json({ token, user: { id: user.id, role: "user", name: user.user_name, email: user.email } });
      }
    } else {
      const [rows] = await db.query("SELECT id, owner_name, email, password, shop_name FROM shop_owners WHERE email = ?", [email]);
      if (rows.length) {
        const owner = rows[0];
        if (password !== owner.password) return res.status(401).json({ message: "Invalid credentials" });

        const token = signToken({ id: owner.id, role: "owner", name: owner.owner_name, email: owner.email, shop_name: owner.shop_name, type: "owner" });
        return res.json({ token, user: { id: owner.id, role: "owner", name: owner.owner_name, email: owner.email, shop_name: owner.shop_name } });
      }
    }

    return res.status(404).json({ message: ` ${type} not found` });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
}

export { register, login };
