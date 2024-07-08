import { useContext, useCallback, useState } from "react";
import { NewsAndUpdatesContext } from "../context/NewsAndUpdatesContext";
import {
  getDocs,
  deleteDoc,
  doc,
  addDoc,
  updateDoc,
  query,
  orderBy,
  startAfter,
  limit,
  where,
  Timestamp,
} from "firebase/firestore";

const CACHE_DURATION = 5 * 60 * 1000; // Cache duration in milliseconds
let cache = {
  timestamp: 0,
  data: null,
};

export function useNewsAndUpdates() {
  const { newsAndUpdatesList, setNewsAndUpdatesList, newsAndUpdatesCollectionRef } = useContext(NewsAndUpdatesContext);
  const [lastVisible, setLastVisible] = useState(null);

  const getNewsAndUpdates = useCallback(
    async (startDate, endDate, isPagination = false) => {
      const now = Date.now();
  
      // Use cached data if it's still valid
      if (!isPagination && cache.data && now - cache.timestamp < CACHE_DURATION) {
        setNewsAndUpdatesList(cache.data);
        return;
      }
  
      try {
        if (!newsAndUpdatesCollectionRef) {
          console.error("newsAndUpdatesCollectionRef is not defined");
          return;
        }
  
        let newsQuery = query(
          newsAndUpdatesCollectionRef,
          orderBy("date", "desc"),
          limit(20)
        );
  
        // Apply date range filter if start and end dates are provided
        if (startDate && endDate) {
          newsQuery = query(
            newsQuery,
            where("date", ">=", startDate),
            where("date", "<=", endDate)
          );
        }
  
        if (isPagination && lastVisible) {
          newsQuery = query(newsQuery, startAfter(lastVisible));
        }
  
        const data = await getDocs(newsQuery);
        const filteredNewsAndUpdates = data.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
  
        if (isPagination) {
          setNewsAndUpdatesList((prev) => [...prev, ...filteredNewsAndUpdates]);
        } else {
          setNewsAndUpdatesList(filteredNewsAndUpdates);
          // Update cache
          cache.timestamp = Date.now();
          cache.data = filteredNewsAndUpdates;
        }
  
        // Update the last visible document for pagination
        setLastVisible(data.docs[data.docs.length - 1]);
      } catch (error) {
        console.error("Error getting news and updates: ", error);
      }
    },
    [newsAndUpdatesCollectionRef, setNewsAndUpdatesList, lastVisible]
  );

  async function deleteNewAndUpdate(id) {
    try {
      await deleteDoc(doc(newsAndUpdatesCollectionRef, id));
      setNewsAndUpdatesList((prevList) =>
        prevList.filter((item) => item.id !== id)
      );
      // Invalidate cache
      cache.timestamp = 0;
    } catch (err) {
      console.error("Error deleting news/update: ", err);
      throw err;
    }
  }

  async function addNewsAndUpdates(data, setError) {
    try {
      const newsData = {
        ...data,
        date: Timestamp.fromDate(new Date(data.date)),
      };

      const docRef = await addDoc(newsAndUpdatesCollectionRef, newsData);
      const newItem = { id: docRef.id, ...newsData };
      setNewsAndUpdatesList((prevList) => [newItem, ...prevList]);

      // Invalidate cache
      cache.timestamp = 0;
    } catch (error) {
      setError("root", {
        type: "manual",
        message: "Error creating news/update: " + error.message,
      });
      throw error;
    }
  }

  async function editNewsAndUpdates(id, updatedData, setError) {
    try {
      const newsRef = doc(newsAndUpdatesCollectionRef, id);
      const newsData = {
        ...updatedData,
        date: Timestamp.fromDate(new Date(updatedData.date)),
      };

      await updateDoc(newsRef, newsData);

      setNewsAndUpdatesList((prevList) =>
        prevList.map((item) =>
          item.id === id ? { ...item, ...newsData } : item
        )
      );

      // Invalidate cache
      cache.timestamp = 0;
    } catch (error) {
      setError("root", {
        type: "manual",
        message: "Error updating news/update: " + error.message,
      });
      throw error;
    }
  }

  return { getNewsAndUpdates, deleteNewAndUpdate, addNewsAndUpdates, editNewsAndUpdates, newsAndUpdatesList };
}