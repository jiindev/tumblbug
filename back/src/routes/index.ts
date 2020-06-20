import { Router } from "express";
import AddressRouter from "./Address";

// Init router and path
const router = Router();

// Add sub-routes
router.use("/address", AddressRouter);

// Export the base-router
export default router;
