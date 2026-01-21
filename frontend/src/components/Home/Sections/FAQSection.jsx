import React, { useState } from "react";
import {  AnimatePresence } from "framer-motion";

const FAQItem = ({ question, answer, isOpen, onToggle }) => {
    return (
        <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200 hover:border-orange-300 transition-all">
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between text-left font-bold text-lg text-gray-900 focus:outline-none"
            >
                <div className="flex items-center gap-3">
                    <svg
                        className="w-6 h-6 text-orange-600 shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8.228 9c.549-1.165 2.03-2 3.772-2
                 2.21 0 4 1.343 4 3
                 0 1.4-1.278 2.575-3.006 2.907
                 -.542.104-.994.54-.994 1.093
                 m0 3h.01M21 12a9 9 0 11-18 0
                 9 9 0 0118 0z"
                        />
                    </svg>
                    {question}
                </div>

                {/* Arrow */}
                <motion.svg
                    className="w-5 h-5 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                    />
                </motion.svg>
            </button>

            {/* Animated content */}
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <p className="mt-4 text-gray-600 leading-relaxed pl-9">
                            {answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: "Why to join the SCET IoT Club?",
            answer:
                "Students gain hands-on experience by building innovative projects and solving real-world problems."
        },
        {
            question: "Which type of projects are there in IoT Club?",
            answer:
                "Hardware-based and IoT projects focused on real-life applications and emerging technologies."
        },
        {
            question: "Which type of activities are done in the IoT Club?",
            answer:
                "Workshops, practical hardware sessions, project development, and exposure to advanced domains."
        },
        {
            question: "Various workshops will be arranged for the students?",
            answer:
                "Yes, workshops and expert talks are regularly conducted to help students learn new technologies."
        },
        // {
        //     question: "Students can also raise their queries?",
        //     answer:
        //         "Yes, students can submit their queries through the contact form available on the website."
        // }
        //will be implemented later when we have query page
    ];

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section
            id="faq"
            className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 bg-linear-to-b from-[#f7f7fb] to-white text-gray-900"
        >
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl sm:text-5xl font-bold text-[#221F3B] mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-xl text-gray-600">
                        Some common questions asked by students.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <FAQItem
                            key={index}
                            {...faq}
                            isOpen={openIndex === index}
                            onToggle={() => toggleFAQ(index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
