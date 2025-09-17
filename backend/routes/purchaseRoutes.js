import express from "express";
import { getUserPurchases } from "../controllers/purchaseController.js";

const router = express.Router();

router.get("/", getUserPurchases);

export default router;
