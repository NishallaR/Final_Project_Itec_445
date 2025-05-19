import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import articleRouter from "./routes/articles.js";

dotenv.config();

const port = process.env.PORT || 8000;
const allowedOrigins = [process.env.CLIENT_URL];

const app = express();

app.use(express.json());
app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

app.use("/api/articles", articleRouter);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected successfully");
  } catch (err) {
    console.error("MongoDB Connection Error:", err.message);
  }
};
connectDB();

app.get("/", (req, res) => {
  res.send("Hello from the server");
});

app.listen(port, () => {
  console.log(`Final app listening on port ${port}`);
});
