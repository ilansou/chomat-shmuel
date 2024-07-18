import { useState, useCallback } from "react";
import {
  getDocs,
  deleteDoc,
  doc,
  addDoc,
  updateDoc,
  collection,
  query,
} from "firebase/firestore";
import { db } from "../firebase";

const helpCollectionRef = collection(db, "help");

export function useHelp() {
  const [helpList, setHelpList] = useState([]);

  const getHelpList = useCallback(async () => {
    try {
      const helpQuery = query(helpCollectionRef);
      const data = await getDocs(helpQuery);
      const filteredHelp = data.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setHelpList(filteredHelp);
    } catch (error) {
      console.error("Error getting help items: ", error);
    }
  }, []);

  const addHelpItem = async (data) => {
    try {
      await addDoc(helpCollectionRef, data);
      setHelpList((prevItems) => [...prevItems, data]);
    } catch (error) {
      console.error("Error adding help item: ", error);
    }
  };

  const removeHelpItem = async (id) => {
    try {
      await deleteDoc(doc(helpCollectionRef, id));
      setHelpList((prevItems) => prevItems.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
      console.error("Error deleting help item: ", error);
    }
  };

  const editHelpItem = async (id, data) => {
    try {
      const helpItemRef = doc(helpCollectionRef, id);
      await updateDoc(helpItemRef, data);
      setHelpList((prevItems) =>
        prevItems.map((item) => (item.id === id ? { ...item, ...data } : item))
      );
    } catch (error) {
      console.error("Error editing help item: ", error);
    }
  };

  return {
    helpList,
    getHelpList,
    addHelpItem,
    removeHelpItem,
    editHelpItem,
  };
}
