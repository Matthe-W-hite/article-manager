import express from "express";
import {
  createCategory,
  getCategories,
  deleteCategory,
  updateCategory,
} from "../controllers/categoryController.js";

import { auth } from "../middleware/authMiddleware.js";
import { requireAdmin } from "../middleware/roleMiddleware.js";

const router = express.Router();

// PUBLICZNE
router.get("/", getCategories);

// ADMIN
router.post("/", auth, requireAdmin, createCategory);
router.put("/:id", auth, requireAdmin, updateCategory);
router.delete("/:id", auth, requireAdmin, deleteCategory);

export default router;
