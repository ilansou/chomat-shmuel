import React, { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { format, parse, isValid } from "date-fns";
import { he } from "date-fns/locale";
import logo from "../images/logo.png";
import ExportComponent from "../utils/ExportComponent"; // Import ExportComponent
import { db } from "../firebase";

const UpdateItem = ({ update, onClick }) => (
  <div className="flex items-start mb-4 justify-end">
    <div className="bg-black rounded-full overflow-hidden ml-4">
      <img
        src={logo} // Adjust the path to your logo image
        alt="Logo"
        className="w-10 h-10 object-cover"
      />
    </div>
    <button
      className="bg-blue-500 text-white rounded-lg p-2 max-w-full w-full shadow-md border border-gray-200 text-right"
      onClick={() => onClick(update)}>
      <h3 className="text-lg font-bold">{update.title}</h3>
    </button>
  </div>
);

const UpdateModal = ({ update, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-xl relative text-right">
      <button
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        onClick={onClose}>
        &times;
      </button>
      <div>
        {update.imagePath && (
          <img
            src={update.imagePath}
            alt={update.title}
            className="w-40 h-40 rounded-lg object-cover mb-4"
          />
        )}
        <h3 className="text-xl font-bold mb-2">{update.title}</h3>
        <p className="text-gray-700 mb-4">{update.description}</p>
        <p className="text-xs text-gray-500 mb-4">
          {isValid(new Date(update.updateDate))
            ? format(new Date(update.updateDate), "dd/MM/yyyy HH:mm", { locale: he })
            : "תאריך לא תקין"}
        </p>
        {update.expireDate && isValid(new Date(update.expireDate)) && (
          <p className="text-xs text-gray-500 mb-4">
            תוקף עד: {format(new Date(update.expireDate), "dd/MM/yyyy", { locale: he })}
          </p>
        )}
      </div>
    </div>
  </div>
);

export const NewsAndUpdates = () => {
  const [updatesList, setUpdatesList] = useState([]);
  const [selectedUpdate, setSelectedUpdate] = useState(null);

  const updatesCollectionRef = collection(db, "news and updates");

  const getUpdatesList = async () => {
    try {
      const data = await getDocs(updatesCollectionRef);
      const docs = data.docs;
      const filteredUpdates = docs
        .map((doc) => {
          const updateData = doc.data();

          if (!updateData.hasOwnProperty("updateDate")) {
            console.warn("Update date is missing:", updateData);
            return null;
          }

          let updateDate;
          if (typeof updateData["updateDate"] === "string") {
            updateDate = parse(updateData["updateDate"], "dd.MM.yyyy", new Date());
          } else {
            updateDate = new Date(updateData["updateDate"]);
          }

          if (!isValid(updateDate)) {
            console.error("Invalid date:", updateData["updateDate"]);
            return null;
          }

          return {
            id: doc.id,
            ...updateData,
            updateDate,
          };
        })
        .filter(Boolean);

      filteredUpdates.sort((a, b) => a.updateDate - b.updateDate);

      setUpdatesList(filteredUpdates);
    } catch (error) {
      console.error("Error getting updates: ", error);
    }
  };

  useEffect(() => {
    getUpdatesList();
  }, []);

  const handleTitleClick = (update) => {
    setSelectedUpdate(update);
  };

  const handleCloseModal = () => {
    setSelectedUpdate(null);
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-8">
      <h1 className="text-3xl font-bold mb-8 text-center">עדכונים שותפים</h1>
      <div className="max-w-5xl mx-auto">
        {updatesList.length === 0 ? (
          <p className="text-gray-500 text-center">אין עדכונים שותפים</p>
        ) : (
          updatesList.map((update) => (
            <UpdateItem key={update.id} update={update} onClick={handleTitleClick} />
          ))
        )}
      </div>
      {selectedUpdate && <UpdateModal update={selectedUpdate} onClose={handleCloseModal} />}
      <ExportComponent collectionName="news and updates" /> {/* Render ExportComponent here */}
    </div>
  );
};
