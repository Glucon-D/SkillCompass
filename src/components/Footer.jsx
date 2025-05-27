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
    window.location.href = "mailto:connect@ayush-sharma.in?subject=Report%20Feedback/Bug%20on%20PathGenie";
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    {
      icon: <RiGithubFill className="w-5 h-5" />,
      href: 'https://github.com/Glucon-D/PathGenie',
      label: 'GitHub',
      color: 'hover:text-gray-300'
    },
    {
      icon: <RiMailFill className="w-5 h-5" />,
      href: 'mailto:connect@ayush-sharma.in',
      label: 'Email',
      color: 'hover:text-blue-400'
    },
    {
      icon: <RiTwitterFill className="w-5 h-5" />,
      href: 'https://twitter.com/pathgenie',
      label: 'Twitter',
      color: 'hover:text-blue-400'
    },
    {
      icon: <RiDiscordFill className="w-5 h-5" />,
      href: 'https://discord.gg/pathgenie',
      label: 'Discord',
      color: 'hover:text-indigo-400'
    }
  ];

  const quickLinks = [
    { name: 'About', href: '/about' },
    { name: 'Features', href: '/features' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Contact', href: '/contact' }
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' }
  ];

  return (
    <footer className="relative bg-gradient-to-b from-[#1c1b1b] to-[#0f0f0f] border-t border-[#3a3a3a]/50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#ff9d54]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#ff8a30]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-4"
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
                className="w-10 h-10 bg-gradient-to-br from-[#ff9d54] via-[#ff8a30] to-[#ff7a20] rounded-xl
                  flex items-center justify-center shadow-lg shadow-[#ff9d54]/30"
              >
                <RiCompassDiscoverFill className="text-white text-xl" />
              </motion.div>
              <div className="text-2xl font-bold bg-gradient-to-r from-[#ff9d54] via-[#ff8a30] to-[#ff9d54] bg-clip-text text-transparent">
                PathGenie
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-400 text-sm leading-relaxed mb-6 max-w-md"
            >
              Empowering learners worldwide with AI-driven personalized education.
              Transform your skills and unlock your potential with our cutting-edge platform.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-2 text-sm text-gray-400"
            >
              Made with <RiHeartFill className="text-red-500 animate-pulse" /> by
              <a
                href="https://PathGenie.ayush-sharma.in"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#ff9d54] hover:text-[#ff8a30] transition-colors flex items-center gap-1"
              >
                Team Glucon D
                <RiCodeSSlashFill className="w-4 h-4" />
              </a>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-white font-semibold mb-4 flex items-center gap-2"
            >
              <RiSparklingLine className="text-[#ff9d54]" />
              Quick Links
            </motion.h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-[#ff9d54] transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-[#ff9d54] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Legal & Support */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-white font-semibold mb-4 flex items-center gap-2"
            >
              <RiShieldCheckLine className="text-[#ff9d54]" />
              Legal & Support
            </motion.h3>
            <ul className="space-y-3">
              {legalLinks.map((link, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-[#ff9d54] transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-[#ff9d54] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.name}
                  </a>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <button
                  onClick={handleReportBug}
                  className="text-gray-400 hover:text-[#ff9d54] transition-colors text-sm flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-[#ff9d54] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Report Bug
                </button>
              </motion.li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-[#3a3a3a]/50 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4"
            >
              <span className="text-gray-400 text-sm">Follow us:</span>
              <div className="flex space-x-3">
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
            </motion.div>

            {/* Copyright & Scroll to Top */}
            <div className="flex items-center gap-4">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center text-sm text-gray-500"
              >
                © {new Date().getFullYear()} PathGenie. All rights reserved.
              </motion.p>

              <motion.button
                onClick={scrollToTop}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 bg-[#ff9d54]/10 hover:bg-[#ff9d54]/20 text-[#ff9d54] rounded-lg transition-all duration-300 border border-[#ff9d54]/20 hover:border-[#ff9d54]/40"
              >
                <RiArrowUpLine className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
