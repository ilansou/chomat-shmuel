// src/components/Card.js

import React, { useState } from "react";
import { RiDeleteBin6Line, RiEdit2Line } from "react-icons/ri"; // Example icons
import { FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useAuth } from "../contexts/AuthContext";

const defaultImageUrl = "https://via.placeholder.com/150"; // Default image URL

export const Card = ({ staff, onDelete, onEdit }) => {
    const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: staff.name || "",
    imageUrl: staff.imageUrl || defaultImageUrl,
    role: staff.role || "",
    phone: staff.phone || "",
    email: staff.email || "",
  });
  const [fileInput, setFileInput] = useState(null);

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
    <div className="border border-gray-200 p-4 rounded-lg shadow-md flex items-center w-full max-w-xl">
      <div className="flex-1">
        {!isEditing ? (
          <>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-bold">{formData.name}</h3>
              {user && 
              <div className="flex">
                <button
                  onClick={handleEditClick}
                  className="text-gray-600 hover:text-gray-800 mr-2"
                >
                  <RiEdit2Line />
                </button>
                <button
                  onClick={handleDeleteClick}
                  className="text-red-600 hover:text-red-800"
                >
                  <RiDeleteBin6Line />
                </button>
              </div>}
              
            </div>
            <div className="flex items-center">
              <div className="mr-4">
                <img
                  src={formData.imageUrl}
                  alt={formData.name}
                  className="rounded-full"
                  style={{ width: "120px", height: "120px", objectFit: "cover" }}
                />
              </div>
              <div>
                <p className="mt-2 text-sm">
                  {formData.role}
                </p>
                <p className="text-sm flex gap-4">
                  <strong><FaPhone /></strong> {formData.phone || "N/A"}
                </p>
                <p className="text-sm flex gap-4">
                  <strong><MdEmail />
                  </strong> {formData.email || "N/A"}
                </p>
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
              placeholder="Name"
            />
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="border border-gray-300 rounded-md w-full p-2 mb-2"
              placeholder="Role"
            />
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="border border-gray-300 rounded-md w-full p-2 mb-2"
              placeholder="Phone"
            />
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-300 rounded-md w-full p-2 mb-2"
              placeholder="Email"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              ref={(fileInput) => setFileInput(fileInput)}
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
            {user &&             
            <div className="flex justify-end">
              <button
                onClick={handleSaveClick}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>}

          </>
        )}
      </div>
    </div>
  );
};
