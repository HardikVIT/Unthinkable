import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import Product from "./model/product.js"; // your model
import Login from "./model/log.js"; // your Mongoose model

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); // Parse JSON requests

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user exists
    const existing = await Login.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new Login({ name, email, Password: password });
    await newUser.save();

    // ✅ Return username with success
    res.json({ name: name, success: true, message: "Signup successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});



app.post("/login", async (req, res) => {
  console.log("Login request body:", req.body);
  try {
    const { email, password } = req.body;
    const user = await Login.findOne({ email });

    if (!user || user.Password !== password) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }
    console.log(user.name);
    res.json({ name:user.name,success: true, message: "Login successful" });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});


// ✅ Route to add a new product (recipe)
app.post("/addProduct", async (req, res) => {
  try {
    const data = req.body;

    // ✅ Convert single object → array, if needed
    const recipesArray = Array.isArray(data) ? data : [data];

    const result = await Product.insertMany(recipesArray);
    res.status(200).json({ message: "✅ Recipes inserted successfully!", count: result.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ Route to recommend top 3 recipes
app.post("/recommend", async (req, res) => {
  try {
    const { ingredients } = req.body;
    if (!ingredients || !Array.isArray(ingredients)) {
      return res.status(400).json({ error: "Ingredients must be an array" });
    }

    const userIngredients = new Set(ingredients.map(i => i.toLowerCase()));

    // Fetch all products
    const allProducts = await Product.find();

    const results = allProducts.map(product => {
      // Flatten ingredient object -> array
      const ingObj = product.ingredients || {};
      const recipeIngList = Object.values(ingObj).map(v => v.toLowerCase());
      const recipeIngSet = new Set(recipeIngList);

      // Find common & missing ingredients
      const common = recipeIngList.filter(i => userIngredients.has(i));
      const missing = recipeIngList.filter(i => !userIngredients.has(i));

      // Match score
      const matchScore = common.length / recipeIngList.length;

      // Calculate average rating
      const reviews = product.Review; // object
      const reviewArray = Object.values(reviews); // convert object to array

      const avgRating = reviewArray.length
        ? reviewArray.reduce((sum, r) => sum + (r.rating || 0), 0) / reviewArray.length
        : 0;



      return {
        recipe_name: product.name,
        common_ingredients: common,
        missing_ingredients: missing,
        recipe: product.Recipe || {},
        reviews: product.Review || {},
        image: product.image || "",
        match_score: Number(matchScore.toFixed(2)),
        average_rating: Number(avgRating.toFixed(1)),
      };
    });

    // Sort: highest match first, then rating
    const sorted = results.sort((a, b) => {
      if (b.match_score === a.match_score) return b.average_rating - a.average_rating;
      return b.match_score - a.match_score;
    });

    res.json(sorted.slice(0, 3)); // top 3
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
