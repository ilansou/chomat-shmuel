import React, { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { format, parseISO, isValid } from "date-fns";
import { he } from "date-fns/locale";
import logo from "../images/logo1.png";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { CreatUepdate } from "../components/newsAndUpdates/CreateNewsAndUpdates";

const UpdateItem = ({ update, onClick }) => (
  <div className="flex items-start mb-4">
    <img
      src={logo}
      alt="Logo"
      className="w-10 h-10 object-cover rounded-full"
    />
    <button
      className="bg-white hover:bg-gray-100 text-gray-800 rounded-lg p-2 max-w-full w-full shadow-md border border-gray-200 text-left"
      onClick={() => onClick(update)}
    >
      <h3 className="text-lg font-bold">{update.title}</h3>
      <p className="text-sm text-gray-700">{update.description}</p>
      <div className="flex justify-between items-center mt-2">
        <p className="text-xs text-gray-500">
          {isValid(new Date(update.updateDate))
            ? format(new Date(update.updateDate), "dd/MM/yyyy HH:mm", {
                locale: he,
              })
            : "תאריך לא תקין"}
        </p>
        {update.expireDate && isValid(new Date(update.expireDate)) && (
          <p className="text-xs text-gray-500">
            תוקף עד:{" "}
            {format(new Date(update.expireDate), "dd/MM/yyyy", { locale: he })}
          </p>
        )}
      </div>
    </button>
  </div>
);

const UpdateModal = ({ update, onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-95 z-50">
    <div className="rounded-lg p-6 shadow-lg max-w-xl relative text-right">
      <button
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        onClick={onClose}
      >
        &times;
      </button>
      <div className="text-center">
        {update.imagePath && (
          <img
            src={update.imagePath}
            alt={update.title}
            className="w-40 h-40 rounded-lg object-cover mb-4 mx-auto border-10 border-blue-500"
          />
        )}
        <h3 className="text-xl font-bold mb-2">{update.title}</h3>
        <p className="text-gray-700 mb-4 px-4">{update.description}</p>
        <p className="text-xs text-gray-500 mb-4">
          {isValid(new Date(update.updateDate))
            ? format(new Date(update.updateDate), "dd/MM/yyyy HH:mm", {
                locale: he,
              })
            : "תאריך לא תקין"}
        </p>
        {update.expireDate && isValid(new Date(update.expireDate)) && (
          <p className="text-xs text-gray-500 mb-4">
            תוקף עד:{" "}
            {format(new Date(update.expireDate), "dd/MM/yyyy", { locale: he })}
          </p>
        )}
      </div>
    </div>
  </div>
);

export const NewsAndUpdates = () => {
  const { user } = useAuth();
  const [updatesList, setUpdatesList] = useState([]);
  const [selectedUpdate, setSelectedUpdate] = useState(null);
  const [showCreateUpdate, setShowCreateUpdate] = useState(false);
  const [visibleUpdates, setVisibleUpdates] = useState(3); // Number of updates initially visible
  const updatesCollectionRef = collection(db, "news and updates");

  const getUpdatesList = async () => {
    try {
      const data = await getDocs(updatesCollectionRef);
      const docs = data.docs;
      const filteredUpdates = docs
        .map((doc) => {
          const updateData = doc.data();

          if (
            !updateData.hasOwnProperty("updateDate") ||
            !isValid(parseISO(updateData.updateDate))
          ) {
            console.warn("Update date is missing or invalid:", updateData);
            return null;
          }

          return {
            id: doc.id,
            ...updateData,
            updateDate: parseISO(updateData.updateDate),
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

  const handleShowMoreUpdates = () => {
    setVisibleUpdates(visibleUpdates + 3); // Increase by 3 updates
  };

  return (
    <div className="container mx-auto px-4 pt-24 mt-8">
      {/* Create Update Button */}
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold mb-8 text-center">עדכונים שותפים</h1>

        {user?.email && (
          <button
            className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded transition-colors duration-200"
            onClick={() => setShowCreateUpdate(true)}
          >
            הוסף עדכון
          </button>
        )}
      </div>
      <div className="max-w-5xl mx-auto">
        {updatesList.length === 0 ? (
          <p className="text-gray-500 text-center">אין עדכונים שותפים</p>
        ) : (
          <div className="overflow-y-scroll max-h-96">
            {updatesList.slice(0, visibleUpdates).map((update) => (
              <UpdateItem key={update.id} update={update} onClick={handleTitleClick} />
            ))}
          </div>
        )}
        {updatesList.length > visibleUpdates && (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded mt-4 block mx-auto"
            onClick={handleShowMoreUpdates}
          >
            הצג עוד עדכונים
          </button>
        )}
      </div>
      {selectedUpdate && <UpdateModal update={selectedUpdate} onClose={handleCloseModal} />}

      

      {/* Create Update Modal */}
      {showCreateUpdate && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-95 z-50">
          <div className="rounded-lg p-6 shadow-lg max-w-[800px] w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowCreateUpdate(false)}
            >
              &times;
            </button>
            <CreatUepdate onClose={() => setShowCreateUpdate(false)} />
          </div>
        </div>
      )}
    </div>
  );
};