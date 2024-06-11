import React, { useState } from "react";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export const CreateEvent = ({ onClose }) => {
    const [event, setEvent] = useState({
        title: "",
        image: "",
        description: "",
        eventDate: new Date().toISOString().substring(0, 10),
        participant: 0,
        audienceAge: "",
        location: "",
        price: 0,
        expireDate: new Date().toISOString().substring(0, 10),
        eventDuration: 0,
        URL: "",
    });

    const [error, setError] = useState("");
    const navigate = useNavigate();

    const eventsCollectionRef = collection(db, "events");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEvent({ ...event, [name]: value });
    };

    const createEvent = async (e) => {
        e.preventDefault();
        if (!event.title) {
            setError("Title is required");
            return;
        }
        try {
            await addDoc(eventsCollectionRef, {
                ...event,
                participant: parseInt(event.participant),
                price: parseFloat(event.price),
                eventDuration: parseInt(event.eventDuration),
            });
            navigate("/events");
            onClose(); // Close the modal after event creation
        } catch (error) {
            setError("Error creating event: " + error.message);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 pt-[150px] rounded-md shadow-md">
            <h1 className="text-2xl font-bold mb-4">Create Event</h1>
            <button onClick={onClose} className="absolute top-4 right-4 text-blue-200">
                &#x2716;
            </button>
            <form onSubmit={createEvent} className="space-y-4">
                {[
                    { label: "כותרת", name: "title", type: "text" },
                    {
                        label: "Image URL",
                        name: "image",
                        type: "file",
                    },
                    { label: "Description", name: "description", type: "textarea" },
                    { label: "Event Date", name: "eventDate", type: "date" },
                    { label: "Participant", name: "participant", type: "number" },
                    { label: "Audience Age", name: "audienceAge", type: "text" },
                    { label: "Location", name: "location", type: "text" },
                    { label: "Price", name: "price", type: "number" },
                    { label: "Expire Date", name: "expireDate", type: "date" },
                    { label: "Event Duration", name: "eventDuration", type: "number" },
                    { label: "URL", name: "URL", type: "text" },
                ].map((field) => (
                    <div key={field.name}>
                        <label className="block text-gray-700">{field.label}</label>
                        {field.type === "textarea" ? (
                            <textarea
                                name={field.name}
                                placeholder={field.label}
                                value={event[field.name]}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        ) : (
                            <input
                                type={field.type}
                                name={field.name}
                                placeholder={field.label}
                                value={event[field.name]}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        )}
                    </div>
                ))}
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                    Create Event
                </button>
            </form>
            {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
    );
};
