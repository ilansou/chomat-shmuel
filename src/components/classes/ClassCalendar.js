import React, { useState } from "react";
import { format, startOfWeek, addDays, isSameDay } from "date-fns";
import { getMonthAndYearJewishDate, convertToHebrewDay } from "../../utils/dateUtils";
import { monthTranslations } from "../../dictionary";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';

export const ClassCalendar = ({ setDate, classes, filter, categoryColors, onSelectClass }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const changeDate = (delta) => {
    setSelectedDate((prevDate) => addDays(prevDate, delta * 7));
  };

  const getDays = () => {
    const month = selectedDate.getMonth();
    const startDate = startOfWeek(selectedDate);
    return Array.from({ length: 7 }, (_, i) => ({
      date: addDays(startDate, i),
      isCurrentMonth: addDays(startDate, i).getMonth() === month,
    }));
  };

  const days = getDays();

  const getClassesForDay = (dayObj) => {
    return classes.filter(classItem => {
      if (filter !== "all" && classItem.category !== filter) {
        return false;
      }

      const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

      switch (classItem.frequency) {
        case "one-time":
          return isSameDay(new Date(classItem.classDate), dayObj.date);
        case "weekly":
          return dayOfWeek[dayObj.date.getDay()] === classItem.weekday && 
                 dayObj.date >= new Date(classItem.classDate);
        case "biweekly":
          const weekDiff = Math.floor((dayObj.date - new Date(classItem.classDate)) / (1000 * 60 * 60 * 24 * 7));
          return dayOfWeek[dayObj.date.getDay()] === classItem.weekday && 
                 dayObj.date >= new Date(classItem.classDate) &&
                 weekDiff % 2 === 0;
        case "monthly":
          return dayOfWeek[dayObj.date.getDay()] === classItem.weekday && 
                 dayObj.date >= new Date(classItem.classDate) &&
                 dayObj.date.getDate() === new Date(classItem.classDate).getDate();
        default:
          return false;
      }
    }).sort((a, b) => new Date(a.classDate) - new Date(b.classDate));
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="bg-blue-600 text-white p-4">
        <div className="flex justify-between items-center">
          <button onClick={() => changeDate(-1)} className="hover:bg-blue-700 rounded-full p-1">
            <ChevronRightIcon className="h-6 w-6" />
          </button>
          <h2 className="text-xl font-bold">
            {getMonthAndYearJewishDate(selectedDate)} / {monthTranslations[selectedDate.getMonth()]}{" "}
            {selectedDate.getFullYear()}
          </h2>
          <button onClick={() => changeDate(1)} className="hover:bg-blue-700 rounded-full p-1">
            <ChevronLeftIcon className="h-6 w-6" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 p-4">
        {["א'", "ב'", "ג'", "ד'", "ה'", "ו'", "ש'"].map((day, index) => (
          <div key={index} className="font-bold text-center py-2">{day}</div>
        ))}

        {days.map((dayObj, idx) => (
          <div
            key={idx}
            className={`p-1 border rounded-lg ${
              dayObj.isCurrentMonth ? "bg-white" : "bg-gray-100"
            } ${
              isSameDay(dayObj.date, selectedDate) ? "border-blue-500" : "border-gray-200"
            } min-h-[5rem] flex flex-col overflow-hidden cursor-pointer transition duration-200 ease-in-out hover:shadow-md`}
            onClick={() => setDate(dayObj.date)}
          >
            <div className="flex justify-between items-center mb-1">
              <span className={`${dayObj.isCurrentMonth ? "text-gray-900" : "text-gray-400"} font-semibold`}>
                {format(dayObj.date, "d")}
              </span>
              <span className="text-xs text-gray-500">{convertToHebrewDay(dayObj.date)}</span>
            </div>
            <div className="flex-grow overflow-y-auto">
              {getClassesForDay(dayObj).map((classItem, index) => (
                <div
                  key={index}
                  className={`text-xs ${categoryColors[classItem.category] || 'bg-gray-200'} text-gray-800 rounded px-1 py-0.5 mb-1 truncate cursor-pointer hover:opacity-80`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectClass(classItem);
                  }}
                  title={classItem.title}
                >
                  {format(classItem.classDate, "HH:mm")} {classItem.title}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};