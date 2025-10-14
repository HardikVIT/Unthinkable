import { motion } from "framer-motion";

const RecipeCardInverse = ({ recipeData }) => {
  const {
    recipe_name,
    recipe,
    reviews,
    common_ingredients,
    missing_ingredients,
    match_score,
    average_rating,
    image,
  } = recipeData;

  const reviewArray = Object.values(reviews || {});

  return (
    <motion.div
      className="rounded-2xl p-6 mb-6 flex flex-col md:flex-row gap-6 border border-gray-100"
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* --- Left Side: Image --- */}
      {image && (
        <div className="flex-shrink-0 w-full md:w-1/3">
          <img
            src={image}
            alt={recipe_name}
            className="w-full h-full object-contain rounded-2xl"
            style={{ backgroundColor: "transparent" }}
          />
        </div>
      )}

      {/* --- Right Side: Text --- */}
      <div className="flex-1">
        <h2 className="text-2xl font-bold text-[#6A994E] mb-2">{recipe_name}</h2>
        <p className="text-gray-600 mb-2">
          <span className="font-semibold">Average Rating:</span>{" "}
          {average_rating.toFixed(1)} ⭐
        </p>
        <p className="text-gray-600 mb-2">
          <span className="font-semibold">Match Score:</span>{" "}
          {(match_score * 100).toFixed(0)}%
        </p>
        <p className="text-gray-600 mb-2">
          <span className="font-semibold">Common Ingredients:</span>{" "}
          {common_ingredients.join(", ")}
        </p>
        <p className="text-gray-600 mb-4">
          <span className="font-semibold">Missing Ingredients:</span>{" "}
          {missing_ingredients.join(", ")}
        </p>

        <div className="mb-4">
          <h3 className="font-semibold text-gray-700 mb-2">Recipe Steps:</h3>
          <ol className="list-decimal list-inside space-y-1">
            {Object.values(recipe).map((step, index) => (
              <li key={index} className="text-gray-600">
                {step}
              </li>
            ))}
          </ol>
        </div>

        <div>
          <h3 className="font-semibold text-gray-700 mb-2">Reviews:</h3>
          {reviewArray.map((r, idx) => (
            <div
              key={idx}
              className="p-2 rounded-lg mb-2"
              style={{ backgroundColor: "rgba(106, 153, 78, 0.1)" }}
            >
              <p className="font-semibold text-[#6A994E]">
                Rating: {r.rating} ⭐
              </p>
              <p className="text-gray-600">{r.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default RecipeCardInverse;
