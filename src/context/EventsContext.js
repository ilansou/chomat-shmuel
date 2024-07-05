import React, { createContext, useContext, useState } from "react";
import { db } from "../firebase";
import { collection } from "firebase/firestore";

export const EventsContext = createContext({
  eventList: [],
  setEventList: () => {},
  eventsCollectionRef: null,
});

export const useEvents = () => useContext(EventsContext);

export const EventsContextProvider = ({ children }) => {
  const [eventList, setEventList] = useState([]);
  const eventsCollectionRef = collection(db, "events");

  return (
    <EventsContext.Provider value={{ eventList, setEventList, eventsCollectionRef }}>
      {children}
    </EventsContext.Provider>
  );
};
