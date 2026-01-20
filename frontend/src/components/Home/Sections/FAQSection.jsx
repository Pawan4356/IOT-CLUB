import React from "react";

const FAQItem = ({ question, answer }) => {
    return (
        <details className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200 hover:border-orange-300 transition-all">
            <summary className="font-bold text-lg text-gray-900 cursor-pointer flex items-center gap-3">
                <svg className="w-6 h-6 text-orange-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {question}
            </summary>
            <p className="mt-4 text-gray-600 leading-relaxed pl-9">{answer}</p>
        </details>
    );
};

const FAQSection = () => {
    const faqs = [
        {
            question: "Why to join the SCET IoT Club ?",
            answer: "The students can able to build the new things and brings up the solutions with new ideas in the daily life challenges."
        },
        {
            question: "Various workshops will be arranged for the students ?",
            answer: "For the Students the workshop will arranged and the expert talks will also arranged for the students, so they can adapt new technologies and can solve their doubts."
        }
    ];

    return (
        <section id="faq" className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 bg-linear-to-b from-[#f7f7fb] to-white text-gray-900">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8 sm:mb-12 lg:mb-16">
                    <h2 className="text-4xl sm:text-5xl font-bold text-[#221F3B] mb-4">Frequently Asked Questions</h2>
                    <p className="text-xl text-gray-600">
                        To reaching out the most common questions asked by students, for that we have shortlisted some frequently asked questions mentioned below with answers.
                    </p>
                </div>
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <FAQItem key={index} {...faq} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
