import { verifyToken } from "../utils/jwt.js";


function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Authorization header missing" });

  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") return res.status(401).json({ message: "Invalid auth format" });

  const token = parts[1];
  try {
    const decoded = verifyToken(token);
    req.user = decoded; // contains id, role, type, name, email etc.
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

export { authMiddleware };
