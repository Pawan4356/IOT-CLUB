import { useState, useEffect } from "react";
import { eventsService } from "../services";

const FALLBACK_EVENTS = [
    {
        id: null,
        title: "ERROR!! ",
        description: "Database connection error.. .",
        date: "2025-01-15",
        fee: null,
        status: "Loading...",
        spots: 50,
    },
];

const useEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadEvents = async () => {
            try {
                setLoading(true);
                const supabaseEvents = await eventsService.getAll();
                if (supabaseEvents && supabaseEvents.length > 0) {
                    setEvents(supabaseEvents);
                } else {
                    setEvents(FALLBACK_EVENTS);
                }
            } catch (err) {
                console.error("Error loading events:", err);
                setError(err);
                setEvents(FALLBACK_EVENTS);
            } finally {
                setLoading(false);
            }
        };
        loadEvents();
    }, []);

    return { events, loading, error };
};

export default useEvents;