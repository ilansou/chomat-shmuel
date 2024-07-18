import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { format } from "date-fns";
import { useEvents } from "../../contexts/EventsContext";

const schema = yup.object().shape({
  title: yup.string().required("כותרת נדרשת"),
  description: yup.string().required("תיאור נדרש"),
  eventDate: yup
    .date()
    .nullable()
    .typeError("תאריך אירוע נדרש")
    .required("תאריך אירוע נדרש")
    .min(new Date(), "תאריך האירוע חייב להיות תאריך עתידי"),
  audienceAge: yup.string().required("קהל יעד נדרש"),
  URL: yup.string().url("נא להזין כתובת אתר תקינה"),
});

export const EventForm = ({ event, onClose, onSubmit: handleUpdate, isEditing }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileBase64, setFileBase64] = useState(null);
  const { addEvent, editEvent, getEventList } = useEvents();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (isEditing && event) {
      reset({
        ...event,
        eventDate: event.eventDate ? format(event.eventDate, "yyyy-MM-dd'T'HH:mm") : "",
      });
      setFileBase64(event.imageUrl || null);
    }
  }, [isEditing, event, reset]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      const eventData = { ...data };

      if (isEditing) {
        // If editing and no new file is selected, keep the existing imageUrl
        if (!fileBase64 && event.imageUrl) {
          eventData.imageUrl = event.imageUrl;
        } else if (fileBase64) {
          eventData.imageUrl = fileBase64;
        }
        await editEvent(event.id, eventData, fileBase64);
      } else {
        if (fileBase64) {
          eventData.imageUrl = fileBase64;
        }
        await addEvent(eventData, fileBase64);
      }
      setIsSubmitting(false);
      await getEventList();
      onClose();
    } catch (error) {
      setIsSubmitting(false);
      console.error("Error submitting form: ", error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFileBase64(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const fields = [
    { label: "כותרת", name: "title", type: "text", required: true },
    { label: "קובץ", name: "imageUrl", type: "file", accept: "image/*,.pdf" },
    { label: "תיאור", name: "description", type: "textarea", required: true },
    { label: "קישור", name: "URL", type: "url" },
    { label: "תאריך ושעת האירוע", name: "eventDate", type: "datetime-local", required: true },
    {
      label: "קהל היעד",
      name: "audienceAge",
      type: "select",
      options: [
        { label: "בחר קהל יעד", value: "" },
        { label: "שכונה צעירה", value: "שכונה צעירה" },
        { label: "נוער", value: "נוער" },
        { label: "לכל המשפחה", value: "לכל המשפחה" },
        { label: "הגיל הרך", value: "הגיל הרך" },
        { label: "תרבות", value: "תרבות" },
        { label: "הגיל השלישי", value: "הגיל השלישי" },
        { label: "טבע עירוני", value: "טבע עירוני" },
        { label: "עמיתים", value: "עמיתים" },
        { label: "ספורט", value: "ספורט" },
        { label: "לכל הקהילה", value: "לכל הקהילה" },
        { label: "צמי'ד", value: "צמי'ד" },
        { label: "חרדי-תורני", value: "חרדי-תורני" },
        { label: "אחר", value: "אחר" },
      ],
      required: true,
    },
    { label: "מיקום", name: "location", type: "text", required: true },
    { label: "מחיר", name: "price", type: "number", step: "0.1" },
    { label: "מספר משתתפים", name: "participant", type: "number" },
    { label: "משך האירוע (בדקות)", name: "eventDuration", type: "number" },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-md overflow-y-auto max-h-[90vh]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
          {isEditing ? "ערוך אירוע" : "יצירת אירוע חדש"}
        </h1>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          &#x2716;
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {fields.map((field) => (
            <div key={field.name} className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                {field.label}
                {field.required && <span className="text-red-500">*</span>}
              </label>
              {field.type === "textarea" ? (
                <textarea
                  {...register(field.name)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 resize-vertical"
                  rows="3"
                />
              ) : field.type === "file" ? (
                <input
                  type={field.type}
                  accept={field.accept}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  onChange={handleFileChange}
                />
              ) : field.type === "select" ? (
                <select
                  {...register(field.name)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  onChange={field.onChange}>
                  {field.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : field.type === "text" && field.show ? (
                <input
                  type="text"
                  {...register(field.name)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
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
                <p className="text-xs sm:text-sm text-red-500">{errors[field.name].message}</p>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 active:bg-blue-600 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-300 disabled:opacity-70 disabled:cursor-not-allowed transition duration-150 ease-in-out"
            disabled={isSubmitting}>
            {isSubmitting ? "שולח..." : "שלח"}
          </button>
        </div>
      </form>
    </div>
  );
};
