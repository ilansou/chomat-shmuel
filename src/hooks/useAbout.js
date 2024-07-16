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

const sectionsCollectionRef = collection(db, "about");


export function useAbout() {
  const [sectionList, setSectionList] = useState([]);

  const getSectionList = useCallback(async () => {
    console.log("ooooo");
    try {
      const sectionQuery = query(sectionsCollectionRef, orderBy("header"));
      const data = await getDocs(sectionQuery);
      const filteredSections = data.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSectionList(filteredSections);
    } catch (error) {
      console.error("Error getting sections: ", error);
    }
  }, []);

  const addSection = async () => {
    try {
      const newSection = {
        header: "New Header",
        content: "New content...",
        subheaders: [],
      };
      const docRef = await addDoc(sectionsCollectionRef, newSection);
      const section = { id: docRef.id, ...newSection };
      setSectionList((prevSections) => [...prevSections, section]);
    } catch (error) {
      console.error("Error adding section: ", error);
    }
  };

  const removeSection = async (id) => {
    try {
      await deleteDoc(doc(sectionsCollectionRef, id));
      setSectionList((prevSections) =>
        prevSections.filter((section) => section.id !== id)
      );
    } catch (error) {
      console.error("Error deleting section: ", error);
    }
  };

  const editSection = async (id, newHeader, newContent) => {
    try {
      const sectionRef = doc(sectionsCollectionRef, id);
      const updatedSection = {
        header: newHeader,
        content: newContent,
      };
      await updateDoc(sectionRef, updatedSection);
      setSectionList((prevSections) =>
        prevSections.map((section) =>
          section.id === id ? { ...section, ...updatedSection } : section
        )
      );
    } catch (error) {
      console.error("Error editing section: ", error);
    }
  };

  const addSubheader = async (sectionId) => {
    try {
      const sectionRef = doc(sectionsCollectionRef, sectionId);
      const section = sectionList.find((sec) => sec.id === sectionId);
      const newSubheader = {
        id: Date.now(),
        subheader: "New Subheader",
        subcontent: "New subcontent...",
      };
      const updatedSubheaders = [...section.subheaders, newSubheader];
      await updateDoc(sectionRef, { subheaders: updatedSubheaders });
      setSectionList((prevSections) =>
        prevSections.map((sec) =>
          sec.id === sectionId ? { ...sec, subheaders: updatedSubheaders } : sec
        )
      );
    } catch (error) {
      console.error("Error adding subheader: ", error);
    }
  };

  const removeSubheader = async (sectionId, subheaderId) => {
    try {
      const sectionRef = doc(sectionsCollectionRef, sectionId);
      const section = sectionList.find((sec) => sec.id === sectionId);
      const updatedSubheaders = section.subheaders.filter(
        (subheader) => subheader.id !== subheaderId
      );
      await updateDoc(sectionRef, { subheaders: updatedSubheaders });
      setSectionList((prevSections) =>
        prevSections.map((sec) =>
          sec.id === sectionId ? { ...sec, subheaders: updatedSubheaders } : sec
        )
      );
    } catch (error) {
      console.error("Error removing subheader: ", error);
    }
  };

  const editSubheader = async (
    sectionId,
    subheaderId,
    newSubheader,
    newSubcontent
  ) => {
    try {
      const sectionRef = doc(sectionsCollectionRef, sectionId);
      const section = sectionList.find((sec) => sec.id === sectionId);
      const updatedSubheaders = section.subheaders.map((subheader) =>
        subheader.id === subheaderId
          ? { ...subheader, subheader: newSubheader, subcontent: newSubcontent }
          : subheader
      );
      await updateDoc(sectionRef, { subheaders: updatedSubheaders });
      setSectionList((prevSections) =>
        prevSections.map((sec) =>
          sec.id === sectionId ? { ...sec, subheaders: updatedSubheaders } : sec
        )
      );
    } catch (error) {
      console.error("Error editing subheader: ", error);
    }
  };

  // Return statement fixed to return an object with methods
  return {
    sectionList,
    getSectionList,
    addSection,
    removeSection,
    editSection,
    addSubheader,
    removeSubheader,
    editSubheader,
  };
}
