import { useState } from "react";
import { SubheadeAbout } from "./SubheadeAbout";
import { useAuth } from "../../contexts/AuthContext";
import { RiDeleteBin6Line, RiEdit2Line } from "react-icons/ri";
import { MdAdd } from "react-icons/md";
 
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
          {user && (
            <div className="flex justify-end">
              <button
                onClick={() => setIsEditing(true)}
                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded ml-2"
              >
                <RiEdit2Line />
              </button>
              <button
                onClick={() => onRemove(section.id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 ml-2 rounded"
              >
                <RiDeleteBin6Line />
              </button>
              <button
                onClick={() => onAddSubheader(section.id)}
                className=" py-1 px-3 rounded ml-2 bg-blue-300 text-white rounded flex items-center gap-1"
              >
                <MdAdd />
                הוסף תוכן משני
              </button>
            </div>
          )}
          <h2 className="text-xl font-bold">{section.header}</h2>
          <p
            className="mt-2"
            dangerouslySetInnerHTML={{
              __html: section.content.replace(/\n/g, "<br />"),
            }}
          />
        </div>
      )}
      <div className="mt-4">
        {section.subheaders.map((subheader) => (
          <SubheadeAbout
            key={subheader.id}
            subheader={subheader}
            onRemove={() => onRemoveSubheader(section.id, subheader.id)}
            onEdit={(newSubheader, newSubcontent) =>
              onEditSubheader(
                section.id,
                subheader.id,
                newSubheader,
                newSubcontent
              )
            }
          />
        ))}
      </div>
    </div>
  );
};
