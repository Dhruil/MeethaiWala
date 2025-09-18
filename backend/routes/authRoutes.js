import express from "express";
const router = express.Router();
import { register, login } from "../controllers/authController.js";


// Register (for both user and owner)
router.post("/register", register);

// Login (for both user and owner)

router.post("/login", login);

export default router;
