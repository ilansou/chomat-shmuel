import React, { useEffect, useState, useCallback } from "react";
import { format, isValid } from "date-fns";
import { useEvents } from "../../hooks/useEvents";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';

const EventCard = ({ event }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col">
    {event.image && (
      <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
    )}
    <div className="p-4 flex-grow">
      <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
      <p className="text-sm text-gray-600 mb-2">
        {isValid(event.date) ? format(event.date, "MMMM d, yyyy") : "Date not available"}
      </p>
      {event.description && <p className="text-sm text-gray-700">{event.description}</p>}
    </div>
  </div>
);

export const EventList = () => {
  const { getNearestEvents } = useEvents();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nearestEvents, setNearestEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchNearestEvents = useCallback(async () => {
    try {
      setLoading(true);
      const events = await getNearestEvents(12); // Fetch more events to allow for pagination
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

  const totalPages = Math.ceil(nearestEvents.length / 3);
  const currentEvents = nearestEvents.slice(currentPage * 3, (currentPage + 1) * 3);

  const goToPrevPage = () => setCurrentPage((prev) => Math.max(0, prev - 1));
  const goToNextPage = () => setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));

  return (
    <div className="max-w-6xl pt-4 mx-auto px-4">
      <div className="relative flex items-center">
        <button
          onClick={goToPrevPage}
          disabled={currentPage === 0}
          className="absolute left-0 z-10 bg-blue-500 text-white px-4 py-2 rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          <ChevronLeftIcon className="h-5 w-5 cursor-pointer" />
        </button>
        <div className="w-full overflow-hidden">
          <div className="flex transition-transform duration-700 ease-in-out"
               style={{ transform: `translateX(-${currentPage * 100}%)` }}>
            {nearestEvents.map((event) => (
              <div key={event.id} className="w-full px-14 md:w-1/3 flex-shrink-0">
                <EventCard event={event} />
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages - 1}
          className="absolute right-0 z-10 bg-blue-500 text-white px-4 py-2 rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          <ChevronRightIcon className="h-5 w-5 cursor-pointer" />
        </button>
      </div>
      <div className="flex justify-center items-center mt-6">
        <span className="text-gray-600">
          עמוד {currentPage + 1} מתוך {totalPages}
        </span>
      </div>
    </div>
  );
};
