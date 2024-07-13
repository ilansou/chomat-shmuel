import { format } from "date-fns";
import { CalendarIcon, ClockIcon, LocationMarkerIcon } from '@heroicons/react/solid';
import { getFullJewishDate } from "../../utils/dateUtils";

const getHebrewMonth = (date) => {
  const months = [
    'ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני',
    'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'
  ];
  return months[date.getMonth()];
};

export const EventCard = ({ event }) => {
  const eventDate = new Date(event.eventDate);
  const hebrewMonth = getHebrewMonth(eventDate);
  const dayOfMonth = eventDate.getDate();
  const year = eventDate.getFullYear();

  const fullHebrewDate = getFullJewishDate(eventDate);

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col transform transition-all duration-300 hover:scale-105 w-64 cursor-pointer">
      {event.imageUrl && (
        <div className="relative h-40">
          <img src={event.imageUrl} alt={event.title} className="w-full h-full object-fill"/>
          <div className="absolute top-0 right-0 bg-indigo-500 text-white px-2 py-1 rounded-bl-lg text-center">
            <div className="text-xl font-bold">{dayOfMonth}</div>
            <div className="text-sm">{hebrewMonth}</div>
          </div>
        </div>
      )}
      <div className="p-4 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold mb-2 text-gray-800 line-clamp-2">{event.title}</h3>
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <CalendarIcon className="w-4 mx-1 h-4 mr-1" />
            <span>{`${dayOfMonth} ${hebrewMonth} ${year}`}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <CalendarIcon className="w-4 mx-1 h-4 mr-1" />
            <span> {fullHebrewDate}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <ClockIcon className="w-4 mx-1 h-4 mr-1" />
            <span>{format(eventDate, "HH:mm")}</span>
          </div>
          {event.location && (
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <LocationMarkerIcon className="w-4 mx-1 h-4 mr-1" />
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
};