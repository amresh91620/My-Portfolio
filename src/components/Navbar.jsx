import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about', number: '01' },
    { name: 'Skills', href: '#skills', number: '02' },
    { name: 'Experience', href: '#experience', number: '03' },
    { name: 'Projects', href: '#projects', number: '04' },
    { name: 'Contact', href: '#contact', number: '05' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 px-6 transition-all duration-300 ${
      isScrolled 
        ? isDark 
          ? 'bg-slate-900/95 backdrop-blur-md shadow-lg py-4 border-b border-slate-800' 
          : 'bg-white/95 backdrop-blur-md shadow-md py-4 border-b border-gray-200'
        : 'bg-transparent py-6'
    }`}>
      <div className="container mx-auto max-w-7xl flex justify-between items-center">
        <a href="#" className={`font-serif text-2xl font-bold tracking-widest transition-colors ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
          A<span className="gradient-text">G</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`transition-colors duration-300 text-sm tracking-wide group ${
                isDark ? 'text-slate-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <span className="gradient-text text-xs mr-1">{link.number}.</span>
              {link.name}
            </a>
          ))}
          
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-all duration-300 ${
              isDark 
                ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
            }`}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-all duration-300 ${
              isDark 
                ? 'bg-slate-800 text-yellow-400' 
                : 'bg-gray-100 text-gray-700 border border-gray-200'
            }`}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          
          <button
            className={`focus:outline-none transition-colors ${
              isDark ? 'text-slate-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'
            }`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
<AnimatePresence>
  {isOpen && (
    <>

      {/* 2. Main Sidebar Panel */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className={`md:hidden fixed right-0 top-17 h-screen w-[70%] z-[60] shadow-2xl flex flex-col p-8 ${
          isDark ? 'bg-slate-900/95 border-l border-slate-800' : 'bg-white/95 border-l border-gray-100'
        }`}
      >
        {/* Navigation Links Container */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
            hidden: {}
          }}
          className="flex flex-col mt-20 space-y-8"
        >
          {navLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.href}
              variants={{
                hidden: { opacity: 0, x: 20 },
                visible: { opacity: 1, x: 0 }
              }}
              onClick={() => setIsOpen(false)}
              className={`text-2xl font-serif font-bold transition-all group flex flex-col ${
                isDark ? 'text-slate-100 hover:text-blue-400' : 'text-gray-800 hover:text-blue-600'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-sm text-blue-500 opacity-70">
                  {link.number}.
                </span>
                {link.name}
              </div>
              
              {/* Animated Underline */}
              <span className="h-[2px] w-0 bg-blue-500 transition-all duration-300 group-hover:w-12 mt-1" />
            </motion.a>
          ))}

          {/* Bottom Branding or Footer */}
          <motion.div 
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            className="pt-10 mt-10 border-t border-slate-700/20"
          >
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  )}
</AnimatePresence>
    </nav>
  );
};

export default Navbar;
