import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);
  const { isDark } = useTheme();

  const navLinks = [
    { name: 'about', href: '#about', number: '01', section: 'about', command: 'goto about' },
    { name: 'skills', href: '#skills', number: '02', section: 'skills', command: 'goto skills' },
    { name: 'experience', href: '#experience', number: '03', section: 'experience', command: 'goto experience' },
    { name: 'projects', href: '#projects', number: '04', section: 'projects', command: 'goto projects' },
    { name: 'contact', href: '#contact', number: '05', section: 'contact', command: 'goto contact' },
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
        ? 'bg-[#0d0b10]/95 backdrop-blur-md shadow-lg py-4 border-b border-rose-900/60'
        : 'bg-[#0d0b10]/88 py-5 border-b border-rose-950/50'
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
                  ? 'text-rose-300'
                  : 'text-slate-400 hover:text-orange-300'
              }`}
            >
              <span className="gradient-text text-xs mr-1">{link.number}</span>
              {'>'} {link.command}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-3">
          <button
            className={`focus:outline-none transition-colors ${
              isDark ? 'text-slate-400 hover:text-orange-300' : 'text-gray-600 hover:text-orange-600'
            }`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      <motion.div
        className={`absolute bottom-0 left-0 h-0.5 bg-linear-to-r from-rose-500 via-orange-500 to-amber-400 transition-opacity duration-300 ${
          isScrolled ? 'opacity-100' : 'opacity-0'
        }`}
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
                          ? 'text-rose-300'
                          : 'text-rose-700'
                        : isDark
                          ? 'text-slate-100 hover:text-orange-300'
                          : 'text-gray-800 hover:text-orange-600'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-rose-400 opacity-70">
                        {link.number}
                      </span>
                      {'>'} {link.command}
                    </div>
                    <span className="h-0.5 w-0 bg-orange-400 transition-[width] duration-300 group-hover:w-12 mt-1" />
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
