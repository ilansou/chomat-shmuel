import React, { createContext, useContext, useState } from "react";
import { db } from "../firebase";
import { collection } from "firebase/firestore";

export const NewsAndUpdatesContext = createContext({
  newsAndUpdatesList: [],
  setnewsAndUpdatesList: () => {},
});

export const useNewsAndUpdates = () => useContext(NewsAndUpdatesContext);

export const EventsContextProvider = ({ children }) => {
  const [newsAndUpdatesList, setnewsAndUpdatesList] = useState([]);


  return (
    <NewsAndUpdatesContext.Provider value={{ newsAndUpdatesList, setnewsAndUpdatesList }}>
      {children}
    </NewsAndUpdatesContext.Provider>
  );
};
