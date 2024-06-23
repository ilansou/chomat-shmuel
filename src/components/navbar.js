import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import homeImage from "../images/home.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Bars3BottomLeftIcon, XMarkIcon } from "@heroicons/react/24/solid";

export const Navbar = () => {
    const Links = [
        { name: "דף בית", link: "/" },
        { name: "אירועים", link: "/events" },
        { name: "חוגים", link: "/classes" },
        { name: "חדשות ועדכונים", link: "/newsAndUpdates" },
        { name: "יצירת קשר", link: "/contact" },

    ];

    const { user, logOut } = useAuth();
    const [open, setOpen] = useState(false); // Menu

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logOut();
            navigate("/");
            setOpen(false);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <nav className="items-center w-full h-[23vh]">
            <div className="w-full fixed shadow-md justify-center items-center bg-white z-10 top-0 left-0 ">
                <div className="w-full h-[25vh] relative bg-cover bg-center " style={{ backgroundImage: `url(${homeImage})`}}>
                    <Link to="/" className="flex-shrink-0">
                        <img className="float-right h-13 w-auto scale-80 md:px-2 " src={logo} alt="logo" />
                    </Link>
                    <div className="bg-black bg-opacity-40 text-white ">
                        <div
                            onClick={() => setOpen(!open)}
                            className="absolute left-8 top-6 cursor-pointer md:hidden w-7 h-7 ">
                            {open ? <XMarkIcon /> : <Bars3BottomLeftIcon />}
                        </div>
                
                        <ul
                            className={`md:flex md:items-center h-[25vh] sm:items-center sm:justify-center md:gap-3 lg:gap-27 absolute md:static text-2xl text-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-1000 ease-in  ${
                                open ? "top-20 px-4" : "top-[-490px] "
                            }`}
                        >
                            {Links.map((link, index) => (
                                <li key={index} className="md:ml-8 md:my-0 my-7 font-semibold">
                                    <Link
                                        to={link.link}
                                        className="text-gray-800 text-white text-2xl hover:text-blue-400 hover:shrink duration-500"
                                        style={{ textDecoration: "none" }} 
                                    >
                                        <span className="font-bold">{link.name}</span>
                                    </Link>
                                </li>
                            ))}
                            <div className="md:justify-center md:items-center md:space-x-6">
                                {user?.email ? (
                                    <button
                                        className="bg-purple-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                                        onClick={handleLogout}
                                    >
                                        <span className="font-bold">יציאה</span>
                                    </button>
                                ) : (
                                    <Link to="/login">
                                        <button
                                            onClick={() => setOpen(false)}
                                            className="bg-purple-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                                        >
                                            <span className="font-bold">כניסת מנהל</span>
                                        </button>
                                    </Link>
                                )}
                            </div>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};
