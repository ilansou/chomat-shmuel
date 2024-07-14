import React, { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

export const Help = () => {
  const { user } = useAuth();
  return (
    <div className="container mx-auto px-4 pt-32 max-w-6xl">
      <h1 className="text-3xl font-bold text-center mb-8">עזרה</h1>
    </div>
  );
};
