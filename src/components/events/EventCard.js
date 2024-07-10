import { format } from "date-fns";
import { CalendarIcon, ClockIcon, LocationMarkerIcon } from '@heroicons/react/solid';

export const EventCard = ({ event }) => (
  <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-full flex flex-col transform transition-all duration-300 hover:scale-105">
    {event.imageUrl && (
      <div className="relative">
        <img src={event.imageUrl} alt={event.title} className="w-full h-48 object-cover" />
        <div className="absolute top-0 right-0 bg-blue-500 text-white px-3 py-1 rounded-bl-lg">
          {format(new Date(event.eventDate), "MMM")}
        </div>
      </div>
    )}
    <div className="p-4 flex-grow">
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{event.title}</h3>
      <div className="flex items-center text-sm text-gray-600 mb-2">
        <CalendarIcon className="w-4 h-4 mr-1" />
        <span>{format(new Date(event.eventDate), "dd MMM yyyy")}</span>
      </div>
      <div className="flex items-center text-sm text-gray-600 mb-2">
        <ClockIcon className="w-4 h-4 mr-1" />
        <span>{format(new Date(event.eventDate), "HH:mm")}</span>
      </div>
      {event.location && (
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <LocationMarkerIcon className="w-4 h-4 mr-1" />
          <span>{event.location}</span>
        </div>
      )}
      {event.description && (
        <p className="text-sm text-gray-700 line-clamp-3 mt-2">{event.description}</p>
      )}
    </div>
  </div>
);