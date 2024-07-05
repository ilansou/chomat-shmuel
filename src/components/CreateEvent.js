import React, { useState } from "react";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  title: yup.string().required("כותרת נדרשת"),
  description: yup.string().required("תיאור נדרש"),
  eventDate: yup
    .date()
    .nullable()
    .typeError("תאריך אירוע נדרש")
    .required("תאריך אירוע נדרש")
    .min(new Date(), "תאריך האירוע חייב להיות תאריך עתידי"),
  audienceAge: yup.string(),
  expireDate: yup
    .date()
    .nullable()
    .typeError("תאריך תפוגה נדרש")
    .required("תאריך תפוגה נדרש")
    .min(yup.ref("eventDate"), "תאריך תפוגה חייב להיות אחרי תאריך האירוע"),
  URL: yup.string().url("נא להזין כתובת אתר תקינה"),
});

export const CreateEvent = ({ onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageBase64, setImageBase64] = useState(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const eventsCollectionRef = collection(db, "events");

  const onSubmit = async (data) => {
    setIsSubmitting(true);
  
    try {
      const eventData = {
        ...data,
        imageUrl: imageBase64,
        participant: data.participant ? parseInt(data.participant) : null,
        price: data.price ? parseFloat(data.price) : null,
        eventDuration: data.eventDuration ? parseInt(data.eventDuration) : null,
      };
  
      await addDoc(eventsCollectionRef, eventData);
      navigate("/events");
      onClose();
    } catch (error) {
      setError("root", {
        type: "manual",
        message: "שגיאה ביצירת האירוע: " + error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const fields = [
    { label: "כותרת", name: "title", type: "text", required: true },
    { label: "תמונה", name: "imageUrl", type: "file", accept: "image/*", required: true },
    { label: "תיאור", name: "description", type: "textarea", required: true },
    { label: "קישור", name: "URL", type: "url" },
    { label: "תאריך ושעת האירוע", name: "eventDate", type: "datetime-local", required: true },
    { label: "תאריך תפוגה", name: "expireDate", type: "date", required: true },
    { label: "גיל קהל היעד", name: "audienceAge", type: "text" },
    { label: "מיקום", name: "location", type: "text", required: true },
    { label: "מחיר", name: "price", type: "number", step: "0.1" },
    { label: "מספר משתתפים", name: "participant", type: "number" },
    { label: "משך האירוע (בדקות)", name: "eventDuration", type: "number" },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">יצירת אירוע חדש</h1>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          &#x2716;
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fields.map((field) => (
            <div key={field.name} className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                {field.label}
                {field.required && <span className="text-red-500">*</span>}
              </label>
              {field.type === "textarea" ? (
                <textarea
                  {...register(field.name)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  rows="3"
                />
              ) : field.type === "file" ? (
                <input
                  type={field.type}
                  accept={field.accept}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  onChange={handleFileChange}
                />
              ) : (
                <input
                  type={field.type}
                  {...register(field.name)}
                  step={field.step}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              )}
              {errors[field.name] && (
                <p className="text-red-500 text-xs mt-1">{errors[field.name].message}</p>
              )}
            </div>
          ))}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300 disabled:opacity-50"
        >
          {isSubmitting ? "יוצר אירוע..." : "צור אירוע"}
        </button>
      </form>
      {errors.root && <p className="text-red-500 mt-4 text-center">{errors.root.message}</p>}
    </div>
  );
};

export default CreateEvent;
