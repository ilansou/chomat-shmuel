import React, { useState, useEffect } from "react";
import { ClassModal } from "../components/classes/ClassModal";
import { ClassForm } from "../components/classes/ClassForm";
import { useAuth } from "../contexts/AuthContext";
import { ClassCalendar } from "../components/classes/ClassCalendar";
import { useClasses } from "../contexts/ClassesContext";
import { ClassCard } from "../components/classes/ClassCard";
import PageFeedback from '../components/PageFeedback';

export const Classes = () => {
  const { user } = useAuth();
  const [date, setDate] = useState(new Date());
  const [selectedClass, setSelectedClass] = useState(null);
  const [showClassForm, setShowClassForm] = useState(false);
  const { getClassList, classList } = useClasses();
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClasses = async () => {
      setLoading(true);
      await getClassList();
      setLoading(false);
    };
    fetchClasses();
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

  if (loading) {
    return <div className="container mx-auto px-4 pt-32 max-w-6xl"> טוען נתונים...</div>;
  }

  return (
    <div className="container mx-auto px-4 pt-24 max-w-7xl">
      <div className="mb-4">
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h2 className="text-lg font-semibold mb-2">סנן לפי קטגוריה</h2>
          <div className="overflow-x-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-2">
              {categoryOptions.map((option) => (
                <div
                  key={option.value}
                  className={`flex items-center p-2 rounded cursor-pointer hover:bg-gray-100 ${
                    categoryFilter === option.value ? 'bg-gray-200' : ''
                  }`}
                  onClick={() => setCategoryFilter(option.value)}
                >
                  <span
                    className={`w-3 h-3 rounded-full mr-2 ${categoryColors[option.value] || 'bg-gray-400'}`}
                  ></span>
                  <span className="text-s mr-1 whitespace-nowrap">{option.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8 flex justify-between items-center">
        <div className="flex items-center">
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

      <div>
        <ClassCalendar
          setDate={setDate}
          classes={classList}
          filter={categoryFilter}
          categoryColors={categoryColors}
          onSelectClass={setSelectedClass}
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
      </div>

      {/* Class Cards List */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">רשימת החוגים</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {classList
            .filter(classItem => categoryFilter === "all" || classItem.category === categoryFilter)
            .map(classItem => (
              <ClassCard 
                key={classItem.id} 
                classItem={classItem} 
                onClick={() => setSelectedClass(classItem)}
              />
            ))
          }
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <PageFeedback pageId="classes" />
      </div>
    </div>
  );
};