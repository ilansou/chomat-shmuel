import React, { useState } from "react";
import Calendar from "react-calendar";
import { format } from "date-fns";
import { he } from "date-fns/locale";
import "react-calendar/dist/Calendar.css"; // Ensure you import the calendar's default styles

const eventDates = [
    new Date(2024, 5, 5), // Example event date
    new Date(2024, 5, 10), // Another example event date
];

export const Events = () => {
    const [date, setDate] = useState(new Date());

    const isEventDate = (date) => {
        return eventDates.some((eventDate) => eventDate.toDateString() === date.toDateString());
    };

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-8 text-center">אירועים</h1>
            <div className="flex flex-col lg:flex-row justify-center">
                <div className="bg-white shadow-lg rounded-lg p-6 mb-8 lg:mb-0 lg:mr-8 w-full lg:w-3/4">
                    <Calendar
                        value={date}
                        onChange={setDate}
                        locale="he"
                        formatMonthYear={(locale, date) =>
                            format(date, "LLLL yyyy", { locale: he })
                        }
                        formatShortWeekday={(locale, date) =>
                            format(date, "EEEEEE", { locale: he })
                        }
                        tileClassName={({ date, view }) => {
                            if (view === "month" && date.getDate() === new Date().getDate()) {
                                return "bg-blue-500 text-white rounded-lg";
                            }
                            if (isEventDate(date)) {
                                return "bg-white rounded-lg";
                            }
                            return "bg-white hover:bg-gray-200 rounded-lg transition-all duration-200";
                        }}
                        tileContent={({ date, view }) => {
                            if (view === "month" && isEventDate(date)) {
                                return (
                                    <div className="h-2 w-2 bg-red-500 rounded-full mx-auto mt-1" />
                                );
                            }
                        }}
                        className="w-full text-xl"
                    />
                </div>
                <div className="w-full lg:w-1/4">
                    <h2 className="text-2xl font-bold mb-4">
                        אירועים ב{format(date, "dd/MM/yyyy", { locale: he })}
                    </h2>
                    {/* Placeholder for events, replace with actual event components */}
                    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
                        <p className="text-lg">אין אירועים לתאריך זה.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Events;
