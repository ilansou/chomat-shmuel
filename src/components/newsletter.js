import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

export const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Initialize EmailJS with your public key
    emailjs.init(process.env.REACT_APP_EMAILJS_PUBLIC_KEY);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Replace these with your actual EmailJS service ID and template ID
    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;

    const templateParams = {
      to_email: process.env.REACT_APP_TO_EMAIL,
      from_email: email,
      message: "New newsletter subscription",
    };

    emailjs.send(serviceId, templateId, templateParams).then(
      (response) => {
        console.log("SUCCESS!", response.status, response.text);
        setMessage("תודה על ההרשמה לניוזלטר שלנו!");
        setEmail("");
      },
      (error) => {
        console.log("FAILED...", error);
        setMessage("אירעה שגיאה. אנא נסו שוב מאוחר יותר.");
      }
    );
  };

  return (
    <div className="bg-gray-200 w-full text-black px-4 sm:px-8 py-6 sm:py-8">
      <div className="max-w-6xl mx-auto lg:flex lg:items-center lg:justify-between">
        <p className="newsletter-title text-xl md:text-lg font-semibold mb-4 lg:mb-0 text-center lg:text-right lg:w-2/3 lg:pr-4">
          תהיו הראשונים לדעת על אירועים, חוגים וכל מה שחדש במנהל. אל תדאגו לא נחפור לכם יותר מדי :)
        </p>

        <form
          onSubmit={handleSubmit}
          className="newsletter-form flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-end space-y-4 sm:space-y-0 sm:space-x-4 lg:w-1/3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full sm:w-auto p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="*כתובת דואר אלקטרוני"
            required
          />
          <button
            type="submit"
            className="sm:w-auto py-2 px-4 bg-purple-500 hover:bg-purple-700 text-white rounded-md font-medium transition duration-300">
            צרפו אותי
          </button>
        </form>
      </div>
      {message && <p className="text-center mt-4 text-green-600">{message}</p>}
    </div>
  );
};
