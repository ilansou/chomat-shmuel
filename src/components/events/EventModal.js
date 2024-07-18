import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useEvents } from "../../contexts/EventsContext";
import { EventForm } from "./EventForm";
import { format } from "date-fns";

export const EventModal = ({ event, onClose }) => {
  const { user } = useAuth();
  const { deleteEvent, getEventList } = useEvents();
  const [isEditing, setIsEditing] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);

  const handleDelete = async () => {
    if (window.confirm("האם אתה בטוח שברצונך למחוק אירוע זה?")) {
      try {
        await deleteEvent(event.id);
        await getEventList();
        onClose();
      } catch (error) {
        console.error("Error deleting event: ", error);
      }
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const openImageModal = () => {
    setShowImageModal(true);
  };

  const closeImageModal = () => {
    setShowImageModal(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        {isEditing ? (
          <EventForm event={event} onClose={() => setIsEditing(false)} isEditing={true} />
        ) : (
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">{event.title}</h2>
              <button
                className="text-gray-500 hover:text-gray-700 transition-colors"
                onClick={onClose}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                {event.imageUrl && (
                  <div className="cursor-pointer" onClick={openImageModal}>
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="w-full h-56 object-contain rounded-lg"
                    />
                  </div>
                )}
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="font-semibold">תיאור:</p>
                  <p className="text-gray-700">{event.description}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-100 p-4 rounded-lg">
                  {event.eventDate && (
                    <p>
                      <strong>תאריך:</strong> {format(event.eventDate, "dd/MM/yyyy HH:mm")}
                    </p>
                  )}
                  {event.location && (
                    <p>
                      <strong>מיקום:</strong> {event.location}
                    </p>
                  )}
                  {event.price !== undefined && (
                    <p>
                      <strong>מחיר:</strong> {event.price !== null ? event.price : " "} ₪
                    </p>
                  )}
                  {event.URL && (
                    <p>
                      <strong>קישור:</strong>{" "}
                      <a
                        href={event.URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-700 transition-colors">
                        לחץ כאן
                      </a>
                    </p>
                  )}
                </div>

                {user && (
                  <div className="flex flex-col space-y-2">
                    <button
                      onClick={handleEdit}
                      className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors w-full">
                      ערוך אירוע
                    </button>
                    <button
                      onClick={handleDelete}
                      className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors w-full">
                      מחק אירוע
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {showImageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-auto">
          <div className="max-w-3xl max-h-[90vh]">
            <div className="bg-white rounded-lg shadow-xl p-4 relative">
              <button
                className="absolute top-2 left-2 text-gray-500 hover:text-gray-700 transition-colors"
                onClick={closeImageModal}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <div className="overflow-auto">
                <img src={event.imageUrl} alt={event.title} className="w-full" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
