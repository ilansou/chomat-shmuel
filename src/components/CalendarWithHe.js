import React, { useState, useEffect } from "react";
import { format, isSameDay, isSameMonth } from "date-fns";
import { he } from "date-fns/locale";
import {
  convertToHebrewDay,
  getMonthAndYearJewishDate,
} from "../utils/DatesToHebrew";
import { EventModal } from "./events/EventModal";
import { monthTranslations } from "../dictionary";
import { useEvents } from "../contexts/EventsContext";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';

export const CalendarWithHe = ({ setDate, view, audienceFilter }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [openModal, setOpenModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { eventList, getEventList } = useEvents();

  useEffect(() => {
    getEventList();
  }, []);

  const changeDate = (delta) => {
    setSelectedDate((prevDate) => {
      const newDate = new Date(prevDate);
      view === "monthly"
        ? newDate.setMonth(newDate.getMonth() + delta)
        : newDate.setDate(newDate.getDate() + delta * 7);
      return newDate;
    });
  };

  const selectDay = (dayObj) => {
    const newDate = new Date(dayObj.year, dayObj.month, dayObj.day);
    setSelectedDate(newDate);
    setDate(newDate);
  };

  const selectEvent = (event) => {
    setSelectedEvent(event);
    setOpenModal(true);
  };

  const getDaysInMonth = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    for (let i = 0; i < 42; i++) {
      const dayObj = new Date(year, month, i - firstDay + 1);
      days.push({
        day: dayObj.getDate(),
        month: dayObj.getMonth(),
        year: dayObj.getFullYear(),
        date: dayObj,
        isCurrentMonth: dayObj.getMonth() === month,
      });
    }
    return days;
  };

  const getDaysInWeek = () => {
    const startOfWeek = new Date(selectedDate);
    startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay());
    
    return Array.from({ length: 7 }, (_, i) => {
      const dayObj = new Date(startOfWeek);
      dayObj.setDate(startOfWeek.getDate() + i);
      return {
        day: dayObj.getDate(),
        month: dayObj.getMonth(),
        year: dayObj.getFullYear(),
        date: dayObj,
        isCurrentMonth: dayObj.getMonth() === selectedDate.getMonth(),
      };
    });
  };

  const days = view === "monthly" ? getDaysInMonth() : getDaysInWeek();

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedEvent(null);
  };

  const filteredEventList = audienceFilter === "all" ? eventList : eventList.filter((event) => event.audienceAge === audienceFilter);

  return (
    <div className="w-full max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="bg-blue-600 text-white p-4">
        <div className="flex justify-between items-center">
          <button
            className="text-white hover:bg-blue-700 rounded-full p-2 transition-colors duration-200"
            onClick={() => changeDate(-1)}
          >
            <ChevronRightIcon className="h-6 w-6" />
          </button>
          <h2 className="text-xl font-bold">
            {getMonthAndYearJewishDate(selectedDate)} / {monthTranslations[selectedDate.getMonth()]}{" "}
            {selectedDate.getFullYear()}
          </h2>
          <button
            className="text-white hover:bg-blue-700 rounded-full p-2 transition-colors duration-200"
            onClick={() => changeDate(1)}
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 p-4">
        {["א'", "ב'", "ג'", "ד'", "ה'", "ו'", "ש'"].map((day, index) => (
          <div key={index} className="font-bold text-center py-2">
            {day}
          </div>
        ))}

{days.map((dayObj, idx) => (
          <div
            key={idx}
            className={`p-1 border rounded-lg ${
              dayObj.isCurrentMonth ? "bg-white" : "bg-gray-100"
            } ${
              isSameDay(dayObj.date, selectedDate) ? "border-blue-500" : "border-gray-200"
            } min-h-[5rem] flex flex-col overflow-hidden transition-all duration-200 hover:shadow-md cursor-pointer`}
            onClick={() => selectDay(dayObj)}
          >
            <div className="flex justify-between items-center mb-1">
              <span className={`text-sm ${dayObj.isCurrentMonth ? "text-gray-900" : "text-gray-400"}`}>
                {dayObj.day}
              </span>
              <span className="text-xs text-gray-500">{convertToHebrewDay(dayObj.date)}</span>
            </div>
            <div className="flex-grow overflow-y-auto">
              {filteredEventList
                .filter((ev) => isSameDay(new Date(ev.eventDate), dayObj.date))
                .slice(0, 3)
                .map((ev) => (
                  <div
                    key={ev.id}
                    className="text-xs bg-blue-100 text-blue-800 rounded px-1 py-0.5 mb-1 truncate cursor-pointer hover:bg-blue-200 transition-colors duration-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      selectEvent(ev);
                    }}
                    title={ev.title}
                  >
                    {format(new Date(ev.eventDate), "HH:mm")} {ev.title}
                  </div>
                ))}
              {filteredEventList.filter((ev) => isSameDay(new Date(ev.eventDate), dayObj.date)).length > 3 && (
                <div className="text-xs text-gray-500">
                  +{filteredEventList.filter((ev) => isSameDay(new Date(ev.eventDate), dayObj.date)).length - 3} more
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {openModal && selectedEvent && (
        <EventModal event={selectedEvent} onClose={handleCloseModal} />
      )}
    </div>
  );
};