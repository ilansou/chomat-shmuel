import React from "react";
import homeImage from "../images/home.png";

export const Home = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">דף ראשי</h1>
            <p className="mb-8">ברוכים הבאים למנהל קהילתי חומת שמואל</p>
            <img src={homeImage} alt="Home" className="w-full h-64 object-cover mb-8" />
        </div>
    );
};
