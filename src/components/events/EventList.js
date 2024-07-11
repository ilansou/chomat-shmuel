import React, { useEffect, useState } from "react";
import { useEvents } from "../../contexts/EventsContext";
import { EventCard } from "./EventCard";
import { EventModal } from "./EventModal";

export const EventList = ({ limit = 8 }) => {
  const { eventList, getEventList } = useEvents();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [nearestEvents, setNearestEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        await getEventList();
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    if (eventList.length > 0) {
      const now = new Date();
      const upcomingEvents = eventList.filter(event => new Date(event.eventDate) >= now);
      const sorted = upcomingEvents.sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));
      setNearestEvents(sorted.slice(0, limit));
    }
  }, [limit, eventList]);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  if (loading) return <div className="text-center">Loading events...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-gray-800 pb-2 border-b-2 border-gray-300">אירועים קרובים</h2>
      <div className="grid grid-cols-4 gap-x-2 gap-y-8 mt-4">
        {nearestEvents.map((event) => (
          <div key={event.id} className="flex justify-center" onClick={() => handleEventClick(event)}>
            <EventCard event={event} />
          </div>
        ))}
      </div>
      {selectedEvent && (
        <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </div>
  );
};