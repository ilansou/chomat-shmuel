// import { useContext, useCallback } from "react";
// import { EventsContext } from "../context/EventsContext";
// import { getDocs, deleteDoc, doc, addDoc } from "firebase/firestore";

// export function useEvents() {
//   const { eventList, setEventList, eventsCollectionRef } = useContext(EventsContext);

//   const getEventList = useCallback(async () => {
//     try {
//       const data = await getDocs(eventsCollectionRef);
//       const filteredEvents = data.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setEventList(filteredEvents);
//     } catch (error) {
//       console.error("Error getting events: ", error);
//     }
//   }, [eventsCollectionRef, setEventList]);

//   async function deleteEvent(id) {
//     try {
//       await deleteDoc(doc(eventsCollectionRef, id));
//       setEventList((prevEvents) =>
//         prevEvents.filter((event) => event.id !== id)
//       );
//     } catch (err) {
//       console.error(err);
//     }
//   }

//   async function addEvent(data, imageBase64, setError, navigate, onClose) {
//     try {
//       const eventData = {
//         ...data,
//         imageUrl: imageBase64,
//         participant: data.participant ? parseInt(data.participant) : null,
//         price: data.price ? parseFloat(data.price) : null,
//         eventDuration: data.eventDuration ? parseInt(data.eventDuration) : null,
//       };
  
//       const docRef = await addDoc(eventsCollectionRef, eventData);
//       const newEvent = { id: docRef.id, ...eventData };
//       setEventList((prevEvents) => [...prevEvents, newEvent]);
  
//       navigate("/events");
//       onClose();
//     } catch (error) {
//       setError("root", {
//         type: "manual",
//         message: "שגיאה ביצירת האירוע: " + error.message,
//       });
//     }
//   }

//   function updateEvent(id) {}

//   return { getEventList, deleteEvent, addEvent, updateEvent, eventList };
// }


import { useContext, useCallback, useState } from "react";
import { EventsContext } from "../context/EventsContext";
import {
  getDocs,
  deleteDoc,
  doc,
  addDoc,
  query,
  orderBy,
  startAfter,
  updateDoc,
  Timestamp,
  limit,
  where,
} from "firebase/firestore";

const CACHE_DURATION = 5 * 60 * 1000; // Cache duration in milliseconds
let cache = {
  timestamp: 0,
  data: null,
};

export function useEvents() {
  const { eventList, setEventList, eventsCollectionRef } = useContext(
    EventsContext
  );
  const [lastVisible, setLastVisible] = useState(null);

  const getEventList = useCallback(
    async (startDate, endDate, isPagination = false) => {
      const now = Date.now();

      // Use cached data if it's still valid
      if (
        !isPagination &&
        cache.data &&
        now - cache.timestamp < CACHE_DURATION
      ) {
        setEventList(cache.data);
        return;
      }

      try {
        let eventQuery = query(
          eventsCollectionRef,
          orderBy("eventDate"),
          limit(10)
        );

        // Apply date range filter if start and end dates are provided
        if (startDate && endDate) {
          eventQuery = query(
            eventQuery,
            where("eventDate", ">=", startDate),
            where("eventDate", "<=", endDate)
          );
        }

        if (isPagination && lastVisible) {
          eventQuery = query(eventQuery, startAfter(lastVisible));
        }

        const data = await getDocs(eventQuery);

        const filteredEvents = data.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        if (isPagination) {
          setEventList((prevEvents) => [...prevEvents, ...filteredEvents]);
        } else {
          setEventList(filteredEvents);

          // Update cache
          cache.timestamp = Date.now();
          cache.data = filteredEvents;
        }

        // Update the last visible document for pagination
        setLastVisible(data.docs[data.docs.length - 1]);
      } catch (error) {
        console.error("Error getting events: ", error);
      }
    },
    [eventsCollectionRef, setEventList, lastVisible]
  );

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
        eventDuration: data.eventDuration
          ? parseInt(data.eventDuration)
          : null,
      };

      const docRef = await addDoc(eventsCollectionRef, eventData);
      const newEvent = { id: docRef.id, ...eventData };
      setEventList((prevEvents) => [...prevEvents, newEvent]);

      // Invalidate cache
      cache.timestamp = 0;

      navigate("/events");
      onClose();
    } catch (error) {
      setError("root", {
        type: "manual",
        message: "שגיאה ביצירת האירוע: " + error.message,
      });
    }
  }

  async function editEvent(id, updatedData, imageBase64, setError, navigate, onClose) {
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

      // Invalidate cache
      cache.timestamp = 0;

      navigate("/events");
      onClose();
    } catch (error) {
      setError("root", {
        type: "manual",
        message: "שגיאה בעדכון האירוע: " + error.message,
      });
    }
  }

  const getNearestEvents = useCallback(async (k) => {
    try {
      const now = Timestamp.now();
      const eventQuery = query(
        eventsCollectionRef,
        where("eventDate", ">=", now),
        orderBy("eventDate"),
        limit(k)
      );

      const data = await getDocs(eventQuery);
      const nearestEvents = data.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return nearestEvents;
    } catch (error) {
      console.error("Error getting nearest events: ", error);
      return [];
    }
  }, [eventsCollectionRef]);

  return { getEventList, deleteEvent, addEvent, editEvent, getNearestEvents, eventList };
}
