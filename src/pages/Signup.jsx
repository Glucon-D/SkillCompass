import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { account } from '../config/appwrite';
import { ID } from 'appwrite';

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [passwordScore, setPasswordScore] = useState(0);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Create account
      const account_response = await account.create(
        ID.unique(),
        formData.email,
        formData.password,
        formData.name
      );

      if (account_response.$id) {
        await account.createEmailPasswordSession(formData.email, formData.password);
        window.location.href = '/dashboard';  // Use full page redirect
      }
    } catch (error) {
      console.error("Signup error:", error);
      if (error.code === 409) {
        setError('Email already exists. Please login instead.');
      } else if (error.code === 400) {
        setError('Invalid email or password format.');
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };
  const evaluatePasswordStrength = (password) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    setPasswordScore(score);

    if (score <= 2) setPasswordStrength('Weak');
    else if (score === 3 || score === 4) setPasswordStrength('Moderate');
    else setPasswordStrength('Strong');
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1c1b1b]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#2a2929]/70 backdrop-blur-md p-8 rounded-2xl shadow-2xl max-w-md w-full border border-[#3a3939]"
      >
        <h2 className="text-3xl font-bold bg-gradient-to-r from-[#ff9d54] to-orange-400 bg-clip-text text-transparent mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="text-gray-200">Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-xl border border-[#ff9d54]/40 focus:ring-2 focus:ring-[#ff9d54] focus:border-transparent 
              bg-white/10 text-white placeholder-gray-400 shadow-md shadow-[#ff9d54]/30 focus:shadow-lg focus:shadow-[#ff9d54]/50 transition duration-200"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

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
              onChange={(e) => {
                const val = e.target.value;
                setFormData({ ...formData, password: val });
                evaluatePasswordStrength(val);
              }}
            />

          </div>
          {formData.password && (
            <>
              <div className="mt-2 h-2 rounded-full bg-gray-700 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(passwordScore / 5) * 100}%` }}
                  transition={{ duration: 0.3 }}
                  className={`h-full ${passwordStrength === 'Weak'
                      ? 'bg-red-500'
                      : passwordStrength === 'Moderate'
                        ? 'bg-yellow-500'
                        : 'bg-green-500'
                    }`}
                />
              </div>

              <p
                className={`text-sm mt-1 ${passwordStrength === 'Weak'
                    ? 'text-red-400'
                    : passwordStrength === 'Moderate'
                      ? 'text-yellow-400'
                      : 'text-green-400'
                  }`}
              >
                Strength: {passwordStrength}
              </p>
            </>
          )}


          {error && <p className="text-red-400 text-sm">{error}</p>}

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-[#ff9d54] to-orange-400 text-black rounded-xl font-medium 
            shadow-lg shadow-orange-500/20 hover:shadow-xl hover:shadow-orange-400/40 transition duration-200"
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </motion.button>
        </form>

        <p className="mt-4 text-center text-gray-400">
          Already have an account?{' '}
          <motion.span
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate('/login')}
            className="text-[#ff9d54] cursor-pointer font-medium"
          >
            Login
          </motion.span>
        </p>
      </motion.div>
    </div>
  );

};

export default Signup;
