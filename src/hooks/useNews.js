import { useContext, useCallback, useState } from "react";
import { NewsContext } from "../contexts/NewsContext";
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

export function useNews() {
  const { newsList, setNewsList, newsCollectionRef } = useContext(NewsContext);
  const [lastVisible, setLastVisible] = useState(null);

  const getNews = useCallback(
    async (startDate, endDate, isPagination = false) => {
      const now = Date.now();

      // Use cached data if it's still valid
      if (!isPagination && cache.data && now - cache.timestamp < CACHE_DURATION) {
        setNewsList(cache.data);
        return;
      }

      try {
        if (!newsCollectionRef) {
          console.error("newsCollectionRef is not defined");
          return;
        }

        let newsQuery = query(
          newsCollectionRef,
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
        const filteredNews = data.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          newsDate: doc.data().date.toDate(),
        }));

        if (isPagination) {
          setNewsList((prev) => [...prev, ...filteredNews]);
        } else {
          setNewsList(filteredNews);
          // Update cache
          cache.timestamp = Date.now();
          cache.data = filteredNews;
        }

        // Update the last visible document for pagination
        setLastVisible(data.docs[data.docs.length - 1]);
      } catch (error) {
        console.error("Error getting news: ", error);
      }
    },
    [newsCollectionRef, setNewsList, lastVisible]
  );

  async function deleteNews(id) {
    try {
      await deleteDoc(doc(newsCollectionRef, id));
      setNewsList((prevList) =>
        prevList.filter((item) => item.id !== id)
      );
      // Invalidate cache
      cache.timestamp = 0;
    } catch (err) {
      console.error("Error deleting news: ", err);
      throw err;
    }
  }

  async function addNews(data, setError) {
    try {
      const newsData = {
        ...data,
        date: Timestamp.fromDate(new Date(data.date)),
      };

      const docRef = await addDoc(newsCollectionRef, newsData);
      const newItem = { id: docRef.id, ...newsData };
      setNewsList((prevList) => [newItem, ...prevList]);

      // Invalidate cache
      cache.timestamp = 0;
    } catch (error) {
      setError("root", {
        type: "manual",
        message: "Error creating news: " + error.message,
      });
      throw error;
    }
  }

  async function editNews(id, updatedData, setError) {
    try {
      const newsRef = doc(newsCollectionRef, id);
      const newsData = {
        ...updatedData,
        date: Timestamp.fromDate(new Date(updatedData.date)),
      };

      await updateDoc(newsRef, newsData);

      setNewsList((prevList) =>
        prevList.map((item) =>
          item.id === id ? { ...item, ...newsData } : item
        )
      );

      // Invalidate cache
      cache.timestamp = 0;
    } catch (error) {
      setError("root", {
        type: "manual",
        message: "Error updating news: " + error.message,
      });
      throw error;
    }
  }

  return { getNews, deleteNews, addNews, editNews, newsList };
}
