import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useEvents } from "../../hooks/useEvents";
import { CreateEvent } from "./CreateEvent";

export const EventModal = ({ event, onClose }) => {
  const { user } = useAuth();
  const { deleteEvent } = useEvents();
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = async () => {
    if (window.confirm("האם אתה בטוח שברצונך למחוק אירוע זה?")) {
      try {
        await deleteEvent(event.id);
        onClose();
      } catch (error) {
        console.error("Error deleting event: ", error);
      }
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        {isEditing ? (
          <CreateEvent event={event} onClose={() => setIsEditing(false)} />
        ) : (
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">{event.title}</h2>
              <button
                className="text-gray-500 hover:text-gray-700 transition-colors"
                onClick={onClose}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                {event.imageUrl && (
                  <img src={event.imageUrl} alt={event.title} className="w-full h-64 object-cover rounded-lg" />
                )}
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="font-semibold">תיאור:</p>
                  <p className="text-gray-700">{event.description}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p><strong>תאריך:</strong> {new Date(event.eventDate).toLocaleDateString("he-IL")}</p>
                  <p><strong>מיקום:</strong> {event.location}</p>
                  <p><strong>מחיר:</strong> {event.price} ₪</p>
                  {event.URL && (
                    <p>
                      <strong>קישור:</strong>{" "}
                      <a href={event.URL} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 transition-colors">
                        לחץ כאן
                      </a>
                    </p>
                  )}
                </div>

                {user?.email && (
                  <div className="flex flex-col space-y-2">
                    <button
                      onClick={handleEdit}
                      className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors w-full"
                    >
                      ערוך אירוע
                    </button>
                    <button
                      onClick={handleDelete}
                      className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors w-full"
                    >
                      מחק אירוע
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};