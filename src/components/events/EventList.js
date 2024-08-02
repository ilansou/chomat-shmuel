import React, { useEffect, useState } from "react";
import { useEvents } from "../../contexts/EventsContext";
import { EventCard } from "./EventCard";
import { EventModal } from "./EventModal";
import { ClipLoader } from "react-spinners";

export const EventList = ({ limit = 8 }) => {
  const { eventList, loading } = useEvents();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [nearestEvents, setNearestEvents] = useState([]);

  useEffect(() => {
    if (eventList.length > 0) {
      const now = new Date();
      const todayStart = new Date(now.setHours(0, 0, 0, 0));

      const upcomingEvents = eventList.filter((event) => {
        const eventDate = new Date(event.eventDate);
        return eventDate >= todayStart;
      });
      const sorted = upcomingEvents.sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));
      setNearestEvents(sorted.slice(0, limit));
    }
  }, [limit, eventList]);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-48">
        <ClipLoader color={"#000"} loading={loading} size={50} />
      </div>
    );

  return (
    <div className="w-full">
      <div className="grid grid-cols-4 gap-x-2 gap-y-8 mt-4">
        {nearestEvents.map((event) => (
          <div
            key={event.id}
            className="flex justify-center"
            onClick={() => handleEventClick(event)}>
            <EventCard event={event} />
          </div>
        ))}
      </div>
      {selectedEvent && <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />}
    </div>
  );
};