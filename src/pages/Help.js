import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useHelp } from "../hooks/useHelp";
import { RiDeleteBin6Line, RiEdit2Line } from "react-icons/ri"; // Example icons
import { MdAdd } from "react-icons/md";
import { FaMinus } from "react-icons/fa6";
import PageFeedback from "../components/PageFeedback";

export const Help = () => {
  const { user } = useAuth();
  const [expandedItems, setExpandedItems] = useState({});
  const [newHelpTitle, setNewHelpTitle] = useState("");
  const [newHelpContent, setNewHelpContent] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const { getHelpList, helpList, addHelpItem, removeHelpItem, editHelpItem } =
    useHelp();

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

  const handleEditHelpItem = (index, helpItem) => {
    setEditingIndex(index);
    setEditTitle(helpItem.questionName);
    setEditContent(helpItem.answer);
  };

  const handleConfirmEdit = (id) => {
    editHelpItem(id, { questionName: editTitle, answer: editContent });
    setEditingIndex(null);
    setEditTitle("");
    setEditContent("");
  };

  useEffect(() => {
    getHelpList();
  }, [getHelpList]);

  return (
    <div className="container mx-auto px-4 pt-24 max-w-6xl">
      <h1 className="text-3xl font-bold text-center mb-8">עזרה</h1>
      {user && (
        <div className="shadow-sm border border-[#e9e9e9] p-4 mb-4">
          <h4 className="font-bold mb-4">הוספת עזרה/שאלה חדשה</h4>
          <input
            type="text"
            className="border rounded p-2 mb-2 w-full break-all"
            placeholder="כותרת"
            value={newHelpTitle}
            onChange={(e) => setNewHelpTitle(e.target.value)}
          />
          <textarea
            className="border rounded p-2 mb-2 w-full break-all"
            placeholder="תוכן"
            value={newHelpContent}
            onChange={(e) => setNewHelpContent(e.target.value)}
          />
          <div className="flex justify-end">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleAddHelpItem}
            >
              הוסף
            </button>
          </div>
        </div>
      )}

      {helpList.map((helpItem, index) => (
        <div key={index} className="my-4 shadow-3xl p-4">
          <div
            className="cursor-pointer flex items-center"
            onClick={() => toggleExpand(index)}
          >
            <span
              className="ml-2 border border-[#e9e9e9] rounded-full p-1"
              dir="rtl"
            >
              {expandedItems[index] ? <FaMinus /> : <MdAdd />}
            </span>

            {editingIndex !== index && (
              <h2 className="text-xl font-bold break-all">
                {helpItem.questionName}
              </h2>
            )}
          </div>
          {expandedItems[index] && (
            <div className="mt-2">
              {editingIndex === index ? (
                <>
                  <input
                    type="text"
                    className="border rounded p-2 mb-2 w-full break-words	"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                  <textarea
                    className="border rounded p-2 mb-2 w-full break-words	"
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                  />
                  <div className="flex justify-end gap-1 text-sm">
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => setEditingIndex(null)}
                    >
                      בטל
                    </button>
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleConfirmEdit(helpItem.id)}
                    >
                      ערוך
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="break-all">{helpItem.answer}</p>
                  {user && (
                    <div className="mt-2 flex items-center justify-end gap-1 text-sm">
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => {
                          if (
                            window.confirm(
                              "האם אתה בטוח שברצונך למחוק עזרה/שאלה זו?"
                            )
                          ) {
                            removeHelpItem(helpItem.id).then((res) => {
                              setExpandedItems((prev) => {
                                const newItems = { ...prev };
                                delete newItems[index];
                                return newItems;
                              });
                            });
                          }
                        }}
                      >
                        <RiDeleteBin6Line />
                      </button>
                      <button
                        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded ml-2"
                        onClick={() => handleEditHelpItem(index, helpItem)}
                      >
                        <RiEdit2Line />
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      ))}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <PageFeedback pageId="Help" />
      </div>
    </div>
  );
};
