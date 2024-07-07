// import React, { useState, useEffect } from "react";
// import {
//   convertToHebrewDay,
//   getMonthAndYearJewishDate,
// } from "../utils/DatesToHebrew";
// import { EventModal } from "./events/EventModal";
// import { monthTranslations } from "../dictionary";
// import { useEvents } from "../hooks/useEvents";

// export const CalendarWithHe = ({ setDate, view }) => {
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [openModal, setOpenModal] = useState(false);
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const { eventList, getEventList } = useEvents();

//   useEffect(() => {
//     getEventList();
//   }, [])

//   const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

//   const getMonthDays = (year, month, isCurrentMonth = true) => {
//     const daysCount = daysInMonth(year, month);
//     return Array.from({ length: daysCount }, (_, i) => ({
//       day: i + 1,
//       isCurrentMonth,
//       date: new Date(year, month, i + 1),
//       month,
//       year,
//     }));
//   };

//   const changeDate = (delta, isMonth) => {
//     setSelectedDate((prevDate) => {
//       const newDate = new Date(prevDate);
//       isMonth
//         ? newDate.setMonth(newDate.getMonth() + delta)
//         : newDate.setDate(newDate.getDate() + delta * 7);
//       return newDate;
//     });
//   };

//   const selectDay = (dayObj) => {
//     const newDate = new Date(dayObj.year, dayObj.month, dayObj.day);
//     setSelectedDate(newDate);
//     setDate(newDate);
//   };

//   const selectEvent = (event) => {
//     setSelectedEvent(event);
//     setOpenModal(true);
//   };

//   const year = selectedDate.getFullYear();
//   const month = selectedDate.getMonth();
//   const daysCount = daysInMonth(year, month);
//   const firstDayOfMonth = new Date(year, month, 1).getDay();
//   const weeks = [[]];

//   if (view === "monthly") {
//     const previousMonth = month === 0 ? 11 : month - 1;
//     const previousMonthYear = month === 0 ? year - 1 : year;
//     const previousMonthDays = getMonthDays(
//       previousMonthYear,
//       previousMonth,
//       false
//     ).slice(-firstDayOfMonth);

//     // Fill in previous month days
//     weeks[0] = previousMonthDays;

//     // Fill in current month days
//     weeks[0] = weeks[0].concat(getMonthDays(year, month));

//     // Fill in next month days to complete the last week
//     const remainingDays = 7 - (weeks[0].length % 7);
//     const nextMonth = month === 11 ? 0 : month + 1;
//     const nextMonthYear = month === 11 ? year + 1 : year;
//     const nextMonthDays = getMonthDays(nextMonthYear, nextMonth, false).slice(
//       0,
//       remainingDays
//     );

//     weeks[0] = weeks[0].concat(nextMonthDays);
//   } else if (view === "weekly") {
//     const startOfWeek = new Date(selectedDate);
//     startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay());

//     for (let i = 0; i < 7; i++) {
//       const currentDate = new Date(startOfWeek);
//       currentDate.setDate(startOfWeek.getDate() + i);
//       weeks[0].push({
//         day: currentDate.getDate(),
//         isCurrentMonth: currentDate.getMonth() === month,
//         date: currentDate,
//         month: currentDate.getMonth(),
//         year: currentDate.getFullYear(),
//       });
//     }
//   }

//   const eventOccursOnDate = (eventDate, calendarDate) => {
//     const eventDateObj = new Date(eventDate);
//     if (isNaN(eventDateObj)) return false;

//     const eventDateString = `${eventDateObj.getFullYear()}-${String(
//       eventDateObj.getMonth() + 1
//     ).padStart(2, "0")}-${String(eventDateObj.getDate()).padStart(2, "0")}`;
//     const calendarDateString = `${calendarDate.year}-${String(
//       calendarDate.month + 1
//     ).padStart(2, "0")}-${String(calendarDate.day).padStart(2, "0")}`;

//     return eventDateString === calendarDateString;
//   };

