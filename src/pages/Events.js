import React, { useState } from "react";
import { EventModal } from "../components/events/EventModal";
import { EventForm } from "../components/events/EventForm";
import { useAuth } from "../contexts/AuthContext";
import { EventCalendar } from "../components/events/EventCalendar";
import { useEvents } from "../contexts/EventsContext";
import PageFeedback from "../components/PageFeedback";

export const Events = () => {
  const { user } = useAuth();
  // eslint-disable-next-line no-unused-vars
  const [date, setDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventForm, setShowEventForm] = useState(false);
  const { eventList } = useEvents();
  const [audienceFilter, setAudienceFilter] = useState("all");

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
    "שכונה צעירה": "bg-red-200",
    נוער: "bg-blue-200",
    "לכל המשפחה": "bg-green-200",
    "הגיל הרך": "bg-yellow-200",
    תרבות: "bg-purple-200",
    "הגיל השלישי": "bg-pink-200",
    "טבע עירוני": "bg-indigo-200",
    עמיתים: "bg-orange-200",
    ספורט: "bg-teal-200",
    "לכל הקהילה": "bg-cyan-200",
    "צמי'ד": "bg-lime-200",
    "חרדי-תורני": "bg-amber-200",
    אחר: "bg-gray-400",
  };

  const handleAddEvent = () => {
    setShowEventForm(true);
  };

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 pt-24 max-w-7xl">
        <div className="mb-4">
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h2 className="text-lg font-semibold mb-2">סנן לפי קהל יעד</h2>
            <div className="overflow-x-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-2">
                {audienceOptions.map((option) => (
                  <div
                    key={option.value}
                    className={`flex items-center p-2 rounded cursor-pointer hover:bg-gray-100 ${
                      audienceFilter === option.value ? "bg-gray-200" : ""
                    }`}
                    onClick={() => setAudienceFilter(option.value)}>
                    <span
                      className={`w-3 h-3 rounded-full mr-2 ${
                        audienceColors[option.value] || "bg-gray-400"
                      }`}></span>
                    <span className="text-s mr-1 whitespace-nowrap">{option.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div>
          <EventCalendar
            setDate={setDate}
            events={eventList}
            filter={audienceFilter}
            categoryColors={audienceColors}
            onSelectEvent={setSelectedEvent}
            user={user}
            onAddEvent={handleAddEvent}
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <PageFeedback pageId="events" />
        </div>
      </div>
    </div>
  );
};
