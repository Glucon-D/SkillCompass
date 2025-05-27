import React from 'react';
import { motion } from 'framer-motion';
import {
  RiGithubFill,
  RiMailFill,
  RiBugFill,
  RiHeartFill,
  RiCompassDiscoverFill,
  RiCodeSSlashFill,
  RiInstagramLine,
  RiLinkedinBoxFill,
  RiFeedbackFill,
  RiTwitterFill,
  RiDiscordFill,
  RiArrowUpLine,
  RiSparklingLine,
  RiShieldCheckLine
} from 'react-icons/ri';

const Footer = () => {
  const handleReportBug = () => {
    window.location.href = "mailto:connect@ayush-sharma.in?subject=Report%20Feedback/Bug%20on%20SkillCompass";
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    {
      icon: <RiGithubFill className="w-5 h-5" />,
      href: 'https://github.com/Glucon-D/SkillCompass',
      label: 'GitHub',
      color: 'hover:text-gray-300'
    },
    {
      icon: <RiMailFill className="w-5 h-5" />,
      href: 'mailto:connect@ayush-sharma.in',
      label: 'Email',
      color: 'hover:text-blue-400'
    }
  ];

  return (
    <footer className="bg-[#1c1b1b]/90 backdrop-blur-xl border-t border-[#3a3a3a]/50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Left Side - Logo and Made with Love */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3"
            >
              <motion.div
                animate={{
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-8 h-8 bg-gradient-to-br from-[#ff9d54] via-[#ff8a30] to-[#ff7a20] rounded-xl
                  flex items-center justify-center shadow-lg shadow-[#ff9d54]/30"
              >
                <RiCompassDiscoverFill className="text-white text-lg" />
              </motion.div>
              <div className="text-xl font-bold bg-gradient-to-r from-[#ff9d54] via-[#ff8a30] to-[#ff9d54] bg-clip-text text-transparent">
                SkillCompass
              </div>
            </motion.div>

            <motion.p
              className="flex items-center gap-2 text-sm text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Made with <RiHeartFill className="text-red-500 animate-pulse" /> by
              <a
                href="https://SkillCompass.ayush-sharma.in"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#ff9d54] hover:text-[#ff8a30] transition-colors flex items-center gap-1"
              >
                Team Glucon D
                <RiCodeSSlashFill className="w-4 h-4" />
              </a>
            </motion.p>
          </div>

          {/* Right Side - Social Links and Report Bug */}
          <div className="flex items-center gap-6">
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-400 ${social.color} transition-all duration-300 relative group p-2 rounded-lg hover:bg-[#2a2a2a]/50`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.icon}
                  <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#2a2a2a] text-white text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-[#3a3a3a]">
                    {social.label}
                  </span>
                </motion.a>
              ))}
            </div>

            {/* Report Bug Button */}
            <motion.button
              onClick={handleReportBug}
              className="flex items-center gap-2 px-4 py-2 bg-[#2a2a2a]/60 hover:bg-[#3a3a3a]/60 text-[#ff9d54] rounded-xl transition-all duration-300 group border border-[#3a3a3a]/50 hover:border-[#ff9d54]/30"
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
            >
              <RiFeedbackFill className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              <span className="hidden sm:inline text-sm">Report Bug</span>
            </motion.button>
          </div>
        </div>

        {/* Copyright at Bottom */}
        <motion.p
          className="text-center text-sm text-gray-500 mt-6 pt-6 border-t border-[#3a3a3a]/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          © {new Date().getFullYear()} SkillCompass. All rights reserved.
        </motion.p>
      </div>
    </footer>
  );
};

export default Footer;
