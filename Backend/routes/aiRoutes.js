import express from "express";

import { chatWithAI } from "../controllers/aiController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";


const router = express.Router();


// Only managers can use AI assistant
router.post(
    "/chat",
    authMiddleware,
    roleMiddleware(["MANAGER"]),
    chatWithAI
);


export default router;