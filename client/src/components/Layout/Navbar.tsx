// src/components/Navbar.tsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
import { X, CircleUserRound } from "lucide-react";
import src from "../../assets/logo.png";
import toast from "react-hot-toast";

const menuLinks = [
  { href: "/", label: "Home" },
];

export const Navbar: React.FC = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [userStatus, setUserStatus] = useState(false);
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = sessionStorage.getItem("token");
    const username = sessionStorage.getItem("username");
    console.log(username);

    if (userToken) {
      handleUserSignin(userToken);
    }
  }, [token]);

  const handleLogout = () => {
    sessionStorage.setItem("token", "");
    setToken("");
    toast.success("Logged out successfully");
    setTimeout(() => {
      location.reload();
    }, 1000);
  };

  const handleUserSignin = (userToken: any) => {
    setToken(userToken);
    setUserStatus(true);
  };

  return (
    <nav className="bg-red-600 flex items-center justify-start text-white py-4 px-2 lg:px-8 ">
      <Link to="/" className="shrink-0">
        <img src={src} alt="logo" className="h-12 lg:h-20 mr-3 lg:mr-24" />
      </Link>
      <div className="hidden lg:flex gap-3 lg:gap-6 font-semibold text-xl ml-4">
        {menuLinks.map((link) => (
          <Link
            key={link.label}
            to={link.href}
            className="px-4 py-2 rounded-lg hover:bg-white hover:text-red-600 "
          >
            {link.label}
          </Link>
        ))}
      </div>
      <div className="flex-grow"></div>
      <div className="hidden lg:flex gap-4 lg:gap-6 font-semibold text-xl">
        {!userStatus ? (
          <>
            <Link
              to="/signup"
              className="border-white border px-6  rounded-lg py-1 hover:bg-white hover:text-red-600 transition-colors duration-200"
            >
              Signup
            </Link>
            <p>|</p>
            <Link
              to="/login"
              className="border-white border px-6  rounded-lg py-1  hover:bg-white hover:text-red-600 transition-colors duration-200"
            >
              Login
            </Link>
          </>
        ) : (
          <button
            type="button"
            onClick={handleLogout}
            className="border-white bg-white text-red-600 rounded-lg border-2 px-6 py-1  hover:px-8 transition-all duration-200"
          >
            Log Out
          </button>
        )}
      </div>
      <div className={`${toggleMenu ? "block" : "hidden"} lg:hidden w-full`}>
        {menuLinks.map((link) => (
          <Link
            key={link.label}
            to={link.href}
            className="block py-2 px-4 text-lg text-white hover:bg-white hover:text-black"
          >
            {link.label}
          </Link>
        ))}

        <div className="flex justify-center">
          {!userStatus && (
            <>
              <Link
                to="/signup"
                className="border-white border-2 px-5 rounded-lg py-1 mt-4 mx-2 hover:bg-white hover:text-red-600 transition-colors duration-200"
              >
                Signup{" "}
              </Link>
              <Link
                to="/login"
                className="border-white border-2 px-5 rounded-lg py-1 mt-4 mx-2 hover:bg-white hover:text-red-600 transition-colors duration-200"
              >
                Login
              </Link>
            </>
          )}
          {userStatus && (
            <button
              onClick={handleLogout}
              className="border-white border-2 px-3 py-1 mt-4 mx-2 hover:bg-white hover:text-red-600 transition-colors duration-200"
            >
              Log Out
            </button>
          )}
        </div>
      </div>
      <button onClick={() => setToggleMenu(!toggleMenu)} className="lg:hidden">
        {toggleMenu ? (
          <X className="text-white text-3xl" />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.8}
            stroke="white"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
            />
          </svg>
        )}
      </button>
    </nav>
  );
};
