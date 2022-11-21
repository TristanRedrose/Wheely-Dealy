import express from "express";
import authRoutes from "./auth/auth.routes";
import listingRoutes from "./listing/listing.routes";

const router = express.Router();

router.use("/auth", authRoutes);

router.use("/listings", listingRoutes);

export default router;