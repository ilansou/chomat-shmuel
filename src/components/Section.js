import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { SubheadeAbout } from "./SubheadeAbout";

export const Section = ({
    section,
    onRemove,
    onEdit,
    onAddSubheader,
    onRemoveSubheader,
    onEditSubheader,
  }) => {
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [header, setHeader] = useState(section.header);
    const [content, setContent] = useState(section.content);
  
    const handleEdit = () => {
      onEdit(section.id, header, content);
      setIsEditing(false);
    };
  
    return (
      <div className="mb-6 p-4 border rounded shadow">
        {user && isEditing ? (
          <div>
            <input
              type="text"
              value={header}
              onChange={(e) => setHeader(e.target.value)}
              className="w-full p-2 mb-2 border rounded"
            />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-2 mb-2 border rounded"
            />
            <button
              onClick={handleEdit}
              className="mr-2 px-4 py-2 bg-green-500 text-white rounded"
            >
              Save
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-bold">{section.header}</h2>
            <p
              className="mt-2"
              dangerouslySetInnerHTML={{
                __html: section.content.replace(/\n/g, "<br />"),
              }}
            />
            {user && (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="mr-2 px-4 py-2 bg-yellow-500 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => onRemove(section.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded"
                >
                  Remove
                </button>
              </>
            )}
          </div>
        )}
        <div className="mt-4">
          {section.subheaders.map((subheader) => (
            <SubheadeAbout
              key={subheader.id}
              subheader={subheader}
              onRemove={() => onRemoveSubheader(section.id, subheader.id)}
              onEdit={(newSubheader, newSubcontent) =>
                onEditSubheader(section.id, subheader.id, newSubheader, newSubcontent)
              }
            />
          ))}
          {user && (
            <button
              onClick={() => onAddSubheader(section.id)}
              className="mt-2 px-4 py-2 bg-blue-300 text-white rounded opacity-75"
            >
              Add Subheader
            </button>
          )}
        </div>
      </div>
    );
  };