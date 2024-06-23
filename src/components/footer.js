import React from "react";


export const Footer = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        // הוספת כל הפעולות הרצויות לפעולה זו (לדוגמא: שליחת דוא"ל)
    };

    return (
        <footer className="bg-gray-200 w-full text-black px-8 py-8">
            <h3 className="newsletter-title text-xl font-semibold mb-4 text-center">
                תהיו הראשונים לדעת על אירועים, חוגים וכל מה שחדש במנהל. אל תדאגו לא נחפור לכם יותר מדי :)
            </h3>

            <form className="newsletter-form flex items-center justify-center space-x-4">
                <input type="email" className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="*כתובת דואר אלקטרוני" />
                <button type="submit" className="py-2 px-4 bg-purple-500 hover:bg-purple-700 text-white rounded-md font-medium">
                    צרפו אותי
                </button>
            </form>
        </footer>
    );
};
