import { format } from "date-fns";
import { CalendarIcon, ClockIcon, LocationMarkerIcon } from '@heroicons/react/solid';

export const EventCard = ({ event }) => (
  <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col transform transition-all duration-300 hover:scale-105 w-64 h-96">
    {event.imageUrl && (
      <div className="relative h-40">
        <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
        <div className="absolute top-0 right-0 bg-blue-500 text-white px-3 py-1 rounded-bl-lg">
          {format(new Date(event.eventDate), "MMM")}
        </div>
      </div>
    )}
    <div className="p-4 flex-grow flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-semibold mb-2 text-gray-800 line-clamp-2">{event.title}</h3>
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <CalendarIcon className="w-4 h-4 mr-1" />
          <span>{format(event.eventDate, "dd MMM yyyy")}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <ClockIcon className="w-4 h-4 mr-1" />
          <span>{format(new Date(event.eventDate), "HH:mm")}</span>
        </div>
        {event.location && (
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <LocationMarkerIcon className="w-4 h-4 mr-1" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
        )}
      </div>
      {event.description && (
        <p className="text-sm text-gray-700 line-clamp-3 mt-2">{event.description}</p>
      )}
    </div>
  </div>
);