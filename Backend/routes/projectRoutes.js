import express from "express";
import {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
  getMembers,
  assignUsersToProject,
  getMyProjects
} from "../controllers/projectController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";

const router = express.Router();

// protect all project routes (MANAGER only)
router.use(authMiddleware);

router.get("/members", getMembers);
router.get("/my", getMyProjects);
router.get("/", getProjects);


// create project
router.post("/", roleMiddleware(["MANAGER"]),createProject);

// update project
router.put("/:id", roleMiddleware(["MANAGER"]), updateProject);

// delete project
router.delete("/:id", roleMiddleware(["MANAGER"]), deleteProject);

// assign users to project
router.post("/:id/users", roleMiddleware(["MANAGER"]), assignUsersToProject);




export default router;