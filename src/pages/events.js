import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { format, isSameDay } from "date-fns";
import { he } from "date-fns/locale";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { getDocs, deleteDoc, doc, collection } from "firebase/firestore";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { EventModal } from "../components/EventModal";
import { CreateEvent } from "../components/CreateEvent";
import "moment/locale/he";
import { useAuth } from "../context/AuthContext";
import { getJewishDate } from "../utils/hebrewDate";

// Set moment locale to Hebrew
moment.locale("he");
const localizer = momentLocalizer(moment);

const messages = {
  allDay: "כל היום",
  previous: "הקודם",
  next: "הבא",
  today: "היום",
  month: "חודש",
  week: "שבוע",
  day: "יום",
  agenda: "סדר יום",
  date: "תאריך",
  time: "שעה",
  event: "אירוע",
};

export const Events = () => {
  const { user } = useAuth();
  const [date, setDate] = useState(new Date());
  const [eventList, setEventList] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showCreateEvent, setShowCreateEvent] = useState(false);

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  const eventsCollectionRef = collection(db, "events");

  const getEventList = async () => {
    try {
      const data = await getDocs(eventsCollectionRef);
      const filteredEvents = data.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEventList(filteredEvents);
    } catch (error) {
      console.error("Error getting events: ", error);
    }
  };

  useEffect(() => {
    getEventList();
  }, []);

  const deleteEvent = async (id) => {
    try {
      await deleteDoc(doc(eventsCollectionRef, id));
      getEventList();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredEvents = eventList.filter((eventList) =>
    isSameDay(new Date(eventList.eventDate), date)
  );

  return (
    <div className="container pt-28 mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">אירועים</h1>

      {/* Today Events */}
      <div className="w-full mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          אירועים ב{format(date, "dd/MM/yyyy", { locale: he })}, {getJewishDate(date)}
        </h2>

        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white shadow-md rounded p-4 cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handleSelectEvent(event)}>
                <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                <p className="text-gray-700">{event.description}</p>
                <p className="text-gray-500">
                  {format(new Date(event.eventDate), "HH:mm", { locale: he })}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white shadow-md rounded p-4">
            <p>אין אירועים בתאריך זה</p>
          </div>
        )}
      </div>

      {/* Create Event Button */}
      <div className="mb-8">
        {user?.email && (
          <button
            className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded"
            onClick={() => setShowCreateEvent(true)}>
            הוסף אירוע
          </button>
        )}
      </div>

      {/* Calendar */}
      <div className="w-full">
        <Calendar
          localizer={localizer}
          events={eventList.map((event) => ({
            ...event,
            start: new Date(event.eventDate),
            end: new Date(event.eventDate),
          }))}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          onSelectEvent={handleSelectEvent}
          className="rounded shadow-md"
          messages={messages}
          formats={{
            dayHeaderFormat: (date) => format(date, "EEEE dd/MM", { locale: he }),
          }}
          components={{
            toolbar: (props) => (
              <div className="rbc-toolbar">
                <span className="rbc-btn-group">
                  <button type="button" onClick={() => props.onNavigate("NEXT")}>
                    &#8594;
                  </button>
                  <button type="button" onClick={() => props.onNavigate("TODAY")}>
                    {messages.today}
                  </button>
                  <button type="button" onClick={() => props.onNavigate("PREV")}>
                    &#8592;
                  </button>
                </span>
                <span className="rbc-toolbar-label">{props.label}</span>
                <span className="rbc-btn-group">
                  {props.views.map((name) => (
                    <button
                      key={name}
                      type="button"
                      onClick={() => props.onView(name)}
                      className={props.view === name ? "rbc-active" : ""}>
                      {messages[name]}
                    </button>
                  ))}
                </span>
              </div>
            ),
          }}
        />
        {selectedEvent && <EventModal event={selectedEvent} onClose={handleCloseModal} />}
      </div>

      {/* Create Event Modal */}
      {showCreateEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowCreateEvent(false)}>
              &times;
            </button>
            <CreateEvent onClose={() => setShowCreateEvent(false)} />
          </div>
        </div>
      )}
    </div>
  );
};
