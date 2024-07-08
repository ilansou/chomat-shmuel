import React, { useState } from "react";
import { FaFacebook, FaYoutube, FaBookOpen, FaWhatsapp } from "react-icons/fa"; // Import the WhatsApp icon

const socialItems = [
  { name: "Facebook", icon: FaFacebook, link: "https://www.facebook.com/harhomat" },
  { name: "Youtube", icon: FaYoutube, link: "https://www.youtube.com/channel/UCY9XtfWYjuDqrqZwQBFp4Hw" },
  { name: "About Us", icon: FaBookOpen, link: "https://online.fliphtml5.com/qfboh/fyni/?1609945510152#p=1" },
  { name: "WhatsApp", icon: FaWhatsapp, link: "https://wa.me/972524337664" }, // Add the WhatsApp item
];

export const Footer = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    setMessage("תודה שנרשמת לניוזלטר שלנו!");
    setEmail("");
  };

  return (
    <footer className="bg-gray-100 text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="py-12 border-b border-gray-200">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="lg:w-0 lg:flex-1">
              <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl sm:tracking-tight">
                הישארו מעודכנים
              </h2>
              <p className="mt-3 max-w-3xl text-lg text-gray-500">
                תהיו הראשונים לדעת על אירועים, חוגים וכל מה שחדש במנהל. אל תדאגו, לא נחפור לכם יותר מדי :)
              </p>
            </div>
            <div className="mt-8 lg:mt-0 lg:ml-8">
              <form onSubmit={handleSubmit} className="sm:flex">
                <label htmlFor="email-address" className="sr-only">
                  כתובת דואר אלקטרוני
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-5 py-3 border border-gray-300 shadow-sm placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:max-w-xs rounded-md"
                  placeholder="הזינו כתובת מייל שלכם"
                />
                <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center py-3 px-5 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                    צרפו אותי
                  </button>
                </div>
              </form>
              {message && <p className="mt-3 text-sm text-green-600">{message}</p>}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="py-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-base text-gray-400">&copy; 2024 כל הזכויות שמורות</p>
          <div className="flex mt-4 md:mt-0 space-x-6 rtl:space-x-reverse">
            {socialItems.map((item, index) => (
              <a
                key={index}
                href={item.link}
                className="text-gray-400 hover:text-gray-500 transition-colors duration-300"
                target="_blank"
                rel="noopener noreferrer">
                <span className="sr-only">{item.name}</span>
                <item.icon className="h-6 w-6" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
