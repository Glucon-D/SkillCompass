import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  RiFireFill,
  RiCompassDiscoverFill,
  RiCoinFill,
  RiTrophyFill,
} from "react-icons/ri"; // Changed RiMagicLine to RiCompassDiscoverFill
import { differenceInDays, parseISO, format } from "date-fns";
import { getStreakData } from "../config/database";
import { usePoints } from "../context/PointsContext";

const Navbar = ({ isDashboard, isSidebarOpen, setIsSidebarOpen }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { user, loading, logout, isAuthenticated } = useAuth();
  const [currentStreak, setCurrentStreak] = useState(0);
  const { points } = usePoints();

  // ✅ Function to calculate current streak
  const calculateCurrentStreak = (dates) => {
    if (!Array.isArray(dates) || dates.length === 0) return 0;

    const today = format(new Date(), "yyyy-MM-dd"); // normalize to date only
    const todayDate = parseISO(today);

    const sorted = [...new Set(dates)].sort();

    let streak = 0;

    for (let i = sorted.length - 1; i >= 0; i--) {
      const date = parseISO(sorted[i]);
      const diff = differenceInDays(todayDate, date);

      if (diff === streak) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  };

  // ✅ Load user streak
  useEffect(() => {
    if (!loading && user?.$id) {
      const fetchStreak = async () => {
        try {
          const streakDates = await getStreakData(user.$id);
          const streak = calculateCurrentStreak(streakDates);
          setCurrentStreak(streak);
        } catch (err) {
          console.error("Error fetching streak data:", err);
          setCurrentStreak(0);
        }
      };
      fetchStreak();
    }
  }, [user, loading]);

  const handleLogin = () => navigate("/login");
  const handleSignup = () => navigate("/signup");

  const UserDropdown = () => (
    <AnimatePresence>
      {isDropdownOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute right-0 mt-2 w-48 bg-[#2a2a2a] rounded-xl shadow-lg py-2 border border-[#3a3a3a]"
        >
          <div className="px-4 py-2 border-b border-[#3a3a3a]">
            <p className="text-sm font-medium text-white">
              {user?.name || user?.email?.split("@")[0]}
            </p>
            <p className="text-xs text-gray-400 truncate">{user?.email}</p>
          </div>

          {[
            { label: "Dashboard", path: "/dashboard", icon: "🏠" },
            { label: "Profile", path: "/profile", icon: "👤" },
            { label: "Progress", path: "/progress", icon: "📊" },
          ].map((item) => (
            <motion.button
              key={item.path}
              whileHover={{ x: 2 }}
              onClick={() => {
                navigate(item.path);
                setIsDropdownOpen(false);
              }}
              className="w-full px-4 py-2 text-sm text-white hover:bg-[#3a3a3a] flex items-center gap-2"
            >
              <span>{item.icon}</span>
              {item.label}
            </motion.button>
          ))}

          <motion.button
            whileHover={{ x: 2 }}
            onClick={() => {
              logout();
              setIsDropdownOpen(false);
            }}
            className="w-full px-4 py-2 text-sm text-red-400 hover:bg-[#3a3a3a] flex items-center gap-2 border-t border-[#3a3a3a]"
          >
            <span>🚪</span>
            Logout
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="bg-[#1c1b1b]/80 backdrop-blur-md border-b border-[#3a3a3a] px-3 sm:px-4 md:px-8 py-3 md:py-4 
          flex justify-between items-center fixed top-0 w-full z-[999] shadow-sm"
      >
        <div className="flex items-center gap-2 md:gap-4">
          {isDashboard && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-1.5 md:p-2 hover:bg-[#2a2a2a] rounded-lg"
            >
              <svg
                className="w-6 h-6 text-[#ff9d54]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isSidebarOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </motion.button>
          )}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-1.5 md:gap-2 cursor-pointer"
            onClick={() => navigate(isAuthenticated ? "/dashboard" : "/")}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-7 h-7 md:w-8 md:h-8 bg-gradient-to-tr from-[#ff9d54] to-[#ff8a30] rounded-lg 
                flex items-center justify-center"
            >
              <RiCompassDiscoverFill className="text-white text-lg md:text-xl" />
            </motion.div>
            <span
              className="text-lg md:text-xl font-serif font-bold bg-gradient-to-r from-[#ff9d54] 
              to-[#ff8a30] bg-clip-text text-transparent truncate"
            >
              SkillCompass
            </span>
          </motion.div>
        </div>

        {isAuthenticated ? (
          <div className="flex items-center gap-2 md:gap-6">
            {/* Streak Counter with enhanced styling */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex gap-1 items-center text-sm md:text-base bg-[#2a2a2a]/60 px-2 md:px-3 py-1 rounded-full"
            >
              <RiFireFill className="text-lg md:text-xl text-[#ff9d54]" />
              <span className="font-medium text-white">{currentStreak}</span>
              <span className="text-xs text-gray-400 hidden sm:inline">
                day streak
              </span>
            </motion.div>

            {/* Points Counter with new icon and enhanced styling */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex gap-1 items-center text-sm md:text-base bg-[#2a2a2a]/60 px-2 md:px-3 py-1 rounded-full"
            >
              <RiCoinFill className="text-lg md:text-xl text-[#ff9d54]" />
              <span className="font-medium text-white">{points}</span>
              <span className="text-xs text-gray-400 hidden sm:inline">
                points
              </span>
            </motion.div>

            {/* Desktop User Menu */}
            <div className="hidden md:block relative">
              <motion.div
                whileHover={{ scale: 1.02 }}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-3 bg-[#2a2a2a] px-4 py-2 rounded-xl cursor-pointer"
              >
                <div className="w-8 h-8 bg-[#ff9d54]/30 rounded-full flex items-center justify-center text-white">
                  {user?.name?.[0]?.toUpperCase() ||
                    user?.email?.[0]?.toUpperCase() ||
                    "👤"}
                </div>
                <span className="text-white font-medium flex items-center gap-2">
                  {user?.name || user?.email?.split("@")[0] || "Loading..."}
                  <motion.svg
                    animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </motion.svg>
                </span>
              </motion.div>
              <UserDropdown />
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="md:hidden p-2 bg-[#2a2a2a] text-[#ff9d54] rounded-lg"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              aria-label="Menu"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isDropdownOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </motion.button>
          </div>
        ) : (
          <div className="space-x-2 md:space-x-4">
            <motion.button
              onClick={handleLogin}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-3 md:px-5 py-2 md:py-2.5 text-sm md:text-base bg-[#ff9d54] text-white rounded-lg 
                shadow-lg shadow-[#ff9d54]/20 hover:bg-gradient-to-r hover:from-[#ff9d54] hover:to-[#ff8a30]"
            >
              Login
            </motion.button>

            <motion.button
              onClick={handleSignup}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-3 md:px-4 py-2 md:py-2.5 text-sm md:text-base border border-[#ff9d54] 
                text-[#ff9d54] rounded-lg hover:bg-[#2a2a2a]"
            >
              Sign Up
            </motion.button>
          </div>
        )}
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isDropdownOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDropdownOpen(false)}
              className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-[998]"
            />

            {/* Mobile Menu Panel */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden fixed top-[60px] left-2 right-2 bg-[#1c1b1b] rounded-xl shadow-xl z-[999] 
                border border-[#3a3a3a] overflow-hidden"
            >
              {isAuthenticated ? (
                <div className="divide-y divide-[#3a3a3a]">
                  <div className="p-4 bg-[#2a2a2a]/50">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-[#ff9d54]/30 rounded-full flex items-center justify-center text-white">
                        {user?.name?.[0]?.toUpperCase() || "👤"}
                      </div>
                      <div>
                        <p className="font-medium text-white">
                          {user?.name || user?.email?.split("@")[0]}
                        </p>
                        <p className="text-xs text-gray-400 truncate">
                          {user?.email}
                        </p>
                      </div>
                    </div>

                    {/* Add Points and Streak in mobile menu */}
                    <div className="flex gap-4 mt-3">
                      <div className="flex gap-1 items-center bg-[#3a3a3a]/50 px-3 py-1.5 rounded-lg">
                        <RiFireFill className="text-[#ff9d54]" />
                        <span className="text-white">{currentStreak}</span>
                        <span className="text-xs text-gray-400">streak</span>
                      </div>
                      <div className="flex gap-1 items-center bg-[#3a3a3a]/50 px-3 py-1.5 rounded-lg">
                        <RiCoinFill className="text-[#ff9d54]" />
                        <span className="text-white">{points}</span>
                        <span className="text-xs text-gray-400">points</span>
                      </div>
                    </div>
                  </div>

                  {[
                    { label: "Dashboard", path: "/dashboard", icon: "🏠" },
                    { label: "Profile", path: "/profile", icon: "👤" },
                    { label: "Progress", path: "/progress", icon: "📊" },
                  ].map((item) => (
                    <motion.button
                      key={item.path}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        navigate(item.path);
                        setIsDropdownOpen(false);
                      }}
                      className="w-full p-4 text-left text-white hover:bg-[#2a2a2a] flex items-center gap-3 
                        active:bg-[#3a3a3a] transition-colors"
                    >
                      <span className="text-xl">{item.icon}</span>
                      {item.label}
                    </motion.button>
                  ))}

                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      logout();
                      setIsDropdownOpen(false);
                    }}
                    className="w-full p-4 text-left text-red-400 hover:bg-[#2a2a2a] flex items-center gap-3 
                      active:bg-red-900/20 transition-colors"
                  >
                    <span className="text-xl">🚪</span>
                    Logout
                  </motion.button>
                </div>
              ) : (
                <div className="p-4 space-y-3">
                  <button
                    onClick={() => {
                      handleLogin();
                      setIsDropdownOpen(false);
                    }}
                    className="w-full p-3 bg-[#ff9d54] text-white rounded-lg text-center font-medium"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      handleSignup();
                      setIsDropdownOpen(false);
                    }}
                    className="w-full p-3 border border-[#ff9d54] text-[#ff9d54] rounded-lg text-center font-medium"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
