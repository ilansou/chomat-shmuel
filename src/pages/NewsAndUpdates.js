import React, { useState, useEffect, useRef } from "react";
import { format, isValid } from "date-fns";
import { he } from "date-fns/locale";
import logo from "../images/logo.png";
import { useAuth } from "../context/AuthContext";
import { CreatUepdate } from "../components/CreatenewsAndUpdates";
import { useNewsAndUpdates } from "../hooks/useNewsAndUpdates";

const UpdateBubble = ({ update, onClick }) => (
  <div className="flex items-end mb-4 justify-start">
    <div className="bg-black rounded-full overflow-hidden mr-2 flex-shrink-0">
      <img src={logo} alt="Logo" className="w-8 h-8 object-cover" />
    </div>
    <button
      className="bg-blue-100 text-black rounded-lg p-3 max-w-[80%] shadow-md border border-blue-200 text-left hover:bg-blue-200 transition-colors"
      onClick={() => onClick(update)}>
      <h3 className="text-md font-semibold mb-1">{update.title}</h3>
      <p className="text-sm text-gray-600 mb-1 line-clamp-2">{update.description}</p>
      <p className="text-xs text-gray-500">
        {isValid(new Date(update.date))
          ? format(new Date(update.date), "dd/MM/yyyy HH:mm", { locale: he })
          : "תאריך לא תקין"}
      </p>
    </button>
  </div>
);

const UpdateModal = ({ update, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-xl relative text-right">
      <button
        className="absolute top-2 left-2 text-gray-500 hover:text-gray-700"
        onClick={onClose}>
        &times;
      </button>
      <div>
        {update.imagePath && (
          <img
            src={update.imagePath}
            alt={update.title}
            className="w-full h-48 rounded-lg object-cover mb-4"
          />
        )}
        <h3 className="text-xl font-bold mb-2">{update.title}</h3>
        <p className="text-gray-700 mb-4">{update.description}</p>
        <p className="text-xs text-gray-500 mb-4">
          {isValid(new Date(update.date))
            ? format(new Date(update.date), "dd/MM/yyyy HH:mm", { locale: he })
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
  const { user } = useAuth();
  const { newsAndUpdatesList, getNewsAndUpdates } = useNewsAndUpdates();
  const [selectedUpdate, setSelectedUpdate] = useState(null);
  const [showCreateUpdate, setShowCreateUpdate] = useState(false);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    getNewsAndUpdates();
  }, [getNewsAndUpdates]);

  console.log(newsAndUpdatesList);
  console.log("hereee");

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [newsAndUpdatesList]);

  const handleTitleClick = (update) => {
    setSelectedUpdate(update);
  };

  const handleCloseModal = () => {
    setSelectedUpdate(null);
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-8 flex flex-col h-screen">
      <h1 className="text-3xl font-bold mb-4 text-center">עדכונים שותפים</h1>
      
      <div className="flex-grow overflow-hidden bg-gray-100 rounded-lg shadow-inner">
        <div 
          ref={chatContainerRef}
          className="h-full overflow-y-auto p-4 space-y-4"
          style={{ direction: 'ltr' }} // Set direction to left-to-right
        >
          {newsAndUpdatesList.length === 0 ? (
            <p className="text-gray-500 text-center">אין עדכונים שותפים</p>
          ) : (
            newsAndUpdatesList.map((update) => (
              <UpdateBubble key={update.id} update={update} onClick={handleTitleClick} />
            ))
          )}
        </div>
      </div>

      {selectedUpdate && <UpdateModal update={selectedUpdate} onClose={handleCloseModal} />}

      {/* Create Update Button */}
      <div className="mt-4">
        {user?.email && (
          <button
            className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded w-full"
            onClick={() => setShowCreateUpdate(true)}>
            הוסף עדכון
          </button>
        )}
      </div>

      {/* Create Update Modal */}
      {showCreateUpdate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-[800px] w-full relative">
            <button
              className="absolute top-2 left-2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowCreateUpdate(false)}>
              &times;
            </button>
            <CreatUepdate onClose={() => setShowCreateUpdate(false)} />
          </div>
        </div>
      )}
    </div>
  );
};