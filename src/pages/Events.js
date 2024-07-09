import React, { useState, useEffect } from "react";
import { format, isSameDay } from "date-fns";
import { he } from "date-fns/locale";
import { EventModal } from "../components/events/EventModal";
import { CreateEvent } from "../components/events/CreateEvent";
import { useAuth } from "../contexts/AuthContext";
import { getFullJewishDate } from "../utils/DatesToHebrew";
import { CalendarWithHe } from "../components/CalendarWithHe";
import { useEvents } from "../contexts/EventsContext";

export const Events = () => {
  const { user } = useAuth();
  const [date, setDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const { getEventList, eventList } = useEvents();
  const [view, setView] = useState("monthly");

  useEffect(() => {
    getEventList();
  }, []);

  console.log(eventList);

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  const filteredEvents = eventList?.filter((event) =>
    isSameDay(new Date(event.eventDate), date)
  );

  return (
    <div className="container mx-auto px-4 pt-32 max-w-6xl">

      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-center">אירועים</h1>
        {user && (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors duration-200"
            onClick={() => setShowCreateEvent(true)}
          >
            הוסף אירוע
          </button>
        )}
      </div>

      <div className="mb-3">
        <CalendarWithHe setDate={setDate} view={view} />
        {selectedEvent && (
          <EventModal event={selectedEvent} onClose={handleCloseModal} />
        )}
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">
          אירועים ב{format(date, "dd/MM/yyyy", { locale: he })},{" "}
          {getFullJewishDate(date)}
        </h2>
        {filteredEvents?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white shadow-md rounded p-4 cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handleSelectEvent(event)}
              >
                <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                <p className="text-gray-700 mb-2">{event.description}</p>
                <p className="text-gray-500">
                  {format(new Date(event.eventDate), "HH:mm", { locale: he })}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-100 rounded p-4">
            <p>אין אירועים בתאריך זה</p>
          </div>
        )}
      </div>

      {showCreateEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-[800px] w-full relative">
            <CreateEvent onClose={() => setShowCreateEvent(false)} />
          </div>
        </div>
      )}
    </div>
  );
};