import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);
  const { isDark, toggleTheme } = useTheme();

  const navLinks = [
    { name: 'About', href: '#about', number: '01', section: 'about' },
    { name: 'Skills', href: '#skills', number: '02', section: 'skills' },
    { name: 'Experience', href: '#experience', number: '03', section: 'experience' },
    { name: 'Projects', href: '#projects', number: '04', section: 'projects' },
    { name: 'Contact', href: '#contact', number: '05', section: 'contact' },
  ];

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);

          const sections = ['hero', ...navLinks.map((link) => link.section)];
          const currentSection = sections.reduce((active, section) => {
            const element = document.getElementById(section);
            if (!element) return active;
            const rect = element.getBoundingClientRect();
            return rect.top <= 140 ? section : active;
          }, 'hero');
          setActiveSection(currentSection);

          const scrollTop = window.scrollY;
          const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
          const progress = documentHeight > 0 ? (scrollTop / documentHeight) * 100 : 0;
          setScrollProgress(Math.min(progress, 100));

          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 px-6 transition-[background-color,border-color,box-shadow,padding] duration-300 ${
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
                activeSection === link.section
                  ? isDark
                    ? 'text-teal-300'
                    : 'text-teal-700'
                  : isDark
                    ? 'text-slate-400 hover:text-blue-400'
                    : 'text-gray-600 hover:text-blue-600'
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
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-linear-to-r from-teal-500 via-blue-500 to-amber-500"
        animate={{ width: `${scrollProgress}%` }}
        transition={{ type: 'spring', stiffness: 120, damping: 25 }}
      />

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 z-55 bg-slate-950/50 backdrop-blur-[2px]"
              aria-label="Close menu backdrop"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className={`md:hidden fixed right-0 top-0 h-screen w-[78%] max-w-85 z-60 shadow-2xl flex flex-col px-8 pt-24 pb-8 ${
                isDark ? 'bg-slate-900/95 border-l border-slate-800' : 'bg-white/95 border-l border-gray-100'
              }`}
            >
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
                  hidden: {}
                }}
                className="flex flex-col space-y-8"
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
                    className={`text-2xl font-serif font-bold transition-[color] group flex flex-col ${
                      activeSection === link.section
                        ? isDark
                          ? 'text-teal-300'
                          : 'text-teal-700'
                        : isDark
                          ? 'text-slate-100 hover:text-blue-400'
                          : 'text-gray-800 hover:text-blue-600'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-blue-500 opacity-70">
                        {link.number}.
                      </span>
                      {link.name}
                    </div>
                    <span className="h-0.5 w-0 bg-blue-500 transition-[width] duration-300 group-hover:w-12 mt-1" />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
