import express from "express";
import { getAllSweets, addSweet, searchSweets, updateSweet, deleteSweet, purchaseSweet, restockSweet} from "../controllers/sweetController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAllSweets);
router.get("/search", searchSweets);
// Protected routes
router.post("/", authMiddleware, addSweet);
router.put("/:id", authMiddleware, updateSweet);
router.delete("/:id", authMiddleware, deleteSweet);
// Inventory
router.post("/:id/purchase", authMiddleware, purchaseSweet);
router.post("/:id/restock", authMiddleware, restockSweet);
export default router;
