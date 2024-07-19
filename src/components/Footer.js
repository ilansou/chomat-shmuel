import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { FaFacebook, FaYoutube, FaWhatsapp, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoIosHelpCircleOutline } from "react-icons/io";

const socialItems = [
  { name: "Facebook", icon: FaFacebook, link: "https://www.facebook.com/harhomat" },
  { name: "Youtube", icon: FaYoutube, link: "https://www.youtube.com/channel/UCY9XtfWYjuDqrqZwQBFp4Hw" },
  { name: "WhatsApp", icon: FaWhatsapp, link: "https://wa.me/972524337664" }, 
  { name: "Instagram", icon: FaInstagram, link: "https://www.instagram.com/homat.shmuel/?igsh=NWhhdTRnNmVteDg0" },
];

const BottomLinks = [
  {
    name: "עזרה",
    icon: IoIosHelpCircleOutline,
    link: "/help",
  },
];

export const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const templateId = "template_cop0ac9";
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

    console.log(templateId);
    const templateParams = {
      from_email: email,
    };

    try {
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      setSubmitMessage("הודעה נשלחה בהצלחה!");
      setEmail("");
    } catch (error) {
      console.error("Error sending email:", error);
      setSubmitMessage("אירעה שגיאה בשליחת ההודעה. נסה שוב מאוחר יותר.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-gray-100 text-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="py-12 border-b border-gray-300">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="lg:w-0 lg:flex-1">
              <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl sm:tracking-tight">
                הישארו מעודכנים
              </h2>
              <p className="mt-3 max-w-3xl text-lg text-gray-500">
                תהיו הראשונים לדעת על אירועים, חוגים וכל מה שחדש במנהל. אל תדאגו, לא נחפור לכם יותר
                מדי :)
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
                  className="w-full px-5 py-3 border border-gray-300 shadow-sm placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:max-w-xs rounded-full"
                  placeholder="הזינו כתובת מייל שלכם"
                />
                <div className="mt-3 rounded-full mx-5 shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center py-3 px-5 border border-transparent text-base font-medium rounded-full text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    {isSubmitting ? "שולח..." : "צרפו אותי"}
                  </button>
                </div>
              </form>
              {submitMessage && (
                <p
                  className={`mt-3 text-sm ${
                    submitMessage.includes("שגיאה") ? "text-red-500" : "text-green-500"
                  }`}>
                  {submitMessage}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="py-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2">
            <p className="text-base text-gray-500">&copy; 2024</p>
            <div>
              {BottomLinks.map((link) => {
                return (
                  <Link
                    className="font-medium underline"
                    to={link.link}
                    key={link.name}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="flex mt-4 md:mt-0 space-x-6 rtl:space-x-reverse">
            {socialItems.map((item, index) => (
              <a
                key={index}
                href={item.link}
                className="text-gray-500 hover:text-gray-600 transition-colors duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
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
