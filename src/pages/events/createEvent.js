import React, { useState } from "react";
import { db } from "../../config/firebase";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export const CreateEvent = () => {
    const [eventData, setEventData] = useState({
        title: "",
        image: "",
        description: "",
        eventDate: new Date().toISOString(),
        participant: 0,
        audienceAge: "",
        location: "",
        price: 0,
        expireDate: new Date().toISOString(),
        eventDuration: 0,
        URL: "",
    });

    const [error, setError] = useState("");
    const navigate = useNavigate();

    const eventsCollectionRef = collection(db, "events");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEventData({ ...eventData, [name]: value });
    };

    const createEvent = async (e) => {
        e.preventDefault();
        if (!eventData.title) {
            setError("Title is required");
            return;
        }
        try {
            await addDoc(eventsCollectionRef, {
                title: eventData.title,
                image: eventData.image || "",
                description: eventData.description || "",
                eventDate: eventData.eventDate || new Date().toISOString(),
                participant: parseInt(eventData.participant) || 0,
                audienceAge: eventData.audienceAge || "",
                location: eventData.location || "",
                price: parseFloat(eventData.price) || 0,
                expireDate: eventData.expireDate || new Date().toISOString(),
                eventDuration: parseInt(eventData.eventDuration) || 0,
                URL: eventData.URL || "",
            });
            navigate("/events");
        } catch (error) {
            setError("Error creating event: " + error.message);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
            <h1 className="text-2xl font-bold mb-4">Create Event</h1>
            <form onSubmit={createEvent} className="space-y-4">
                <div>
                    <label className="block text-gray-700">Title</label>
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={eventData.title}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Image URL</label>
                    <input
                        type="text"
                        name="image"
                        placeholder="Image URL"
                        value={eventData.image}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Description</label>
                    <textarea
                        name="description"
                        placeholder="Description"
                        value={eventData.description}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Event Date</label>
                    <input
                        type="date"
                        name="eventDate"
                        placeholder="Event Date"
                        value={eventData.eventDate}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Participant</label>
                    <input
                        type="number"
                        name="participant"
                        placeholder="Participant"
                        value={eventData.participant}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Audience Age</label>
                    <input
                        type="text"
                        name="audienceAge"
                        placeholder="Audience Age"
                        value={eventData.audienceAge}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Location</label>
                    <input
                        type="text"
                        name="location"
                        placeholder="Location"
                        value={eventData.location}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Price</label>
                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={eventData.price}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Expire Date</label>
                    <input
                        type="date"
                        name="expireDate"
                        placeholder="Expire Date"
                        value={eventData.expireDate}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Event Duration</label>
                    <input
                        type="number"
                        name="eventDuration"
                        placeholder="Event Duration"
                        value={eventData.eventDuration}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">URL</label>
                    <input
                        type="text"
                        name="URL"
                        placeholder="URL"
                        value={eventData.URL}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
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
