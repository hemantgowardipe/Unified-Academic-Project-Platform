import { useEffect, useState } from "react";
import api from "../services/axiosInstance.js";

const LandingPagePopup = () => {
    const [events, setEvents] = useState([]);
    const [visible, setVisible] = useState(true);

    const fetchDates = async () => {
        try {
            const res = await api.get("/important-dates");
            setEvents(res.data || []);
        } catch (err) {
            console.error("Failed to load dates", err);
        }
    };

    useEffect(() => {
        fetchDates();
    }, []);

    if (!visible || events.length === 0) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-lg max-w-md w-full mx-4 overflow-hidden">
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900">Upcoming Events</h2>
                    <button
                        onClick={() => setVisible(false)}
                        className="text-gray-400 hover:text-gray-600 text-xl"
                    >
                        ×
                    </button>
                </div>

                {/* Events List */}
                <div className="max-h-80 overflow-y-auto">
                    {events.map((event, index) => (
                        <div key={event.id} className="px-6 py-4 border-b border-gray-50 last:border-b-0">
                            <h3 className="font-medium text-gray-900 mb-1 leading-tight">
                                {event.title}
                            </h3>

                            <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                                {event.description}
                            </p>

                            <div className="flex items-center text-sm font-medium text-gray-700">
                                <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                {new Date(event.date).toLocaleDateString('en-US', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                                <span className="mx-2">•</span>
                                {new Date(event.date).toLocaleTimeString('en-US', {
                                    hour: 'numeric',
                                    minute: '2-digit',
                                    hour12: true
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-gray-50 text-center">
                    <button
                        onClick={() => setVisible(false)}
                        className="bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LandingPagePopup;