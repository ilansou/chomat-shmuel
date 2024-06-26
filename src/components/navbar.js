import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import homeImage from "../images/home.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { AiOutlineMenuUnfold, AiOutlineClose } from "react-icons/ai";

export const Navbar = () => {
  const Links = [
    { name: "דף בית", link: "/" },
    { name: "אירועים", link: "/events" },
    { name: "חוגים", link: "/classes" },
    { name: "חדשות ועדכונים", link: "/newsAndUpdates" },
    { name: "יצירת קשר", link: "/contact" },
  ];

  const { user, logOut } = useAuth();
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();

  const handleChangeMenu = () => {
    setMenu(!menu);
  };

  const handleCloseMenu = () => {
    setMenu(false);
  };

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
      <div
        style={{
          backgroundImage: `url(${homeImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}>
        <div className="flex items-center justify-between p-5 lg:px-32 px-5 bg-black/50">
          <div className="flex flex-row items-center cursor-pointer gap-2">
            <Link to="/" className="pr-0 flex-shrink-0">
              <img className="h-16 w-auto" src={logo} alt="logo" />
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-9 lg:gap-[40px] text-xl font-medium">
            {Links.map((link, index) => (
              <Link
                key={index}
                to={link.link}
                spy={true}
                smooth={true}
                duration={500}
                className="group relative inline-block cursor-pointer text-white hover:text-gray-200">
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:block">
            {user?.email ? (
              <button
                onClick={handleLogout}
                className="bg-purple-400 hover:bg-red-700 text-white text-xl font-medium py-2 px-4 rounded transition duration-300">
                יציאה
              </button>
            ) : (
              <Link to="/login">
                <button className="bg-purple-400 hover:bg-blue-700 text-white text-xl font-medium py-2 px-4 rounded-xl transition-all duration-300">
                  כניסת מנהל
                </button>
              </Link>
            )}
          </div>

          {/* Menu */}
          <div className="md:hidden flex items-center">
            {menu ? (
              <AiOutlineClose size={25} onClick={handleChangeMenu} className="text-white" />
            ) : (
              <AiOutlineMenuUnfold size={25} onClick={handleChangeMenu} className="text-white" />
            )}
          </div>
        </div>

        <div
          className={`${
            menu ? "translate-x-0" : "-translate-x-full"
          } lg:hidden flex flex-col absolute text-white left-0 top-16 font-semibold text-2xl text-center pt-8 pb-4 gap-8 w-full h-fit transition-transform duration-300`}
          style={{
            backgroundImage: `url(${homeImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}>
          <div className="bg-black/50 absolute inset-0"></div>
          {Links.map((link, index) => (
            <Link
              key={index}
              to={link.link}
              spy={true}
              smooth={true}
              duration={500}
              className="transition-all cursor-pointer text-white hover:text-gray-200 relative z-10"
              onClick={handleCloseMenu}>
              {link.name}
            </Link>
          ))}
          <div className="relative z-10">
            {user?.email ? (
              <button
                onClick={() => {
                  handleLogout();
                  handleCloseMenu();
                }}
                className="bg-purple-400 hover:bg-red-700 text-white text-xl font-medium py-2 px-4 rounded transition duration-300">
                יציאה
              </button>
            ) : (
              <Link to="/login" onClick={handleCloseMenu}>
                <button className="bg-purple-400 hover:bg-blue-700 text-white text-xl font-medium py-2 px-4 rounded-xl transition-all duration-300">
                  כניסת מנהל
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
