import { useState, useCallback } from "react";
import {
  getDocs,
  deleteDoc,
  doc,
  addDoc,
  updateDoc,
  collection,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase";

export function useHelp() {
  const [helpList, setHelpList] = useState([]);
  const helpCollectionRef = collection(db, "help");

  const getHelpList = useCallback(async () => {
    try {
      const helpQuery = query(helpCollectionRef, orderBy("title"));
      const data = await getDocs(helpQuery);
      const filteredHelp = data.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setHelpList(filteredHelp);
    } catch (error) {
      console.error("Error getting help items: ", error);
    }
  }, [helpCollectionRef]);

  const addHelpItem = async () => {
    try {
      const newHelpItem = {
        title: "New Help Item",
        content: "New content...",
        isOpen: false,
      };
      const docRef = await addDoc(helpCollectionRef, newHelpItem);
      const helpItem = { id: docRef.id, ...newHelpItem };
      setHelpList((prevItems) => [...prevItems, helpItem]);
    } catch (error) {
      console.error("Error adding help item: ", error);
    }
  };

  const removeHelpItem = async (id) => {
    try {
      await deleteDoc(doc(helpCollectionRef, id));
      setHelpList((prevItems) =>
        prevItems.filter((item) => item.id !== id)
      );
    } catch (error) {
      console.error("Error deleting help item: ", error);
    }
  };

  const editHelpItem = async (id, newTitle, newContent) => {
    try {
      const helpItemRef = doc(helpCollectionRef, id);
      const updatedHelpItem = {
        title: newTitle,
        content: newContent,
      };
      await updateDoc(helpItemRef, updatedHelpItem);
      setHelpList((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, ...updatedHelpItem } : item
        )
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
