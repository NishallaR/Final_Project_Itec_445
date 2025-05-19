import express from "express";
import Article from "../models/Article.js";

const router = express.Router();

// GET all articles
router.get("/", async (req, res) => {
  try {
    const articles = await Article.find({});
    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a specific article by name
router.get("/:name", async (req, res) => {
  try {
    const article = await Article.findOne({ name: req.params.name });
    if (!article) return res.status(404).json({ message: "Article not found" });
    res.json(article);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new article
router.post("/", async (req, res) => {
  const { name, title, content } = req.body;

  if (!name || !title || !content) {
    return res.status(400).json({ message: "Missing fields" });
  }

  try {
    const newArticle = new Article({
      name,
      title,
      content: Array.isArray(content) ? content : [content],
      upvotes: 0,
      comments: [],
    });

    const saved = await newArticle.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Error saving article:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT to upvote an article
router.put("/:name/upvotes", async (req, res) => {
  try {
    const article = await Article.findOneAndUpdate(
      { name: req.params.name },
      { $inc: { upvotes: 1 } },
      { new: true }
    );
    if (!article) return res.status(404).json({ message: "Article not found" });
    res.json(article);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
