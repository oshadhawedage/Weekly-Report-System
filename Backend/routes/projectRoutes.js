import express from "express";
import {
  createProject,
  getProjects,
  updateProject,
  deleteProject
} from "../controllers/projectController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";

const router = express.Router();

// protect all project routes (MANAGER only)
router.use(authMiddleware);
router.use(roleMiddleware(["MANAGER"]));

// create project
router.post("/", createProject);

// get all projects
router.get("/", getProjects);

// update project
router.put("/:id", updateProject);

// delete project
router.delete("/:id", deleteProject);

export default router;