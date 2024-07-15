import React, { createContext, useState, useContext, useCallback } from "react";
import {
  getDocs,
  deleteDoc,
  doc,
  addDoc,
  updateDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase";
import { collection } from "firebase/firestore";

export const ClassesContext = createContext();

export const ClassesContextProvider = ({ children }) => {
  const [classList, setClassList] = useState([]);
  const classesCollectionRef = collection(db, "classes");

  const getClassList = useCallback(async () => {
    try {
      const classQuery = query(
        classesCollectionRef,
        orderBy("title"),
      );
      const data = await getDocs(classQuery);
      const filteredClasses = data.docs.map((doc) => ({
        id: doc.id,
      ...doc.data(),
      }));
      setClassList(filteredClasses);
    } catch (error) {
      console.error("Error getting classes: ", error);
    }
  }, [classesCollectionRef]);

  const deleteClass = async (id) => {
    try {
      await deleteDoc(doc(classesCollectionRef, id));
      setClassList((prevClasses) => prevClasses.filter((classItem) => classItem.id!== id));
    } catch (err) {
      console.error("Error deleting class: ", err);
    }
  };

  const addClass = async (data, imageBase64) => {
    try {
      const classData = {
      ...data,
      imageUrl: imageBase64,
      };
      const docRef = await addDoc(classesCollectionRef, classData);
      const newClass = { id: docRef.id,...classData };
      setClassList((prevClasses) => [...prevClasses, newClass]);
    } catch (error) {
      console.error("Error adding class: ", error);
      throw error;
    }
  };

  const editClass = async (id, updatedData, imageBase64) => {
    try {
      const classRef = doc(classesCollectionRef, id);
      const classData = {
      ...updatedData,
      imageUrl: imageBase64,
      };
      await updateDoc(classRef, classData);
      setClassList((prevClasses) =>
        prevClasses.map((classItem) => (classItem.id === id? {...classItem,...classData } : classItem))
      );
    } catch (error) {
      console.error("Error editing class: ", error);
      throw error;
    }
  };

  return (
    <ClassesContext.Provider
      value={{ classList, getClassList, deleteClass, addClass, editClass }}
    >
      {children}
    </ClassesContext.Provider>
  );
};

export const useClasses = () => useContext(ClassesContext);