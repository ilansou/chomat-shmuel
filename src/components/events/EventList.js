import React, { useEffect, useState } from "react";
import { useEvents } from "../../contexts/EventsContext";
import { EventCard } from "./EventCard";

export const EventList = ({ limit = 6 }) => {
  const { eventList, getEventList } = useEvents();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
      const sorted = [...eventList].sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));
      setNearestEvents(sorted.slice(0, limit));
    }
  }, [eventList, limit]);

  if (loading) return <div className="text-center">Loading events...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <div className="w-full lg:w-3/5 p-4">
      <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {nearestEvents.map((event) => (
          <div key={event.id} className="w-full">
            <EventCard event={event} />
          </div>
        ))}
      </div>
    </div>
  );
};