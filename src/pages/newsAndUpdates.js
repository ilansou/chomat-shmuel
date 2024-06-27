import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { getDocs, collection } from "firebase/firestore";
import { format, parse, isValid } from "date-fns";
import { he } from "date-fns/locale";

export const NewsAndUpdates = () => {
  const [updatesList, setUpdatesList] = useState([]);
  const [selectedUpdate, setSelectedUpdate] = useState(null); // State לניהול החלון המוקפץ

  const updatesCollectionRef = collection(db, "news and updates");

  const getUpdatesList = async () => {
    try {
      const data = await getDocs(updatesCollectionRef);
      const docs = data.docs;
      const filteredUpdates = docs.map((doc) => {
        const updateData = doc.data();

        if (!updateData.hasOwnProperty("updateDate")) {
          console.warn("Update date is missing:", updateData);
          return null; // Skip updates without updateDate
        }

        let updateDate;
        if (typeof updateData["updateDate"] === "string") {
          updateDate = parse(updateData["updateDate"], "dd.MM.yyyy", new Date());
        } else {
          updateDate = new Date(updateData["updateDate"]);
        }

        if (!isValid(updateDate)) {
          console.error("Invalid date:", updateData["updateDate"]);
          return null; // Skip updates with invalid date
        }

        return {
          id: doc.id,
          ...updateData,
          updateDate,
        };
      }).filter(Boolean);

      // Sort updates by date, oldest to newest
      filteredUpdates.sort((a, b) => a.updateDate - b.updateDate);

      setUpdatesList(filteredUpdates);
    } catch (error) {
      console.error("Error getting updates: ", error);
    }
  };

  useEffect(() => {
    getUpdatesList();
  }, []);

  const handleImageClick = (update) => {
    setSelectedUpdate(update);
  };

  const handleCloseModal = () => {
    setSelectedUpdate(null);
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-8">
      <h1 className="text-3xl font-bold mb-8 text-center">עדכונים שותפים</h1>
      <div className="updates-container max-w-5xl mx-auto h-96 overflow-y-auto">
        <div className="space-y-8">
          {updatesList.length === 0 ? (
            <p className="text-gray-500 text-center">אין עדכונים שותפים</p>
          ) : (
            updatesList.map((update) => (
              <div key={update.id} className="flex justify-center">
                <div className="bg-white rounded-lg p-4 max-w-full w-full shadow-md ml-4 border border-gray-200">
                  <h3 className="text-lg font-bold mb-1">{update.title}</h3>
                  <p className="text-xs text-gray-500">
                    {isValid(new Date(update.updateDate))
                      ? format(new Date(update.updateDate), "dd/MM/yyyy HH:mm", { locale: he })
                      : "תאריך לא תקין"}
                  </p>
                  <p className="text-gray-700 mb-2">{update.description}</p>
                  {update.expireDate && isValid(new Date(update.expireDate)) && (
                    <p className="text-xs text-gray-500">
                      תוקף עד: {format(new Date(update.expireDate), "dd/MM/yyyy", { locale: he })}
                    </p>
                  )}
                  {update.imagePath && (
                    <img
                      src={update.imagePath}
                      alt={update.title}
                      className="w-60 h-60 rounded-lg mt-2 object-cover cursor-pointer"
                      onClick={() => handleImageClick(update)}
                    />
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal for displaying full details */}
      {selectedUpdate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-xl relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={handleCloseModal}>
              &times;
            </button>
            <div>
              <h3 className="text-xl font-bold mb-2">{selectedUpdate.title}</h3>
              <p className="text-gray-700 mb-4">{selectedUpdate.description}</p>
              <p className="text-xs text-gray-500 mb-4">
                {isValid(new Date(selectedUpdate.updateDate))
                  ? format(new Date(selectedUpdate.updateDate), "dd/MM/yyyy HH:mm", { locale: he })
                  : "תאריך לא תקין"}
              </p>
              {selectedUpdate.expireDate && isValid(new Date(selectedUpdate.expireDate)) && (
                <p className="text-xs text-gray-500 mb-4">
                  תוקף עד: {format(new Date(selectedUpdate.expireDate), "dd/MM/yyyy", { locale: he })}
                </p>
              )}
              {selectedUpdate.imagePath && (
                <img
                  src={selectedUpdate.imagePath}
                  alt={selectedUpdate.title}
                  className="w-40 h-40 rounded-lg object-cover"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
