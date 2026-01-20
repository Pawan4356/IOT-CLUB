import React from "react";

const FacultyCard = ({ name, designation, qualification, email, imageSrc, initials }) => {
    return (
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 sm:p-8 border border-white/10 flex flex-col sm:flex-row gap-4 sm:gap-6 items-center sm:items-start text-center sm:text-left hover:bg-white/10 transition-all">
            <div className="shrink-0">
                <img
                    src={imageSrc}
                    alt={name}
                    className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl object-cover border-2 border-orange-500/50"
                    onError={(e) => {
                        e.target.src = `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"%3E%3Crect width="128" height="128" fill="%23ddd"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="48" fill="%23999"%3E${initials}%3C/text%3E%3C/svg%3E`;
                    }}
                />
            </div>
            <div className="flex-1">
                <h4 className="text-xl sm:text-2xl font-bold mb-2 text-orange-400">{name}</h4>
                <span className="text-gray-400 mb-3 block text-sm sm:text-base">{designation}</span>
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                    Qualification: {qualification}<br />
                    Designation: {designation}<br />
                    Email: {email}
                </p>
            </div>
        </div>
    );
};

const FacultySection = () => {
    const faculty = [
        {
            name: "Prof. (Dr.) Pariza Kamboj",
            designation: "Professor",
            qualification: "Ph.D. (Comp. Engg.)",
            email: "pariza.kamboj@scet.ac.in",
            imageSrc: "/teammembers/parizakamboj.jpg",
            initials: "PK"
        },
        {
            name: "Prof. Vandana Joshi",
            designation: "Assistant Professor",
            qualification: "M. Tech (Computer Science & Engg)",
            email: "vandana.joshi@scet.ac.in",
            imageSrc: "/teammembers/vandanajoshi.jpg",
            initials: "VJ"
        }
    ];

    return (
        <section id="doctors" className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 bg-linear-to-b from-[#1b1833] to-[#0f0c1d] text-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-8 sm:mb-12 lg:mb-16">
                    <h2 className="text-4xl sm:text-5xl font-bold mb-4">Faculty Co-ordinators</h2>
                    <p className="text-xl text-gray-300">In a Guidance under the best faculty and having a expertise in IoT</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
                    {faculty.map((member, index) => (
                        <FacultyCard key={index} {...member} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FacultySection;
