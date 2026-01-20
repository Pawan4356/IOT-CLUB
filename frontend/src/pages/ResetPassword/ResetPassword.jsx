import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

function ResetPassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [validSession, setValidSession] = useState(false);
    const [checking, setChecking] = useState(true);
    const navigate = useNavigate();

    // Add this at the start of the useEffect, before any logic:
    useEffect(() => {
        // DEBUG: Log the full URL and hash
        console. log('Full URL:', window.location.href);
        console.log('Hash:', window.location. hash);
        console.log('Search params:', window.location.search);

        const hashParams = new URLSearchParams(window.location.hash. substring(1));
        console.log('access_token:', hashParams.get('access_token'));
        console.log('type:', hashParams.get('type'));

        // ... rest of your code
    }, []);
    useEffect(() => {
        const handlePasswordReset = async () => {
            try {
                // Check for hash parameters (Supabase uses hash fragments for password reset)
                const hashParams = new URLSearchParams(window.location.hash. substring(1));
                const accessToken = hashParams. get('access_token');
                const refreshToken = hashParams.get('refresh_token');
                const type = hashParams.get('type');

                // Check if this is a recovery/password reset flow
                if (type === 'recovery' && accessToken) {
                    // Set the session using the tokens from the URL
                    const { data, error:  sessionError } = await supabase. auth.setSession({
                        access_token: accessToken,
                        refresh_token:  refreshToken,
                    });

                    if (sessionError) {
                        console.error('Session error:', sessionError);
                        setError('Invalid or expired reset link.  Please request a new one.');
                        setChecking(false);
                        return;
                    }

                    if (data.session) {
                        setValidSession(true);
                        setChecking(false);
                        return;
                    }
                }

                // Also check for existing session (in case user refreshes the page)
                const { data:  { session } } = await supabase.auth.getSession();
                if (session) {
                    setValidSession(true);
                } else {
                    setError('Invalid or expired reset link. Please request a new one.');
                }
            } catch (err) {
                console.error('Error handling password reset:', err);
                setError('An error occurred.  Please try again.');
            } finally {
                setChecking(false);
            }
        };

        handlePasswordReset();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
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

            // Sign out after password reset to force re-login with new password
            await supabase.auth.signOut();

            setTimeout(() => navigate('/'), 3000);
        } catch (err) {
            setError(err.message || 'Failed to reset password');
        } finally {
            setLoading(false);
        }
    };

    if (checking) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-[#1b1833] to-[#0f0c1d] flex items-center justify-center text-white">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-400 mb-4"></div>
                    <p className="text-xl">Verifying reset link...</p>
                </div>
            </div>
        );
    }

    if (success) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-[#1b1833] to-[#0f0c1d] flex items-center justify-center p-4">
                <div className="w-full max-w-md mx-auto">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Password Reset Successful!</h2>
                        <p className="text-gray-600">
                            Your password has been updated.  Redirecting to home page...
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#1b1833] to-[#0f0c1d] flex items-center justify-center p-4">
            <div className="w-full max-w-md mx-auto">
                <div className="bg-white rounded-2xl shadow-2xl p-8">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Reset Password</h2>
                        <p className="text-gray-600">Enter your new password</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                            <p className="text-red-700 text-sm">{error}</p>
                            {! validSession && (
                                <button
                                    onClick={() => navigate('/')}
                                    className="mt-2 text-sm text-orange-600 hover: text-orange-700 font-medium"
                                >
                                    Go to Home
                                </button>
                            )}
                        </div>
                    )}

                    {validSession && (
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
                                    className="w-full px-4 py-3 text-base text-gray-900 placeholder-gray-400 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus: ring-orange-500 focus:border-orange-500 transition-all disabled:bg-gray-50"
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
                                    className="w-full px-4 py-3 text-base text-gray-900 placeholder-gray-400 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all disabled:bg-gray-50"
                                    placeholder="Re-enter your password"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full px-6 py-3.5 text-base font-semibold bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-xl hover:from-orange-700 hover:to-orange-800 transition-all disabled:opacity-50 disabled: cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none"
                            >
                                {loading ? 'Resetting.. .' : 'Reset Password'}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;