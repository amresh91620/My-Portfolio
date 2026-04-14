// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { ArrowRight, Download, Terminal, Code2, Database, Mouse } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Hero = () => {
  const { isDark } = useTheme();

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

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center py-20 px-6 overflow-hidden">
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

      <div className="container mx-auto max-w-7xl relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left text section with staggered animations */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="flex items-center gap-2 mb-6">
            <span className={`px-4 py-1.5 rounded-full text-sm font-medium tracking-wide shadow-sm hover:shadow-md transition-shadow cursor-default ${
              isDark ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30' : 'bg-blue-50 text-blue-600 border border-blue-200'
            }`}>
              Available for new projects
            </span>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h1 className={`font-serif text-5xl md:text-6xl lg:text-7xl font-bold mb-4 transition-colors leading-tight ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Hi, I'm <br />
              <motion.span 
                className="gradient-text inline-block"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                Amresh Gond.
              </motion.span>
            </h1>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h2 className={`font-sans text-2xl md:text-3xl font-semibold mb-6 flex items-center gap-3 ${
              isDark ? 'text-slate-300' : 'text-gray-700'
            }`}>
              Full Stack Developer
            </h2>
          </motion.div>

          <motion.div variants={itemVariants}>
            <p className={`text-base md:text-lg max-w-xl mb-10 leading-relaxed ${
              isDark ? 'text-slate-400' : 'text-gray-600'
            }`}>
              I architect and build exceptional, scalable web applications. 
              Specializing in the MERN stack, I transform complex problems into 
              elegant, high-performance digital experiences.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#projects"
              className={`inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold transition-[background-color,box-shadow,transform] duration-300 group ${
                isDark 
                    ? 'bg-linear-to-r from-teal-500 to-blue-600 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40' 
                    : 'bg-linear-to-r from-teal-600 to-blue-600 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40'
              }`}
            >
              View My Work
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight size={20} />
              </motion.span>
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05, backgroundColor: isDark ? 'rgba(30, 41, 59, 0.8)' : 'rgba(248, 250, 252, 1)' }}
              whileTap={{ scale: 0.95 }}
              href="/Amresh_Gond_Resume.pdf"
              download="Amresh_Gond_Resume.pdf"
              className={`inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold transition-[background-color,border-color,box-shadow,transform] duration-300 ${
                isDark 
                  ? 'bg-slate-800/50 text-white border border-slate-700 hover:border-slate-500 shadow-lg' 
                  : 'bg-white text-gray-900 border border-gray-200 shadow-lg hover:shadow-xl'
              }`}
            >
              <Download size={20} className="group-hover:-translate-y-1 transition-transform" />
              Resume
            </motion.a>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-8 flex flex-wrap gap-3">
            {['MERN Specialist', 'API-First Builder', 'Responsive UI Focus'].map((badge) => (
              <span
                key={badge}
                className={`px-3 py-1.5 text-xs md:text-sm rounded-full border ${
                  isDark
                    ? 'bg-slate-900/60 border-slate-700 text-slate-300'
                    : 'bg-white/80 border-gray-200 text-gray-700'
                }`}
              >
                {badge}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Right visual section - Code Editor Mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4, delay: 0.5 }}
          className="hidden lg:block relative"
        >
          {/* Parallax Float container */}
          <motion.div 
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Decorative elements behind the editor */}
            <div className={`absolute -inset-1 rounded-2xl blur-xl opacity-60 ${isDark ? 'bg-linear-to-r from-teal-500 to-indigo-500' : 'bg-linear-to-r from-teal-400 to-blue-400'}`}></div>
            
            <motion.div 
              whileHover={{ scale: 1.02, rotateX: 2, rotateY: -2 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              style={{ perspective: "1000px" }}
              className={`relative rounded-2xl overflow-hidden shadow-2xl border backdrop-blur-sm ${
                isDark ? 'bg-[#0f111a]/90 border-slate-700' : 'bg-white/95 border-gray-200'
              }`}
            >
              {/* Editor Header */}
              <div className={`flex items-center justify-between px-4 py-3 border-b ${
                isDark ? 'bg-[#1a1d27]/90 border-slate-800' : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="flex gap-2">
                  <motion.div whileHover={{ scale: 1.2 }} className="w-3 h-3 rounded-full bg-red-500 cursor-pointer"></motion.div>
                  <motion.div whileHover={{ scale: 1.2 }} className="w-3 h-3 rounded-full bg-yellow-500 cursor-pointer"></motion.div>
                  <motion.div whileHover={{ scale: 1.2 }} className="w-3 h-3 rounded-full bg-green-500 cursor-pointer"></motion.div>
                </div>
                <p className={`text-xs font-mono font-medium ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>amresh-portfolio.js</p>
                <div className="flex gap-2">
                  <Terminal size={14} className={isDark ? 'text-slate-400' : 'text-gray-400'} />
                </div>
              </div>
              
              {/* Editor Content */}
              <div className="p-6 font-mono text-sm leading-loose">
                <div className="flex">
                  <span className={`w-8 select-none ${isDark ? 'text-slate-600' : 'text-gray-300'}`}>1</span>
                  <p className={`${isDark ? 'text-pink-400' : 'text-pink-600'}`}>const <span className={`${isDark ? 'text-white' : 'text-gray-900'}`}>developer</span> <span className={`${isDark ? 'text-cyan-400' : 'text-cyan-600'}`}>=</span> {'{'}</p>
                </div>
                <div className="flex">
                  <span className={`w-8 select-none ${isDark ? 'text-slate-600' : 'text-gray-300'}`}>2</span>
                  <p className="ml-4"><span className={`${isDark ? 'text-slate-300' : 'text-slate-600'}`}>name:</span> <span className={`${isDark ? 'text-green-400' : 'text-green-600'}`}>'Amresh Gond'</span>,</p>
                </div>
                <div className="flex">
                  <span className={`w-8 select-none ${isDark ? 'text-slate-600' : 'text-gray-300'}`}>3</span>
                  <p className="ml-4"><span className={`${isDark ? 'text-slate-300' : 'text-slate-600'}`}>role:</span> <span className={`${isDark ? 'text-green-400' : 'text-green-600'}`}>'Full Stack Developer'</span>,</p>
                </div>
                <div className="flex">
                  <span className={`w-8 select-none ${isDark ? 'text-slate-600' : 'text-gray-300'}`}>4</span>
                  <p className="ml-4"><span className={`${isDark ? 'text-slate-300' : 'text-slate-600'}`}>skills:</span> {'['}</p>
                </div>
                <div className="flex">
                  <span className={`w-8 select-none ${isDark ? 'text-slate-600' : 'text-gray-300'}`}>5</span>
                  <p className="ml-8"><span className={`${isDark ? 'text-green-400' : 'text-green-600'}`}>'React'</span>, <span className={`${isDark ? 'text-green-400' : 'text-green-600'}`}>'Node.js'</span>, <span className={`${isDark ? 'text-green-400' : 'text-green-600'}`}>'MongoDB'</span>,</p>
                </div>
                <div className="flex">
                  <span className={`w-8 select-none ${isDark ? 'text-slate-600' : 'text-gray-300'}`}>6</span>
                  <p className="ml-8"><span className={`${isDark ? 'text-green-400' : 'text-green-600'}`}>'Express'</span>, <span className={`${isDark ? 'text-green-400' : 'text-green-600'}`}>'PostgreSQL'</span></p>
                </div>
                <div className="flex">
                  <span className={`w-8 select-none ${isDark ? 'text-slate-600' : 'text-gray-300'}`}>7</span>
                  <p className="ml-4">{']'},</p>
                </div>
                <div className="flex">
                  <span className={`w-8 select-none ${isDark ? 'text-slate-600' : 'text-gray-300'}`}>8</span>
                  <p className="ml-4"><span className={`${isDark ? 'text-slate-300' : 'text-slate-600'}`}>buildAwesomeWebApps:</span> <span className={`${isDark ? 'text-blue-400' : 'text-blue-600'}`}>() {'=>'}</span> {'{'}</p>
                </div>
                <div className="flex">
                  <span className={`w-8 select-none ${isDark ? 'text-slate-600' : 'text-gray-300'}`}>9</span>
                  <p className="ml-8"><span className={`${isDark ? 'text-pink-400' : 'text-pink-600'}`}>return</span> <span className={`${isDark ? 'text-green-400' : 'text-green-600'}`}>'Excellence delivered'</span>;</p>
                </div>
                <div className="flex">
                  <span className={`w-8 select-none ${isDark ? 'text-slate-600' : 'text-gray-300'}`}>10</span>
                  <p className="ml-4">{'}'}</p>
                </div>
                <div className="flex">
                  <span className={`w-8 select-none ${isDark ? 'text-slate-600' : 'text-gray-300'}`}>11</span>
                  <p>{'};'}</p>
                </div>
                <div className="flex">
                  <span className={`w-8 select-none ${isDark ? 'text-slate-600' : 'text-gray-300'}`}>12</span>
                  <div className="flex items-center mt-2 ml-1">
                    <span className={`w-2 h-4 animate-pulse inline-block ${isDark ? 'bg-blue-400' : 'bg-blue-600'}`}></span>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Decorative Floating Badges */}
            <motion.div 
              animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              whileHover={{ scale: 1.1 }}
              className={`absolute -right-8 top-16 p-4 rounded-2xl shadow-2xl backdrop-blur-xl border ${
                isDark ? 'bg-slate-800/80 border-slate-600 text-teal-400 shadow-teal-500/20' : 'bg-white/90 border-gray-100 text-teal-600 shadow-teal-500/10'
              }`}
            >
              <Code2 size={28} />
            </motion.div>
            
            <motion.div 
              animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              whileHover={{ scale: 1.1 }}
              className={`absolute -left-8 bottom-16 p-4 rounded-2xl shadow-2xl backdrop-blur-xl border ${
                isDark ? 'bg-slate-800/80 border-slate-600 text-indigo-400 shadow-indigo-500/20' : 'bg-white/90 border-gray-100 text-indigo-600 shadow-indigo-500/10'
              }`}
            >
              <Database size={28} />
            </motion.div>
          </motion.div>
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
