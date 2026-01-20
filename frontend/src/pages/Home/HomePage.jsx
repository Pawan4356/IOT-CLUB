import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { registrationsService } from "../../services/database.js";
import { useEvents, useRegistrations, useEnrollment } from "../../hooks";
import { AuthModal } from "../../components";

// Home Components (Sections & Elements)
import {
    HeroSection,
    EventsSection,
    ProjectsSection,
    AboutSection,
    StatsSection,
    ServicesSection,
    FacultySection,
    FAQSection,
    EnrollmentModal
} from "../../components";

const HomePage = () => {
    const { user, loading: authLoading } = useAuth();
    
    // Modal state
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [authMode, setAuthMode] = useState("login");
    const [showEnrollModal, setShowEnrollModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [userProfile, setUserProfile] = useState(null);

    // Custom hooks
    const { events, loading: eventsLoading } = useEvents();
    const {
        registrationCounts,
        loading: enrollLoading,
        countsLoading,
        isUserEnrolled,
        getRegistrationStatus,
        getRegistrationCount,
        updateEnrollment,
    } = useRegistrations(user?.id);

    const {
        formData,
        errors,
        isSubmitting,
        submitStatus,
        handleChange,
        resetForm,
        loadUserProfile,
        submitEnrollment,
    } = useEnrollment();

    // Event enrollment logic
    const isEnrollmentClosed = (event) => {
        if (!event) return false;
        const now = new Date();
        if (event.enrollment_deadline && new Date(event.enrollment_deadline) < now) return true;
        if (event.registration_deadline && new Date(event.registration_deadline) < now) return true;
        if (event.date && new Date(event.date) < now) return true;
        if (event.is_open === false || event.is_active === false) return true;
        if (event.status === "closed" || event.status === "completed") return true;
        return false;
    };

    const isEventFull = (event) => {
        const cap = event?.spots ?? 50;
        const count = getRegistrationCount(event?.id);
        return cap !== null && count >= cap;
    };

    const getEnrollmentStatus = (event) => {
        const status = getRegistrationStatus(event.id);
        const enrolled = isUserEnrolled(event.id);
        const closed = isEnrollmentClosed(event);
        const full = isEventFull(event);
        const cap = event?.spots ?? 50;
        const count = getRegistrationCount(event.id);

        if ((enrollLoading || countsLoading) && user) {
            return "loading";
        }

        if (status === "pending") {
            return "pending";
        }

        if (enrolled) {
            return "enrolled";
        }

        if (closed) {
            return "closed";
        }

        if (full) {
            return `full (${count}/${cap})`;
        }

        return null;
    };

    const handleEnrollClick = async (event) => {
        if (!user) {
            setShowAuthModal(true);
            return;
        }

        const status = getRegistrationStatus(event.id);
        if (status === "pending") {
            alert("Your registration is pending verification for this event.");
            return;
        }

        if (isUserEnrolled(event.id)) {
            alert("You are already registered for this event!");
            return;
        }

        if (isEnrollmentClosed(event)) {
            alert("Enrollment for this event is closed.");
            return;
        }

        if (isEventFull(event)) {
            alert("This event is full.");
            return;
        }

        try {
            const isRegistered = await registrationsService.isRegistered(user.id, event.id);
            if (isRegistered) {
                updateEnrollment(event.id, "pending");
                alert("You are already registered for this event!");
                return;
            }
        } catch (error) {
            console.error("Error checking registration:", error);
        }

        setSelectedEvent(event);
        setShowEnrollModal(true);
        resetForm();

        if (user) {
            const profile = await loadUserProfile(user);
            setUserProfile(profile);
        }
    };

    const handleCloseEnrollModal = () => {
        setShowEnrollModal(false);
        setTimeout(() => {
            resetForm();
            setSelectedEvent(null);
        }, 300);
    };

    const handleSubmitEnrollment = async () => {
        if (!user) {
            setShowAuthModal(true);
            return;
        }

        if (isEventFull(selectedEvent)) {
            alert("This event is full. No spots left.");
            return;
        }

        const success = await submitEnrollment(user, selectedEvent, userProfile, (eventId) => {
            updateEnrollment(eventId, "pending");
        });

        if (success) {
            setTimeout(() => handleCloseEnrollModal(), 2000);
        }
    };

    const handleGetStarted = () => {
        setAuthMode("signup");
        setShowAuthModal(true);
    };

    if (authLoading) {
        return (
            <div className="min-h-screen bg-linear-to-b from-[#1b1833] to-[#0f0c1d] flex items-center justify-center">
                <div className="text-white text-xl">Loading...</div>
            </div>
        );
    }

    return (
        <div className="bg-linear-to-b from-[#1b1833] to-[#0f0c1d] text-white">
            {/* Auth Modal */}
            <AuthModal 
                    isOpen={showAuthModal} 
                    onClose={() => setShowAuthModal(false)} 
                    initialMode={authMode} 
                />

                {/* Enrollment Modal */}
                <EnrollmentModal
                    show={showEnrollModal}
                    selectedEvent={selectedEvent}
                    formData={formData}
                    errors={errors}
                    isSubmitting={isSubmitting}
                    submitStatus={submitStatus}
                    onClose={handleCloseEnrollModal}
                    onChange={handleChange}
                    onSubmit={handleSubmitEnrollment}
                />

                {/* Page Sections */}
                <HeroSection user={user} onGetStarted={handleGetStarted} />
                
                <EventsSection
                    events={events}
                    loading={eventsLoading}
                    registrationCounts={registrationCounts}
                    onEnrollClick={handleEnrollClick}
                    getEnrollmentStatus={getEnrollmentStatus}
                    enrollLoading={enrollLoading || countsLoading}
                />

                <ProjectsSection />
                
                <AboutSection />
                
                <StatsSection />
                
                <ServicesSection />
                
                <FacultySection />
                
                <FAQSection />
            </div>
    );
};

export default HomePage;
