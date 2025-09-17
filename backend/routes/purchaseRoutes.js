import express from "express";
import { getUserPurchases } from "../controllers/purchaseController.js";

const router = express.Router();

router.get("/:userId", getUserPurchases);

export default router;
