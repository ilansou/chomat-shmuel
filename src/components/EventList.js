import React from "react";
import { format, startOfWeek, endOfWeek, eachDayOfInterval, isValid } from "date-fns";

const EventCard = ({ event }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    {event.image && (
      <img src={event.image} alt={event.title} className="w-full h-40 object-cover" />
    )}
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
      <p className="text-sm text-gray-600 mb-2">
        {isValid(event.date) ? format(event.date, "MMMM d, yyyy") : "Date not available"}
      </p>
      {event.description && <p className="text-sm text-gray-700">{event.description}</p>}
    </div>
  </div>
);

export const EventList = ({ events }) => {
  const today = new Date();
  const weekStart = startOfWeek(today);
  const weekEnd = endOfWeek(today);
  const daysOfWeek = eachDayOfInterval({ start: weekStart, end: weekEnd });

  // Filter out events with invalid dates
  const validEvents = events?.filter((event) => event && isValid(new Date(event.date))) || [];

  if (validEvents.length === 0) {
    return <p className="text-gray-500">לא נמצאו אירועים.</p>;
  }

  return (
    <div className="space-y-4">
      {daysOfWeek.map((day) => {
        const dayEvents = validEvents.filter((event) => {
          const eventDate = new Date(event.date);
          return (
            isValid(eventDate) && format(eventDate, "yyyy-MM-dd") === format(day, "yyyy-MM-dd")
          );
        });

        return (
          <div key={format(day, "yyyy-MM-dd")}>
            <h2 className="text-xl font-bold mb-2">{format(day, "EEEE, MMMM d")}</h2>
            {dayEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {dayEvents.map((event, index) => (
                  <EventCard key={index} event={event} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No events available for this day.</p>
            )}
          </div>
        );
      })}
    </div>
  );
};
