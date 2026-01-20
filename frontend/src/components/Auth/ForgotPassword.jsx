import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

function ForgotPassword({onSwitchToLogin }) {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const { resetPassword } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await resetPassword(email);
            setSuccess(true);
        } catch (err) {
            setError(err.message || 'Failed to send reset email');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="w-full max-w-md mx-auto">
                <div className="bg-white rounded-2xl shadow-2xl p-8">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Check Your Email</h2>
                        <p className="text-gray-600 mb-6">
                            We've sent a password reset link to <strong>{email}</strong>.
                            Please check your inbox and follow the instructions.
                        </p>
                        <button
                            onClick={onSwitchToLogin}
                            className="text-sm text-orange-600 hover:text-orange-700 font-medium"
                        >
                            Back to Sign In
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-8">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Forgot Password? </h2>
                    <p className="text-gray-600">Enter your email to receive a reset link</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                        <p className="text-red-700 text-sm">{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target. value)}
                            required
                            disabled={loading}
                            className="w-full px-4 py-3 text-base text-gray-900 placeholder-gray-400 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus: border-orange-500 transition-all disabled:bg-gray-50"
                            placeholder="your. email@example.com"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full px-6 py-3.5 text-base font-semibold bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-xl hover:from-orange-700 hover: to-orange-800 transition-all disabled:opacity-50 disabled: cursor-not-allowed shadow-lg hover: shadow-xl transform hover:-translate-y-0.5 disabled:transform-none"
                    >
                        {loading ? 'Sending.. .' : 'Send Reset Link'}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <button
                        onClick={onSwitchToLogin}
                        className="text-sm text-orange-600 hover: text-orange-700 font-medium"
                    >
                        Back to Sign In
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;