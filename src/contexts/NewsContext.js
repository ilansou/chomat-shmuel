import React, { createContext, useState, useContext, useCallback, useEffect } from "react";
import {
  getDocs,
  deleteDoc,
  doc,
  addDoc,
  updateDoc,
  query,
  orderBy,
  collection,
  where,
  writeBatch,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebase";

export const NewsContext = createContext();

export const NewsContextProvider = ({ children }) => {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const newsCollectionRef = collection(db, "news and updates");

  const getNewsList = useCallback(async () => {
    try {
      const newsQuery = query(newsCollectionRef, orderBy("updateDate", "desc"));
      const data = await getDocs(newsQuery);
      const filteredNews = data.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        updateDate: doc.data().updateDate.toDate(),
        expireDate: doc.data().expireDate.toDate(),
      }));
      setNewsList(filteredNews);
    } catch (error) {
      console.error("Error getting news: ", error);
    }
  }, [newsCollectionRef]);

  const cleanupExpiredNews = async () => {
    const twoMonthsAgo = new Date();
    twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);

    const q = query(newsCollectionRef, where("expireDate", "<", Timestamp.fromDate(twoMonthsAgo)));
    const snapshot = await getDocs(q);

    const batch = writeBatch(db);
    snapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });

    if (!snapshot.empty) {
      await batch.commit();
      console.log(`${snapshot.size} expired news items deleted`);
    }
  };

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      await getNewsList();
      setLoading(false);
    };
    fetchNews();
    cleanupExpiredNews();
  }, []);

  const deleteNews = async (id) => {
    try {
      await deleteDoc(doc(newsCollectionRef, id));
      setNewsList((prevList) => prevList.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Error deleting news: ", err);
      throw err;
    }
  };

  const addNews = async (data, imageBase64) => {
    try {
      const newsData = {
        ...data,
        imageUrl: imageBase64,
      };
      const docRef = await addDoc(newsCollectionRef, newsData);
      const newItem = { id: docRef.id, ...newsData };
      setNewsList((prevList) => [newItem, ...prevList]);
    } catch (error) {
      console.error("Error creating news: ", error);
      throw error;
    }
  };

  const editNews = async (id, updatedData, imageBase64) => {
    try {
      const newsRef = doc(newsCollectionRef, id);
      const newsData = {
        ...updatedData,
        imageUrl: imageBase64,
      };
      await updateDoc(newsRef, newsData);
      setNewsList((prevList) =>
        prevList.map((item) => (item.id === id ? { ...item, ...newsData } : item))
      );
    } catch (error) {
      console.error("Error updating news: ", error);
      throw error;
    }
  };

  return (
    <NewsContext.Provider value={{ newsList, loading, getNewsList, deleteNews, addNews, editNews }}>
      {children}
    </NewsContext.Provider>
  );
};

export const useNews = () => useContext(NewsContext);
