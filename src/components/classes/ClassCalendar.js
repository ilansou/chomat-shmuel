import React, { useState } from "react";
import { format, startOfWeek, endOfWeek, eachDayOfInterval, addDays, subDays, isSameDay } from "date-fns";
import { getMonthAndYearJewishDate, convertToHebrewDay } from "../../utils/dateUtils";
import { monthTranslations } from "../../dictionary";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';

const weekColors = [
  'bg-blue-500', 'bg-indigo-500', 'bg-purple-500', 'bg-pink-500',
  'bg-red-500', 'bg-orange-500', 'bg-amber-500'
];

export const ClassCalendar = ({ setDate, classes, filter, categoryColors, onSelectClass }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const today = new Date();

  const changeDate = (delta) => {
    setSelectedDate(prevDate => addDays(prevDate, delta * 7));
  };

  const getDays = () => {
    const weekStart = startOfWeek(selectedDate, { weekStartsOn: 0 });
    const weekEnd = endOfWeek(selectedDate, { weekStartsOn: 0 });
    return eachDayOfInterval({ start: weekStart, end: weekEnd });
  };

  const days = getDays();
  const currentWeekColor = weekColors[selectedDate.getDay()];

  const getClassesForDay = (dayObj) => {
    return classes.filter(classItem => {
      if (filter !== "all" && classItem.category !== filter) {
        return false;
      }

      const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

      switch (classItem.frequency) {
        case "one-time":
          return isSameDay(new Date(classItem.classDate), dayObj);
        case "weekly":
          return dayOfWeek[dayObj.getDay()] === classItem.weekday && 
                 dayObj >= new Date(classItem.classDate);
        case "biweekly":
          const weekDiff = Math.floor((dayObj - new Date(classItem.classDate)) / (1000 * 60 * 60 * 24 * 7));
          return dayOfWeek[dayObj.getDay()] === classItem.weekday && 
                 dayObj >= new Date(classItem.classDate) &&
                 weekDiff % 2 === 0;
        case "monthly":
          return dayOfWeek[dayObj.getDay()] === classItem.weekday && 
                 dayObj >= new Date(classItem.classDate) &&
                 dayObj.getDate() === new Date(classItem.classDate).getDate();
        default:
          return false;
      }
    }).sort((a, b) => new Date(a.classDate) - new Date(b.classDate)).slice(0, 3);
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setDate(date);
  };

  const goToToday = () => {
    setSelectedDate(new Date());
    setDate(new Date());
  };

  return (
    <div className="w-full max-w-full mx-auto bg-white shadow-2xl rounded-xl overflow-hidden">
      <div className={`${currentWeekColor} text-white p-4`}>
        <div className="flex justify-between items-center">
          <button 
          className="bg-white text-gray-800 rounded-full p-1 transition-colors duration-200 hover:bg-gray-200" 
          onClick={() => changeDate(-1)}>
            <ChevronRightIcon className="h-6 w-6" />
          </button>
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-bold">
              {getMonthAndYearJewishDate(selectedDate)} / {monthTranslations[selectedDate.getMonth()]}{" "}
              {selectedDate.getFullYear()}
            </h2>
            <button 
              className="bg-white text-gray-800 text-sm font-medium py-1 px-3 rounded-full transition-colors duration-200 hover:bg-gray-200"
              onClick={goToToday}
            >
              היום
            </button>
          </div>
          <button 
          className="bg-white text-gray-800 rounded-full p-1 transition-colors duration-200 hover:bg-gray-200" 
          onClick={() => changeDate(1)}>
            <ChevronLeftIcon className="h-6 w-6" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 p-2 bg-gray-100">
        {["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"].map((day, index) => (
          <div key={index} className="font-bold text-center py-2 text-gray-700 text-m">{day}</div>
        ))}

        {days.map((day, idx) => {
          const isToday = isSameDay(day, today);
          const isSelected = isSameDay(day, selectedDate);

          return (
            <div
              key={idx}
              className={`bg-white p-1 rounded-lg ${
                isToday ? "ring-4 ring-blue-500" : ""} ${
                isSelected ? `ring-2 ${currentWeekColor.replace('bg-', 'ring-')}` : ""
              } min-h-[100px] flex flex-col overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-md`}
              onClick={() => handleDateClick(day)}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="text-lg font-bold text-gray-800">
                  {format(day, "d")}
                </span>
                <span className="text-s text-gray-500 font-medium">{convertToHebrewDay(day)}</span>
              </div>
              <div className="flex-grow overflow-y-auto">
                {getClassesForDay(day).map((classItem, index) => (
                  <div
                    key={index}
                    className={`text-sm ${categoryColors[classItem.category] || 'bg-gray-200'} text-black rounded-full px-2 py-0.5 mb-0.5 truncate cursor-pointer hover:opacity-80 transition-all duration-100`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectClass(classItem);
                    }}
                    title={classItem.title}
                  >
                    {format(new Date(classItem.classDate), "HH:mm")} {classItem.title}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};