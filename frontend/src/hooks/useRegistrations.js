import { useState, useEffect } from "react";
import { registrationsService } from "../services";

const useRegistrations = (userId) => {
    const [enrolledEventIds, setEnrolledEventIds] = useState(new Set());
    const [eventRegistrationStatus, setEventRegistrationStatus] = useState(new Map());
    const [registrationCounts, setRegistrationCounts] = useState(new Map());
    const [loading, setLoading] = useState(false);
    const [countsLoading, setCountsLoading] = useState(false);

    // Load user's enrolled events and their statuses
    useEffect(() => {
        const loadEnrolledEvents = async () => {
            if (!userId) {
                setEnrolledEventIds(new Set());
                setEventRegistrationStatus(new Map());
                return;
            }

            setLoading(true);
            try {
                let registrations = [];
                if (typeof registrationsService.getByUser === "function") {
                    registrations = await registrationsService.getByUser(userId);
                } else if (typeof registrationsService.getByUserId === "function") {
                    registrations = await registrationsService.getByUserId(userId);
                } else if (typeof registrationsService.getUserRegistrations === "function") {
                    registrations = await registrationsService.getUserRegistrations(userId);
                } else if (typeof registrationsService.getAll === "function") {
                    const all = await registrationsService.getAll();
                    registrations = all?.filter((reg) => String(reg.user_id) === String(userId)) || [];
                }

                if (registrations && Array.isArray(registrations)) {
                    const enrolledIds = new Set(registrations.map((reg) => String(reg.event_id)));
                    const statusMap = new Map(
                        registrations.map((reg) => [String(reg.event_id), (reg.status || "").toLowerCase()])
                    );
                    setEnrolledEventIds(enrolledIds);
                    setEventRegistrationStatus(statusMap);
                }
            } catch (error) {
                console.error("Error loading enrolled events:", error);
                setEnrolledEventIds(new Set());
                setEventRegistrationStatus(new Map());
            } finally {
                setLoading(false);
            }
        };

        loadEnrolledEvents();
    }, [userId]);

    // Load registration counts for all events
    useEffect(() => {
        const loadCounts = async () => {
            setCountsLoading(true);
            try {
                const counts = new Map();

                if (typeof registrationsService.countAllByEvent === "function") {
                    const rows = await registrationsService.countAllByEvent();
                    rows?.forEach((r) => counts.set(String(r.event_id), Number(r.count)));
                } else if (typeof registrationsService.getAll === "function") {
                    const all = await registrationsService.getAll();
                    all?.forEach((reg) => {
                        const k = String(reg.event_id);
                        counts.set(k, (counts.get(k) || 0) + 1);
                    });
                }

                setRegistrationCounts(counts);
            } catch (e) {
                console.error("Error loading registration counts:", e);
                setRegistrationCounts(new Map());
            } finally {
                setCountsLoading(false);
            }
        };

        loadCounts();
    }, []);

    const isUserEnrolled = (eventId) => enrolledEventIds.has(String(eventId));
    
    const getRegistrationStatus = (eventId) => eventRegistrationStatus.get(String(eventId));
    
    const getRegistrationCount = (eventId) => registrationCounts.get(String(eventId)) || 0;

    const updateEnrollment = (eventId, status = "pending") => {
        setEnrolledEventIds((prev) => new Set([...prev, String(eventId)]));
        setEventRegistrationStatus((prev) => {
            const next = new Map(prev);
            next.set(String(eventId), status);
            return next;
        });
        setRegistrationCounts((prev) => {
            const next = new Map(prev);
            const k = String(eventId);
            next.set(k, (next.get(k) || 0) + 1);
            return next;
        });
    };

    return {
        enrolledEventIds,
        eventRegistrationStatus,
        registrationCounts,
        loading,
        countsLoading,
        isUserEnrolled,
        getRegistrationStatus,
        getRegistrationCount,
        updateEnrollment,
    };
};

export default useRegistrations;