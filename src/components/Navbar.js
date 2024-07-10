import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo2.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { AiOutlineMenuUnfold, AiOutlineClose } from "react-icons/ai";
import { faSignInAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Navbar = () => {
  const Links = [
    { name: "דף בית", link: "/", hoverColor: "hover:text-blue-600" },
    { name: "אירועים", link: "/events", hoverColor: "hover:text-green-600" },
    { name: "חוגים", link: "/classes", hoverColor: "hover:text-purple-600" },
    { name: "חדשות ועדכונים", link: "/newsAndUpdates", hoverColor: "hover:text-red-600" },
    { name: "יצירת קשר", link: "/contact", hoverColor: "hover:text-yellow-600" },
  ];

  const { user, logOut } = useAuth();
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();

  const handleChangeMenu = () => setMenu(!menu);
  const handleCloseMenu = () => setMenu(false);

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
      setMenu(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed w-full top-0 left-0 z-10">
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex-shrink-0">
              <Link to="/" 
              onClick={handleCloseMenu}
              className="flex items-center">
                <img className="h-16 w-auto" src={logo} alt="logo" />
              </Link>
            </div>

            <div className="hidden md:flex items-center justify-center flex-grow">
              <div className="flex items-baseline space-x-6">
                {Links.map((link, index) => (
                  <Link
                    key={index}
                    to={link.link}
                    className={`text-black ${link.hoverColor} px-4 py-3 rounded-md text-lg font-medium transition duration-150 ease-in-out`}
                  >
                    {link.name}
                  </Link>
                ))}
                {user && (
                  <Link
                    to="/dashboard"
                    className="text-black hover:text-indigo-600 px-4 py-3 rounded-md text-lg font-medium transition duration-150 ease-in-out"
                  >
                    סטטיסטיקות
                  </Link>
                )}
              </div>
            </div>

            <div className="hidden md:block">
              {user ? (
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white text-base font-medium py-1.5 px-4 rounded-full transition duration-150 ease-in-out"
                >
                  <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                </button>
              ) : (
                <Link to="/login">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white text-base font-medium py-1.5 px-4 rounded-full transition duration-150 ease-in-out">
                    <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
                  </button>
                </Link>
              )}
            </div>

            <div className="md:hidden">
              <button
                onClick={handleChangeMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              >
                {menu ? (
                  <AiOutlineClose className="block h-8 w-8" />
                ) : (
                  <AiOutlineMenuUnfold className="block h-8 w-8" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden ${menu ? "block" : "hidden"}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {Links.map((link, index) => (
              <Link
                key={index}
                to={link.link}
                className={`text-black ${link.hoverColor} block px-3 py-2 rounded-md text-base font-medium`}
                onClick={handleCloseMenu}
              >
                {link.name}
              </Link>
            ))}
            {user && (
              <Link
                to="/dashboard"
                className="text-black hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium"
                onClick={handleCloseMenu}
              >
                סטטיסטיקות
              </Link>
            )}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-5">
              {user ? (
                <button
                  onClick={() => {
                    handleLogout();
                    handleCloseMenu();
                  }}
                  className="w-full bg-red-500 hover:bg-red-600 text-white text-base font-medium py-1.5 px-4 rounded-full transition duration-150 ease-in-out"
                >
                  <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                </button>
              ) : (
                <Link to="/login" onClick={handleCloseMenu} className="w-full">
                  <button className="w-full bg-blue-500 hover:bg-blue-600 text-white text-base font-medium py-1.5 px-4 rounded-full transition duration-150 ease-in-out">
                    <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
    </div>
  );
};
