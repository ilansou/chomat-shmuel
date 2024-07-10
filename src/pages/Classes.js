import React, { useState, useEffect } from "react";
import { CalendarWithHe } from "../components/CalendarWithHe";
import { ClassModal } from "../components/classes/ClassModal";
import { CreateClass } from "../components/classes/CreateClass";
import { useAuth } from "../contexts/AuthContext";
import { useClasses } from "../contexts/ClassesContext";

export const Classes = () => {
  const { user } = useAuth();
  const [date, setDate] = useState(new Date());
  const [selectedClass, setSelectedClass] = useState(null);
  const [showCreateClass, setShowCreateClass] = useState(false);
  const { getClassList, classList } = useClasses();
  const [categoryFilter, setCategoryFilter] = useState("all");

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        await getClassList();
      } catch (err) {
        console.error("Error fetching classes:", err);
      }
    };
    fetchClasses();
  }, []);

  const handleSelectClass = (classItem) => {
    setSelectedClass(classItem);
  };

  const handleCloseModal = () => {
    setSelectedClass(null);
  };

  const categoryOptions = [
    { value: "all", label: "הכל" },
    { value: "יוגה", label: "יוגה" },
    { value: "פילאטיס", label: "פילאטיס" },
    { value: "ציור", label: "ציור" },
    { value: "מוזיקה", label: "מוזיקה" },
    { value: "בישול", label: "בישול" },
    { value: "שפות", label: "שפות" },
    { value: "מחשבים", label: "מחשבים" },
    { value: "ספורט", label: "ספורט" },
    { value: "אחר", label: "אחר" },
  ];

  return (
    <div className="container mx-auto px-4 pt-32 max-w-6xl">
      <div className="mb-8 flex flex-col md:flex-row justify-between items-center">
        <h1 className="text-3xl font-bold text-center mb-4 md:mb-0">שיעורים</h1>
        <div className="flex flex-col md:flex-row items-center">
          <select
            className="mb-4 md:mb-0 md:mr-4 p-2 border rounded"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            {categoryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {user && (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors duration-200"
              onClick={() => setShowCreateClass(true)}
            >
              הוסף שיעור
            </button>
          )}
        </div>
      </div>

      <div className="mb-3">
        <CalendarWithHe 
          setDate={setDate} 
          view="weekly" 
          categoryFilter={categoryFilter}
          onSelectEvent={handleSelectClass}
          events={classList}
        />
        {selectedClass && (
          <ClassModal class={selectedClass} onClose={handleCloseModal} />
        )}
      </div>

      {showCreateClass && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-[800px] w-full relative">
            <CreateClass onClose={() => setShowCreateClass(false)} />
          </div>
        </div>
      )}
    </div>
  );
};