import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

export const SubheadeAbout = ({ subheader, onRemove, onEdit }) => {
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [subheaderText, setSubheaderText] = useState(subheader.subheader);
    const [subcontent, setSubcontent] = useState(subheader.subcontent);
  
    const handleEdit = () => {
      onEdit(subheaderText, subcontent);
      setIsEditing(false);
    };
  
    return (
      <div className="mt-4 pl-4 border-l-4 border-gray-300">
        {user && isEditing ? (
          <div>
            <input
              type="text"
              value={subheaderText}
              onChange={(e) => setSubheaderText(e.target.value)}
              className="w-full p-2 mb-2 border rounded"
            />
            <textarea
              value={subcontent}
              onChange={(e) => setSubcontent(e.target.value)}
              className="w-full p-2 mb-2 border rounded"
            />
            <button
              onClick={handleEdit}
              className="mr-2 px-4 py-2 bg-green-300 text-white rounded"
            >
              Save
            </button>
          </div>
        ) : (
          <div>
            <h3 className="text-lg font-semibold">{subheader.subheader}</h3>
            <p
              className="mt-1"
              dangerouslySetInnerHTML={{
                __html: subheader.subcontent.replace(/\n/g, "<br />"),
              }}
            />
            {user && (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="mr-2 px-4 py-2 bg-yellow-300 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={onRemove}
                  className="px-4 py-2 bg-red-300 text-white rounded"
                >
                  Remove
                </button>
              </>
            )}
          </div>
        )}
      </div>
    );
  };