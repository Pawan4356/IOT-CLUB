import React from "react";

const ServiceCard = ({ title, description, icon, gradient }) => {
    return (
        <div className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border-2 border-transparent hover:border-${gradient}-200`}>
            <div className={`w-16 h-16 bg-linear-to-br ${gradient} rounded-xl flex items-center justify-center mb-6`}>
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
                </svg>
            </div>
            <h4 className="text-xl font-bold mb-3 text-gray-900">{title}</h4>
            <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>
    );
};

const ServicesSection = () => {
    const services = [
        {
            title: "Workshops & Training",
            description: "Hands-on workshops and practical training sessions to enhance IoT skills and gain real-world experience.",
            icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
            gradient: "from-orange-500 to-amber-500"
        },
        {
            title: "Robotics & Drones",
            description: "Design and development of autonomous robots and drones with advanced embedded systems and GPS integration.",
            icon: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z",
            gradient: "from-purple-500 to-pink-500"
        },
        {
            title: "AI & Cloud Computing",
            description: "Innovative solutions using AI, computer vision, and cloud computing technologies for smart applications.",
            icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
            gradient: "from-blue-500 to-cyan-500"
        }
    ];

    return (
        <section id="services" className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 bg-linear-to-b from-white to-[#f7f7fb] text-gray-900">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8 sm:mb-12 lg:mb-16">
                    <h2 className="text-4xl sm:text-5xl font-bold text-[#221F3B] mb-4">Services</h2>
                    <p className="text-xl text-gray-600">Core Activities by SCET IoT Club</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <ServiceCard key={index} {...service} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;
