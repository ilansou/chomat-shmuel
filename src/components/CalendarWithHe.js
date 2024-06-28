// import React, { useState } from "react";
// import { convertToHebrewDay, getFullJewishDate, getMonthAndYearJewishDate } from "../utils/hebrewDate";

// export const CalendarWithHe = () => {
//   const [selectedDate, setSelectedDate] = useState(new Date());

//   const daysInMonth = (year, month) => {
//     return new Date(year, month + 1, 0).getDate();
//   };

//   const getPreviousMonthDays = (year, month, firstDayOfMonth) => {
//     const previousMonth = month === 0 ? 11 : month - 1; // Handle wrap around to previous year
//     const previousMonthYear = month === 0 ? year - 1 : year;
//     const daysInPreviousMonth = daysInMonth(previousMonthYear, previousMonth);
//     const previousMonthDays = [];

//     for (let i = firstDayOfMonth - 1; i >= 0; i--) {
//       previousMonthDays.push({
//         day: daysInPreviousMonth - i,
//         month: previousMonth, 
//         year: previousMonthYear
//       });
//     }

//     return previousMonthDays.reverse();
//   };

//   const year = selectedDate.getFullYear();
//   const month = selectedDate.getMonth();
//   const daysCount = daysInMonth(year, month);

//   const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 for Sunday, 1 for Monday, etc.
//   const weeks = [[]];
//   let currentWeek = 0;

//   const previousMonthDays = getPreviousMonthDays(year, month, firstDayOfMonth);

//   // Fill in previous month days
//   for (let i = 0; i < previousMonthDays.length; i++) {
//     weeks[currentWeek].unshift({
//       day: previousMonthDays[i].day,
//       isCurrentMonth: false,
//       date: new Date(year, month + 1, previousMonthDays[i].day),
//       month: previousMonthDays[i].month + 1,
//       year: previousMonthDays[i].year
//     });
    
//   }

//   // Fill in current month days
//   for (let day = 1; day <= daysCount; day++) {
//     if (weeks[currentWeek].length === 7) {
//       weeks.push([]);
//       currentWeek++;
//     }
//     weeks[currentWeek].push({
//       day: day,
//       isCurrentMonth: true,
//       date: new Date(year, month, day),
//       month: month + 1,
//       year: year
//     });
//   }

//   console.log(currentWeek, weeks[currentWeek]);
//   // Ensure last week is filled
//   const lastWeek = weeks[weeks.length - 1];
//   let i = 1;
//   console.log(lastWeek, " last week", lastWeek.length);
//   while (lastWeek.length < 7) {
//     const nextMonthDay = i;
//     lastWeek.push({
//       day: nextMonthDay,
//       isCurrentMonth: false,
//       date: new Date(year, month + 2, nextMonthDay),
//       month: month + 2,
//       year: month === 11 ? year + 1 : year
//     });
//     i++;
//   }
//   console.log(weeks, " weeks");
//   return (
//     <div className="w-full m-6">
//       <h2>{getMonthAndYearJewishDate(selectedDate)}</h2>
//       <div className="grid grid-cols-7 gap-1 w-full">
//         {/* Header with Hebrew days */}
//         <div className="font-bold">א'</div>
//         <div className="font-bold">ב'</div>
//         <div className="font-bold">ג'</div>
//         <div className="font-bold">ד'</div>
//         <div className="font-bold">ה'</div>
//         <div className="font-bold">ו'</div>
//         <div className="font-bold">ש'</div>

//         {/* Calendar days */}
//         {weeks.map((week, index) => (
//           week.map((dayObj, idx) => (
//             <div
//               key={idx}
//               className={`p-2 ${dayObj.isCurrentMonth ? '' : 'bg-gray-200'}`}
//               style={{ minHeight: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
//             >
//                 {dayObj.day !== null ? (
//                   <>
//                     <div>{dayObj.day}</div>
//                     <div>{convertToHebrewDay(new Date(year,month,dayObj.day))}</div>
//                   </>
//                 ) : (
//                   ""
//                 )}
//               </div>
//             ))
//           ))}
//         </div>
//       </div>
//     );
//   };


