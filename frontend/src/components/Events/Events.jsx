import React, { useState, useEffect } from 'react';

const EVENTS = [
  {
    id: 1,
    title: 'ROS2 Workshop',
    description: 'Hands-on session on ROS2 fundamentals',
    fee: 100,
    date: 'Jan 23, 2025',
    spots: 50
  },
];

function Events() {
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: '',
    enrollment: '',
    branch: '',
    year: '',
    email: '',
    phone: '',
    transactionId: ''
  });

  const resetForm = () => {
    setFormData({
      name: '',
      enrollment: '',
      branch: '',
      year: '',
      email: '',
      phone: '',
      transactionId: ''
    });
    setErrors({});
    setSubmitStatus(null);
  };

  const validateForm = () => {
    const newErrors = {};

    if (formData.phone && !/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.transactionId || formData.transactionId.trim().length < 10) {
      newErrors.transactionId = 'Please enter a valid UPI Transaction ID (minimum 10 characters)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const openEnrollModal = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
    resetForm();
  };

  const closeModal = () => {
    setShowModal(false);
    setTimeout(() => {
      resetForm();
      setSelectedEvent(null);
    }, 300);
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    const finalData = {
      ...formData,
      eventId: selectedEvent.id,
      eventTitle: selectedEvent.title,
      fee: selectedEvent.fee,
      paymentMethod: 'UPI',
      timestamp: new Date().toISOString()
    };

    // TODO: Replace with actual API call to backend
    setTimeout(() => {
      console.log('Final Enrollment Data:', finalData);
      // TODO: Send email confirmation via backend API
      // fetch('/api/register-event', { method: 'POST', body: JSON.stringify(finalData) })

      setIsSubmitting(false);
      setSubmitStatus('success');

      setTimeout(() => {
        closeModal();
      }, 2000);
    }, 1500);
  };

  useEffect(() => {
    const escHandler = (e) => {
      if (e.key === 'Escape' && !isSubmitting) {
        closeModal();
      }
    };

    if (showModal) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', escHandler);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', escHandler);
    };
  }, [showModal, isSubmitting]);

  return (
    <div className="min-h-screen bg-linear-to-br from-[#EBEBEB] via-gray-200 to-gray-100 px-4 sm:px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#6F4A8E] mb-3">
            Upcoming Events
          </h1>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {EVENTS.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col justify-between border border-purple-200"
            >
              <div className="flex items-start justify-between mb-3">
                <h2 className="text-xl font-semibold text-gray-800 flex-1">
                  {event.title}
                </h2>
              </div>

              <p className="text-gray-600 mb-4 leading-relaxed">
                {event.description}
              </p>

              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between text-gray-700">
                  <span className="font-medium">Date:</span>
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center justify-between text-gray-700">
                  <span className="font-medium">Available Spots:</span>
                  <span className="text-green-600 font-semibold">{event.spots}</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t">
                  <span className="font-medium text-gray-800">Fee:</span>
                  <span className="text-2xl font-bold text-[#6F4A8E]">₹{event.fee}</span>
                </div>
              </div>

              <button
                onClick={() => openEnrollModal(event)}
                className="mt-6 w-full px-6 py-3 bg-linear-to-r from-[#6F4A8E] to-purple-700 text-white rounded-xl font-medium
                                hover:from-purple-700 hover:to-[#6F4A8E] transform hover:scale-105 transition-all duration-200 shadow-md"
              >
                Enroll Now
              </button>
            </div>
          ))}
        </div>
      </div>

      {showModal && selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={!isSubmitting ? closeModal : undefined}
          ></div>

          <div className="relative bg-white w-full max-w-lg rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 z-10 max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
            <button
              onClick={closeModal}
              disabled={isSubmitting}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 flex items-center justify-center text-2xl text-gray-400 hover:text-gray-600 transition disabled:opacity-50 hover:bg-gray-100 rounded-full"
              aria-label="Close modal"
            >
              ✕
            </button>

            <div className="text-center mb-4 sm:mb-6 pr-8">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                {selectedEvent.title}
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 mb-1">
                {selectedEvent.date}
              </p>
              <p className="text-base sm:text-lg font-semibold text-[#6F4A8E]">
                Event Fee: ₹{selectedEvent.fee}
              </p>
            </div>

            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-700 font-medium text-center">
                  ✓ Registration successful! Confirmation email sent to {formData.email}
                </p>
              </div>
            )}

            <div className="space-y-3 sm:space-y-4">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition disabled:bg-gray-100"
                />
              </div>

              <div>
                <input
                  type="text"
                  name="enrollment"
                  placeholder="Enrollment Number"
                  required
                  value={formData.enrollment}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition disabled:bg-gray-100"
                />
              </div>

              <div>
                <select
                  name="branch"
                  required
                  value={formData.branch}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition disabled:bg-gray-100"
                >
                  <option value="">Select Branch</option>
                  <option value="CSE">Computer Science</option>
                  <option value="IT">Information Technology</option>
                  <option value="ECE">Electronics</option>
                  <option value="ME">Mechanical</option>
                  <option value="CE">Civil</option>
                </select>
              </div>

              <div>
                <select
                  name="year"
                  required
                  value={formData.year}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition disabled:bg-gray-100"
                >
                  <option value="">Select Year</option>
                  <option value="1">First Year</option>
                  <option value="2">Second Year</option>
                  <option value="3">Third Year</option>
                  <option value="4">Final Year</option>
                </select>
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition disabled:bg-gray-100 ${errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number (10 digits)"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition disabled:bg-gray-100 ${errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              <div className="border-t pt-3 sm:pt-4 mt-3 sm:mt-4">
                <p className="text-xs sm:text-sm font-semibold mb-2 sm:mb-3 text-gray-700 text-center">
                  Scan QR Code to Pay ₹{selectedEvent.fee}
                </p>

                <div className="flex justify-center mb-4">
                  <div className="bg-white p-3 rounded-lg border-2 border-[#6F4A8E] shadow-md">
                    <img
                      src="/UPI_QR.png"
                      alt="UPI QR Code"
                      className="w-48 h-48 sm:w-56 sm:h-56"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"%3E%3Crect width="200" height="200" fill="%23f3f4f6"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="14" fill="%236F4A8E"%3EUPI QR CODE%3C/text%3E%3C/svg%3E';
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    UPI Transaction ID <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="transactionId"
                    placeholder="Enter UPI Transaction ID"
                    required
                    value={formData.transactionId}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition disabled:bg-gray-100 ${errors.transactionId ? 'border-red-500' : 'border-gray-300'}
                    `}
                  />
                  {errors.transactionId && (
                    <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.transactionId}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">After payment, enter the 12-digit transaction ID from your UPI app</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-3 sm:pt-4">
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-linear-to-r from-[#6F4A8E] to-purple-700 text-white rounded-lg font-medium
                                    hover:from-purple-700 hover:to-[#6F4A8E] transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                >
                  {isSubmitting ? 'Verifying...' : 'Payment Done - Submit'}
                </button>

                <button
                  onClick={closeModal}
                  disabled={isSubmitting}
                  className="px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Events;