import React, { useState, useEffect } from "react";
import { ClassModal } from "../components/classes/ClassModal";
import { ClassForm } from "../components/classes/ClassForm";
import { useAuth } from "../contexts/AuthContext";
import { CalendarWithHe } from "../components/CalendarWithHe";
import { useClasses } from "../contexts/ClassesContext";
import PageFeedback from '../components/PageFeedback'; // Adjust the import path as needed

export const Classes = () => {
  const { user } = useAuth();
  const [date, setDate] = useState(new Date());
  const [selectedClass, setSelectedClass] = useState(null);
  const [showClassForm, setShowClassForm] = useState(false);
  const { getClassList, classList } = useClasses();
  const [categoryFilter, setCategoryFilter] = useState("all");

  useEffect(() => {
    getClassList();
  }, []);

  const categoryOptions = [
    { value: "all", label: "הכל" },
    { value: "חוגי הגיל השלישי", label: "חוגי הגיל השלישי" },
    { value: "התעלמות וספורט", label: "התעלמות וספורט" },
    { value: "חוגי מחול", label: "חוגי מחול" },
    { value: "חוגי אומנות", label: "חוגי אומנות" },
    { value: "חוגי העשרה", label: "חוגי העשרה" },
    { value: 'חוגי צמי"ד', label: 'חוגי צמי"ד' },
    { value: "אחר", label: "אחר" },
  ];

  const categoryColors = {
    'חוגי הגיל השלישי': 'bg-red-200',
    'התעלמות וספורט': 'bg-blue-200',
    'חוגי מחול': 'bg-green-200',
    'חוגי אומנות': 'bg-yellow-200',
    'חוגי העשרה': 'bg-purple-200',
    'חוגי צמי"ד': 'bg-pink-200',
    'אחר': 'bg-gray-200'
  };

  return (
    <div className="container mx-auto px-4 pt-32 max-w-6xl">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-center">חוגים</h1>
        <div className="flex items-center">
          <select
            className="mr-4 p-2 border rounded"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            {categoryOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          {user && (
            <button
              className="bg-purple-500 hover:bg-purple-700 text-white py-2 px-4 rounded"
              onClick={() => setShowClassForm(true)}
            >
              הוסף חוג
            </button>
          )}
        </div>
      </div>

      <CalendarWithHe
        setDate={setDate}
        items={classList.map(classItem => ({ ...classItem, date: classItem.classDate }))}
        view="weekly"
        filter={categoryFilter}
        categoryColors={categoryColors}
        onSelectItem={setSelectedClass}
      />

      {selectedClass && (
        <ClassModal classItem={selectedClass} onClose={() => setSelectedClass(null)} />
      )}

      {showClassForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-[800px] w-full relative">
            <ClassForm onClose={() => setShowClassForm(false)} />
          </div>
        </div>
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <PageFeedback pageId="classes" />
      </div>
    </div>
  );
};