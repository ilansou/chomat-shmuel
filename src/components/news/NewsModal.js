import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNews } from "../../hooks/useNews";
import { CreateNews } from "./CreateNews";
import { format } from "date-fns";

export const NewsModal = ({ newsItem, onClose }) => {
  const { user } = useAuth();
  const { deleteNews, editNews } = useNews();
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = async () => {
    if (window.confirm("האם אתה בטוח שברצונך למחוק עדכון זה?")) {
      try {
        await deleteNews(newsItem.id);
        onClose();
      } catch (error) {
        console.error("Error deleting news item: ", error);
      }
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdate = async (updatedNews) => {
    try {
      await editNews(newsItem.id, updatedNews);
      setIsEditing(false);
      onClose();
    } catch (error) {
      console.error("Error updating news item: ", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        {isEditing ? (
          <CreateNews 
            newsItem={newsItem} 
            onClose={() => setIsEditing(false)} 
            onSubmit={handleUpdate}
            isEditing={true}
          />
        ) : (
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">{newsItem.title}</h2>
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
                {newsItem.image && (
                  <img src={newsItem.image} alt={newsItem.title} className="w-full h-64 object-cover rounded-lg" />
                )}
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="font-semibold">תיאור:</p>
                  <p className="text-gray-700">{newsItem.description}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p><strong>תאריך:</strong> {format(new Date(newsItem.eventDate), "dd/MM/yyyy HH:mm")}</p>
                  <p><strong>תאריך תפוגה:</strong> {format(new Date(newsItem.expireDate), "dd/MM/yyyy")}</p>
                </div>

                {user && (
                  <div className="flex flex-col space-y-2">
                    <button
                      onClick={handleEdit}
                      className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors w-full"
                    >
                      ערוך עדכון
                    </button>
                    <button
                      onClick={handleDelete}
                      className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors w-full"
                    >
                      מחק עדכון
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