import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SignUpLoginModal({ closeModal, isLoginMode, setIsLoginMode }) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Background blur */}
        <motion.div
          className="absolute inset-0 bg-black/40 backdrop-blur-md"
          onClick={closeModal}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        ></motion.div>

        {/* Modal card */}
        <motion.div
          className="relative z-10 w-[90%] max-w-md bg-white/70 backdrop-blur-xl rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.2)] border border-white/40 p-8"
          initial={{ y: 30, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 20, opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          {/* Close button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition"
          >
            ✕
          </button>

          {/* Title */}
          <h2 className="text-3xl font-extrabold text-center text-[#6A994E] mb-8">
            {isLoginMode ? "Welcome Back 👋" : "Join RecipeHub 🍴"}
          </h2>

          {/* Form */}
          <form className="space-y-5">
            {!isLoginMode && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full border border-gray-300 rounded-xl p-3 bg-white/60 focus:border-[#6A994E] focus:ring-2 focus:ring-[#6A994E]/30 outline-none transition"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full border border-gray-300 rounded-xl p-3 bg-white/60 focus:border-[#6A994E] focus:ring-2 focus:ring-[#6A994E]/30 outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full border border-gray-300 rounded-xl p-3 bg-white/60 focus:border-[#6A994E] focus:ring-2 focus:ring-[#6A994E]/30 outline-none transition"
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-[#6A994E] to-[#A7C957] text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all"
            >
              {isLoginMode ? "Login" : "Sign Up"}
            </motion.button>
          </form>

          {/* Switch mode */}
          <p className="mt-6 text-center text-gray-700">
            {isLoginMode ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => setIsLoginMode(!isLoginMode)}
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
