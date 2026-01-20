import React from "react";

const HeroSection = ({ user, onGetStarted }) => {
    return (
        <section
            id="hero"
            className="relative min-h-[70vh] sm:min-h-[80vh] lg:min-h-[90vh] flex flex-col justify-center items-center text-center px-4 sm:px-6 overflow-hidden"
        >
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url(/hero.jpg)",
                }}
            >
                <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/60 to-black/70"></div>
            </div>

            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <div className="relative z-10 max-w-4xl mx-auto">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 text-white">
                    Welcome to the SCET IoT Club
                </h1>

                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-6 sm:mb-8 lg:mb-12 text-gray-300">
                    For the Students, by the Students
                </h2>

                {!user && (
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <button
                            onClick={onGetStarted}
                            className="group px-8 py-4 bg-linear-to-r from-orange-600 to-orange-700 rounded-xl font-semibold hover:from-orange-700 hover:to-orange-800 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center gap-2"
                        >
                            <span>Get Started</span>
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default HeroSection;
