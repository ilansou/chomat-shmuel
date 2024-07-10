import React, { useState, Fragment} from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo2.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { AiOutlineMenuUnfold, AiOutlineClose } from "react-icons/ai";
import { faSignInAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Navbar = () => {
  const Links = [
    { name: "דף בית", link: "/", color: "bg-pink-500" },
    { name: "אירועים", link: "/events", color: "bg-purple-400" },
    { name: "חוגים", link: "/classes", color: "bg-purple-500" },
    { name: "חדשות ועדכונים", link: "/newsAndUpdates", color: "bg-blue-400" },
    { name: "יצירת קשר", link: "/contact", color: "bg-blue-500" },
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
    <div className="fixed w-full top-0 right-0 z-10 font-heebo">
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-center justify-end h-20">
            <div className="absolute top-0 right-0 mt-2 mr-4">
              <Link to="/" 
              onClick={handleCloseMenu}
              className="flex items-center">
                <img className="h-16 w-auto" src={logo} alt="logo" style={{ margin: 0 }} />
              </Link>
            </div>

            <div className="hidden md:flex items-center justify-center flex-grow">
              <div className="flex items-baseline">
                {Links.map((link, index) => (
                  <Fragment key={index}>
                    <Link
                      to={link.link}
                      className={`${link.color} text-white px-4 py-2 mx-10 rounded-full text-lg font-medium transition duration-300 ease-in-out transform hover:scale-110`}
                    >
                      {link.name}
                    </Link>
                  </Fragment>
                ))}
                {user && (
                  <>
                    <Link
                      to="/dashboard"
                      className="bg-pink-400 text-white px-4 py-2 rounded-full text-lg font-medium transition duration-300 ease-in-out mx-10 transform hover:scale-110"
                    >
                      סטטיסטיקות
                    </Link>
                  </>
                )}
              </div>
            </div>

            <div className="hidden md:block ml-4">
              {user ? (
                <button
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-gray-800 text-sm font-medium py-1.5 px-4 transition duration-300 ease-in-out"
                >
                  <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                  התנתק
                </button>
              ) : (
                <Link to="/login">
                  <button className="text-gray-600 hover:text-gray-800 text-sm font-medium py-1.5 px-4 transition duration-300 ease-in-out">
                    <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
                    התחבר
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

        <div className={`md:hidden ${menu ? "block" : "hidden"}`}>
          <div className="px-2 pt-2 pb-3 sm:px-3">
            {Links.map((link, index) => (
              <React.Fragment key={index}>
                <Link
                  to={link.link}
                  className={`${link.color} text-white block px-3 py-2 rounded-full my-5 text-lg font-medium text-center`}
                  onClick={handleCloseMenu}
                >
                  {link.name}
                </Link>
              </React.Fragment>
            ))}
            {user && (
              <>
                <Link
                  to="/dashboard"
                  className="bg-pink-400 text-white my-5 block px-3 py-2 rounded-full text-lg font-medium text-center"
                  onClick={handleCloseMenu}
                >
                  סטטיסטיקות
                </Link>
              </>
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
                  className="w-full text-gray-600 hover:text-gray-800 text-base font-medium py-1.5 px-4 transition duration-300 ease-in-out"
                >
                  <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                  התנתק
                </button>
              ) : (
                <Link to="/login" onClick={handleCloseMenu} className="w-full">
                  <button className="w-full text-gray-600 hover:text-gray-800 text-base font-medium py-1.5 px-4 transition duration-300 ease-in-out">
                    <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
                    התחבר
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500"></div>
    </div>
  );
};
