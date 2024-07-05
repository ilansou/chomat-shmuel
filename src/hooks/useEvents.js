import { useContext } from "react";
import { EventsContext } from "../context/EventsContext";
import { getDocs, deleteDoc, doc, addDoc } from "firebase/firestore";

export function useEvents() {
  const { eventList, setEventList, eventsCollectionRef } = useContext(EventsContext);

  async function getEventList() {
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
  }

  async function deleteEvent(id) {
    try {
      await deleteDoc(doc(eventsCollectionRef, id));
      setEventList((prevEvents) =>
        prevEvents.filter((event) => event.id !== id)
      );
    } catch (err) {
      console.error(err);
    }
  }

  async function addEvent(data, imageBase64, setError, navigate, onClose) {
    try {
      const eventData = {
        ...data,
        imageUrl: imageBase64,
        participant: data.participant ? parseInt(data.participant) : null,
        price: data.price ? parseFloat(data.price) : null,
        eventDuration: data.eventDuration ? parseInt(data.eventDuration) : null,
      };

      const docRef = await addDoc(eventsCollectionRef, eventData);
      const newEvent = { id: docRef.id, ...eventData };
      setEventList((prevEvents) => [...prevEvents, newEvent]);

      navigate("/events");
      onClose();
    } catch (error) {
      setError("root", {
        type: "manual",
        message: "שגיאה ביצירת האירוע: " + error.message,
      });
    }
  }

  function updateEvent(id) {}

  return { getEventList, deleteEvent, addEvent, updateEvent, eventList };
}
