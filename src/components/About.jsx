import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const About = () => {
  const { isDark } = useTheme();
  
  const skills = [
    'MongoDB', 'Express.js', 'React.js',
    'Node.js', 'Next.js', 'TypeScript',
    'PostgreSQL', 'Redux', 'Tailwind CSS', 'AWS'
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="about" className={`py-24 px-6 transition-colors duration-300 ${
      isDark ? 'bg-slate-900/50 text-slate-400' : 'bg-white text-gray-600'
    }`}>
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, type: "spring" }}
          className="flex items-center gap-4 mb-16"
        >
          <h2 className={`text-4xl md:text-5xl font-serif font-bold whitespace-nowrap ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            <span className="gradient-text font-sans text-2xl md:text-3xl mr-3">01.</span>
            About Me
          </h2>
          <div className={`h-[2px] w-full flex-grow rounded-full ${
            isDark ? 'bg-slate-800' : 'bg-gray-200'
          }`}></div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-16 items-center lg:items-start">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:w-3/5 space-y-6 text-lg leading-relaxed"
          >
            <motion.p variants={itemVariants}>
              Hello! I'm Amresh, a passionate Full Stack Developer who loves bringing ideas to life through code. 
              My journey in software development began with a strong curiosity to build dynamic web applications, 
              which quickly became my core expertise.
            </motion.p>
            <motion.p variants={itemVariants}>
              Today, I specialize in the MERN stack (MongoDB, Express, React, Node.js) along with SQL databases like PostgreSQL. 
              I take pride in architecting end-to-end solutions—from intuitive user interfaces like the <span className={`font-semibold ${isDark ? 'text-teal-400' : 'text-teal-600'}`}>BookHive</span> online bookstore,
              to robust backends and role-based systems like my <span className={`font-semibold ${isDark ? 'text-teal-400' : 'text-teal-600'}`}>Blog Web Application</span>.
            </motion.p>
            <motion.p variants={itemVariants}>
              Beyond web development, I also have experience building desktop solutions like a Super Market Management 
              System in C#. I believe in writing <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>clean, scalable, and maintainable code</span>, always aiming to create 
              seamless digital experiences.
            </motion.p>
            
            <motion.div variants={itemVariants} className="pt-4">
              <p className="mb-4 font-medium">Here are a few technologies I've been working with recently:</p>
              <ul className={`grid grid-cols-2 gap-x-4 gap-y-3 mt-4 text-sm font-medium ${
                isDark ? 'text-slate-300' : 'text-gray-700'
              }`}>
                {skills.map((skill, index) => (
                  <motion.li 
                    key={index} 
                    whileHover={{ x: 5, color: isDark ? '#2dd4bf' : '#0d9488' }}
                    className="flex items-center gap-2 cursor-default transition-colors"
                  >
                    <span className={isDark ? 'text-teal-400' : 'text-teal-600'}>▹</span> {skill}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, type: "spring" }}
            className="lg:w-2/5 flex justify-center mt-10 lg:mt-0"
          >
            <motion.div 
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative group w-72 h-72 md:w-80 md:h-80"
            >
              <div className={`absolute -inset-4 border-2 rounded-xl translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-300 ${
                isDark ? 'border-teal-500/50' : 'border-teal-600/50'
              }`}></div>
              <div className={`relative w-full h-full rounded-xl overflow-hidden ${
                isDark ? 'bg-teal-500/20' : 'bg-teal-600/20'
              }`}>
                <div className={`absolute inset-0 bg-gradient-to-t mix-blend-overlay z-10 transition-opacity duration-300 group-hover:opacity-0 ${
                  isDark ? 'from-teal-900/80 to-transparent' : 'from-teal-600/50 to-transparent'
                }`}></div>
                <img 
                  src="/Me.jpeg" 
                  alt="Profile" 
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
