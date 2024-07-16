// src/components/StaffManagement.js

import React, { useEffect, useState } from "react";
import { useStaffManagement } from "../../hooks/useStaffManagement";
import { Card } from "./Card";
import { useAuth } from "../../contexts/AuthContext";

const StaffManagement = ({ type }) => {
  const { user } = useAuth();
  const {
    managerList,
    teamList,
    getManagers,
    getTeamMembers,
    addManager,
    addTeamMember,
    deleteManager,
    deleteTeamMember,
    editManager,
    editTeamMember,
  } = useStaffManagement();
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    if (type === "managers") {
      getManagers();
    } else if (type === "team") {
      getTeamMembers();
    }
  }, [getManagers, getTeamMembers, type]);

  const handleAddStaff = async () => {
    setIsAdding(true);
    const defaultStaff = {
      name: "",
      imageUrl: "",
      role: "",
      phone: "",
      email: "",
    };
    if (type === "managers") {
      await addManager(defaultStaff);
    } else if (type === "team") {
      await addTeamMember(defaultStaff);
    }
    setIsAdding(false);
  };

  if (!managerList && !teamList) {
    return <div>Loading...</div>; // Handle loading state
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold">
      {type === "managers" ? "הנהלת המרכז הקהילתי" : "צוות עובדי המנהל הקהילתי"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        {type === "managers"
          ? managerList.map((manager) => (
              <Card
                key={manager.id}
                staff={manager}
                onDelete={deleteManager}
                onEdit={editManager}
              />
            ))
          : teamList.map((member) => (
              <Card
                key={member.id}
                staff={member}
                onDelete={deleteTeamMember}
                onEdit={editTeamMember}
              />
            ))}
        {isAdding && (
          <div className="border border-gray-200 p-4 rounded-lg shadow-md flex items-center w-full max-w-xl animate-pulse">
            <div className="flex-1">
              <div className="animate-pulse flex justify-between items-center mb-2">
                <h3 className="text-xl font-bold">מוסיף...</h3>
              </div>
            </div>
          </div>
        )}
      </div>
      {user && (
        <button
          onClick={handleAddStaff}
          disabled={isAdding}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          הוסף {type === "managers" ? "מנהל.ת" : "צוות עובד.ת המנהל"}
        </button>
      )}
    </div>
  );
};

export default StaffManagement;
