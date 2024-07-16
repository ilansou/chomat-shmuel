import React, { useState } from "react";
import {
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  addDays,
  subDays,
} from "date-fns";
import { getMonthAndYearJewishDate, convertToHebrewDay } from "../../utils/dateUtils";
import { monthTranslations } from "../../dictionary";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";

const monthColors = [
  "bg-red-500",
  "bg-orange-500",
  "bg-amber-500",
  "bg-yellow-500",
  "bg-lime-500",
  "bg-green-500",
  "bg-emerald-500",
  "bg-teal-500",
  "bg-cyan-500",
  "bg-sky-500",
  "bg-blue-500",
  "bg-indigo-500",
];

export const EventCalendar = ({
  setDate,
  events,
  filter,
  categoryColors,
  onSelectEvent,
  onAddEvent,
  user,
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const today = new Date();

  const changeDate = (delta) => {
    setSelectedDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + delta);
      return newDate;
    });
  };

  const getDays = () => {
    const monthStart = startOfMonth(selectedDate);
    const monthEnd = endOfMonth(selectedDate);
    const startDate = subDays(monthStart, monthStart.getDay());
    const endDate = addDays(monthEnd, 6 - monthEnd.getDay());
    return eachDayOfInterval({ start: startDate, end: endDate });
  };

  const days = getDays();
  const currentMonthColor = monthColors[selectedDate.getMonth()];

  const getEventsForDay = (dayObj) => {
    return events
      .filter(
        (event) =>
          isSameDay(new Date(event.eventDate), dayObj) &&
          (filter === "all" || event.audienceAge === filter)
      )
      .slice(0, 3);
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
      <div className={`${currentMonthColor} text-white p-4`}>
        <div className="flex justify-between items-center">
          <button
            className="bg-white text-gray-800 rounded-full p-1 transition-colors duration-200 hover:bg-gray-200"
            onClick={() => changeDate(-1)}>
            <ChevronRightIcon className="h-6 w-6" />
          </button>
          <div className="flex items-center space-x-4">
            <h2 className="text-xl ml-8 font-bold">
              {getMonthAndYearJewishDate(selectedDate)} /{" "}
              {monthTranslations[selectedDate.getMonth()]} {selectedDate.getFullYear()}
            </h2>
            <button
              className="bg-white text-gray-800 text-sm font-medium py-1 px-3 rounded-full transition-colors duration-200 hover:bg-gray-200"
              onClick={goToToday}>
              היום
            </button>
          </div>
          <div className="flex items-center">
            {user && (
              <button
                className="bg-white ml-2 text-gray-800 text-sm font-medium py-1 px-3 rounded-full transition-colors duration-200 hover:bg-gray-200"
                onClick={onAddEvent}>
                הוסף אירוע
              </button>
            )}
            <button
              className="bg-white text-gray-800 rounded-full p-1 transition-colors duration-200 hover:bg-gray-200 ml-2"
              onClick={() => changeDate(1)}>
              <ChevronLeftIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 p-2 bg-gray-100">
        {["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"].map((day, index) => (
          <div key={index} className="font-bold text-center py-2 text-gray-700 text-m">
            {day}
          </div>
        ))}

        {days.map((day, idx) => {
          const isToday = isSameDay(day, today);
          const isSelected = isSameDay(day, selectedDate);

          return (
            <div
              key={idx}
              className={`bg-white p-1 rounded-lg ${
                isSameMonth(day, selectedDate) ? "" : "opacity-50"
              } ${isToday ? "ring-4 ring-blue-500" : ""} ${
                isSelected ? `ring-2 ${currentMonthColor.replace("bg-", "ring-")}` : ""
              } min-h-[100px] flex flex-col overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-md`}
              onClick={() => handleDateClick(day)}>
              <div className="flex justify-between items-center mb-1">
                <span
                  className={`text-lg font-bold ${
                    isSameMonth(day, selectedDate) ? "text-gray-800" : "text-gray-400"
                  }`}>
                  {format(day, "d")}
                </span>
                <span className="text-s text-gray-500 font-medium">{convertToHebrewDay(day)}</span>
              </div>
              <div className="flex-grow overflow-y-auto">
                {getEventsForDay(day).map((eventItem, index) => (
                  <div
                    key={index}
                    className={`text-sm ${
                      categoryColors[eventItem.audienceAge] || "bg-gray-200"
                    } text-black rounded-full px-2 py-0.5 mb-0.5 truncate cursor-pointer hover:opacity-80 transition-all duration-100`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectEvent(eventItem);
                    }}
                    title={eventItem.title}>
                    {format(eventItem.eventDate, "HH:mm")} {eventItem.title}
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
