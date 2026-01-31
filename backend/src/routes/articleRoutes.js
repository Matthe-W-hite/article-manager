import express from "express";
import {
    createArticle,
    getArticles,
    getArticleById,
    updateArticle,
    deleteArticle,
} from "../controllers/articleController.js";

import { auth } from "../middleware/authMiddleware.js";
import { requireAdmin } from "../middleware/roleMiddleware.js";

const router = express.Router();

//PUBLICZNE - każdy może czytać artykuły
router.get("/", getArticles);
router.get("/:id", getArticleById);

//PRYWATNE - tylko zalogowani mogą tworzyć i edytować
router.post("/", auth, createArticle);
router.put("/:id", auth, updateArticle);

// ADMIN / AUTOR - mogą usuwać
router.delete("/:id", auth, deleteArticle);

export default router;