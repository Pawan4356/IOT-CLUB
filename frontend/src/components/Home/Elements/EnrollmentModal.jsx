import React, { useEffect } from "react";

const EnrollmentModal = ({
    show,
    selectedEvent,
    formData,
    errors,
    isSubmitting,
    submitStatus,
    onClose,
    onChange,
    onSubmit,
}) => {
    useEffect(() => {
        const escHandler = (e) => {
            if (e.key === "Escape" && !isSubmitting) onClose();
        };
        if (show) {
            document.body.style.overflow = "hidden";
            window.addEventListener("keydown", escHandler);
        }
        return () => {
            document.body.style.overflow = "unset";
            window.removeEventListener("keydown", escHandler);
        };
    }, [show, isSubmitting, onClose]);

    if (!show || !selectedEvent) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={!isSubmitting ? onClose : undefined}></div>

            <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl p-5 sm:p-8 z-10 max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
                <button
                    onClick={onClose}
                    disabled={isSubmitting}
                    className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center text-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all disabled:opacity-50 rounded-full font-semibold"
                    aria-label="Close modal"
                >
                    ✕
                </button>

                <div className="text-center mb-6 sm:mb-8 pr-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-orange-500 to-orange-600 rounded-2xl mb-4 shadow-lg">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{selectedEvent.title}</h2>
                    <div className="flex items-center justify-center gap-3 mb-3">
                        <span className="text-sm text-gray-500 flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {selectedEvent.date}
                        </span>
                    </div>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 rounded-full border border-orange-200">
                        <span className="text-sm text-gray-600">Event Fee:</span>
                        <span className="text-lg font-bold text-orange-600">₹{selectedEvent.fee}</span>
                    </div>
                </div>

                {submitStatus === "success" && (
                    <div className="mb-6 p-4 bg-linear-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl shadow-sm">
                        <div className="flex items-center justify-center gap-2">
                            <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <p className="text-green-700 font-medium text-center">Registration successful! Confirmation email sent to {formData.email}</p>
                        </div>
                    </div>
                )}

                {submitStatus === "error" && (
                    <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl shadow-sm">
                        <div className="flex items-center justify-center gap-2">
                            <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            <p className="text-red-700 font-medium text-center">{errors.submit || "Failed to submit registration. Please try again."}</p>
                        </div>
                    </div>
                )}

                <div className="space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your full name"
                            required
                            value={formData.name}
                            onChange={onChange}
                            disabled={isSubmitting}
                            className="w-full px-4 py-3 text-base text-gray-900 placeholder-gray-400 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all shadow-sm hover:border-gray-300 disabled:bg-gray-50 disabled:cursor-not-allowed"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Enrollment Number <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="enrollment"
                            placeholder="Enter your enrollment number"
                            required
                            value={formData.enrollment}
                            onChange={onChange}
                            disabled={isSubmitting}
                            className="w-full px-4 py-3 text-base text-gray-900 placeholder-gray-400 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all shadow-sm hover:border-gray-300 disabled:bg-gray-50 disabled:cursor-not-allowed"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Branch <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="branch"
                                required
                                value={formData.branch}
                                onChange={onChange}
                                disabled={isSubmitting}
                                className="w-full px-4 py-3 text-base text-gray-900 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all shadow-sm hover:border-gray-300 disabled:bg-gray-50 disabled:cursor-not-allowed appearance-none cursor-pointer"
                            >
                                <option value="">Select Branch</option>
                                <option value="CO">Computer</option>
                                <option value="IT">Information Technology</option>
                                <option value="EL">Electrical</option>
                                <option value="EC">Electronics</option>
                                <option value="ME">Mechanical</option>
                                <option value="CL">Civil</option>
                                <option value="MCA">MCA</option>
                                <option value="IC">Instrumentation and Control</option>
                                <option value="CH">Chemical</option>
                                <option value="AI">Artificial intelligence and Data Science</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Year <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="year"
                                required
                                value={formData.year}
                                onChange={onChange}
                                disabled={isSubmitting}
                                className="w-full px-4 py-3 text-base text-gray-900 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all shadow-sm hover:border-gray-300 disabled:bg-gray-50 disabled:cursor-not-allowed appearance-none cursor-pointer"
                            >
                                <option value="">Select Year</option>
                                <option value="1">First Year</option>
                                <option value="2">Second Year</option>
                                <option value="3">Third Year</option>
                                <option value="4">Final Year</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="your.email@example.com"
                            required
                            value={formData.email}
                            onChange={onChange}
                            disabled={isSubmitting}
                            className={`w-full px-4 py-3 text-base text-gray-900 placeholder-gray-400 bg-white border-2 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all shadow-sm hover:border-gray-300 disabled:bg-gray-50 disabled:cursor-not-allowed ${
                                errors.email ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-200"
                            }`}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1.5 flex items-center gap-1">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                {errors.email}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Phone Number <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Enter 10-digit phone number"
                            required
                            value={formData.phone}
                            onChange={onChange}
                            disabled={isSubmitting}
                            className={`w-full px-4 py-3 text-base text-gray-900 placeholder-gray-400 bg-white border-2 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all shadow-sm hover:border-gray-300 disabled:bg-gray-50 disabled:cursor-not-allowed ${
                                errors.phone ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-200"
                            }`}
                        />
                        {errors.phone && (
                            <p className="text-red-500 text-sm mt-1.5 flex items-center gap-1">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                {errors.phone}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Will you bring your own laptop with ROS installed? <span className="text-red-500">*</span>
                        </label>
                        <p className="text-xs text-gray-500 mb-3">
                            Not sure how to install ROS? Follow the official guide here:&nbsp;
                            <a
                                href="https://docs.ros.org/en/humble/Installation/Ubuntu-Install-Debs.html#install-ros-2-packages"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-orange-600 font-semibold hover:underline"
                            >
                                ROS 2 Humble Installation (Ubuntu)
                            </a>
                        </p>

                        <div className="grid grid-cols-2 gap-4">
                            <label
                                className={`flex items-center justify-center gap-3 px-4 py-3 border-2 rounded-xl cursor-pointer transition-all ${
                                    formData.bringLaptop === "yes"
                                        ? "border-orange-500 bg-orange-50 text-orange-700"
                                        : "border-gray-200 bg-white text-gray-700 hover:border-orange-300"
                                } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                            >
                                <input
                                    type="radio"
                                    name="bringLaptop"
                                    value="yes"
                                    checked={formData.bringLaptop === "yes"}
                                    onChange={onChange}
                                    disabled={isSubmitting}
                                    className="w-4 h-4 text-orange-600 focus:ring-orange-500"
                                />
                                <span className="font-semibold">Yes</span>
                            </label>
                            <label
                                className={`flex items-center justify-center gap-3 px-4 py-3 border-2 rounded-xl cursor-pointer transition-all ${
                                    formData.bringLaptop === "no"
                                        ? "border-orange-500 bg-orange-50 text-orange-700"
                                        : "border-gray-200 bg-white text-gray-700 hover:border-orange-300"
                                } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                            >
                                <input
                                    type="radio"
                                    name="bringLaptop"
                                    value="no"
                                    checked={formData.bringLaptop === "no"}
                                    onChange={onChange}
                                    disabled={isSubmitting}
                                    className="w-4 h-4 text-orange-600 focus:ring-orange-500"
                                />
                                <span className="font-semibold">No</span>
                            </label>
                        </div>
                        {errors.bringLaptop && (
                            <p className="text-red-500 text-sm mt-1.5 flex items-center gap-1">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                {errors.bringLaptop}
                            </p>
                        )}
                    </div>

                    <div className="border-t-2 border-gray-100 pt-6 mt-6">
                        <div className="bg-linear-to-br from-orange-50 to-amber-50 rounded-xl p-5 border-2 border-orange-200">
                            <div className="text-center mb-4">
                                <div className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm mb-3">
                                    <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                                    </svg>
                                    <p className="text-sm font-bold text-gray-800">Pay ₹{selectedEvent.fee}</p>
                                </div>
                                <p className="text-xs text-gray-600 mb-4">Scan the QR code to complete payment</p>
                            </div>

                            <div className="flex justify-center mb-5">
                                <div className="bg-white p-4 rounded-2xl border-2 border-orange-500 shadow-lg transform hover:scale-105 transition-transform">
                                    <img
                                        src="/UPI_QR.png"
                                        alt="UPI QR Code"
                                        className="w-52 h-52 sm:w-60 sm:h-60"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src =
                                                'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"%3E%3Crect width="200" height="200" fill="%23f3f4f6"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="14" fill="%23FFA500"%3EUPI QR CODE%3C/text%3E%3C/svg%3E';
                                        }}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    UPI Transaction ID <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="transactionId"
                                    placeholder="Enter transaction ID from your UPI app"
                                    required
                                    value={formData.transactionId}
                                    onChange={onChange}
                                    disabled={isSubmitting}
                                    className={`w-full px-4 py-3 text-base text-gray-900 placeholder-gray-400 bg-white border-2 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all shadow-sm hover:border-gray-300 disabled:bg-gray-50 disabled:cursor-not-allowed ${
                                        errors.transactionId ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-200"
                                    }`}
                                />
                                {errors.transactionId && (
                                    <p className="text-red-500 text-sm mt-1.5 flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        {errors.transactionId}
                                    </p>
                                )}
                                <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                    </svg>
                                    After payment, copy the transaction ID from your UPI app
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        <button
                            onClick={onSubmit}
                            disabled={isSubmitting}
                            className="flex-1 px-6 py-3.5 text-base font-semibold bg-linear-to-r from-orange-600 to-orange-700 text-white rounded-xl hover:from-orange-700 hover:to-orange-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Verifying...
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Submit Registration
                                </>
                            )}
                        </button>

                        <button
                            onClick={onClose}
                            disabled={isSubmitting}
                            className="px-6 py-3.5 text-base font-semibold bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed border-2 border-gray-200 hover:border-gray-300"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EnrollmentModal;
