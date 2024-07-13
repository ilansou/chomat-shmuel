import React from 'react';
import { format } from "date-fns";
import { CalendarIcon, ClockIcon, LocationMarkerIcon, UserIcon, CurrencyDollarIcon } from '@heroicons/react/solid';

export const ClassCard = ({ classItem }) => {
  const classDate = new Date(classItem.classDate);
  const dayOfMonth = classDate.getDate();
  const monthNames = ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני",
    "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"
  ];
  const hebrewMonth = monthNames[classDate.getMonth()];
  const year = classDate.getFullYear();

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col transform transition-all duration-300 hover:scale-105 w-64 cursor-pointer">
      {classItem.imageUrl && (
        <div className="relative h-40">
          <img src={classItem.imageUrl} alt={classItem.title} className="w-full h-full object-cover"/>
          <div className="absolute top-0 right-0 bg-blue-500 text-white px-2 py-1 rounded-bl-lg text-center">
            <div className="text-xl font-bold">{dayOfMonth}</div>
            <div className="text-sm">{hebrewMonth}</div>
          </div>
        </div>
      )}
      <div className="p-4 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold mb-2 text-gray-800 line-clamp-2">{classItem.title}</h3>
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <CalendarIcon className="w-4 h-4 mr-1" />
            <span>{`${dayOfMonth} ${hebrewMonth} ${year}`}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <ClockIcon className="w-4 h-4 mr-1" />
            <span>{format(classDate, "HH:mm")}</span>
          </div>
          {classItem.location && (
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <LocationMarkerIcon className="w-4 h-4 mr-1" />
              <span className="line-clamp-1">{classItem.location}</span>
            </div>
          )}
          {classItem.teacherName && (
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <UserIcon className="w-4 h-4 mr-1" />
              <span className="line-clamp-1">{classItem.teacherName}</span>
            </div>
          )}
          {classItem.price && (
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <CurrencyDollarIcon className="w-4 h-4 mr-1" />
              <span>{classItem.price}</span>
            </div>
          )}
        </div>
        {classItem.description && (
          <p className="text-sm text-gray-700 line-clamp-3 mt-2">{classItem.description}</p>
        )}
      </div>
    </div>
  );
};