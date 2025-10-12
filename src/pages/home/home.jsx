import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// --- A simple, hardcoded list of ingredients for the search dropdown ---
const ALL_INGREDIENTS = [
  'Chicken Breast', 'Tomato', 'Garlic', 'Olive Oil', 'Onion', 'Bell Pepper',
  'Broccoli', 'Carrot', 'Pasta', 'Rice', 'Potato', 'Cheese', 'Salt', 'Black Pepper',
  'Basil', 'Oregano', 'Salmon', 'Lemon', 'Butter', 'Flour', 'Sugar', 'Egg',
  'Cucumber', 'Spinach', 'Mushroom', 'Ginger', 'Soy Sauce', 'Honey'
];

// --- A new component to inject our custom scrollbar styles ---
const CustomScrollbarStyles = () => (
  <style>{`
    .custom-scrollbar::-webkit-scrollbar {
      width: 8px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: #f1f5f9; /* A very light gray */
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: #a3b899; /* A softer, muted green */
      border-radius: 10px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: #6A994E; /* Our primary green on hover */
    }
  `}</style>
);

// --- SVG Icons ---
const UploadIcon = () => (
  <svg className="w-8 h-8 mr-3 text-[#6A994E]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-4-4V7a4 4 0 014-4h10a4 4 0 014 4v5a4 4 0 01-4 4H7z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 16v-4m0 0l-2 2m2-2l2 2m-2-2v-4"></path></svg>
);

const SearchIcon = () => (
    <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
);

function Home() {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();
  const searchContainerRef = useRef(null);

  const filteredIngredients = ALL_INGREDIENTS.filter(
    (ingredient) =>
      ingredient.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !selectedIngredients.includes(ingredient)
  );
  
  const handleSelectIngredient = (ingredient) => {
    setSelectedIngredients([...selectedIngredients, ingredient]);
    setSearchTerm('');
    setIsDropdownVisible(false);
  };

  const handleRemoveIngredient = (ingredientToRemove) => {
    setSelectedIngredients(selectedIngredients.filter(ing => ing !== ingredientToRemove));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Searching recipes with:", { selectedIngredients, imageFile });
    navigate('/results', { state: { ingredients: selectedIngredients, imageFile } });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
        if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
            setIsDropdownVisible(false);
        }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-[#FAF8F1] min-h-screen font-sans">
      <CustomScrollbarStyles />
      
      <main className="container mx-auto px-4 py-8 md:py-16">
        {/* ... The rest of your Home component code is unchanged ... */}
        <section className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold leading-tight text-[#000000] md:text-5xl lg:text-6xl">
              Your Pantry's Potential,
              <span className="text-[#6A994E]"> Unlocked.</span>
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Don't let good food go to waste. Tell us what you have, and we'll serve you delicious recipes in seconds.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <div className="relative" ref={searchContainerRef}>
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"> <SearchIcon /> </div>
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
                        <li key={ingredient} onClick={() => handleSelectIngredient(ingredient)}
                            className="px-4 py-3 cursor-pointer text-gray-800 border-b border-gray-100 last:border-b-0 hover:bg-[#6A994E] hover:text-white transition-colors duration-150">
                          {ingredient}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-2 min-h-[40px]">
                {selectedIngredients.map((ingredient) => (
                  <div key={ingredient} className="flex items-center bg-green-100 text-[#6A994E] rounded-full pl-3 pr-2 py-1 text-sm font-semibold">
                    <span>{ingredient}</span>
                    <button type="button" onClick={() => handleRemoveIngredient(ingredient)} className="ml-2 w-4 h-4 flex items-center justify-center rounded-full bg-green-200 text-green-800 hover:bg-red-200 hover:text-white text-xs font-bold transition-colors">
                      &times;
                    </button>
                  </div>
                ))}
              </div>

              <div className="relative my-2 flex items-center">
                  <div className="flex-grow border-t border-gray-300"></div>
                  <span className="flex-shrink mx-4 text-slate-500">or</span>
                  <div className="flex-grow border-t border-gray-300"></div>
              </div>

              <label htmlFor="image-upload" className="w-full flex items-center justify-center cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-4 text-center transition hover:border-[#6A994E] hover:bg-green-50">
                  <UploadIcon />
                  <div>
                    <span className="font-semibold text-[#6A994E]">Upload a photo of your ingredients</span>
                    <p className="text-sm text-slate-500">{imageFile ? imageFile.name : 'No file chosen'}</p>
                  </div>
              </label>
              <input id="image-upload" type="file" className="sr-only" onChange={(e) => setImageFile(e.target.files[0])} />
              
              <button
                type="button"
                className="w-full rounded-lg bg-[#6A994E] px-8 py-4 text-xl font-bold text-white shadow-lg transition hover:bg-[#587f42] focus:outline-none focus:ring-2 focus:ring-[#6A994E] focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-400"
                disabled={selectedIngredients.length === 0 && !imageFile}
                onClick={async () => {
                  try {
                    let formData = new FormData();
                    formData.append('ingredients', JSON.stringify(selectedIngredients));

                    if (imageFile) {
                      formData.append('image', imageFile);
                    }

                    const response = await fetch('http://127.0.0.1:5000/get_recipes', {
                      method: 'POST',
                      body: formData, // Use FormData when sending files
                    });

                    const data = await response.json();
                    console.log(data.detected_ingredients);

                    
                  } catch (error) {
                    console.error('Error:', error);
                    alert('Something went wrong!');
                  }
                }}
              >
                Find My Recipe
              </button>


            </form>
          </div>

          <div className="hidden md:block">
            <img
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1974&auto=format&fit=crop"
              alt="Fresh vegetables and ingredients on a table"
              className="h-full w-full rounded-2xl object-cover shadow-2xl"
            />
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;