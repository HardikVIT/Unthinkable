import mongoose from "mongoose";

const loginSchema = new mongoose.Schema({
  name: String,
  email: String,
  Password: String
});

const Login = mongoose.model("Login", loginSchema, "logins");
export default Login;
