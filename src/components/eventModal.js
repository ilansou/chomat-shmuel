import "../styles/eventModal.css";

export const EventModal = ({ event, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded shadow-lg max-w-md w-full">
                <h2 className="text-xl font-bold mb-4">{event.title}</h2>
                <p>{event.description}</p>
                <p>
                    <strong>Start:</strong> {event.start.toLocaleString()}
                </p>
                <p>
                    <strong>End:</strong> {event.end.toLocaleString()}
                </p>
                <button
                    onClick={onClose}
                    className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                    Close
                </button>
            </div>
        </div>
    );
};
