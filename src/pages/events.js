import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { format, isSameDay } from "date-fns";
import { he } from "date-fns/locale";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { getDocs, deleteDoc, doc, collection } from "firebase/firestore";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { EventModal } from "../components/eventModal";
import { CreateEvent } from "../components/createEvent";
import "moment/locale/he";
import { useAuth } from "../context/AuthContext";
import { getJewishDate } from "../utils/hebrewDate"; // Assume this utility function gets the Jewish Hebrew date

const localizer = momentLocalizer(moment);

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
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-center">אירועים</h1>
            <div className="mb-8">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {eventList.map((event) => (
                        <div key={event.id} className="bg-white shadow-md rounded p-4">
                            <Link to={`/events/${event.id}`}>
                                <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                            </Link>
                            <p className="text-gray-700">{event.description}</p>
                            <p className="text-gray-500">
                                {format(new Date(event.eventDate), "dd/MM/yyyy", { locale: he })}
                            </p>
                            {user?.email ? (
                                <button
                                    className="mt-4 bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
                                    onClick={() => deleteEvent(event.id)}>
                                    מחק אירוע
                                </button>
                            ) : null}
                        </div>
                    ))}
                </div>
            </div>
            <div className="mb-8">
                {user?.email ? (
                    <button
                        className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded"
                        onClick={() => setShowCreateEvent(true)}>
                        הוסף אירוע
                    </button>
                ) : null}
            </div>
            <div className="flex flex-col">
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
                    />
                    {selectedEvent && (
                        <EventModal event={selectedEvent} onClose={handleCloseModal} />
                    )}
                </div>
                <div className="w-full p-4">
                    <h2 className="text-2xl font-semibold mb-4">
                        אירועים ב{format(date, "dd/MM/yyyy", { locale: he })}, {getJewishDate(date)}
                    </h2>

                    {filteredEvents.length > 0 ? (
                        filteredEvents.map((event) => (
                            <div key={event.id} className="bg-white shadow-md rounded p-4 mb-4">
                                <Link to={`/events/${event.id}`}>
                                    <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                                </Link>
                                <p className="text-gray-700">{event.description}</p>
                                <p className="text-gray-500">
                                    {format(new Date(event.eventDate), "HH:mm", { locale: he })}
                                </p>
                            </div>
                        ))
                    ) : (
                        <div className="bg-white shadow-md rounded p-4">
                            <p>אין אירועים בתאריך זה</p>
                        </div>
                    )}
                </div>
            </div>
            {showCreateEvent && (
                <div className="fixed overflow-auto inset-0 bg-black/80 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full relative">
                        <button
                            className="fixed top-5 right-10 text-white text-xl font-bold hover:scale-150"
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
