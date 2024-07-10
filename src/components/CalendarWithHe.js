import React, { useState } from "react";
import { format, isSameDay, startOfWeek, addDays } from "date-fns";
import { getMonthAndYearJewishDate, convertToHebrewDay } from "../utils/DatesToHebrew";
import { monthTranslations } from "../dictionary";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';

export const CalendarWithHe = ({ setDate, items, view, filter, categoryColors, onSelectItem }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const changeDate = (delta) => {
    setSelectedDate((prevDate) => {
      const newDate = new Date(prevDate);
      view === "monthly"
        ? newDate.setMonth(newDate.getMonth() + delta)
        : newDate.setDate(newDate.getDate() + delta * 7);
      return newDate;
    });
  };

  const getDays = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    
    if (view === "monthly") {
      const firstDay = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      return Array.from({ length: 42 }, (_, i) => {
        const dayObj = new Date(year, month, i - firstDay + 1);
        return {
          date: dayObj,
          isCurrentMonth: dayObj.getMonth() === month,
        };
      });
    } else {
      const startDate = startOfWeek(selectedDate);
      return Array.from({ length: 7 }, (_, i) => ({
        date: addDays(startDate, i),
        isCurrentMonth: addDays(startDate, i).getMonth() === month,
      }));
    }
  };

  const days = getDays();

  const getItemsForDay = (dayObj) => {
    return items.filter(item => 
      isSameDay(new Date(item.date), dayObj.date) &&
      (filter === "all" || item.category === filter || item.audienceAge === filter)
    ).slice(0, 3);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="bg-blue-600 text-white p-4">
        <div className="flex justify-between items-center">
          <button onClick={() => changeDate(-1)}>
            <ChevronRightIcon className="h-6 w-6" />
          </button>
          <h2 className="text-xl font-bold">
            {getMonthAndYearJewishDate(selectedDate)} / {monthTranslations[selectedDate.getMonth()]}{" "}
            {selectedDate.getFullYear()}
          </h2>
          <button onClick={() => changeDate(1)}>
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
            } min-h-[5rem] flex flex-col overflow-hidden cursor-pointer`}
            onClick={() => setDate(dayObj.date)}
          >
            <div className="flex justify-between items-center mb-1">
              <span className={dayObj.isCurrentMonth ? "text-gray-900" : "text-gray-400"}>
                {format(dayObj.date, "d")}
              </span>
              <span className="text-xs text-gray-500">{convertToHebrewDay(dayObj.date)}</span>
            </div>
            <div className="flex-grow overflow-y-auto">
              {getItemsForDay(dayObj).map((item, index) => (
                <div
                  key={index}
                  className={`text-xs ${categoryColors[item.category] || 'bg-gray-200'} text-gray-800 rounded px-1 py-0.5 mb-1 truncate cursor-pointer`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectItem(item);
                  }}
                  title={item.title || item.className}
                >
                  {format(new Date(item.date), "HH:mm")} {item.title || item.className}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};