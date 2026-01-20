import React, { useState } from "react";

const VideoModal = ({ show, onClose, videoSrc }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-8" onClick={onClose}>
            <div
                className="relative bg-black rounded-2xl shadow-2xl w-full max-w-[95vw] h-[90vh] max-h-[90vh] overflow-hidden flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white text-xl font-semibold transition-all shadow-lg"
                >
                    ✕
                </button>

                <div className="relative flex-1 flex items-center justify-center overflow-hidden">
                    <video controls autoPlay className="max-w-full max-h-full w-auto h-auto object-contain" src={videoSrc}>
                        Your browser does not support the video tag.
                    </video>
                </div>

                <div className="p-4 bg-black/80 border-t border-white/10">
                    <h3 className="text-xl font-bold text-white text-center">IOT Club Introduction Video</h3>
                </div>
            </div>
        </div>
    );
};

const AboutSection = () => {
    const [showVideoModal, setShowVideoModal] = useState(false);

    return (
        <>
            <section id="about" className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 bg-linear-to-b from-[#f7f7fb] to-white text-gray-900">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="relative">
                            <div
                                className="aspect-video bg-gray-800 rounded-2xl overflow-hidden flex items-center justify-center cursor-pointer group"
                                onClick={() => setShowVideoModal(true)}
                            >
                                <div className="text-center">
                                    <div className="w-20 h-20 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-orange-700 transition group-hover:scale-110">
                                        <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </div>
                                    <p className="text-gray-400">Watch Introduction Video</p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-6">
                            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border-2 border-transparent hover:border-orange-200">
                                <h3 className="text-3xl font-bold text-[#221F3B] mb-4">About SCET IoT Club</h3>
                                <p className="text-gray-600 leading-relaxed mb-6">
                                    Founded in 2016 under the Computer Engineering Department, the SCET IoT Club empowers students to innovate and solve real-world problems through
                                    hands-on hardware projects and cutting-edge IoT technologies.
                                </p>
                                <div className="border-t border-gray-200 pt-6">
                                    <h4 className="text-xl font-bold text-gray-900 mb-4">Our Vision</h4>
                                    <ul className="space-y-2.5">
                                        <li className="flex items-center gap-3">
                                            <div className="w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                                                <span className="text-orange-600 text-xs font-bold">✓</span>
                                            </div>
                                            <span className="text-gray-700 text-sm">Enhance leadership skills</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <div className="w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                                                <span className="text-orange-600 text-xs font-bold">✓</span>
                                            </div>
                                            <span className="text-gray-700 text-sm">Explore new technologies</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <div className="w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                                                <span className="text-orange-600 text-xs font-bold">✓</span>
                                            </div>
                                            <span className="text-gray-700 text-sm">Build stronger community</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <VideoModal 
                show={showVideoModal} 
                onClose={() => setShowVideoModal(false)} 
                videoSrc="/videos/VJ_CO_IOT_Club_v1.1.mp4"
            />
        </>
    );
};

export default AboutSection;
