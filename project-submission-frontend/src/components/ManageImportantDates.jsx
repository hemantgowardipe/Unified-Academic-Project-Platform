import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import api from "../services/axiosInstance.js";
import { Calendar, Plus, Trash2, X } from 'lucide-react';

const ManageImportantDates = ({ theme }) => {
    const [dates, setDates] = useState([]);
    const [newDate, setNewDate] = useState({ title: "", description: "", date: "" });
    const [isOpen, setIsOpen] = useState(false);

    const fetchDates = async () => {
        try {
            const res = await api.get("/important-dates");
            setDates(res.data || []);
        } catch (err) {
            console.error("Failed to fetch dates", err);
        }
    };

    useEffect(() => {
        fetchDates();
    }, []);

    const handleAdd = async () => {
        if (!newDate.title.trim() || !newDate.date) return;

        try {
            // Convert datetime-local format to ISO string
            const isoDate = new Date(newDate.date).toISOString();

            const payload = {
                title: newDate.title,
                description: newDate.description,
                date: isoDate  // Send as ISO string
            };

            await api.post("/important-dates", payload);
            setNewDate({ title: "", description: "", date: "" });
            fetchDates();
        } catch (err) {
            console.error("Failed to add date", err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/important-dates/${id}`);
            fetchDates();
        } catch (err) {
            console.error("Failed to delete date", err);
        }
    };

    // Helper function to format date for datetime-local input
    const formatDateForInput = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toISOString().slice(0, 16); // Format: YYYY-MM-DDTHH:MM
    };

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className={`flex items-center gap-2 px-4 py-2 ${theme.button} ${theme.buttonBorder} border rounded-lg font-medium text-sm ${theme.text.primary}`}
            >
                <Calendar className="w-4 h-4" />
                Important Dates
            </button>
        );
    }

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className={`flex items-center gap-2 px-4 py-2 ${theme.button} ${theme.buttonBorder} border rounded-lg font-medium text-sm ${theme.text.primary}`}
            >
                <Calendar className="w-4 h-4" />
                Important Dates
            </button>

            {createPortal(
                <>
                    <div
                        className="fixed inset-0 bg-black/50"
                        style={{ zIndex: 9999 }}
                        onClick={() => setIsOpen(false)}
                    ></div>

                    <div
                        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md mx-4"
                        style={{ zIndex: 10000 }}
                    >
                        <div className={`${theme.cardBg} rounded-lg shadow-xl overflow-hidden`}>
                            {/* Header */}
                            <div className={`flex items-center justify-between p-4 border-b ${theme.border}`}>
                                <h2 className={`text-lg font-semibold ${theme.text.primary}`}>
                                    Important Dates
                                </h2>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className={`${theme.text.secondary} hover:${theme.text.primary}`}
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Add Form */}
                            <div className="p-4 space-y-3">
                                <input
                                    type="text"
                                    placeholder="Title"
                                    className={`w-full px-3 py-2 ${theme.cardBg} ${theme.border} border rounded ${theme.text.primary} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    value={newDate.title}
                                    onChange={(e) => setNewDate(prev => ({ ...prev, title: e.target.value }))}
                                />
                                <input
                                    type="text"
                                    placeholder="Description"
                                    className={`w-full px-3 py-2 ${theme.cardBg} ${theme.border} border rounded ${theme.text.primary} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    value={newDate.description}
                                    onChange={(e) => setNewDate(prev => ({ ...prev, description: e.target.value }))}
                                />
                                <input
                                    type="datetime-local"
                                    className={`w-full px-3 py-2 ${theme.cardBg} ${theme.border} border rounded ${theme.text.primary} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    value={newDate.date}
                                    onChange={(e) => setNewDate(prev => ({ ...prev, date: e.target.value }))}
                                />
                                <button
                                    onClick={handleAdd}
                                    disabled={!newDate.title.trim() || !newDate.date}
                                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-2 rounded font-medium transition-colors"
                                >
                                    Add Date
                                </button>
                            </div>

                            {/* Dates List */}
                            <div className={`max-h-60 overflow-y-auto border-t ${theme.border}`}>
                                {dates.length === 0 ? (
                                    <div className={`p-8 text-center ${theme.text.secondary}`}>
                                        <Calendar className="w-12 h-12 mx-auto mb-2 opacity-50" />
                                        <p>No dates added yet</p>
                                    </div>
                                ) : (
                                    dates.map((date) => (
                                        <div key={date.id} className={`p-4 border-b ${theme.border} flex justify-between items-start last:border-b-0`}>
                                            <div className="flex-1">
                                                <h4 className={`font-medium ${theme.text.primary}`}>
                                                    {date.title}
                                                </h4>
                                                {date.description && (
                                                    <p className={`text-sm ${theme.text.secondary} mt-1`}>
                                                        {date.description}
                                                    </p>
                                                )}
                                                <p className={`text-xs ${theme.text.muted} mt-2`}>
                                                    {new Date(date.date).toLocaleString()}
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => handleDelete(date.id)}
                                                className="text-red-600 hover:text-red-800 p-1 transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>

                            {/* Footer */}
                            <div className={`p-4 border-t ${theme.border}`}>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className={`w-full ${theme.button} ${theme.buttonBorder} border py-2 rounded font-medium ${theme.text.primary} transition-colors`}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </>,
                document.body
            )}
        </>
    );
};

export default ManageImportantDates;