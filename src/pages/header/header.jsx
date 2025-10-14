import React, { useState } from 'react';

export default function Header({ onSignUpClick }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const NavLink = ({ href, children, isActive = false }) => (
    <a
      href={href}
      className={`group relative font-semibold transition ${
        isActive ? 'text-[#6A994E]' : 'text-gray-800 hover:text-[#6A994E]'
      }`}
    >
      {children}
      <span
        className={`absolute bottom-0 left-0 h-0.5 bg-[#6A994E] transition-all duration-300 ${
          isActive ? 'w-full' : 'w-0 group-hover:w-full'
        }`}
      ></span>
    </a>
  );

  return (
    <nav className="sticky top-0 z-20 bg-white/80 backdrop-blur-sm shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <a href="#" className="flex items-center gap-2">
            <svg
              className="w-8 h-8 text-[#6A994E]"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C12.3659 4 12.7248 4.02431 13.0763 4.07181C13.4323 4.12001 13.7821 4.1926 14.1226 4.28829C14.392 4.36697 14.6323 4.47524 14.8087 4.69588C14.9851 4.91652 15.0683 5.21043 15.0343 5.50133C14.9396 6.27983 14.6318 7.37533 15.2009 8.232C15.9389 9.32833 17.5147 9.82467 18.5714 9.948C18.8413 9.97933 19.1102 9.89733 19.3193 9.721C19.5285 9.54467 19.66 9.291 19.683 9.011C19.8837 6.94167 20 4.24633 20 4C19.2273 5.524 18.2727 6.564 17.1364 7.12C15.4545 8.008 14 7.66 14 6C14 4.5 16.5 2 20 4Z"
                stroke="#6A994E"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-2xl font-bold text-[#000000]">RecipeFinder</span>
          </a>

          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="#" isActive={true}>
              Home
            </NavLink>
            <NavLink href="#">Browse</NavLink>
            <NavLink href="#">About</NavLink>
            <button
              onClick={onSignUpClick}
              className="rounded-lg bg-[#6A994E] px-5 py-2 text-lg font-bold text-white shadow-md transition hover:bg-[#587f42]"
            >
              Sign Up
            </button>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden h-8 w-8 flex flex-col justify-center items-center space-y-1.5 z-30"
          >
            <span
              className={`block w-6 h-0.5 bg-[#000000] transition-transform duration-300 ease-in-out ${
                isMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-[#000000] transition-opacity duration-300 ease-in-out ${
                isMenuOpen ? 'opacity-0' : ''
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-[#000000] transition-transform duration-300 ease-in-out ${
                isMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            ></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`absolute left-0 w-full bg-white shadow-xl md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'opacity-100 visible top-full' : 'opacity-0 invisible top-0'
        }`}
      >
        <div className="flex flex-col items-center space-y-4 p-6">
          <a href="#" className="text-lg font-semibold text-[#6A994E]">
            Home
          </a>
          <a href="#" className="text-lg font-semibold text-gray-800">
            Browse
          </a>
          <a href="#" className="text-lg font-semibold text-gray-800">
            About
          </a>
          <button
            onClick={() => {
              setIsMenuOpen(false);
              onSignUpClick();
            }}
            className="w-full text-center rounded-lg bg-[#6A994E] px-5 py-2 text-lg font-bold text-white shadow-md transition hover:bg-[#587f42]"
          >
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
}
