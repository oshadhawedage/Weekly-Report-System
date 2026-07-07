import express from "express";
import {
  createReport,
  getMyReports,
  getReportById,
  updateReport,
  submitReport
} from "../controllers/reportController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// create report
router.post("/", authMiddleware, createReport);

// get my reports
router.get("/my", authMiddleware, getMyReports);

// get single report
router.get("/:id", authMiddleware, getReportById);

// update report
router.put("/:id", authMiddleware, updateReport);

// submit report
router.patch("/:id/submit", authMiddleware, submitReport);

export default router;