import React, { useState, useEffect } from "react";
import { EventModal } from "../components/events/EventModal";
import { EventForm } from "../components/events/EventForm";
import { useAuth } from "../contexts/AuthContext";
import { CalendarWithHe } from "../components/CalendarWithHe";
import { useEvents } from "../contexts/EventsContext";

export const Events = () => {
  const { user } = useAuth();
  const [date, setDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventForm, setShowEventForm] = useState(false);
  const { getEventList, eventList } = useEvents();
  const [audienceFilter, setAudienceFilter] = useState("all");

  useEffect(() => {
    getEventList();
  }, []);

  const audienceOptions = [
    { value: "all", label: "הכל" },
    { value: "שכונה צעירה", label: "שכונה צעירה" },
    { value: "נוער", label: "נוער" },
    { value: "לכל המשפחה", label: "לכל המשפחה" },
    { value: "הגיל הרך", label: "הגיל הרך" },
    { value: "תרבות", label: "תרבות" },
    { value: "הגיל השלישי", label: "הגיל השלישי" },
    { value: "טבע עירוני", label: "טבע עירוני" },
    { value: "עמיתים", label: "עמיתים" },
    { value: "ספורט", label: "ספורט" },
    { value: "לכל הקהילה", label: "לכל הקהילה" },
    { value: "צמי'ד", label: "צמי'ד" },
    { value: "חרדי-תורני", label: "חרדי-תורני" },
    { value: "אחר", label: "אחר" },
  ];

  const audienceColors = {
    'שכונה צעירה': 'bg-red-200',
    'נוער': 'bg-blue-200',
    'לכל המשפחה': 'bg-green-200',
    'הגיל הרך': 'bg-yellow-200',
    'תרבות': 'bg-purple-200',
    'הגיל השלישי': 'bg-pink-200',
    'טבע עירוני': 'bg-indigo-200',
    'עמיתים': 'bg-orange-200',
    'ספורט': 'bg-teal-200',
    'לכל הקהילה': 'bg-cyan-200',
    'צמי\'ד': 'bg-lime-200',
    'חרדי-תורני': 'bg-amber-200',
    'אחר': 'bg-gray-200'
  };

  return (
    <div className="container mx-auto px-4 pt-32 max-w-6xl">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-center">אירועים</h1>
        <div className="flex items-center">
          <select
            className="mr-4 p-2 border rounded"
            value={audienceFilter}
            onChange={(e) => setAudienceFilter(e.target.value)}
          >
            {audienceOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          {user && (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
              onClick={() => setShowEventForm(true)}
            >
              הוסף אירוע
            </button>
          )}
        </div>
      </div>

      <CalendarWithHe
        setDate={setDate}
        items={eventList.map(event => ({ ...event, date: event.eventDate }))}
        view="monthly"
        filter={audienceFilter}
        categoryColors={audienceColors}
        onSelectItem={setSelectedEvent}
      />

      {selectedEvent && (
        <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}

      {showEventForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-[800px] w-full relative">
            <EventForm onClose={() => setShowEventForm(false)} />
          </div>
        </div>
      )}
    </div>
  );
};