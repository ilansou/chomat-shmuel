import { useContext, useCallback, useState } from "react";
import { NewsAndUpdatesContext } from "../context/NewsAndUpdatesContext";
import {
  getDocs,
  deleteDoc,
  doc,
  addDoc,
  query,
  orderBy,
  startAfter,
  limit,
  where,
} from "firebase/firestore";


export function useNewsAndUpdates() {
  const { newsAndUpdatesList, setnewsAndUpdatesList } = useContext(NewsAndUpdatesContext);
 
  const getNewsAndUpdates = useCallback(
    
  );

  async function deleteNewAndUpdate(id) {
  }

  async function addNewsAndUpdates() {
  }

  function editNewsAndUpdates(id) {}

  return { getNewsAndUpdates, deleteNewAndUpdate, addNewsAndUpdates, editNewsAndUpdates, newsAndUpdatesList };
}
