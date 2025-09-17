import express from "express";
import { getOwners } from "../controllers/ownerController.js";

const router = express.Router();

router.get("/", getOwners);

export default router;
