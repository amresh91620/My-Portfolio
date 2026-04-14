import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { ArrowRight, Download, Terminal, Mouse } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Hero = () => {
  const { isDark } = useTheme();
  const commandOptions = ['help', 'about', 'skills', 'projects', 'contact', 'resume', 'clear', 'status', 'os'];
  const [command, setCommand] = useState('');
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [terminalLines, setTerminalLines] = useState([
    'A:\\> system online.',
    'A:\\> type "help" for commands.'
  ]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 50, damping: 15 }
    }
  };

  const appendLine = (line) => {
    setTerminalLines((prev) => [...prev.slice(-7), line]);
  };

  const scrollToSection = (id) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleTerminalCommand = (event) => {
    event.preventDefault();
    const input = command.trim();
    if (!input) return;

    const normalized = input.toLowerCase();
    setHistory((prev) => [...prev, input]);
    setHistoryIndex(-1);
    appendLine(`A:\\> ${input}`);
    appendLine(`[RUN] executing ${normalized}...`);

    if (normalized === 'help') {
      appendLine('commands: about | skills | projects | contact | resume | clear');
    } else if (normalized === 'about' || normalized === 'skills' || normalized === 'projects' || normalized === 'contact') {
      scrollToSection(normalized);
      appendLine(`[OK] jumping to ${normalized}...`);
    } else if (normalized === 'os' || normalized === 'status') {
      appendLine('[OK] system stable | kernel: portfolio_os | mode: interactive');
    } else if (normalized === 'resume') {
      window.open('/Amresh_Gond_Resume.pdf', '_blank', 'noopener,noreferrer');
      appendLine('[OK] opening resume...');
    } else if (normalized === 'clear') {
      setTerminalLines(['A:\\> terminal cleared.']);
    } else {
      appendLine(`[ERR] unknown command: ${input}`);
      appendLine('[HINT] try: help | projects | contact');
    }

    setCommand('');
  };

  const handleCommandKeyDown = (event) => {
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (!history.length) return;
      const nextIndex = historyIndex < 0 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setCommand(history[nextIndex]);
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (!history.length) return;
      if (historyIndex <= 0) {
        setHistoryIndex(-1);
        setCommand('');
        return;
      }
      const nextIndex = historyIndex - 1;
      setHistoryIndex(nextIndex);
      setCommand(history[nextIndex]);
      return;
    }

    if (event.key === 'Tab') {
      event.preventDefault();
      const current = command.trim().toLowerCase();
      const match = commandOptions.find((item) => item.startsWith(current));
      if (match) {
        setCommand(match);
      }
    }
  };

  const runShortcut = (value) => {
    setCommand(value);
    const fakeEvent = { preventDefault: () => {} };
    setTimeout(() => handleTerminalCommand(fakeEvent), 0);
  };

  return (
    <section id="hero" className="relative min-h-[calc(100vh-4.5rem)] md:min-h-screen flex items-center justify-center py-24 sm:py-24 lg:py-24 px-4 sm:px-6 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[100px] ${
            isDark ? 'bg-teal-500/10' : 'bg-teal-400/20'
          }`}
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, 50, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className={`absolute bottom-1/4 right-1/4 w-125 h-125 rounded-full blur-[120px] ${
            isDark ? 'bg-indigo-500/10' : 'bg-indigo-400/20'
          }`}
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
            x: [0, -50, 0],
            y: [0, -40, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10 w-full grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-8 md:gap-10 lg:gap-12 items-start">
        {/* Left text section with staggered animations */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:pr-8 xl:pr-10 self-center"
        >
          <motion.div variants={itemVariants} className="mb-5">
            <span className="inline-flex items-center text-[10px] sm:text-xs tracking-[0.12em] uppercase px-2.5 sm:px-3 py-1 border border-rose-500/40 bg-[#1a0f13]/70 whitespace-nowrap">
              System Ready :: Interactive Mode
            </span>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h1 className={`font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-3 sm:mb-4 transition-colors leading-[1.08] max-w-2xl ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              printf("HELLO"); <br />
              <motion.span 
                className="gradient-text inline-block"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                I am Amresh Gond;
              </motion.span>
            </h1>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h2 className={`font-sans text-xl sm:text-2xl md:text-3xl font-semibold mb-5 sm:mb-6 flex items-center gap-3 max-w-xl ${
              isDark ? 'text-slate-300' : 'text-gray-700'
            }`}>
              FULL_STACK_DEVELOPER.cpp
            </h2>
          </motion.div>

          <motion.div variants={itemVariants}>
            <p className={`text-sm sm:text-base md:text-lg max-w-xl mb-8 sm:mb-10 leading-relaxed ${
              isDark ? 'text-slate-400' : 'text-gray-600'
            }`}>
              Legacy terminal vibes, modern web power. I compile ideas into production-ready
              MERN systems, optimize APIs like low-level routines, and ship reliable products
              that run clean on every screen.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-nowrap gap-2.5 sm:gap-3 max-w-full overflow-x-auto pb-1">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#projects"
              className={`command-btn inline-flex shrink-0 items-center justify-center w-auto whitespace-nowrap gap-2 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base rounded-xl font-bold transition-[background-color,box-shadow,transform] duration-300 group ${
                isDark 
                    ? 'bg-linear-to-r from-teal-500 to-blue-600 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40' 
                    : 'bg-linear-to-r from-teal-600 to-blue-600 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40'
              }`}
            >
              C:\&gt; run projects.exe
              <motion.span
                whileHover={{ x: 4 }}
              >
                <ArrowRight size={20} />
              </motion.span>
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05, backgroundColor: isDark ? 'rgba(30, 41, 59, 0.8)' : 'rgba(248, 250, 252, 1)' }}
              whileTap={{ scale: 0.95 }}
              href="/Amresh_Gond_Resume.pdf"
              download="Amresh_Gond_Resume.pdf"
              className={`command-btn command-btn-secondary inline-flex shrink-0 items-center justify-center w-auto whitespace-nowrap gap-2 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base rounded-xl font-bold transition-[background-color,border-color,box-shadow,transform] duration-300 ${
                isDark 
                  ? 'bg-slate-800/50 text-white border border-slate-700 hover:border-slate-500 shadow-lg' 
                  : 'bg-white text-gray-900 border border-gray-200 shadow-lg hover:shadow-xl'
              }`}
            >
              <Download size={20} className="group-hover:-translate-y-1 transition-transform" />
              C:\&gt; open resume.txt
            </motion.a>
          </motion.div>

        </motion.div>

        {/* Right visual section - Interactive Terminal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4, delay: 0.5 }}
          className="relative w-full lg:justify-self-end mt-6 md:mt-8 lg:mt-0 lg:pt-5"
        >
          <motion.div 
            animate={{ y: [-4, 4, -4] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="w-full max-w-2xl mx-auto lg:ml-auto"
          >
            <div className="hero-terminal-shell">
              <div className="live-terminal hero-terminal-lg">
              <div className="live-terminal-head">
                <Terminal size={14} />
                <span>interactive command input</span>
              </div>
              <div className="command-shortcuts" aria-label="Quick commands">
                {['help', 'projects', 'contact', 'resume'].map((quick) => (
                  <button key={quick} type="button" onClick={() => runShortcut(quick)} className="command-chip">
                    {quick}
                  </button>
                ))}
              </div>
              <div className="live-terminal-log">
                {terminalLines.map((line, idx) => (
                  <p key={`${line}-${idx}`} className={`live-terminal-line ${line.includes('[ERR]') ? 'is-error' : ''}`}>
                    {line}
                  </p>
                ))}
              </div>
              <form onSubmit={handleTerminalCommand} className="live-terminal-form">
                <label htmlFor="heroCommand" className="sr-only">
                  Terminal Command
                </label>
                <span className="live-terminal-prefix">A:\\&gt;</span>
                <input
                  id="heroCommand"
                  value={command}
                  onChange={(event) => setCommand(event.target.value)}
                  onKeyDown={handleCommandKeyDown}
                  className="live-terminal-input"
                  placeholder="help (Tab autocomplete, ArrowUp history)"
                  autoComplete="off"
                  autoFocus
                />
                <button type="submit" className="live-terminal-run">
                  run
                </button>
              </form>
              </div>
            </div>
          </motion.div>

          <div className="mt-5 sm:mt-6 w-full max-w-2xl mx-auto lg:ml-auto flex flex-nowrap gap-2 sm:gap-2.5 overflow-x-auto pb-1">
            {['MERN Specialist', 'API-First Builder', 'Responsive UI Focus'].map((badge) => (
              <span
                key={badge}
                className={`shrink-0 whitespace-nowrap px-2.5 sm:px-3 py-1.5 text-[11px] sm:text-xs md:text-sm rounded-full border ${
                  isDark
                    ? 'bg-slate-900/60 border-slate-700 text-slate-300'
                    : 'bg-white/80 border-gray-200 text-gray-700'
                }`}
              >
                {badge}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to About section"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.5 }}
        className={`absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex items-center gap-2 text-xs tracking-[0.2em] uppercase ${
          isDark ? 'text-slate-400 hover:text-teal-300' : 'text-gray-500 hover:text-teal-700'
        } transition-colors`}
      >
        <Mouse size={14} />
        Scroll
      </motion.a>
    </section>
  );
};

export default Hero;
