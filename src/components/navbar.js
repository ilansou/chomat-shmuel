import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import { auth } from "../config/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import "../styles/navbar.css";

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
        <nav className="navbar">
            <Link to="/" className="logo">
                <img src={logo} alt="logo" />
            </Link>
            <button className="toggle-button" onClick={toggleMenu}>
                <svg className="toggle-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
            <div className={`menu ${isOpen ? "open" : ""}`}>
                <div className="menu-items">
                    <Link to="/" className="menu-item">
                        דף בית
                    </Link>
                    <Link to="/events" className="menu-item">
                        אירועים
                    </Link>
                    <Link to="/classes" className="menu-item">
                        חוגים
                    </Link>
                    <Link to="/newsAndUpdates" className="menu-item">
                        חדשות ועדכונים
                    </Link>
                    <Link to="/contact" className="menu-item">
                        יצירת קשר
                    </Link>
                </div>
                <div>
                    {isLoggedIn ? (
                        <Link to="/">
                            <button className="logout-button" onClick={handleLogout}>
                                יציאה
                            </button>
                        </Link>
                    ) : (
                        <Link to="/login">
                            <button className="login-button">כניסת מנהל</button>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};
