import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { sendPasswordRecovery } from '../config/appwrite';

const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetStatus, setResetStatus] = useState('');

  // If already authenticated, redirect to dashboard
  useEffect(() => {
    if (isAuthenticated) {
      console.log("User already authenticated, redirecting to dashboard");
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      console.log("Login form submitted:", formData.email);
      await login(formData.email, formData.password);
      console.log("Login component received successful login response");
      
      // Force redirect in case navigation from auth context didn't work
      setTimeout(() => {
        if (window.location.pathname !== '/dashboard') {
          console.log("Forcing dashboard navigation from Login component");
          navigate('/dashboard', { replace: true });
        }
      }, 500);
    } catch (err) {
      console.error("Login error in component:", err);
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResetStatus('');

    try {
      await sendPasswordRecovery(resetEmail);
      setResetStatus('Password reset link sent to your email!');
      setShowForgotPassword(false);
    } catch (err) {
      setError(err.message || 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  // If already authenticated, don't render login page
  if (isAuthenticated && !loading) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1c1b1b]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#2a2929]/70 backdrop-blur-md p-8 rounded-2xl shadow-2xl max-w-md w-full border border-[#3a3939]"
      >
        <h2 className="text-3xl font-bold bg-gradient-to-r from-[#ff9d54] to-orange-400 bg-clip-text text-transparent mb-6">
          {showForgotPassword ? 'Reset Password' : 'Welcome Back'}
        </h2>

        {showForgotPassword ? (
          <form onSubmit={handleForgotPassword} className="space-y-4">
            <div>
              <label className="text-gray-200">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 rounded-xl border border-[#ff9d54]/40 focus:ring-2 focus:ring-[#ff9d54] focus:border-transparent 
              bg-white/10 text-white placeholder-gray-400 shadow-md shadow-[#ff9d54]/30 focus:shadow-lg focus:shadow-[#ff9d54]/50 transition duration-200"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
              />
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}
            {resetStatus && <p className="text-green-400 text-sm">{resetStatus}</p>}

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-[#ff9d54] to-orange-400 text-black rounded-xl font-medium 
            shadow-lg shadow-orange-500/20 hover:shadow-xl hover:shadow-orange-400/40 transition duration-200"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </motion.button>

            <p className="text-center">
              <motion.span
                whileHover={{ scale: 1.05 }}
                onClick={() => setShowForgotPassword(false)}
                className="text-[#ff9d54] cursor-pointer font-medium"
              >
                Back to Login
              </motion.span>
            </p>
          </form>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-gray-200">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 rounded-xl border border-[#ff9d54]/40 focus:ring-2 focus:ring-[#ff9d54] focus:border-transparent 
                bg-white/10 text-white placeholder-gray-400 shadow-md shadow-[#ff9d54]/30 focus:shadow-lg focus:shadow-[#ff9d54]/50 transition duration-200"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div>
                <label className="text-gray-200">Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 rounded-xl border border-[#ff9d54]/40 focus:ring-2 focus:ring-[#ff9d54] focus:border-transparent 
                bg-white/10 text-white placeholder-gray-400 shadow-md shadow-[#ff9d54]/30 focus:shadow-lg focus:shadow-[#ff9d54]/50 transition duration-200"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>

              <div className="text-right">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setShowForgotPassword(true)}
                  className="text-sm text-[#ff9d54] cursor-pointer"
                >
                  Forgot Password?
                </motion.span>
              </div>

              {error && <p className="text-red-400 text-sm">{error}</p>}
              {resetStatus && <p className="text-green-400 text-sm">{resetStatus}</p>}

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-[#ff9d54] to-orange-400 text-black rounded-xl font-medium 
              shadow-lg shadow-orange-500/20 hover:shadow-xl hover:shadow-orange-400/40 transition duration-200"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </motion.button>
            </form>

            <p className="mt-4 text-center text-gray-400">
              Don't have an account?{' '}
              <motion.span
                whileHover={{ scale: 1.05 }}
                onClick={() => navigate('/signup')}
                className="text-[#ff9d54] cursor-pointer font-medium"
              >
                Sign up
              </motion.span>
            </p>
          </>
        )}
      </motion.div>
    </div>

  );
};

export default Login;
