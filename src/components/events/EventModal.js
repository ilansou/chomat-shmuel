import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useEvents } from "../../hooks/useEvents";

export const EventModal = ({ event, onClose }) => {
  const { user } = useAuth();
  const { deleteEvent, editEvent } = useEvents();
  const [isEditing, setIsEditing] = useState(false);
  const [editedEvent, setEditedEvent] = useState(event);

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

  const handleUpdate = async () => {
    try {
      await editEvent(event.id, editedEvent);
      setIsEditing(false);
      onClose();
    } catch (error) {
      console.error("Error updating event: ", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedEvent(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              {isEditing ? "עריכת אירוע" : event.title}
            </h2>
            <button
              className="text-gray-500 hover:text-gray-700 transition-colors"
              onClick={onClose}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {event.imageUrl && (
            <img src={event.imageUrl} alt={event.title} className="w-full h-64 object-cover rounded-lg mb-4" />
          )}

          <div className="space-y-3 text-gray-600">
            {isEditing ? (
              <>
                <input
                  name="title"
                  value={editedEvent.title}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  placeholder="כותרת"
                />
                <textarea
                  name="description"
                  value={editedEvent.description}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  placeholder="תיאור"
                />
                <input
                  type="date"
                  name="eventDate"
                  value={editedEvent.eventDate}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
                <input
                  name="location"
                  value={editedEvent.location}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  placeholder="מיקום"
                />
                <input
                  type="number"
                  name="price"
                  value={editedEvent.price}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  placeholder="מחיר"
                />
                <input
                  name="URL"
                  value={editedEvent.URL}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  placeholder="קישור"
                />
              </>
            ) : (
              <>
                <p><strong>תיאור:</strong> {event.description}</p>
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
              </>
            )}
          </div>
          
          {user?.email && (
            <div className="mt-6 flex space-x-2 rtl:space-x-reverse">
              {isEditing ? (
                <>
                  <button
                    onClick={handleUpdate}
                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors">
                    שמור שינויים
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 transition-colors">
                    ביטול
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors">
                    ערוך אירוע
                  </button>
                  <button
                    onClick={handleDelete}
                    className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors">
                    מחק אירוע
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};