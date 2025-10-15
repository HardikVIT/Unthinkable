import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SignUpLoginModal({ closeModal, isLoginMode, setIsLoginMode }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [user, setUser] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    setEmail("");

    try {
      const url = isLoginMode ? "http://localhost:5000/login" : "http://localhost:5000/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Something went wrong");
      } else {
        setSuccess(data.message);
        setUser(data.name);
        setTimeout(() => {
          closeModal(); // Close modal after success
        }, 1000);
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Background overlay */}
        <motion.div
          className="absolute inset-0 bg-black/40 backdrop-blur-md"
          onClick={closeModal}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        ></motion.div>

        {/* Modal card */}
        <motion.div
          className="relative z-10 w-[90%] max-w-md bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.25)] border border-green-200 p-8"
          initial={{ y: 30, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 20, opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          {/* Close button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-red-500 text-white hover:bg-white hover:text-red-500 transition-all"
            title="Close"
          >
            ✕
          </button>

          {/* Title */}
          <h2 className="text-3xl font-extrabold text-center text-black mb-6">
            {isLoginMode ? "Welcome Back 👋" : "Join RecipeHub 🍴"}
          </h2>

          {/* Success & Error messages */}
          {error && <p className="text-red-600 text-center mb-4">{error}</p>}
          {success && <p className="text-green-600 text-center mb-4">{success}</p>}

          {/* Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            {!isLoginMode && (
              <div>
                <label className="block text-sm font-medium text-black mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl p-3 bg-white/60 focus:border-[#6A994E] focus:ring-2 focus:ring-[#6A994E]/30 outline-none transition text-black"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-black mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-xl p-3 bg-white/60 focus:border-[#6A994E] focus:ring-2 focus:ring-[#6A994E]/30 outline-none transition text-black"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-xl p-3 bg-white/60 focus:border-[#6A994E] focus:ring-2 focus:ring-[#6A994E]/30 outline-none transition text-black"
                required
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-3 rounded-xl font-semibold shadow-md text-white transition-all ${
                isLoginMode
                  ? "bg-gradient-to-r from-[#6A994E] to-[#A7C957] hover:shadow-lg"
                  : "bg-gradient-to-r from-[#6A994E] to-[#A7C957] hover:shadow-lg"
              }`}
              disabled={loading}
            >
              {loading ? "Please wait..." : isLoginMode ? "Login" : "Sign Up"}
            </motion.button>
          </form>

          {/* Switch mode */}
          <p className="mt-6 text-center text-black">
            {isLoginMode ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => {
                setIsLoginMode(!isLoginMode);
                setError("");
                setSuccess("");
              }}
              className="text-[#6A994E] font-semibold hover:underline ml-1"
            >
              {isLoginMode ? "Sign Up" : "Login"}
            </button>
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
