import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export const CreateEvent = ({ onClose }) => {
  const [event, setEvent] = useState({
    title: "",
    image: "",
    description: "",
    eventDate: new Date().toISOString().substring(0, 10),
    participant: 0,
    audienceAge: "",
    location: "",
    price: 0,
    expireDate: new Date(new Date().setMonth(new Date().getMonth() + 1))
      .toISOString()
      .substring(0, 10),
    eventDuration: 0,
    URL: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const eventsCollectionRef = collection(db, "events");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEvent({ ...event, [name]: value });
  };

  const createEvent = async (e) => {
    e.preventDefault();
    if (!event.title) {
      setError("כותרת נדרשת");
      return;
    }
    try {
      await addDoc(eventsCollectionRef, {
        ...event,
        participant: parseInt(event.participant),
        price: parseFloat(event.price),
        eventDuration: parseInt(event.eventDuration),
      });
      navigate("/events");
      onClose();
    } catch (error) {
      setError("שגיאה ביצירת האירוע: " + error.message);
    }
  };

  const fieldsLeftColumn = [
    { label: "כותרת", name: "title", type: "text" },
    { label: "תמונה", name: "image", type: "file" },
    { label: "תיאור", name: "description", type: "textarea" },
    { label: "תאריך האירוע", name: "eventDate", type: "date" },
    { label: "מספר משתתפים", name: "participant", type: "number" },
  ];

  const fieldsRightColumn = [
    { label: "גיל קהל היעד", name: "audienceAge", type: "text" },
    { label: "מיקום", name: "location", type: "text" },
    { label: "מחיר", name: "price", type: "number" },
    { label: "תאריך תפוגה", name: "expireDate", type: "date" },
    { label: "משך האירוע (בדקות)", name: "eventDuration", type: "number" },
    { label: "קישור", name: "URL", type: "text" },
  ];

  return (
    <div className="w-full  max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">יצירת אירוע חדש</h1>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          &#x2716;
        </button>
      </div>
      <form
        onSubmit={createEvent}
        className="grid grid-cols-1 gap-y-4 md:grid-cols-2 md:gap-x-8"
      >
        {/* Left Column */}
        <div>
          {fieldsLeftColumn.map((field) => (
            <div key={field.name} className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
              </label>
              {field.type === "textarea" ? (
                <textarea
                  name={field.name}
                  value={event[field.name]}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  rows="3"
                />
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={event[field.name]}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              )}
            </div>
          ))}
        </div>
        {/* Right Column */}
        <div>
          {fieldsRightColumn.map((field) => (
            <div key={field.name} className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
              </label>
              {field.type === "textarea" ? (
                <textarea
                  name={field.name}
                  value={event[field.name]}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  rows="3"
                />
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={event[field.name]}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              )}
            </div>
          ))}
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          className="col-span-2 w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300"
        >
          צור אירוע
        </button>
      </form>
      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
    </div>
  );
};
