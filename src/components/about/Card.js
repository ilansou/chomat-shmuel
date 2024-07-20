import React, { useState } from "react";
import { RiDeleteBin6Line, RiEdit2Line } from "react-icons/ri";
import { FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useAuth } from "../../contexts/AuthContext";

const defaultImageUrl =
  "https://www.mgp.net.au/wp-content/uploads/2023/05/150-1503945_transparent-user-png-default-user-image-png-png.png";

export const Card = ({ staff, onDelete, onEdit }) => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: staff.name || "ישראל ישראלי",
    imageUrl: staff.imageUrl || defaultImageUrl,
    role: staff.role || "",
    phone: staff.phone || "",
    email: staff.email || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFormData((prevData) => ({
        ...prevData,
        imageUrl: reader.result,
      }));
    };
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onEdit(staff.id, formData);
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    onDelete(staff.id);
  };

  return (
    <div className="border border-gray-200 p-4 rounded-lg shadow-md flex items-start w-full max-w-xl">
      <div className="flex-1 w-full">
        {!isEditing ? (
          <>
            <div className="flex justify-end w-full">
              {user && (
                <div className="flex gap-2">
                  <button
                    onClick={handleEditClick}
                    className="text-yellow-500 hover:text-yellow-700 mr-2"
                  >
                    <RiEdit2Line />
                  </button>
                  <button
                    onClick={handleDeleteClick}
                    className="text-red-500 hover:text-red-700"
                  >
                    <RiDeleteBin6Line />
                  </button>
                </div>
              )}
            </div>
            <div className="flex items-center gap-4">
              <div className="">
                <img
                  src={formData.imageUrl}
                  alt={formData.name}
                  className="rounded-full"
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "cover",
                  }}
                />
              </div>
              <div>
                <h3 className="text-xl font-bold">{formData.name}</h3>
                <p className="mt-2 text-sm">{formData.role}</p>
                {formData.phone && (
                  <p className="text-sm flex gap-4 items-center mb-1">
                    <strong>
                      <FaPhone color="#38bdf8" />
                    </strong>{" "}
                    {formData.phone}
                  </p>
                )}
                {formData.email && (
                  <p className="text-sm flex gap-4 items-center">
                    <strong>
                      <MdEmail color="#38bdf8" size={17} />
                    </strong>{" "}
                    {formData.email}
                  </p>
                )}
              </div>
            </div>
          </>
        ) : (
          <>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border border-gray-300 rounded-md w-full p-2 mb-2"
              placeholder="שם מלא"
            />
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="border border-gray-300 rounded-md w-full p-2 mb-2"
              placeholder="תפקיד"
            />
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="border border-gray-300 rounded-md w-full p-2 mb-2"
              placeholder="מספר פלאפון"
            />
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-300 rounded-md w-full p-2 mb-2"
              placeholder='כתובת דוא"ל'
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="border border-gray-300 rounded-md w-full p-2 mb-2"
            />
            <div className="mt-2 mb-4">
              <img
                src={formData.imageUrl || defaultImageUrl}
                alt={formData.name}
                className="rounded-full"
                style={{ width: "120px", height: "120px", objectFit: "cover" }}
              />
            </div>
            {user && (
              <div className="flex justify-end">
                <button
                  onClick={handleSaveClick}
                  className="mr-2 px-4 py-2 bg-green-300 text-white rounded"
                >
                  ערוך
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
