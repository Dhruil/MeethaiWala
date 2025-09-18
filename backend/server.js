import express from "express";
import sweetRoutes from "./routes/sweetRoutes.js";
import ownerRoutes from "./routes/ownerRoutes.js";
import purchaseRoutes from "./routes/purchaseRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();


const app = express();
app.use(express.json());
app.use(cors());
// Routes
app.use("/api/sweets", sweetRoutes);
app.use("/api/owners", ownerRoutes);
app.use("/api/purchases", purchaseRoutes);
app.use("/api/auth", authRoutes);
app.get("/health", (req, res) => res.json({ status: "ok" }));
export default app;

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



