import React from 'react';
import { motion } from 'framer-motion';
import { 
  RiGithubFill,
  RiMailFill,
  RiBugFill,
  RiHeartFill,
  RiMagicLine, // Changed from RiReactjsLine to RiMagicLine for consistency
  RiCodeSSlashFill,
  RiInstagramLine,
  RiLinkedinBoxFill,
  RiFeedbackFill 
} from 'react-icons/ri';

const Footer = () => {
  const handleReportBug = () => {
    window.location.href = "mailto:connect@ayush-sharma.in?subject=Report%20Feedback/Bug%20on%20SkillCompass";
  };

  const socialLinks = [
    { 
      icon: <RiGithubFill className="w-6 h-6" />, 
      href: 'https://github.com/Glucon-D/SkillCompass',
      label: 'GitHub'
    },
    { 
      icon: <RiMailFill className="w-6 h-6" />, 
      href: 'mailto:connect@ayush-sharma.in',
      label: 'Email'
    }
  ];

  return (
    <footer className="bg-[#1c1b1b]/80 backdrop-blur-sm border-t border-[#3a3a3a]">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Left Side - Logo and Made with Love */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2"
            >
              <RiMagicLine className="text-3xl text-[#ff9d54]" /> {/* Changed icon and color to match Navbar */}
              <div className="text-2xl font-bold bg-gradient-to-r from-[#ff9d54] to-[#ff8a30] bg-clip-text text-transparent">
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
                className="font-medium text-[#ff9d54] hover:text-[#ff8a30] flex items-center gap-1"
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
                  className="text-gray-400 hover:text-[#ff9d54] transition-colors relative group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.icon}
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#ff9d54] text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {social.label}
                  </span>
                </motion.a>
              ))}
            </div>

            {/* Report Bug Button */}
            <motion.button
              onClick={handleReportBug}
              className="flex items-center gap-2 px-4 py-2 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-[#ff9d54] rounded-full transition-colors group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <RiFeedbackFill className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              <span className="hidden sm:inline">Report Bug</span>
            </motion.button>
          </div>
        </div>

        {/* Copyright at Bottom */}
        <motion.p 
          className="text-center text-sm text-gray-500 mt-4"
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
