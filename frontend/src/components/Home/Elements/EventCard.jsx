import React from "react";
import EnrollButton from "./EnrollButton";

const EventCard = ({ event, index, registrationCount, onEnroll, enrollmentStatus, loading }) => {
    const eventDate = event.date
        ? new Date(event.date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
        })
        : "Date TBA";

    const cap = event?.spots ?? 50;
    const spotsLeft = Math.max(0, cap - registrationCount);

    return (
        <div
            className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-8 flex flex-col border-2 border-gray-100 hover:border-orange-200 relative overflow-hidden"
        >
            <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-orange-500/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity"></div>

            <div className="relative z-10">
                <div className="flex items-center justify-between mb-5">
                    <span className="inline-flex items-center gap-2 px-4 py-2 text-sm rounded-full bg-linear-to-r from-orange-100 to-amber-100 text-orange-700 font-semibold border border-orange-200">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {eventDate}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-linear-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
                        {index + 1}
                    </div>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
                    {event.title}
                </h3>

                <p className="text-gray-600 mb-2 leading-relaxed min-h-12">{event.description}</p>
                <p className="text-xs text-gray-500 mb-4">Limited Spots - {cap}</p>

                <div className="mt-auto pt-6 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <span className="text-xs text-gray-500 uppercase tracking-wide">Fee</span>
                            <div className="text-2xl font-bold text-orange-600">₹{event.fee}</div>
                        </div>

                        <EnrollButton 
                            event={event} 
                            onClick={onEnroll}
                            loading={loading}
                            status={enrollmentStatus}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventCard;
