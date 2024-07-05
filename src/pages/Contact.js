import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faFax, faEnvelope, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;

    try {
      await emailjs.send(serviceId, templateId, formData);
      setSubmitMessage("הודעה נשלחה בהצלחה!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error sending email:", error);
      setSubmitMessage("אירעה שגיאה בשליחת ההודעה. נסה שוב מאוחר יותר.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-24 bg-gray-100 min-h-screen">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">צרו עמנו קשר</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Map Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">המיקום שלנו</h2>
            <div className="w-full h-[80%]">
              <iframe
                className="w-full h-full rounded-md"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3393.7177046176353!2d35.217681576311456!3d31.72360547412151!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x150327f754c2070f%3A0x448a43583223c9f5!2sSha&#39;ul%20Avigur%20St%207%2C%20Jerusalem!5e0!3m2!1sen!2sil!4v1719265800431!5m2!1sen!2sil"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                allowFullScreen=""
                aria-hidden="false"
                tabIndex="0"
                title="Map"></iframe>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">שלחו לנו הודעה</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  שם מלא
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="הכנס את שמך המלא"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  כתובת דואר אלקטרוני
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="הכנס את כתובת הדואר האלקטרוני שלך"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  הודעה
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="הכנס את ההודעה שלך"
                  required></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 disabled:opacity-50">
                {isSubmitting ? "שולח..." : "שלח"}
              </button>

              {submitMessage && (
                <p
                  className={`text-center ${
                    submitMessage.includes("שגיאה") ? "text-red-500" : "text-green-500"
                  }`}>
                  {submitMessage}
                </p>
              )}
            </form>
          </div>

          {/* Contact Info Section */}
          <div className="bg-white rounded-lg shadow-md p-6 md:col-span-2">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">פרטי התקשרות</h2>
            <ul className="space-y-4">
              {[
                { icon: faPhone, text: "02-6453891", href: "tel:02-6453891" },
                { icon: faFax, text: "02-329804", href: "fax:02-329804" },
                {
                  icon: faEnvelope,
                  text: "homat-shmuel@matnasim.co.il",
                  href: "mailto:homat-shmuel@matnasim.co.il",
                },
                {
                  icon: faMapMarkerAlt,
                  text: "רח' שאול אביגור 7, שכונת חומת שמואל, ירושלים",
                  href: "https://www.google.com/maps/place/Sha'ul+Avigur+St+7,+Jerusalem/@31.7236055,35.2176816,17z/data=!3m1!4b1!4m6!3m5!1s0x150327f754c2070f:0x448a43583223c9f5!8m2!3d31.7236055!4d35.2202565!16s%2Fg%2F11h_fs8sv6?hl=en&entry=ttu",
                },
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <FontAwesomeIcon icon={item.icon} className="text-blue-500 w-5 h-5 mr-3" />
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-500 transition duration-300">
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};
