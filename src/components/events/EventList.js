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
  }, [limit, eventList]);

  console.log(eventList);
  console.log("nearestEvents", nearestEvents);

  if (loading) return <div className="text-center">Loading events...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <div className="w-full p-4">
      <h2 className="text-2xl font-bold mb-8">Upcoming Events</h2>
      <div className="grid grid-cols-3 gap-x-2 gap-y-8">
        {nearestEvents.map((event) => (
          <div key={event.id} className="flex justify-center">
            <EventCard event={event} />
          </div>
        ))}
      </div>
    </div>
  );
};