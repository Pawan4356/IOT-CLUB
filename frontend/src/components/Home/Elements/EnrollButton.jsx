import React from "react";

const EnrollButton = ({ event, onClick, loading, status }) => {
    if (loading) {
        return (
            <button disabled className="px-6 py-3 bg-gray-200 text-gray-500 rounded-xl font-semibold flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Loading...</span>
            </button>
        );
    }

    if (status === "pending") {
        return (
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-amber-100 text-amber-800 rounded-xl shadow-sm font-semibold border border-amber-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M12 4a8 8 0 110 16 8 8 0 010-16z" />
                </svg>
                <span>Verification pending</span>
            </div>
        );
    }

    if (status === "enrolled") {
        return (
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl shadow-lg font-semibold">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Enrolled</span>
            </div>
        );
    }

    if (status === "closed") {
        return (
            <button
                disabled
                className="px-6 py-3 bg-gray-400 text-white rounded-xl cursor-not-allowed shadow-md font-semibold flex items-center gap-2 opacity-75"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Closed</span>
            </button>
        );
    }

    if (status?.startsWith("full")) {
        return (
            <button
                disabled
                className="px-6 py-3 bg-gray-400 text-white rounded-xl cursor-not-allowed shadow-md font-semibold flex items-center gap-2 opacity-75"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>{status}</span>
            </button>
        );
    }

    return (
        <button
            onClick={onClick}
            disabled={!event.id}
            className={`group/btn px-6 py-3 bg-linear-to-r from-[#221F3B] to-[#3a3560] text-white rounded-xl hover:from-[#3a3560] hover:to-[#221F3B] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-semibold flex items-center gap-2 ${
                !event.id ? "opacity-50 cursor-not-allowed" : ""
            }`}
            title={!event.id ? "Events must be loaded from database to enroll" : ""}
        >
            <span>{!event.id ? "Loading..." : "Enroll"}</span>
            {event.id && (
                <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
            )}
        </button>
    );
};

export default EnrollButton;
