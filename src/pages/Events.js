import React, { useState, useEffect } from "react";
import { format, isSameDay } from "date-fns";
import { he } from "date-fns/locale";
import { EventModal } from "../components/events/EventModal";
import { CreateEvent } from "../components/events/CreateEvent";
import { useAuth } from "../contexts/AuthContext";
import { getFullJewishDate } from "../utils/DatesToHebrew";
import { CalendarWithHe } from "../components/CalendarWithHe";
import { useEvents } from "../contexts/EventsContext";

export const Events = () => {
  const { user } = useAuth();
  const [date, setDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const { getEventList, eventList } = useEvents();
  const [view, setView] = useState("monthly");
  const [audienceFilter, setAudienceFilter] = useState("all");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        await getEventList();
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };
    fetchEvents();
  }, []);
  
  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  const filteredEvents = eventList?.filter((event) =>
    isSameDay(new Date(event.eventDate), date) &&
    (audienceFilter === "all" || event.audienceAge === audienceFilter)
  );

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
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {user && (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors duration-200"
              onClick={() => setShowCreateEvent(true)}
            >
              הוסף אירוע
            </button>
          )}
        </div>
      </div>

      <div className="mb-3">
        <CalendarWithHe setDate={setDate} view={view} audienceFilter={audienceFilter} />
        {selectedEvent && (
          <EventModal event={selectedEvent} onClose={handleCloseModal} />
        )}
      </div>

      {showCreateEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-[800px] w-full relative">
            <CreateEvent onClose={() => setShowCreateEvent(false)} />
          </div>
        </div>
      )}
    </div>
  );
};