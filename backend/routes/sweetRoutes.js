import express from "express";
import { getAllSweets, searchSweets} from "../controllers/sweetController.js";

const router = express.Router();

router.get("/", getAllSweets);
router.get("/search", searchSweets);
export default router;
