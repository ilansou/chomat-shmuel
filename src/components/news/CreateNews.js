import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNews } from "../../contexts/NewsContext";

const schema = yup.object().shape({
  title: yup.string().required("כותרת נדרשת"),
  description: yup.string().required("תיאור נדרש"),
  newsDate: yup.date().required("תאריך חדשות נדרש").typeError("תאריך לא תקין"),
  expireDate: yup.date().required("תאריך תפוגה נדרש").typeError("תאריך לא תקין"),
  image: yup.string().url("קישור תמונה לא תקין").required("תמונה נדרשת"),
});

export const CreateNews = ({ onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addNews } = useNews();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await addNews(data);
      setIsSubmitting(false);
      onClose();
    } catch (error) {
      setIsSubmitting(false);
    }
  };

  const fields = [
    { label: "כותרת", name: "title", type: "text", required: true },
    { label: "תיאור", name: "description", type: "textarea", required: true },
    { label: "תאריך ושעת החדשות", name: "newsDate", type: "date", required: true },
    { label: "תאריך תפוגה", name: "expireDate", type: "date", required: true },
    { label: "תמונה (קישור)", name: "image", type: "url", required: true },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-md overflow-y-auto max-h-[90vh]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">יצירת חדשות חדשות</h1>
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
              ) : (
                <input
                  type={field.type}
                  {...register(field.name)}
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
            disabled={isSubmitting}
          >
            {isSubmitting ? "שולח..." : "שלח"}
          </button>
        </div>
      </form>
    </div>
  );
};