//   const handleCloseModal = () => {
//     setOpenModal(false);
//     setSelectedEvent(null);
//   };

//   return (
//     <div className="w-full m-6">
//       <h2>
//         {getMonthAndYearJewishDate(selectedDate)} / {monthTranslations[month]}{" "}
//         {year}
//       </h2>
//       <div className="flex justify-center mb-4">
//         <button
//           className="mr-2 px-4 py-2 bg-gray-200 rounded"
//           onClick={() =>
//             changeDate(view === "monthly" ? -1 : -7, view === "monthly")
//           }
//         >
//           {view === "monthly" ? "Previous Month" : "Previous Week"}
//         </button>
//         <button
//           className="ml-2 px-4 py-2 bg-gray-200 rounded"
//           onClick={() =>
//             changeDate(view === "monthly" ? 1 : 7, view === "monthly")
//           }
//         >
//           {view === "monthly" ? "Next Month" : "Next Week"}
//         </button>
//       </div>

//       <div className="grid grid-cols-7 gap-1 w-full">
//         {["א'", "ב'", "ג'", "ד'", "ה'", "ו'", "ש'"].map((day, index) => (
//           <div key={index} className="font-bold">
//             {day}
//           </div>
//         ))}

//         {weeks.flat().map((dayObj, idx) => (
//           <div
//             key={idx}
//             className={`p-2 ${
//               dayObj.isCurrentMonth ? "" : "bg-gray-200"
//             } min-h-[3rem] flex flex-col justify-between overflow-hidden`}
//             onClick={() => selectDay(dayObj)}
//           >
//             <div>{dayObj.day}</div>
//             <div className="text-sm">{convertToHebrewDay(dayObj.date)}</div>
//             <div className="events-container">
//               {eventList
//                 .filter((ev) => eventOccursOnDate(ev.eventDate, dayObj))
//                 .map((ev) => (
//                   <div
//                     key={ev.id}
//                     className={`event truncate ${
//                       selectedDate.getTime() ===
//                       new Date(ev.eventDate).getTime()
//                         ? "selected-event"
//                         : ""
//                     }`}
//                     onClick={() => selectEvent(ev)}
//                     title={ev.title}
//                   >
//                     <span>{ev.title}</span>
//                   </div>
//                 ))}
//             </div>
//           </div>
//         ))}
//       </div>

//       {openModal && selectedEvent && (
//         <EventModal event={selectedEvent} onClose={handleCloseModal} />
//       )}
//     </div>
//   );
// };

import React, { useState, useEffect } from "react";
import {
  convertToHebrewDay,
  getMonthAndYearJewishDate,
} from "../utils/DatesToHebrew";
import { EventModal } from "./events/EventModal";
import { monthTranslations } from "../dictionary";
import { useEvents } from "../hooks/useEvents";

