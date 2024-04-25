// src/components/Navbar.tsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import toast from "react-hot-toast";
import { X, CircleUserRound } from "lucide-react";
import src from "../../assets/logo.png"

const menuLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
];

export const Navbar: React.FC = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  // const [user, setUser] = useState();

  // const handleLogout = () => {
  //   localStorage.removeItem("user-data");
  //   setIsOpen(false);
  //   toast.success("Logged out successfully");
  // };

  useEffect(() => {
    const userData = localStorage.getItem("user-data");
    const user = userData ? JSON.parse(userData) : null;
    // setUser(user);
    setAuthenticated(!!user);
  }, [isOpen]);

  return (
    <nav className="bg-red-600 flex items-center justify-start text-white py-4 px-2 lg:px-8">
      <Link to="/" className="shrink-0">
        <img src={src} alt="logo" className="h-14 lg:h-20 mr-3 lg:mr-24" />
      </Link>
      <div className="hidden lg:flex gap-4 lg:gap-6 font-semibold text-xl ml-4">
        {menuLinks.map((link) => (
          <Link
            key={link.label}
            to={link.href}
            className="hover:bg-white hover:text-red-600 "
          >
            {link.label}
          </Link>
        ))}
      </div>
      <div className="flex-grow"></div>
      <div className="hidden lg:flex gap-4 lg:gap-6 font-semibold text-xl">
        {!authenticated ? (
          <>
            <Link
              to="/signup"
              className="border-white border-2 px-3 py-1 hover:bg-white hover:text-red-600 transition-colors duration-200"
            >
              Signup
            </Link>
            <p>|</p>
            <Link
              to="/login"
              className="border-white border-2 px-3 py-1  hover:bg-white hover:text-red-600 transition-colors duration-200"
            >
              Login
            </Link>
          </>
        ) : (
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="my-2 lg:my-0 lg:mx-4 px-4 py-2 bg-transparent text-lg font-medium focus:outline-none"
          >
            <CircleUserRound className="text-3xl" />
          </button>
        )}
      </div>
      <div className={`${toggleMenu ? 'block' : 'hidden'} lg:hidden w-full`}>
        {menuLinks.map((link) => (
          <Link
            key={link.label}
            to={link.href}
            className="block py-2 px-4 text-lg text-white hover:bg-white hover:text-black"
          >
            {link.label}
          </Link>
        ))}
        {!authenticated && (
          <div className="flex justify-center">
            <Link
              to="/signup"
              className="border-white border-2 px-3 py-1 mt-4 mx-2 hover:bg-white hover:text-red-600 transition-colors duration-200"
            >
              Signup
            </Link>
            <Link
              to="/login"
              className="border-white border-2 px-3 py-1 mt-4 mx-2 hover:bg-white hover:text-red-600 transition-colors duration-200"
            >
              Login
            </Link>
          </div>
        )}
      </div>
      <button onClick={() => setToggleMenu(!toggleMenu)} className="lg:hidden">
        {toggleMenu ? (
          <X className="text-white text-3xl" />
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="white" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
          </svg>
        )}
      </button>
    </nav>
  );
};
