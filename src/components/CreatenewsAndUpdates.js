import React, { useState } from "react";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export const CreateUpdate = ({ onClose }) => {
  const [update, setUpdate] = useState({
    title: "",
    image: "",
    description: "",
    updateDate: new Date().toISOString().substring(0, 10),
    expireDate: new Date(new Date().setMonth(new Date().getMonth() + 1))
      .toISOString()
      .substring(0, 10),
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const updatesCollectionRef = collection(db, "news and updates");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdate({ ...update, [name]: value });
  };

  const createUpdate = async (e) => {
    e.preventDefault();
    if (!update.title) {
      setError("כותרת נדרשת");
      return;
    }
    try {
      await addDoc(updatesCollectionRef, {
        ...update,
      });
      navigate("/updates");
      onClose();
    } catch (error) {
      setError("שגיאה ביצירת העדכון: " + error.message);
    }
  };

  const fields = [
    { label: "כותרת", name: "title", type: "text" },
    { label: "תמונה", name: "image", type: "file" },
    { label: "תיאור", name: "description", type: "textarea" },
    { label: "תאריך עדכון", name: "updateDate", type: "date" },
    { label: "תאריך תפוגה", name: "expireDate", type: "date" },
  ];

  return (
    <div className="w-full max-w-md max-h-[80vh] mx-auto p-6 overflow-y-auto bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">יצירת עדכון חדש</h1>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          &#x2716;
        </button>
      </div>
      <form onSubmit={createUpdate} className="space-y-4">
        {fields.map((field) => (
          <div key={field.name} className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">{field.label}</label>
            {field.type === "textarea" ? (
              <textarea
                name={field.name}
                value={update[field.name]}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                rows="3"
              />
            ) : (
              <input
                type={field.type}
                name={field.name}
                value={update[field.name]}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            )}
          </div>
        ))}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300">
          צור עדכון
        </button>
      </form>
      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
    </div>
  );
};