export const CalendarWithHe = ({ setDate, view }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [openModal, setOpenModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { eventList, getEventList } = useEvents();

  useEffect(() => {
    getEventList();
  }, []);

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

  const getMonthDays = (year, month, isCurrentMonth = true) => {
    const daysCount = daysInMonth(year, month);
    return Array.from({ length: daysCount }, (_, i) => ({
      day: i + 1,
      isCurrentMonth,
      date: new Date(year, month, i + 1),
      month,
      year,
    }));
  };

  const changeDate = (delta, isMonth) => {
    setSelectedDate((prevDate) => {
      const newDate = new Date(prevDate);
      isMonth
        ? newDate.setMonth(newDate.getMonth() + delta)
        : newDate.setDate(newDate.getDate() + delta * 7);
      return newDate;
    });

    // Calculate start and end dates based on the selected view
    let startDate, endDate;
    if (view === "monthly") {
      startDate = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        1
      );
      endDate = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth() + 1,
        0
      );
    } else if (view === "weekly") {
      startDate = new Date(selectedDate);
      startDate.setDate(selectedDate.getDate() - selectedDate.getDay());
      endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 6);
    }

    getEventList(startDate, endDate, true); // Fetch events with pagination
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

  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();
  const daysCount = daysInMonth(year, month);
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const weeks = [[]];

  if (view === "monthly") {
    const previousMonth = month === 0 ? 11 : month - 1;
    const previousMonthYear = month === 0 ? year - 1 : year;
    const previousMonthDays = getMonthDays(
      previousMonthYear,
      previousMonth,
      false
    ).slice(-firstDayOfMonth);

    // Fill in previous month days
    weeks[0] = previousMonthDays;

    // Fill in current month days
    weeks[0] = weeks[0].concat(getMonthDays(year, month));

    // Fill in next month days to complete the last week
    const remainingDays = 7 - (weeks[0].length % 7);
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextMonthYear = month === 11 ? year + 1 : year;
    const nextMonthDays = getMonthDays(nextMonthYear, nextMonth, false).slice(
      0,
      remainingDays
    );

    weeks[0] = weeks[0].concat(nextMonthDays);
  } else if (view === "weekly") {
    const startOfWeek = new Date(selectedDate);
    startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay());

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(startOfWeek);
      currentDate.setDate(startOfWeek.getDate() + i);
      weeks[0].push({
        day: currentDate.getDate(),
        isCurrentMonth: currentDate.getMonth() === month,
        date: currentDate,
        month: currentDate.getMonth(),
        year: currentDate.getFullYear(),
      });
    }
  }

  const eventOccursOnDate = (eventDate, calendarDate) => {
    const eventDateObj = new Date(eventDate);
    if (isNaN(eventDateObj)) return false;

    const eventDateString = `${eventDateObj.getFullYear()}-${String(
      eventDateObj.getMonth() + 1
    ).padStart(2, "0")}-${String(eventDateObj.getDate()).padStart(2, "0")}`;

    const calendarDateString = `${calendarDate.year}-${String(
      calendarDate.month + 1
    ).padStart(2, "0")}-${String(calendarDate.day).padStart(2, "0")}`;

    return eventDateString === calendarDateString;
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedEvent(null);
  };

  return (
    <div className="w-full m-6">
      <h2>
        {getMonthAndYearJewishDate(selectedDate)} / {monthTranslations[month]}{" "}
        {year}
      </h2>
      <div className="flex justify-center mb-4">
        <button
          className="mr-2 px-4 py-2 bg-gray-200 rounded"
          onClick={() =>
            changeDate(view === "monthly" ? -1 : -7, view === "monthly")
          }
        >
          {view === "monthly" ? "Previous Month" : "Previous Week"}
        </button>
        <button
          className="ml-2 px-4 py-2 bg-gray-200 rounded"
          onClick={() =>
            changeDate(view === "monthly" ? 1 : 7, view === "monthly")
          }
        >
          {view === "monthly" ? "Next Month" : "Next Week"}
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 w-full">
        {["א'", "ב'", "ג'", "ד'", "ה'", "ו'", "ש'"].map((day, index) => (
          <div key={index} className="font-bold">
            {day}
          </div>
        ))}

        {weeks.flat().map((dayObj, idx) => (
          <div
            key={idx}
            className={`p-2 ${
              dayObj.isCurrentMonth ? "" : "bg-gray-200"
            } min-h-[3rem] flex flex-col justify-between overflow-hidden`}
            onClick={() => selectDay(dayObj)}
          >
            <div>{dayObj.day}</div>
            <div className="text-sm">{convertToHebrewDay(dayObj.date)}</div>
            <div className="events-container">
              {eventList
                .filter((ev) => eventOccursOnDate(ev.eventDate, dayObj))
                .map((ev) => (
                  <div
                    key={ev.id}
                    className={`event truncate ${
                      selectedDate.getTime() ===
                      new Date(ev.eventDate).getTime()
                        ? "selected-event"
                        : ""
                    }`}
                    onClick={() => selectEvent(ev)}
                    title={ev.title}
                  >
                    <span>{ev.title}</span>
                  </div>
                ))}
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
