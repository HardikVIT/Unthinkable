import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../header/header.jsx';
import SignUpLoginModal from '../header/SignUpLoginModal.jsx';
import RecipeCard from '../../components/RecipeCard.jsx';
import RecipeCardInverse from '../../components/RecipeCard2.jsx';

const ALL_INGREDIENTS = [
  // 🌾 Grains, Pulses, Dals
  'Rice', 'Basmati Rice', 'Brown Rice', 'Wheat Flour', 'Maida', 'Semolina', 'Poha', 'Oats',
  'Moong Dal', 'Toor Dal', 'Masoor Dal', 'Urad Dal', 'Chana Dal', 'Rajma', 'Kabuli Chana',
  'Kala Chana', 'Lobia', 'Green Gram', 'Split Peas', 'Soya Chunks', 'Besan', 'Corn Flour',

  // 🧀 Dairy & Protein
  'Paneer', 'Cheese', 'Milk', 'Curd', 'Butter', 'Ghee', 'Cream', 'Yogurt', 'Buttermilk',

  // 🧄 Vegetables
  'Potato', 'Tomato', 'Onion', 'Garlic', 'Ginger', 'Carrot', 'Beetroot', 'Cabbage', 'Cauliflower',
  'Broccoli', 'Spinach', 'Methi Leaves', 'Coriander Leaves', 'Mint Leaves', 'Drumstick',
  'Bottle Gourd', 'Bitter Gourd', 'Ridge Gourd', 'Snake Gourd', 'Pumpkin', 'Ash Gourd',
  'Brinjal', 'Lady Finger', 'Capsicum', 'Bell Pepper', 'Green Chilli', 'Red Chilli',
  'Cucumber', 'Zucchini', 'Sweet Corn', 'Peas', 'Beans', 'French Beans', 'Cluster Beans',
  'Spring Onion', 'Radish', 'Turnip', 'Yam', 'Tapioca', 'Colocasia', 'Raw Banana',
  'Raw Mango', 'Coconut', 'Tender Coconut', 'Jackfruit', 'Raw Papaya',

  // 🍅 Fruits used in cooking
  'Lemon', 'Apple', 'Banana', 'Mango', 'Pineapple', 'Pomegranate', 'Orange',
  'Grapes', 'Guava', 'Watermelon', 'Muskmelon', 'Chiku', 'Papaya', 'Dates', 'Raisin',

  // 🌿 Herbs & Greens
  'Coriander', 'Parsley', 'Basil', 'Oregano', 'Thyme', 'Rosemary', 'Sage', 'Dill Leaves',
  'Celery', 'Fenugreek', 'Amaranth Leaves', 'Mustard Leaves',

  // 🍛 Indian Masalas & Spices
  'Turmeric Powder', 'Cumin Seeds', 'Coriander Powder', 'Cumin Powder', 'Red Chilli Powder',
  'Kashmiri Chilli Powder', 'Garam Masala', 'Chaat Masala', 'Sambar Powder', 'Rasam Powder',
  'Kitchen King Masala', 'Biryani Masala', 'Pav Bhaji Masala', 'Chole Masala', 'Rajma Masala',
  'Pepper', 'Black Pepper', 'White Pepper', 'Clove', 'Cardamom', 'Cinnamon', 'Bay Leaf',
  'Star Anise', 'Nutmeg', 'Mace', 'Mustard Seeds', 'Fennel Seeds', 'Fenugreek Seeds',
  'Nigella Seeds', 'Carom Seeds', 'Asafoetida', 'Kasuri Methi', 'Tamarind', 'Dry Mango Powder',
  'Rock Salt', 'Himalayan Salt', 'Sea Salt', 'Regular Salt',

  // 🧂 Condiments & Sauces
  'Vinegar', 'Soy Sauce', 'Tomato Ketchup', 'Chilli Sauce', 'Schezwan Sauce',
  'Mustard Sauce', 'Mayonnaise', 'Green Chutney', 'Tamarind Chutney', 'Mint Chutney',

  // 🍞 Miscellaneous & Baking Items
  'Bread', 'Yeast', 'Baking Soda', 'Baking Powder', 'Sugar', 'Brown Sugar', 'Honey',
  'Jaggery', 'Cocoa Powder', 'Vanilla Essence', 'Cornflakes', 'Rice Flour', 'Custard Powder',

  // 🧈 Oils & Fats
  'Olive Oil', 'Sunflower Oil', 'Mustard Oil', 'Groundnut Oil', 'Coconut Oil', 'Sesame Oil',

  // 🍋 Dry Fruits & Nuts
  'Almond', 'Cashew', 'Pistachio', 'Walnut', 'Peanut', 'Lotus Seeds', 'Poppy Seeds',

  // 🍲 Soups, Pastas, Misc
  'Pasta', 'Macaroni', 'Noodles', 'Vermicelli', 'Soup Mix', 'Stock Cube', 'Tofu', 'Seitan',

  // 🥗 Other Indian items
  'Sabudana', 'Sago', 'Flattened Rice', 'Idli Rava', 'Rice Flour', 'Tapioca Flour',
  'Coconut Milk', 'Rice Bran Oil', 'Palm Sugar', 'Jowar Flour', 'Bajra Flour', 'Ragi Flour',
  'Multigrain Flour'
];

