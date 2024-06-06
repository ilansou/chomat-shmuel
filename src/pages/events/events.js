import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { format, isSameDay } from "date-fns";
import { he } from "date-fns/locale";
import { Link } from "react-router-dom";
import "../../styles/events.css";
import { db, auth } from "../../config/firebase.js";
import { getDocs, addDoc, deleteDoc, doc, collection } from "firebase/firestore";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { EventModal } from "../../components/eventModal.js";
import { useNavigate } from "react-router-dom";

const localizer = momentLocalizer(moment);

export const Events = () => {
    const [date, setDate] = useState(new Date());
    const [eventList, setEventList] = useState([]);

    const navigate = useNavigate();

    const [event, setEvent] = useState([
        {
            title: "",
            image: "",
            description: "",
            eventDate: new Date().toISOString(),
            participant: 0,
            audienceAge: "",
            location: "",
            price: 0,
            expireDate: new Date().toISOString(),
            eventDuration: 0,
            URL: "",
        },
    ]);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const handleSelectEvent = (event) => {
        setSelectedEvent(event);
    };

    const handleCloseModal = () => {
        setSelectedEvent(null);
    };

    const eventsCollectionRef = collection(db, "event");

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

    const createEvent = () => {
        navigate("/events/createEvent", { setEvent });
    };

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
        <div className="events-container">
            <h1 className="events-title">אירועים</h1>

            <div className="events-list">
                <h2 className="events-list-title">כל האירועים</h2>
                {eventList.map((event) => (
                    <div key={event.id} className="events-list-item">
                        <Link to={`/events/${event.id}`}>
                            <h3 className="events-list-item-title">{event.title}</h3>
                        </Link>
                        <p className="events-list-item-description">{event.description}</p>
                        <p className="events-list-item-date">
                            {format(new Date(event.eventDate), "dd/MM/yyyy", { locale: he })}
                        </p>
                        {auth.currentUser ? (
                            <button
                                className="events-delete-event"
                                onClick={() => deleteEvent(event.id)}>
                                מחק אירוע
                            </button>
                        ) : null}
                    </div>
                ))}
            </div>

            <div>
                {auth.currentUser ? (
                    <button className="events-add-event" onClick={createEvent}>
                        הוסף אירוע
                    </button>
                ) : null}
            </div>

            <div className="events-content">
                <div className="events-calendar">
                    <div className="min-h-screen w-screen p-4">
                        <h1 className="text-3xl font-bold mb-8">אירועים</h1>
                        <Calendar
                            localizer={localizer}
                            events={eventList}
                            startAccessor="start"
                            endAccessor="end"
                            style={{ height: 500 }}
                            onSelectEvent={handleSelectEvent}
                        />
                        {selectedEvent && (
                            <EventModal event={selectedEvent} onClose={handleCloseModal} />
                        )}
                    </div>
                </div>
                <div className="events-list">
                    <h2 className="events-list-title">
                        אירועים ב{format(date, "dd/MM/yyyy", { locale: he })}
                    </h2>

                    {filteredEvents.length > 0 ? (
                        filteredEvents.map((event) => (
                            <div key={event.id} className="events-list-item">
                                <Link to={`/events/${event.id}`}>
                                    <h3 className="events-list-item-title">{event.title}</h3>
                                </Link>
                                <p className="events-list-item-description">{event.description}</p>
                                <p className="events-list-item-date">
                                    {format(new Date(event.eventDate), "HH:mm", { locale: he })}
                                </p>
                            </div>
                        ))
                    ) : (
                        <div className="events-list-item">
                            <p>אין אירועים בתאריך זה</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
