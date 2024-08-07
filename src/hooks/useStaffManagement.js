import { useState, useEffect, useCallback } from "react";
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
// Reference to Firebase collections
const managersCollectionRef = collection(db, "managers");
const teamCollectionRef = collection(db, "team");

const defaultImageUrl =
  "https://www.mgp.net.au/wp-content/uploads/2023/05/150-1503945_transparent-user-png-default-user-image-png-png.png"; // Default image URL

export function useStaffManagement() {
  const [managerList, setManagerList] = useState([]);
  const [teamList, setTeamList] = useState([]);

  // Function to fetch managers from Firebase
  const getManagers = useCallback(async () => {
    try {
      const satffQuery = query(managersCollectionRef);
      const querySnapshot = await getDocs(satffQuery);
      const managersData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setManagerList(managersData);
    } catch (error) {
      console.error("Error fetching managers: ", error);
    }
  }, []);

  // Function to fetch team members from Firebase
  const getTeamMembers = useCallback(async () => {
    try {
      const satffQuery = query(teamCollectionRef);
      const querySnapshot = await getDocs(satffQuery);
      const teamData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTeamList(teamData);
    } catch (error) {
      console.error("Error fetching team members: ", error);
    }
  }, []);

  // Function to delete a manager
  const deleteManager = async (id) => {
    if (window.confirm("האם אתה בטוח שברצונך למחוק חבר.ת הנהלה זה?")) {
      try {
        await deleteDoc(doc(managersCollectionRef, id));
        setManagerList((prevManagers) =>
          prevManagers.filter((manager) => manager.id !== id)
        );
      } catch (error) {
        console.error("Error deleting manager: ", error);
      }
    }
  };

  // Function to delete a team member
  const deleteTeamMember = async (id) => {
    if (window.confirm("האם אתה בטוח שברצונך למחוק עובד.ת זה?")) {
      try {
        await deleteDoc(doc(teamCollectionRef, id));
        setTeamList((prevTeam) =>
          prevTeam.filter((member) => member.id !== id)
        );
      } catch (error) {
        console.error("Error deleting team member: ", error);
      }
    }
  };

  // Function to add a new manager
  const addManager = async (data) => {
    try {
      const docRef = await addDoc(managersCollectionRef, {
        ...data,
        imageUrl: data.imageUrl || defaultImageUrl,
      });
      const newManager = { id: docRef.id, ...data };
      setManagerList((prevManagers) => [...prevManagers, newManager]);
    } catch (error) {
      console.error("Error adding manager: ", error);
    }
  };

  // Function to add a new team member
  const addTeamMember = async (data) => {
    try {
      const docRef = await addDoc(teamCollectionRef, {
        ...data,
        imageUrl: data.imageUrl || defaultImageUrl,
      });
      const newTeamMember = { id: docRef.id, ...data };
      setTeamList((prevTeam) => [...prevTeam, newTeamMember]);
    } catch (error) {
      console.error("Error adding team member: ", error);
    }
  };

  // Function to edit an existing manager
  const editManager = async (id, updatedData) => {
    try {
      const managerRef = doc(managersCollectionRef, id);
      await updateDoc(managerRef, updatedData);
      setManagerList((prevManagers) =>
        prevManagers.map((manager) =>
          manager.id === id ? { ...manager, ...updatedData } : manager
        )
      );
    } catch (error) {
      console.error("Error editing manager: ", error);
    }
  };

  // Function to edit an existing team member
  const editTeamMember = async (id, updatedData) => {
    try {
      const teamMemberRef = doc(teamCollectionRef, id);
      await updateDoc(teamMemberRef, updatedData);
      setTeamList((prevTeam) =>
        prevTeam.map((member) =>
          member.id === id ? { ...member, ...updatedData } : member
        )
      );
    } catch (error) {
      console.error("Error editing team member: ", error);
    }
  };

  useEffect(() => {
    getManagers();
    getTeamMembers();
  }, [getManagers, getTeamMembers]);

  return {
    managerList,
    teamList,
    getManagers,
    getTeamMembers,
    deleteManager,
    deleteTeamMember,
    addManager,
    addTeamMember,
    editManager,
    editTeamMember,
  };
}
