import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import Product from "./model/product.js"; // your model

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); // Parse JSON requests

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// POST route to add a product
app.post("/addProduct", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.send("✅ Product inserted!");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
