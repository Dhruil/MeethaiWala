import express from "express";
import { getAllSweets} from "../controllers/sweetController.js";

const router = express.Router();

router.get("/", getAllSweets);

export default router;
