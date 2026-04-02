import express from "express";
import { protectroute } from "../middleware/auth.middleware.js";
import { getMessages, getUsersfromSidebar, sendMessage } from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users", protectroute, getUsersfromSidebar);
router.get("/:id", protectroute, getMessages);

router.post("/send/:id", protectroute, sendMessage);

export default router;