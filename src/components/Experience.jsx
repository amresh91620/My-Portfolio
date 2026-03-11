import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Calendar } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Experience = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { isDark } = useTheme();

  const experiences = [
    {
      company: 'Technical core engineers (tecoreng), Ahmedabad ',
      position: 'Full Stack Developer intern',
      duration: 'Dec 2024 - Present',
      responsibilities: [
        'Developed and maintained web application features using React, Node.js, and REST APIs.',
        'Implemented frontend UI components and responsive layouts for better user experience.',
        'Worked with backend integration and database operations to manage application data.',
        'Collaborated with the development team using Git/GitHub for version control and project management.',
      ]
    },
  ];

  return (
    <section id="experience" className={`py-20 px-6 transition-colors duration-300 ${
      isDark ? 'bg-slate-900/30' : 'bg-gray-50'
    }`}>
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, type: "spring" }}
          className="flex items-center gap-4 mb-16"
        >
          <h2 className={`text-4xl md:text-5xl font-serif font-bold whitespace-nowrap flex items-center gap-3 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            <span className="gradient-text font-sans text-2xl md:text-3xl mr-0 md:mr-3">03.</span>
            Work Experience
          </h2>
          <div className={`h-[2px] w-full flex-grow rounded-full ${
            isDark ? 'bg-slate-800' : 'bg-gray-200'
          }`}></div>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8 lg:gap-16">
          {/* Company Tabs */}
          <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible min-w-[200px] pb-4 md:pb-0 relative z-10 selection-tabs">
            {experiences.map((exp, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-6 py-4 text-left whitespace-nowrap border-b-2 md:border-b-0 md:border-l-2 transition-all duration-300 relative ${
                  activeTab === index
                    ? isDark 
                      ? 'text-teal-400 font-medium' 
                      : 'text-teal-600 font-medium'
                    : isDark
                      ? 'border-slate-800 text-slate-500 hover:text-slate-300 hover:bg-slate-800/30'
                      : 'border-gray-200 text-gray-500 hover:text-gray-700 hover:bg-gray-100/50'
                }`}
              >
                {/* Animated active indicator */}
                {activeTab === index && (
                  <motion.div 
                    layoutId="activeTab"
                    className={`absolute bottom-0 md:bottom-auto md:left-0 md:top-0 h-[2px] w-full md:w-[2px] md:h-full ${
                      isDark ? 'bg-teal-500' : 'bg-teal-500'
                    }`}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                {/* Animated background glow */}
                {activeTab === index && (
                  <motion.div 
                    layoutId="activeTabBg"
                    className={`absolute inset-0 -z-10 ${
                      isDark ? 'bg-teal-500/10' : 'bg-teal-50'
                    }`}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{exp.company.split(',')[0]}</span>
              </button>
            ))}
          </div>

          {/* Experience Details */}
          <div className="flex-1 relative min-h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                <h3 className={`font-serif text-3xl font-bold mb-3 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {experiences[activeTab].position}
                </h3>
                
                <div className="flex flex-wrap gap-4 mb-8">
                  <p className={`flex items-center gap-2 font-medium ${
                    isDark ? 'text-teal-400' : 'text-teal-600'
                  }`}>
                    <Briefcase size={18} />
                    {experiences[activeTab].company}
                  </p>
                  <p className={`flex items-center gap-2 font-medium ${
                    isDark ? 'text-slate-400' : 'text-gray-500'
                  }`}>
                    <Calendar size={18} />
                    {experiences[activeTab].duration}
                  </p>
                </div>

                <ul className="space-y-4">
                  {experiences[activeTab].responsibilities.map((resp, idx) => (
                    <motion.li 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + (idx * 0.1) }}
                      key={idx} 
                      className={`flex gap-4 p-3 rounded-lg transition-colors ${
                        isDark ? 'text-slate-300 hover:bg-slate-800/50' : 'text-gray-600 hover:bg-white/60'
                      }`}
                    >
                      <span className={`mt-1 flex-shrink-0 ${
                        isDark ? 'text-teal-400' : 'text-teal-500'
                      }`}>▹</span>
                      <span className="leading-relaxed">{resp}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
