import React, { useEffect, useState } from "react";
import { useHelp } from "../hooks/useHelp";
import { useAuth } from "../contexts/AuthContext";

const Help = () => {
  const { user } = useAuth();
  const { helpList, getHelpList, addHelpItem, removeHelpItem, editHelpItem } =
    useHelp();
  const [expandedItems, setExpandedItems] = useState({});

  useEffect(() => {
    getHelpList();
  }, [getHelpList]);

  const toggleExpand = (id) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="container mx-auto px-4 pt-32 max-w-6xl">
      <h1 className="text-3xl font-bold text-center mb-8">עזרה</h1>
      {user && (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
          onClick={addHelpItem}
        >
          Add Help Item
        </button>
      )}

      {helpList.map((helpItem) => (
        <div key={helpItem.id} className="mb-4">
          <div
            className="cursor-pointer flex justify-between items-center"
            onClick={() => toggleExpand(helpItem.id)}
          >
            <h2 className="text-xl font-bold">{helpItem.title}</h2>
            <span className="ml-2">
              {expandedItems[helpItem.id] ? "-" : "+"}
            </span>
          </div>
          {expandedItems[helpItem.id] && (
            <div className="mt-2 bg-gray-100 p-4">
              <p>{helpItem.content}</p>
              {user && (
                <div className="mt-2">
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => removeHelpItem(helpItem.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded ml-2"
                    onClick={() =>
                      editHelpItem(
                        helpItem.id,
                        "Updated Title",
                        "Updated Content"
                      )
                    }
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Help;
