import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  ingredients: Object, // since your ingredients is an object
  Review: Object       // Review is also an object
});

const Product = mongoose.model("Product", productSchema, "products"); 
// "products" = your existing collection name in MongoDB
export default Product;
