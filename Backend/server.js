import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import { authMiddleware } from "./middleware/authMiddleware.js";
import { roleMiddleware } from "./middleware/roleMiddleware.js";
import reportRoutes from "./routes/reportRoutes.js";
import managerRoutes from "./routes/managerRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API running");
});

app.get("/api/test-member", authMiddleware, (req, res) => {

  res.json({ message: "You are logged in", user: req.user });

});

app.get(

  "/api/test-manager",

  authMiddleware,

  roleMiddleware(["MANAGER"]),

  (req, res) => {

    res.json({ message: "Manager access granted" });

  }

);

// routes
app.use("/api/auth", authRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/manager", managerRoutes);
app.use("/api/projects", projectRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});