// --- Custom Scrollbar ---
const CustomScrollbarStyles = () => (
  <style>{`
    .custom-scrollbar::-webkit-scrollbar { width: 8px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: #f1f5f9; }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: #a3b899;
      border-radius: 10px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #6A994E; }
  `}</style>
);

// --- Icons ---
const UploadIcon = () => (
  <svg className="w-8 h-8 mr-3 text-[#6A994E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-4-4V7a4 4 0 014-4h10a4 4 0 014 4v5a4 4 0 01-4 4H7z"></path>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 16v-4m0 0l-2 2m2-2l2 2m-2-2v-4"></path>
  </svg>
);

const SearchIcon = () => (
  <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
  </svg>
);

function Home() {
  const navigate = useNavigate();
  const searchContainerRef = useRef(null);

  // --- States ---
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [RecommendedRecipes, setRecommendedRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(false);

  // --- Filter ingredients ---
  const filteredIngredients = ALL_INGREDIENTS.filter(
    (ingredient) =>
      ingredient.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !selectedIngredients.includes(ingredient)
  );

  // --- Ingredient Handlers ---
  const handleSelectIngredient = (ingredient) => {
    setSelectedIngredients([...selectedIngredients, ingredient]);
    setSearchTerm('');
    setIsDropdownVisible(false);
  };

  const handleRemoveIngredient = (ingredientToRemove) => {
    setSelectedIngredients(selectedIngredients.filter((ing) => ing !== ingredientToRemove));
  };

  // --- Outside click handler ---
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setIsDropdownVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // --- Submit handler ---
  const handleFindRecipes = async () => {
    try {
      let formData = new FormData();
      formData.append('ingredients', JSON.stringify(selectedIngredients));
      if (imageFile) formData.append('image', imageFile);

      const response = await fetch('http://127.0.0.1:5000/get_recipes', { method: 'POST', body: formData });
      const data = await response.json();

      const response2 = await fetch('http://localhost:5000/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredients: data.detected_ingredients }),
      });

      const recipes = await response2.json();
      setRecommendedRecipes(recipes);
      console.log('Recommended Recipes:', recipes);
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong!');
    }
  };

  return (
    <div className="relative bg-[#FAF8F1] min-h-screen font-sans">
      <CustomScrollbarStyles />

      {/* Header with SignUp button */}
      <Header onSignUpClick={() => setShowModal(true)} />

      {/* Main content (blurs when modal is active) */}
      <div className={`${showModal ? 'blur-md pointer-events-none select-none transition duration-300 ease-in-out' : ''}`}>
        <main className="container mx-auto px-4 py-8 md:py-16">
          {/* Hero Section */}
          <section className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold leading-tight text-[#000000] md:text-5xl lg:text-6xl">
                Your Pantry's Potential,
                <span className="text-[#6A994E]"> Unlocked.</span>
              </h1>
              <p className="mt-4 text-lg text-gray-600">
                Don't let good food go to waste. Tell us what you have, and we'll serve you delicious recipes in seconds.
              </p>

              {/* Search Form */}
              <form className="mt-8 space-y-4" onSubmit={(e) => e.preventDefault()}>
                {/* Search Bar */}
                <div className="relative" ref={searchContainerRef}>
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <SearchIcon />
                  </div>
                  <input
                    type="text"
                    className="w-full rounded-lg border-2 border-gray-200 p-3 pl-10 text-[#000000] focus:border-[#6A994E] focus:ring-0"
                    placeholder="Search for ingredients..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => setIsDropdownVisible(true)}
                  />
                  {isDropdownVisible && searchTerm && filteredIngredients.length > 0 && (
                    <div className="custom-scrollbar absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg max-h-60 overflow-y-auto border border-gray-100">
                      <ul>
                        {filteredIngredients.map((ingredient) => (
                          <li
                            key={ingredient}
                            onClick={() => handleSelectIngredient(ingredient)}
                            className="px-4 py-3 cursor-pointer text-gray-800 border-b border-gray-100 last:border-b-0 hover:bg-[#6A994E] hover:text-white transition-colors duration-150"
                          >
                            {ingredient}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Selected ingredients */}
                <div className="flex flex-wrap gap-2 min-h-[40px]">
                  {selectedIngredients.map((ingredient) => (
                    <div
                      key={ingredient}
                      className="flex items-center bg-green-100 text-[#6A994E] rounded-full pl-3 pr-2 py-1 text-sm font-semibold"
                    >
                      <span>{ingredient}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveIngredient(ingredient)}
                        className="ml-2 w-4 h-4 flex items-center justify-center rounded-full bg-green-200 text-green-800 hover:bg-red-200 hover:text-white text-xs font-bold transition-colors"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>

                {/* Divider */}
                <div className="relative my-2 flex items-center">
                  <div className="flex-grow border-t border-gray-300"></div>
                  <span className="flex-shrink mx-4 text-slate-500">or</span>
                  <div className="flex-grow border-t border-gray-300"></div>
                </div>

                {/* Upload */}
                <label
                  htmlFor="image-upload"
                  className="w-full flex items-center justify-center cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-4 text-center transition hover:border-[#6A994E] hover:bg-green-50"
                >
                  <UploadIcon />
                  <div>
                    <span className="font-semibold text-[#6A994E]">Upload a photo of your ingredients</span>
                    <p className="text-sm text-slate-500">{imageFile ? imageFile.name : 'No file chosen'}</p>
                  </div>
                </label>
                <input
                  id="image-upload"
                  type="file"
                  className="sr-only"
                  onChange={(e) => setImageFile(e.target.files[0])}
                />

                {/* Button */}
                <button
                  type="button"
                  className="w-full rounded-lg bg-[#6A994E] px-8 py-4 text-xl font-bold text-white shadow-lg transition hover:bg-[#587f42] focus:outline-none focus:ring-2 focus:ring-[#6A994E] focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-400"
                  disabled={selectedIngredients.length === 0 && !imageFile}
                  onClick={handleFindRecipes}
                >
                  Find My Recipe
                </button>
              </form>
            </div>

            {/* Hero Image */}
            <div className="hidden md:block">
              <img
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1974&auto=format&fit=crop"
                alt="Fresh vegetables and ingredients on a table"
                className="h-full w-full rounded-2xl object-cover shadow-2xl"
              />
            </div>
          </section>

          {/* Recommended Recipes */}
          <section className="mt-12">
            {RecommendedRecipes.length > 0 && (
              <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Recommended Recipes</h2>
            )}
            <div className="space-y-6">
              {RecommendedRecipes.map((recipe, idx) =>
                idx % 2 === 0 ? (
                  <RecipeCard key={idx} recipeData={recipe} />
                ) : (
                  <RecipeCardInverse key={idx} recipeData={recipe} />
                )
              )}
            </div>
          </section>
        </main>
      </div>

      {/* Modal */}
      {showModal && (
        <SignUpLoginModal
          closeModal={() => setShowModal(false)}
          isLoginMode={isLoginMode}
          setIsLoginMode={setIsLoginMode}
        />
      )}
    </div>
  );
}

export default Home;
