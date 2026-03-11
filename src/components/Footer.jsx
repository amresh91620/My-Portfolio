import React from 'react';
import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Instagram, Mail, Heart } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Footer = () => {
  const { isDark } = useTheme();

  const socials = [
    { icon: <Github size={22} />, href: 'https://github.com/amresh91620', label: 'GitHub' },
    { icon: <Linkedin size={22} />, href: 'https://linkedin.com/in/amresh-kumar-gond-709b38259', label: 'LinkedIn' },
    { icon: <Twitter size={22} />, href: '#', label: 'Twitter' },
    { icon: <Instagram size={22} />, href: '#', label: 'Instagram' },
    { icon: <Mail size={22} />, href: 'mailto:amresh91620@gmail.com', label: 'Email' },
  ];

  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer className={`border-t py-16 px-6 transition-colors duration-500 ${
      isDark ? 'bg-slate-950 border-white/5' : 'bg-gray-100 border-gray-200'
    }`}>
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <motion.h3 
              whileHover={{ scale: 1.02 }}
              className={`font-serif text-3xl font-bold mb-6 cursor-default ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
            >
              Amresh<span className="gradient-text">Gond</span>
            </motion.h3>
            <p className={`text-base leading-relaxed max-w-sm mb-8 ${
              isDark ? 'text-slate-400' : 'text-gray-600'
            }`}>
              Designing and developing pixel-perfect digital experiences. 
              Let's build something exceptional together.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className={`font-bold text-sm uppercase tracking-[0.2em] mb-6 opacity-60 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Navigate
            </h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <motion.a
                    href={link.href}
                    whileHover={{ x: 5 }}
                    className={`text-sm font-medium transition-colors inline-block ${
                      isDark ? 'text-slate-400 hover:text-teal-400' : 'text-gray-600 hover:text-teal-600'
                    }`}
                  >
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className={`font-bold text-sm uppercase tracking-[0.2em] mb-6 opacity-60 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Connect
            </h4>
            <div className="flex flex-wrap gap-4">
              {socials.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-3 rounded-xl border transition-all ${
                    isDark 
                      ? 'bg-slate-900 border-white/5 text-slate-400 hover:text-teal-400 hover:border-teal-500/50' 
                      : 'bg-white border-gray-200 text-gray-500 hover:text-teal-600 hover:border-teal-500/30 shadow-sm'
                  }`}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`pt-12 border-t flex flex-col md:flex-row justify-between items-center gap-6 ${
          isDark ? 'border-white/5' : 'border-gray-200'
        }`}>
          <p className={`text-sm flex items-center gap-2 ${
            isDark ? 'text-slate-400' : 'text-gray-600'
          }`}>
            Grown with <Heart size={16} className="text-red-500 fill-red-500 animate-pulse" /> in India
          </p>
          
          <div className="text-center md:text-right">
            <p className={`text-sm font-medium ${isDark ? 'text-slate-200' : 'text-gray-900'}`}>
              © {new Date().getFullYear()} <span className="gradient-text">Amresh Gond</span>. 
              <span className="opacity-50 ml-1">All rights reserved.</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
