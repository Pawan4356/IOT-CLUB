import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';

function ChangePassword({ onClose }) {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const isFormValid = password.length >= 6 && confirmPassword.length >= 6;

    const handleSubmit = async (e) => {
        e. preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setLoading(true);

        try {
            const { error } = await supabase.auth.updateUser({
                password:  password
            });

            if (error) throw error;

            setSuccess(true);
            setTimeout(() => {
                onClose?. ();
            }, 2000);
        } catch (err) {
            setError(err.message || 'Failed to change password');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Password Changed! </h2>
                <p className="text-gray-600">Your password has been updated successfully.</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Change Password</h2>
                <p className="text-gray-600">Enter your new password</p>
            </div>

            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                    <p className="text-red-700 text-sm">{error}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        New Password
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target. value)}
                        required
                        disabled={loading}
                        className="w-full px-4 py-3 text-base text-gray-900 placeholder-gray-400 bg-white border-2 border-gray-200 rounded-xl focus: ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all disabled:bg-gray-50"
                        placeholder="At least 6 characters"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Confirm New Password
                    </label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e. target.value)}
                        required
                        disabled={loading}
                        className="w-full px-4 py-3 text-base text-gray-900 placeholder-gray-400 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus: ring-orange-500 focus:border-orange-500 transition-all disabled:bg-gray-50"
                        placeholder="Re-enter your password"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading || !isFormValid}
                    className={`w-full px-6 py-3.5 text-base font-semibold text-white rounded-xl transition-all shadow-lg transform disabled:transform-none ${
                        isFormValid && ! loading
                            ? 'bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 hover:shadow-xl hover:-translate-y-0.5 cursor-pointer'
                            : 'bg-orange-300 cursor-not-allowed'
                    }`}
                >
                    {loading ?  'Changing.. .' : 'Change Password'}
                </button>
            </form>
        </div>
    );
}

export default ChangePassword;