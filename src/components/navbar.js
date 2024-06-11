import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
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
        <nav className="items-center w-full h-[10vh]">
            <div className="w-full fixed shadow-md justify-center items-center h-[10vh] bg-white z-10 top-0 left-0">
                <div className="w-full flex items-center fixed justify-between py-4 md:px-10 px-7">
                    <Link to="/" className="flex-shrink-0">
                        <img className="h-14 w-auto md:px-0" src={logo} alt="logo" />
                    </Link>
                    <div
                        onClick={() => setOpen(!open)}
                        className="absolute left-8 top-6 cursor-pointer md:hidden w-7 h-7">
                        {open ? <XMarkIcon /> : <Bars3BottomLeftIcon />}
                    </div>
                    <ul
                        className={`md:flex md:items-center sm:items-center sm:justify-center md:gap-6 lg:gap-9 xl:gap-12 md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
                            open ? "top-20 px-4" : "top-[-490px]"
                        }`}>
                        {Links.map((link, index) => (
                            <li key={index} className="md:ml-8 md:my-0 my-7 font-semibold">
                                <Link
                                    to={link.link}
                                    className="text-gray-800 lg:text-xl hover:text-blue-400 hover:shrink duration-500">
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                        <div className="md:justify-center md:items-center md:space-x-6">
                            {user?.email ? (
                                <button
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={handleLogout}>
                                    יציאה
                                </button>
                            ) : (
                                <Link to="/login">
                                    <button
                                        onClick={() => setOpen(false)}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        כניסת מנהל
                                    </button>
                                </Link>
                            )}
                        </div>
                    </ul>
                </div>
            </div>
        </nav>
    );
};