import React, { useState } from "react";
import { convertToHebrewDay, getFullJewishDate, getMonthAndYearJewishDate } from "../utils/hebrewDate";

export const CalendarWithHe = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const daysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getPreviousMonthDays = (year, month, firstDayOfMonth) => {
    const previousMonth = month === 0 ? 11 : month - 1; // Handle wrap around to previous year
    const previousMonthYear = month === 0 ? year - 1 : year;
    const daysInPreviousMonth = daysInMonth(previousMonthYear, previousMonth);
    const previousMonthDays = [];

    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      previousMonthDays.push(daysInPreviousMonth - i);
    }

    return previousMonthDays.reverse();
  };

  const getNextMonthDays = (year, month, remainingDays) => {
    const nextMonth = month === 11 ? 0 : month + 1; // Handle wrap around to next year
    const nextMonthYear = month === 11 ? year + 1 : year;
    const nextMonthDays = [];

    for (let i = 1; i <= remainingDays; i++) {
      nextMonthDays.push(i);
    }

    return nextMonthDays.map(day => ({
      day,
      isCurrentMonth: false,
      date: new Date(nextMonthYear, nextMonth, day),
      month: nextMonth,
      year: nextMonthYear,
    }));
  };

  const changeMonth = (delta) => {
    setSelectedDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + delta);
      return newDate;
    });
  };

  const selectDay = (dayObj) => {
    setSelectedDate(new Date(dayObj.year, dayObj.month, dayObj.day));
  };

  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();
  const daysCount = daysInMonth(year, month);

  const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 for Sunday, 1 for Monday, etc.
  const weeks = [[]];
  let currentWeek = 0;

  const previousMonthDays = getPreviousMonthDays(year, month, firstDayOfMonth);

  // Fill in previous month days
  for (let i = 0; i < previousMonthDays.length; i++) {
    weeks[currentWeek].push({
      day: previousMonthDays[i],
      isCurrentMonth: false,
      date: new Date(year, month - 1, previousMonthDays[i]),
      month: month === 0 ? 11 : month - 1,
      year: month === 0 ? year - 1 : year,
    });
  }

  // Fill in current month days
  for (let day = 1; day <= daysCount; day++) {
    if (weeks[currentWeek].length === 7) {
      weeks.push([]);
      currentWeek++;
    }
    weeks[currentWeek].push({
      day: day,
      isCurrentMonth: true,
      date: new Date(year, month, day),
      month: month,
      year: year,
    });
  }

  // Fill in next month days to complete the last week
  const lastWeek = weeks[weeks.length - 1];
  const remainingDays = 7 - lastWeek.length;
  const nextMonthDays = getNextMonthDays(year, month, remainingDays);

  nextMonthDays.forEach(dayObj => {
    lastWeek.push(dayObj);
  });

  return (
    <div className="w-full m-6">
      <h2>{getMonthAndYearJewishDate(selectedDate)}</h2>
      <div className="flex justify-center mb-4">
        <button
          className="mr-2 px-4 py-2 bg-gray-200 rounded"
          onClick={() => changeMonth(-1)}
        >
          Previous Month
        </button>
        <button
          className="ml-2 px-4 py-2 bg-gray-200 rounded"
          onClick={() => changeMonth(1)}
        >
          Next Month
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 w-full">
        {/* Header with Hebrew days */}
        <div className="font-bold">א'</div>
        <div className="font-bold">ב'</div>
        <div className="font-bold">ג'</div>
        <div className="font-bold">ד'</div>
        <div className="font-bold">ה'</div>
        <div className="font-bold">ו'</div>
        <div className="font-bold">ש'</div>

        {/* Calendar days */}
        {weeks.map((week, index) => (
          week.map((dayObj, idx) => (
            <div
              key={idx}
              className={`p-2 ${dayObj.isCurrentMonth ? '' : 'bg-gray-200'}`}
              style={{ minHeight: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
              onClick={() => dayObj.day !== null && selectDay(dayObj)}
            >
              {dayObj.day !== null ? (
                <>
                  <div>{dayObj.day}</div>
                  <div>{convertToHebrewDay(dayObj.date)}</div>
                </>
              ) : (
                ""
              )}
            </div>
          ))
        ))}
      </div>
    </div>
  );
};
