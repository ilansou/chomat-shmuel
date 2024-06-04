import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import { auth } from "../config/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        });
        return () => unsubscribe();
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        signOut(auth);
        setIsLoggedIn(false);
    };

    return (
        <nav className="bg-white shadow-sm flex flex-wrap items-center justify-evenly px-4 py-2">
            <Link to="/" className="mr-4">
                <img src={logo} alt="logo" className="h-13 w-auto" />
            </Link>
            <button className="block md:hidden focus:outline-none justify-end" onClick={toggleMenu}>
                <svg
                    className="h-6 w-6 fill-current"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    {isOpen ? (
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                        />
                    ) : (
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                        />
                    )}
                </svg>
            </button>
            <div
                className={`${
                    isOpen ? "block" : "hidden"
                } w-full md:flex md:items-center md:w-auto md:flex-grow md:mr-8`}>
                <div className="text-sm md:flex-grow md:flex md:justify-evenly">
                    <Link
                        to="/"
                        className="block mt-4 md:inline-block md:mt-0 md:mr-8 hover:scale-150">
                        דף בית
                    </Link>
                    <Link
                        to="/events"
                        className="block mt-4 md:inline-block md:mt-0 md:mr-8 hover:scale-150">
                        אירועים
                    </Link>
                    <Link to="/classes" className="block mt-4 md:inline-block md:mt-0 md:mr-8">
                        חוגים
                    </Link>
                    <Link
                        to="/newsAndUpdates"
                        className="block mt-4 md:inline-block md:mt-0 md:mr-8">
                        חדשות ועדכונים
                    </Link>
                    <Link to="/contact" className="block mt-4 md:inline-block md:mt-0 md:mr-8">
                        יצירת קשר
                    </Link>
                </div>
                <div>
                    {isLoggedIn ? (
                        <Link to="/">
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-8">
                                יציאה
                            </button>
                        </Link>
                    ) : (
                        <Link to="/login">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-8">
                                כניסת מנהל
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};
