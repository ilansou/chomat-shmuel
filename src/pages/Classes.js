import React, { useState } from "react";
import { ClassModal } from "../components/classes/ClassModal";
import { ClassForm } from "../components/classes/ClassForm";
import { useAuth } from "../contexts/AuthContext";
import { ClassCalendar } from "../components/classes/ClassCalendar";
import { useClasses } from "../contexts/ClassesContext";
import { ClassCard } from "../components/classes/ClassCard";
import PageFeedback from "../components/PageFeedback";

export const Classes = () => {
  const { user } = useAuth();
  const [selectedClass, setSelectedClass] = useState(null);
  const [showClassForm, setShowClassForm] = useState(false);
  const { classList, loading } = useClasses();
  const [categoryFilter, setCategoryFilter] = useState("all");

  const categoryOptions = [
    { value: "all", label: "הכל" },
    { value: "חוגי הגיל השלישי", label: "חוגי הגיל השלישי" },
    { value: "התעמלות וספורט", label: "התעמלות וספורט" },
    { value: "חוגי מחול", label: "חוגי מחול" },
    { value: "חוגי אומנות", label: "חוגי אומנות" },
    { value: "חוגי העשרה", label: "חוגי העשרה" },
    { value: 'חוגי צמי"ד', label: 'חוגי צמי"ד' },
    { value: "אחר", label: "אחר" },
  ];

  const categoryColors = {
    "חוגי הגיל השלישי": "bg-red-200",
    "התעמלות וספורט": "bg-blue-200",
    "חוגי מחול": "bg-green-200",
    "חוגי אומנות": "bg-yellow-200",
    "חוגי העשרה": "bg-purple-200",
    'חוגי צמי"ד': "bg-pink-200",
    אחר: "bg-gray-200",
  };

  // Filter and sort classes by category
  const filteredAndSortedClassList = classList
    .filter((classItem) => categoryFilter === "all" || classItem.category === categoryFilter)
    .sort((a, b) => {
      const categoryOrder = categoryOptions.map((option) => option.value);
      return categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category);
    });

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 pt-24 max-w-7xl">
        <div className="mb-4">
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h2 className="text-lg font-semibold mb-1">סנן לפי קטגוריה</h2>
            <div className="overflow-x-auto">
              <div className="flex flex-wrap space-x-2">
                {categoryOptions.map((option) => (
                  <div
                    key={option.value}
                    className={`flex items-center p-5 rounded cursor-pointer hover:bg-gray-100 ${
                      categoryFilter === option.value ? "bg-gray-200" : ""
                    }`}
                    onClick={() => setCategoryFilter(option.value)}>
                    <span
                      className={`w-3 h-3 rounded-full mr-2 ${
                        categoryColors[option.value] || "bg-gray-400"
                      }`}></span>
                    <span className="text-s mr-1 whitespace-nowrap">{option.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div>
          <ClassCalendar
            classes={classList}
            filter={categoryFilter}
            categoryColors={categoryColors}
            onSelectClass={setSelectedClass}
            user={user}
            onAddClass={() => setShowClassForm(true)}
          />

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
            {filteredAndSortedClassList.map((classItem) => (
              <ClassCard
                key={classItem.id}
                classItem={classItem}
                onClick={() => setSelectedClass(classItem)}
              />
            ))}
          </div>
        </div>

        {/* Single instance of ClassModal */}
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
    </div>
  );
};
