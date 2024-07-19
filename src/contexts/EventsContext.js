import React, { createContext, useState, useContext, useCallback, useEffect } from "react";
import {
  getDocs,
  deleteDoc,
  doc,
  addDoc,
  updateDoc,
  query,
  orderBy,
  where,
  writeBatch,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { collection } from "firebase/firestore";

export const EventsContext = createContext();

export const EventsContextProvider = ({ children }) => {
  const [eventList, setEventList] = useState([]);
  const [loading, setLoading] = useState(true);
  const eventsCollectionRef = collection(db, "events");

  const getEventList = useCallback(async () => {
    try {
      const eventQuery = query(eventsCollectionRef, orderBy("eventDate"));
      const data = await getDocs(eventQuery);
      const filteredEvents = data.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        eventDate: doc.data().eventDate.toDate(),
      }));
      setEventList(filteredEvents);
    } catch (error) {
      console.error("Error getting events: ", error);
    }
  }, [eventsCollectionRef]);

  const cleanupOldEvents = async () => {
    const thirteenMonthsAgo = new Date();
    thirteenMonthsAgo.setMonth(thirteenMonthsAgo.getMonth() - 13);

    const q = query(
      eventsCollectionRef,
      where("eventDate", "<", Timestamp.fromDate(thirteenMonthsAgo))
    );
    const snapshot = await getDocs(q);

    const batch = writeBatch(db);
    snapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });

    if (!snapshot.empty) {
      await batch.commit();
      console.log("Old events deleted");
    }
  };

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      await getEventList();
      setLoading(false);
    };
    fetchEvents();
    cleanupOldEvents();
  }, []);

  // console.log(eventList);

  const deleteEvent = async (id) => {
    try {
      await deleteDoc(doc(eventsCollectionRef, id));
      setEventList((prevEvents) => prevEvents.filter((event) => event.id !== id));
    } catch (err) {
      console.error("Error deleting event: ", err);
    }
  };

  const addEvent = async (data, imageBase64) => {
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
    } catch (error) {
      console.error("Error adding event: ", error);
      throw error;
    }
  };

  const editEvent = async (id, updatedData, imageBase64) => {
    try {
      const eventRef = doc(eventsCollectionRef, id);
      const eventData = {
        ...updatedData,
        imageUrl: imageBase64,
        participant: updatedData.participant ? parseInt(updatedData.participant) : null,
        price: updatedData.price ? parseFloat(updatedData.price) : null,
        eventDuration: updatedData.eventDuration ? parseInt(updatedData.eventDuration) : null,
      };
      await updateDoc(eventRef, eventData);
      setEventList((prevEvents) =>
        prevEvents.map((event) => (event.id === id ? { ...event, ...eventData } : event))
      );
    } catch (error) {
      console.error("Error editing event: ", error);
      throw error;
    }
  };

  return (
    <EventsContext.Provider
      value={{ eventList, loading, getEventList, deleteEvent, addEvent, editEvent }}>
      {children}
    </EventsContext.Provider>
  );
};

export const useEvents = () => useContext(EventsContext);
