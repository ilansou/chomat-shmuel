import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { format } from "date-fns";
import { useClasses } from "../../contexts/ClassesContext";

const schema = yup.object().shape({
  title: yup.string().required("כותרת נדרשת"),
  description: yup.string().required("תיאור נדרש"),
  classDate: yup.date().nullable().typeError("תאריך שיעור נדרש").required("תאריך שיעור נדרש").min(new Date(), "תאריך השיעור חייב להיות תאריך עתידי"),
  frequency: yup.string().required("תדירות נדרשת").required("תדירות נדרשת"),
  category: yup.string().required("קטגוריה נדרשת").required("קטגוריה נדרשת"),
  expireDate: yup.date().nullable().typeError("תאריך תפוגה נדרש").required("תאריך תפוגה נדרש").min(yup.ref("classDate"), "תאריך תפוגה חייב להיות אחרי תאריך השיעור"),
  URL: yup.string().url("נא להזין כתובת אתר תקינה"),
  teacherName: yup.string().required("שם המורה נדרש"),
  teacherPhone: yup.string().required("מספר טלפון המורה נדרש"),
  teacherEmail: yup.string().email("כתובת אימייל לא תקינה").required("אימייל המורה נדרש"),
  weekday: yup.string().required("יום בשבוע נדרש"),
});

export const ClassForm = ({ classItem, onClose, onSubmit: handleUpdate, isEditing }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileBase64, setFileBase64] = useState(null);
  const [showOtherTextInput, setShowOtherTextInput] = useState(false);
  const { addClass, editClass } = useClasses();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (isEditing && classItem) {
      reset({
        ...classItem,
        classDate: classItem.classDate ? format(classItem.classDate, "yyyy-MM-dd'T'HH:mm") : '',
        expireDate: classItem.expireDate ? format(classItem.expireDate, "yyyy-MM-dd") : '',
      });
      setFileBase64(classItem.imageUrl || null);
      setShowOtherTextInput(classItem.category === "אחר");
    }
  }, [isEditing, classItem, reset]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      const classData = { ...data };

      if (isEditing) {
        if (!fileBase64 && classItem.imageUrl) {
          classData.imageUrl = classItem.imageUrl;
        } else if (fileBase64) {
          classData.imageUrl = fileBase64;
        }
        await editClass(classItem.id, classData, fileBase64);
      } else {
        if (fileBase64) {
          classData.imageUrl = fileBase64;
        }
        await addClass(classData, fileBase64);
      }
      setIsSubmitting(false);
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

  const handleCategoryChange = (e) => {
    setShowOtherTextInput(e.target.value === "אחר");
  };

  // Weekday options
  const weekdayOptions = [
    { label: "בחר יום בשבוע", value: "" },
    { label: "ראשון", value: "Sunday" },
    { label: "שני", value: "Monday" },
    { label: "שלישי", value: "Tuesday" },
    { label: "רביעי", value: "Wednesday" },
    { label: "חמישי", value: "Thursday" },
    { label: "שישי", value: "Friday" },
    { label: "שבת", value: "Saturday" }
  ];

  const fields = [
    { label: "כותרת", name: "title", type: "text", required: true },
    { label: "קובץ", name: "imageUrl", type: "file", accept: "image/*,.pdf" },
    { label: "תיאור", name: "description", type: "textarea", required: true },
    { label: "קישור", name: "URL", type: "url" },
    { label: "תאריך ושעת השיעור", name: "classDate", type: "datetime-local", required: true },
    { label: "תאריך תפוגה", name: "expireDate", type: "date", required: true },
    {
      label: "תחום",
      name: "category",
      type: "select",
      options: [
        { label: "בחר תחום", value: "" },
        { label: "חוגי הגיל השלישי", value: "חוגי הגיל השלישי" },
        { label: "התעלמות וספורט", value: "התעלמות וספורט" },
        { label: "חוגי מחול", value: "חוגי מחול" },
        { label: "חוגי אומנות", value: "חוגי אומנות" },
        { label: "חוגי העשרה", value: "חוגי העשרה" },
        { label: 'חוגי צמי"ד', value: 'חוגי צמי"ד' },
        { label: "אחר", value: "אחר" },
      ],
      required: true,
      onChange: handleCategoryChange,
    },
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
    {
      label: "תדירות",
      name: "frequency",
      type: "select",
      options: [
        { label: "חד פעמי", value: "one-time" },
        { label: "שבועי", value: "weekly" },
        { label: "דו-שבועי", value: "biweekly" },
        { label: "חודשי", value: "monthly" },
      ],
      required: true,
    },
    { label: "משך השיעור (בדקות)", name: "duration", type: "number", required: true },
    { label: "יום בשבוע", name: "weekday", type: "select", options: weekdayOptions, required: true },
    { label: "מיקום", name: "location", type: "text", required: true },
    { label: "מחיר", name: "price", type: "number", step: "0.1" },
    { label: "מספר משתתפים", name: "participant", type: "number" },
    { label: "משך השיעור (בדקות)", name: "classDuration", type: "number" },
    { label: "שם המורה", name: "teacherName", type: "text", required: true },
    { label: "טלפון המורה", name: "teacherPhone", type: "tel", required: true },
    { label: "אימייל המורה", name: "teacherEmail", type: "email", required: true },
  ];
  
  // Existing return statement
  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-md overflow-y-auto max-h-[90vh]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">{isEditing ? "עריכת חוג" : "צור חוג חדש"}</h1>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">&#x2716;</button>
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
                  onChange={field.onChange}
                >
                  {field.options.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
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
            disabled={isSubmitting}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {isSubmitting ? "שולח..." : isEditing ? "שמור שינויים" : "צור שיעור"}
          </button>
        </div>
      </form>
    </div>
  );
};