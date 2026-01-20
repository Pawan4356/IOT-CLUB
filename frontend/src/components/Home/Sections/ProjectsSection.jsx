import React from "react";

const ProjectCard = ({ title, description, imageSrc }) => {
    return (
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-orange-500/50 transition-all hover:shadow-2xl">
            <div className="h-48 overflow-hidden bg-gray-800">
                <img
                    src={imageSrc}
                    alt={title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
            </div>
            <div className="p-6">
                <h4 className="text-xl font-bold text-orange-400 mb-2">{title}</h4>
                <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
            </div>
        </div>
    );
};

const ProjectsSection = () => {
    const projects = [
        {
            title: "Gesture Based Car",
            description: "Controlled by hand gestures with applications in health domain.",
            imageSrc: "/gallery/gallery-2.jpg"
        },
        {
            title: "Gesture Home Automation",
            description: "Remote control of home appliances using gesture recognition.",
            imageSrc: "/gallery/gallery-8.jpg"
        },
        {
            title: "Drone Communication",
            description: "Real-time data transmission between drones and ground stations.",
            imageSrc: "/gallery/gallery-3.jpg"
        },
        {
            title: "Home Automation",
            description: "Automatic electronic control of household features and appliances.",
            imageSrc: "/gallery/gallery-9.jpg"
        },
        {
            title: "Projector Controller",
            description: "Smart projector with remote control capabilities.",
            imageSrc: "/gallery/gallery-4.jpg"
        },
        {
            title: "AC Automation",
            description: "Intelligent room temperature prediction system for air conditioners.",
            imageSrc: "/gallery/gallery-10.jpg"
        }
    ];

    return (
        <section id="projects" className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 bg-linear-to-b from-[#1b1833] to-[#0f0c1d] text-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-8 sm:mb-12 lg:mb-16">
                    <h2 className="text-4xl sm:text-5xl font-bold mb-4">Completed Projects</h2>
                    <p className="text-xl text-gray-300">Innovative IoT solutions developed by our students</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <ProjectCard key={index} {...project} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProjectsSection;
