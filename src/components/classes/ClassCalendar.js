import React, { useState } from "react";
import { format, startOfWeek, endOfWeek, eachDayOfInterval, parseISO } from "date-fns";
import { he } from "date-fns/locale";

const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const hebrewDays = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];

export const ClassCalendar = ({
  classes,
  filter,
  categoryColors,
  onSelectClass,
  user,
  onAddClass,
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const getDays = () => {
    const weekStart = startOfWeek(selectedDate, { weekStartsOn: 0 });
    const weekEnd = endOfWeek(selectedDate, { weekStartsOn: 0 });
    return eachDayOfInterval({ start: weekStart, end: weekEnd });
  };

  const days = getDays();

  const getClassesForDay = (dayOfWeek) => {
    return classes
      .filter((classItem) => {
        if (filter !== "all" && classItem.category !== filter) {
          return false;
        }
        return classItem.weekdays.includes(dayOfWeek);
      })
      .sort((a, b) => {
        const timeA = parseISO(`2000-01-01T${a.startTime}`);
        const timeB = parseISO(`2000-01-01T${b.startTime}`);
        return timeA - timeB;
      });
  };

  return (
    <div className="w-full max-w-full mx-auto bg-white shadow-2xl rounded-xl overflow-hidden">
      <div className="bg-purple-500 text-white p-4">
        <div className="flex justify-center items-center">
          <h2 className="text-2xl font-bold">לוח חוגים</h2>
          {user && (
            <button
              className="bg-white text-gray-800 text-sm font-medium py-1 px-3 rounded-full transition-colors duration-200 hover:bg-gray-200 mr-2"
              onClick={onAddClass}>
              הוסף חוג
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 p-2 bg-gray-100">
        {hebrewDays.map((day, index) => (
          <div key={index} className="font-bold text-center py-2 text-gray-700 text-m">
            {day}
          </div>
        ))}

        {days.map((day, idx) => (
          <div
            key={idx}
            className="bg-white p-1 rounded-lg min-h-[100px] flex flex-col overflow-hidden">
            <div className="flex-grow overflow-y-auto">
              {getClassesForDay(weekDays[idx]).map((classItem, index) => (
                <div
                  key={index}
                  className={`text-sm ${
                    categoryColors[classItem.category] || "bg-gray-200"
                  } text-black rounded-full px-2 py-0.5 mb-0.5 truncate cursor-pointer hover:opacity-80 transition-all duration-100`}
                  onClick={() => onSelectClass(classItem)}
                  title={classItem.title}>
                  {classItem.startTime} {classItem.title}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
