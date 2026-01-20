import React from "react";
import EventCard from "../Elements/EventCard";

const EventsSection = ({ 
    events, 
    loading, 
    registrationCounts, 
    onEnrollClick,
    getEnrollmentStatus,
    enrollLoading
}) => {
    return (
        <section
            id="events"
            className="relative py-12 sm:py-16 lg:py-24 px-4 sm:px-6 bg-linear-to-b from-[#f7f7fb] to-white text-gray-900"
        >
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-8 sm:mb-12 lg:mb-16">
                    <div className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-orange-100 rounded-full mb-6">
                        <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm font-semibold text-orange-600">Upcoming Events</span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#221F3B] mb-6">
                        Discover Your Next Adventure
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                        Carefully curated events to sharpen your skills, expand your network, and take your career to the next level.
                    </p>
                </div>

                {loading ? (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
                        <p className="mt-4 text-gray-600">Loading events...</p>
                    </div>
                ) : events.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-600">No events available at the moment.</p>
                    </div>
                ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {events.map((event, index) => (
                            <EventCard
                                key={event.id || index}
                                event={event}
                                index={index}
                                registrationCount={registrationCounts.get(String(event.id)) || 0}
                                onEnroll={() => onEnrollClick(event)}
                                enrollmentStatus={getEnrollmentStatus(event)}
                                loading={enrollLoading}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default EventsSection;
