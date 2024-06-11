import React from "react";

export const EventModal = ({ event, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full relative">
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    onClick={onClose}>
                    &times;
                </button>
                <h2 className="text-2xl font-bold mb-4">{event.title}</h2>
                <p>
                    <strong>תיאור:</strong> {event.description}
                </p>
                <p>
                    <strong>תאריך:</strong> {event.eventDate}
                </p>
                <p>
                    <strong>מיקום:</strong> {event.location}
                </p>
                <p>
                    <strong>מחיר:</strong> {event.price}
                </p>
                <p>
                    <strong>קישור:</strong>{" "}
                    <a href={event.URL} target="_blank" rel="noopener noreferrer">
                        {event.URL}
                    </a>
                </p>
            </div>
        </div>
    );
};
