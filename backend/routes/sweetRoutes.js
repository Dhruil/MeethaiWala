import express from "express";
import { getAllSweets, addSweet, searchSweets, updateSweet, deleteSweet} from "../controllers/sweetController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAllSweets);
router.get("/search", searchSweets);
// Protected routes
router.post("/", authMiddleware, addSweet);
router.put("/:id", authMiddleware, updateSweet);
router.delete("/:id", authMiddleware, deleteSweet);
export default router;
