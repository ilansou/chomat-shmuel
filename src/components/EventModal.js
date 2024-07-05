import React from "react";
import { useAuth } from "../context/AuthContext";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

export const EventModal = ({ event, onClose, onDelete }) => {
  const { user } = useAuth();

  const handleDelete = async () => {
    if (window.confirm("האם אתה בטוח שברצונך למחוק אירוע זה?")) {
      try {
        await deleteDoc(doc(db, "events", event.id));
        onDelete(event.id);
        onClose();
      } catch (error) {
        console.error("Error deleting event: ", error);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
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
          <div className="space-y-3 text-gray-600">
            <p>
              <strong>תיאור:</strong> {event.description}
            </p>
            <p>
              <strong>תאריך:</strong> {new Date(event.eventDate).toLocaleDateString("he-IL")}
            </p>
            <p>
              <strong>מיקום:</strong> {event.location}
            </p>
            <p>
              <strong>מחיר:</strong> {event.price} ₪
            </p>
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
          {user?.email && (
            <button
              onClick={handleDelete}
              className="w-auto bg-red-500 mt-4 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors">
              מחק אירוע
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
