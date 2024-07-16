import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useHelp } from "../hooks/useHelp";
export const Help = () => {
  const { user } = useAuth();
  const [expandedItems, setExpandedItems] = useState({});
  const [newHelpTitle, setNewHelpTitle] = useState("");
  const [newHelpContent, setNewHelpContent] = useState("");
  const { getHelpList, helpList, addHelpItem, removeHelpItem, editHelpItem } = useHelp();

  const toggleExpand = (index) => {
    setExpandedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleAddHelpItem = () => {
    if (newHelpTitle && newHelpContent) {
      addHelpItem({ questionName: newHelpTitle, answer: newHelpContent });
      setNewHelpTitle("");
      setNewHelpContent("");
    }
  };

  useEffect(() => {
    getHelpList();
  }, [getHelpList]);

  return (
    <div className="container mx-auto px-4 pt-32 max-w-6xl">
      <h1 className="text-3xl font-bold text-center mb-8">עזרה</h1>
      {user && (
        <div className="mb-4">
          <input
            type="text"
            className="border rounded p-2 mb-2 w-full"
            placeholder="כותרת"
            value={newHelpTitle}
            onChange={(e) => setNewHelpTitle(e.target.value)}
          />
          <textarea
            className="border rounded p-2 mb-2 w-full"
            placeholder="תוכן"
            value={newHelpContent}
            onChange={(e) => setNewHelpContent(e.target.value)}
          />
          <div className="flex justify-end pb-5">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleAddHelpItem}
            >
              הוסף שאלה / עזרה
            </button>
          </div>
        </div>
      )}

      {helpList.map((helpItem, index) => (
        <div key={index} className="mb-4">
          <div
            className="cursor-pointer flex justify-between items-center"
            onClick={() => toggleExpand(index)}
          >
            <h2 className="text-xl font-bold">{helpItem.questionName}</h2>
            <span className="ml-2">{expandedItems[index] ? "-" : "+"}</span>
          </div>
          {expandedItems[index] && (
            <div className="mt-2 bg-gray-100 p-4">
              <p>{helpItem.answer}</p>
              {user && (
                <div className="mt-2 flex items-center justify-end gap-1 text-sm">
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => {
                      removeHelpItem(helpItem.id).then((res) => {
                        setExpandedItems((prev) => {
                          const newItems = { ...prev };
                          delete newItems[index];
                          return newItems;
                        });
                      });
                    }}
                  >
                    מחק
                  </button>
                  <button
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded ml-2"
                    onClick={() => {
                      const questionName = prompt(
                        "הכנס כותרת חדשה:",
                        helpItem.questionName
                      );
                      const answer = prompt("הכנס תוכן חדש:", helpItem.answer);
                      if (questionName && answer) {
                        helpItem.questionName = questionName;
                        helpItem.answer = answer;
                        editHelpItem(helpItem.id, helpItem);
                        setExpandedItems({ ...expandedItems }); // force re-render
                      }
                    }}
                  >
                    עריכה
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
