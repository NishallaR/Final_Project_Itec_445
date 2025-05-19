import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  author: String,
  text: String,
});

const articleSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  title: String,
  upvotes: { type: Number, default: 0 },
  comments: [commentSchema],
  content: [String],
});

const Article = mongoose.model("Article", articleSchema);
export default Article;

