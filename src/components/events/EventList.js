import React, { useEffect, useState, useCallback } from "react";
import { format } from "date-fns";
import { useEvents } from "../../contexts/EventsContext";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';

const EventCard = ({ event }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col">
    {event.imageUrl && (
      <img src={event.imageUrl} alt={event.title} className="w-full h-48 object-cover" />
    )}
    <div className="p-4 flex-grow">
      <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
      <p className="text-sm text-gray-500 mb-2">
        {format(new Date(event.eventDate), "dd/MM/yyyy HH:mm")}
      </p>
      {event.description && (
        <p className="text-sm text-gray-700 line-clamp-3">{event.description}</p>
      )}
    </div>
  </div>
);

export const EventList = () => {
  const { getNearestEvents } = useEvents();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nearestEvents, setNearestEvents] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchNearestEvents = useCallback(async () => {
    try {
      setLoading(true);
      const events = await getNearestEvents(12);
      setNearestEvents(events);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [getNearestEvents]);

  useEffect(() => {
    fetchNearestEvents();
  }, [fetchNearestEvents]);

  if (loading) {
    return <p className="text-gray-500 text-center">טוען אירועים...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  if (nearestEvents.length === 0) {
    return <p className="text-gray-500 text-center">לא נמצאו אירועים.</p>;
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % nearestEvents.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + nearestEvents.length) % nearestEvents.length);
  };

  return (
    <div className="mt-8 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold mb-6 text-center">אירועים קרובים</h2>
      <div className="relative">
        <div className="overflow-hidden">
          <div 
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(${currentIndex * -33.33}%)` }}
          >
            {nearestEvents.map((event, index) => (
              <div key={event.id} className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 px-2">
                <EventCard event={event} />
              </div>
            ))}
          </div>
        </div>
        <div className="absolute inset-y-0 left-0 flex items-center">
          <button 
            onClick={handlePrev}
            className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors duration-200"
          >
            <ChevronLeftIcon className="h-6 w-6 text-gray-600" />
          </button>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center">
          <button 
            onClick={handleNext}
            className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors duration-200"
          >
            <ChevronRightIcon className="h-6 w-6 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
};