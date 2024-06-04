// Newsletter.jsx
import React from "react";

const Newsletter = () => {
    return (
        <div className="w-full py-16 text-white bg-blue-500 px-4">
            <div className="max-w-[1240px] mx-auto grid lg:grid-cols-3">
                <div className="lg:col-span-2 my-4">
                    <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold py-2">
                        הישארו מעודכנים
                    </h1>
                    <p>קבלו עדכונים שוטפים על אירועים, חוגים כל מה שחדש במנהל:</p>
                </div>
                <div className="my-4">
                    <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-4">
                        <input
                            className="p-3 flex w-full rounded-md text-black"
                            type="name"
                            placeholder="Enter Name*"
                            required
                        />
                        <input
                            className="p-3 flex w-full rounded-md text-black"
                            type="email"
                            placeholder="Enter Email*"
                            required
                        />
                        <button className="bg-[#00df9a] text-black rounded-md font-medium w-[200px] ml-4 my-6 px-6 py-3">
                            צרפו אותי 
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Newsletter;
