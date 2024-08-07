import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useClasses } from "../../contexts/ClassesContext";
import { ClassForm } from "./ClassForm";

const weekDays = {
  Sunday: "ראשון",
  Monday: "שני",
  Tuesday: "שלישי",
  Wednesday: "רביעי",
  Thursday: "חמישי",
  Friday: "שישי",
  Saturday: "שבת",
};

const mapWeekDaysToHebrew = (englishDays) => {
  return englishDays.map((day) => weekDays[day] || day);
};

export const ClassModal = ({ classItem, onClose }) => {
  const { user } = useAuth();
  const { deleteClass, getClassList } = useClasses();
  const [isEditing, setIsEditing] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);

  const handleDelete = async () => {
    if (window.confirm("האם אתה בטוח שברצונך למחוק חוג זה?")) {
      try {
        await deleteClass(classItem.id);
        await getClassList();
        onClose();
      } catch (error) {
        console.error("Error deleting class: ", error);
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
          <ClassForm classItem={classItem} onClose={() => setIsEditing(false)} isEditing={true} />
        ) : (
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">{classItem.title}</h2>
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
                {classItem.imageUrl && (
                  <div className="cursor-pointer" onClick={openImageModal}>
                    <img
                      src={classItem.imageUrl}
                      alt={classItem.title}
                      className="w-full h-64 object-fill rounded-lg"
                    />
                  </div>
                )}
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="font-semibold">תיאור:</p>
                  <p className="text-gray-700">{classItem.description}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-100 p-4 rounded-lg">
                  {classItem.frequency && (
                    <p>
                      <strong>תדירות:</strong> {classItem.frequency}
                    </p>
                  )}
                  {classItem.weekdays && classItem.weekdays.length > 0 && (
                    <p>
                      <strong>ימים בשבוע:</strong>{" "}
                      {mapWeekDaysToHebrew(classItem.weekdays).join(", ")}
                    </p>
                  )}
                  {classItem.startTime && (
                    <p>
                      <strong>שעת התחלה:</strong> {classItem.startTime}
                    </p>
                  )}
                  {classItem.duration && (
                    <p>
                      <strong>משך השיעור:</strong> {classItem.duration} דקות
                    </p>
                  )}
                  {classItem.category && (
                    <p>
                      <strong>קטגוריה:</strong> {classItem.category}
                    </p>
                  )}
                  {classItem.location && (
                    <p>
                      <strong>מיקום:</strong> {classItem.location}
                    </p>
                  )}
                  {classItem.price && (
                    <p>
                      <strong>מחיר:</strong> {classItem.price} ₪
                    </p>
                  )}
                  {classItem.participant && (
                    <p>
                      <strong>מספר משתתפים:</strong> {classItem.participant}
                    </p>
                  )}
                  {classItem.teacherName && (
                    <p>
                      <strong>מורה:</strong> {classItem.teacherName}
                    </p>
                  )}
                  {classItem.teacherPhone && (
                    <p>
                      <strong>טלפון המורה:</strong> {classItem.teacherPhone}
                    </p>
                  )}
                  {classItem.teacherEmail && (
                    <p>
                      <strong>אימייל המורה:</strong> {classItem.teacherEmail}
                    </p>
                  )}
                  {classItem.URL && (
                    <p>
                      <strong>קישור:</strong>{" "}
                      <a
                        href={classItem.URL}
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
                      ערוך חוג
                    </button>
                    <button
                      onClick={handleDelete}
                      className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors w-full">
                      מחק חוג
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
                <img src={classItem.imageUrl} alt={classItem.title} className="w-full" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
