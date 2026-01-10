import React, { useState, useEffect } from 'react';

const Footer = () => {
  const [activeModal, setActiveModal] = useState(null);

  // Handle URL hash changes to open modals
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1); // Remove the '#'
      if (['terms', 'privacy', 'refund'].includes(hash)) {
        setActiveModal(hash);
      }
    };

    // Check hash on component mount
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const openModal = (modalName) => {
    setActiveModal(modalName);
    window.location.hash = modalName; // Update URL hash
  };

  const closeModal = () => {
    setActiveModal(null);
    history.pushState('', document.title, window.location.pathname + window.location.search); // Clear hash
  };

  const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/20 backdrop-blur-sm animate-fadeIn" onClick={onClose}>
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] sm:max-h-[80vh] overflow-hidden transform transition-all animate-slideUp" onClick={(e) => e.stopPropagation()}>
          <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-4 sm:px-6 sm:py-5 flex justify-between items-center">
            <h2 className="text-lg sm:text-2xl font-bold text-white pr-2">{title}</h2>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-full w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-xl sm:text-2xl font-bold transition-all duration-200 hover:rotate-90 flex-shrink-0"
            >
              ×
            </button>
          </div>
          <div className="px-4 py-4 sm:px-6 sm:py-6 overflow-y-auto max-h-[calc(90vh-70px)] sm:max-h-[calc(80vh-80px)]">
            {children}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-6 sm:py-8 mt-auto border-t border-gray-700">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-3 sm:gap-6 text-xs sm:text-sm">
            <button
              onClick={() => openModal('terms')}
              className="hover:text-blue-400 transition-all duration-300 hover:scale-105 font-medium text-center"
            >
              Terms & Conditions
            </button>
            <span className="text-gray-500 hidden sm:inline">•</span>
            <button
              onClick={() => openModal('privacy')}
              className="hover:text-blue-400 transition-all duration-300 hover:scale-105 font-medium text-center"
            >
              Privacy Policy
            </button>
            <span className="text-gray-500 hidden sm:inline">•</span>
            <button
              onClick={() => openModal('refund')}
              className="hover:text-blue-400 transition-all duration-300 hover:scale-105 font-medium text-center"
            >
              Refund & Cancellation Policy
            </button>
          </div>
          <div className="text-center mt-4 sm:mt-6 text-gray-400 text-xs sm:text-sm">
            © {new Date().getFullYear()} IOT Club. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Terms & Conditions Modal */}
      <Modal
        isOpen={activeModal === 'terms'}
        onClose={closeModal}
        title="Terms & Conditions"
      >
        <div className="text-gray-700 space-y-3 sm:space-y-4 leading-relaxed text-sm sm:text-base">
          <p className="text-base sm:text-lg">Welcome to <span className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">IOT Club</span>.</p>
          <p>By registering or participating in our events, you agree to the following terms:</p>
          <ol className="list-decimal list-inside space-y-2 sm:space-y-3 ml-1 sm:ml-2">
            <li className="pl-1 sm:pl-2">You provide accurate personal information during registration.</li>
            <li className="pl-1 sm:pl-2">Event fees once paid are subject to our Refund Policy.</li>
            <li className="pl-1 sm:pl-2">We may modify event schedules if required.</li>
            <li className="pl-1 sm:pl-2">We reserve the right to accept or reject registrations.</li>
            <li className="pl-1 sm:pl-2">All payments are processed securely through Razorpay.</li>
          </ol>
          <p className="pt-2 text-xs sm:text-sm bg-gradient-to-r from-blue-50 to-purple-50 p-3 sm:p-4 rounded-lg border border-blue-100">If you have any questions, contact us at <a href="mailto:contact@iotclub.com" className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold hover:underline">contact@iotclub.com</a>.</p>
        </div>
      </Modal>

      {/* Privacy Policy Modal */}
      <Modal
        isOpen={activeModal === 'privacy'}
        onClose={closeModal}
        title="Privacy Policy"
      >
        <div className="text-gray-700 space-y-3 sm:space-y-4 leading-relaxed text-sm sm:text-base">
          <p className="text-base sm:text-lg">We value your <span className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">privacy</span>. This policy explains how we collect and use your information.</p>
          <ol className="list-decimal list-inside space-y-2 sm:space-y-3 ml-1 sm:ml-2">
            <li className="pl-1 sm:pl-2">We collect your name, email, college details, and payment information only for event registration.</li>
            <li className="pl-1 sm:pl-2">Payments are securely processed by Razorpay. We do not store your card/bank details.</li>
            <li className="pl-1 sm:pl-2">We do not share your information with any third party except for mandatory payment processing.</li>
            <li className="pl-1 sm:pl-2">Data is stored securely and used only for communication related to events.</li>
          </ol>
          <p className="pt-2 text-xs sm:text-sm bg-gradient-to-r from-blue-50 to-purple-50 p-3 sm:p-4 rounded-lg border border-purple-100">If you have any concerns, email us at <a href="mailto:contact@iotclub.com" className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold hover:underline">contact@iotclub.com</a>.</p>
        </div>
      </Modal>

      {/* Refund & Cancellation Policy Modal */}
      <Modal
        isOpen={activeModal === 'refund'}
        onClose={closeModal}
        title="Refund & Cancellation Policy"
      >
        <div className="text-gray-700 space-y-3 sm:space-y-4 leading-relaxed text-sm sm:text-base">
          <ol className="list-decimal list-inside space-y-2 sm:space-y-3 ml-1 sm:ml-2">
            <li className="pl-1 sm:pl-2">Event registration fees are generally non-refundable.</li>
            <li className="pl-1 sm:pl-2">In case an event is cancelled by organizers, full refund will be provided.</li>
            <li className="pl-1 sm:pl-2">Refund requests (if allowed) must be emailed to us within 24 hours of payment.</li>
            <li className="pl-1 sm:pl-2">Refunds will be processed within 5–7 business days to the original payment method.</li>
          </ol>
          <p className="pt-2 text-xs sm:text-sm bg-gradient-to-r from-blue-50 to-purple-50 p-3 sm:p-4 rounded-lg border border-blue-100">For refund requests, contact us at <a href="mailto:contact@iotclub.com" className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold hover:underline">contact@iotclub.com</a>.</p>
        </div>
      </Modal>
    </>
  );
};

export default Footer;
