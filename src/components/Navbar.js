import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo2.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { AiOutlineMenuUnfold, AiOutlineClose } from "react-icons/ai";
import {
  faSignInAlt,
  faSignOutAlt,
  faSun,
  faMoon,
  faCloud,
  faCloudRain,
  faSnowflake,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Navbar = () => {
  const Links = [
    { name: "אירועים", link: "/events", hoverColor: "hover:text-purple-400" },
    { name: "חוגים", link: "/classes", hoverColor: "hover:text-purple-500" },
    {
      name: "חדשות ועדכונים",
      link: "/newsAndUpdates",
      hoverColor: "hover:text-blue-400",
    },
    {
      name: "קצת עלינו",
      link: "/aboutus",
      hoverColor: "hover:text-yellow-500",
    },
    {
      name: "יצירת קשר",
      link: "/contact",
      hoverColor: "hover:text-orange-500",
    },
  ];

  const { user, logOut } = useAuth();
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const fetchWeather = async () => {
      const city = "Jerusalem";
      const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        setWeather(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  const getWeatherIcon = () => {
    if (!weather) return faCloud;

    const weatherId = weather?.weather[0].id;
    const isNight =
      weather.dt > weather.sys.sunset || weather.dt < weather.sys.sunrise;

    if (weatherId >= 200 && weatherId < 600) return faCloudRain;
    if (weatherId >= 600 && weatherId < 700) return faSnowflake;
    if (weatherId >= 800) return isNight ? faMoon : faSun;

    return faCloud;
  };

  return (
    <div className="fixed w-full top-0 right-0 z-10 font-heebo">
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-1 sm:px-6 lg:px-8 relative">
          <div className="flex items-center justify-end h-20">
            <div className="absolute top-0 right-0 mt-2">
              <Link
                to="/"
                onClick={handleCloseMenu}
                className="flex items-center"
              >
                <img
                  className="h-16 w-auto"
                  src={logo}
                  alt="logo"
                  style={{ margin: 0 }}
                />
              </Link>
            </div>

            <div className="hidden md:flex items-center justify-center flex-grow mr-[7em]">
              <div className="flex items-baseline">
                {Links.map((link, index) => (
                  <Link
                    key={index}
                    to={link.link}
                    className={`text-blue-800 ${link.hoverColor} pr-6 py-2 rounded-md text-xl font-bold transition duration-300 ease-in-out`}
                  >
                    {link.name}
                  </Link>
                ))}
                {user && (
                  <Link
                    to="/dashboard"
                    className="text-blue-800 hover:text-pink-400 pr-6 py-2 rounded-md text-xl font-bold transition duration-300 ease-in-out"
                  >
                    סטטיסטיקות
                  </Link>
                )}
              </div>
            </div>

            <div className="hidden lg:flex items-center">
              {!loading && (
                <div className="mx-4 text-xl text-blue-800">
                  {weather ? (
                    <>
                      <FontAwesomeIcon
                        icon={getWeatherIcon()}
                        className="mr-2 ml-1"
                      />
                      {`${weather.main.temp.toFixed(1)}°C`}
                    </>
                  ) : (
                    "אין מידע על מזג האוויר"
                  )}
                </div>
              )}
              {user ? (
                <button
                  onClick={handleLogout}
                  className="text-blue-800 hover:text-gray-800 text-lg font-medium py-1.5 px-4 transition duration-300 ease-in-out"
                >
                  <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                  התנתק
                </button>
              ) : (
                <Link to="/login">
                  <button className="text-blue-800 hover:text-gray-800 text-lg font-medium py-1.5 px-4 transition duration-300 ease-in-out">
                    <FontAwesomeIcon icon={faSignInAlt} className="mr-2 ml-8" />
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

        {/* Mobile menu */}
        <div className={`lg:hidden ${menu ? "block" : "hidden"} bg-white`}>
          <div className="px-2 pt-2 pb-3 sm:px-3">
            {Links.map((link, index) => (
              <Fragment key={index}>
                <Link
                  to={link.link}
                  className={`text-blue-600 ${link.hoverColor} block px-3 py-2 rounded-md my-2 text-xl font-bold text-center`}
                  onClick={handleCloseMenu}
                >
                  {link.name}
                </Link>
              </Fragment>
            ))}
            {user && (
              <>
                <Link
                  to="/dashboard"
                  className="text-blue-600 hover:text-pink-400 my-2 block px-3 py-2 rounded-md text-xl font-bold text-center"
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
                  className="w-full text-gray-600 hover:text-gray-800 text-lg font-medium py-1.5 pr-6 transition duration-300 ease-in-out"
                >
                  <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                  התנתק
                </button>
              ) : (
                <Link to="/login" onClick={handleCloseMenu} className="w-full">
                  <button className="w-full text-gray-600 hover:text-gray-800 text-lg font-medium py-1.5 pr-6 transition duration-300 ease-in-out">
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
