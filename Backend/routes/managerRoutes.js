import express from "express";
import {
  getAllReports,
  getReportsByFilters
} from "../controllers/managerController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Only MANAGER can access everything here
router.use(authMiddleware);
router.use(roleMiddleware(["MANAGER"]));

// Get all reports
router.get("/reports", getAllReports);

// Filtered reports
router.get("/reports/filter", getReportsByFilters);

export default router;