import { motion } from 'framer-motion';
import { Database, Server, Code, Layers, GitBranch } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Skills = () => {
  const { isDark } = useTheme();

  const skillCategories = [
    {
      title: 'Frontend',
      icon: <Code size={32} />,
      skills: ['React.js', 'Next.js', 'JavaScript (ES6+)', 'TypeScript', 'HTML5/CSS3', 'Tailwind CSS', 'Redux', 'Framer Motion'],
      color: 'teal'
    },
    {
      title: 'Backend',
      icon: <Server size={32} />,
      skills: ['Node.js', 'Express.js', 'RESTful APIs', 'JWT Authentication', 'Socket.io'],
      color: 'blue'
    },
    {
      title: 'Database',
      icon: <Database size={32} />,
      skills: ['MongoDB', 'Mongoose', 'PostgreSQL', 'MySQL', 'Firebase'],
      color: 'indigo'
    },
    {
      title: 'DevOps & Tools',
      icon: <GitBranch size={32} />,
      skills: ['Git/GitHub', 'AWS', 'Vercel'],
      color: 'purple'
    },
    {
      title: 'Architecture',
      icon: <Layers size={32} />,
      skills: ['MVC Pattern', 'REST Architecture', 'Microservices', 'Serverless', 'Clean Code', 'Agile/Scrum'],
      color: 'pink'
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 12 }
    }
  };

  return (
    <section id="skills" className="py-24 px-6 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-1/2 left-1/4 w-96 h-96 rounded-full blur-[100px] ${
          isDark ? 'bg-teal-500/5' : 'bg-teal-400/10'
        }`} />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, type: "spring" }}
          className="mb-16"
        >
          <div className="ansi-header">
            <span className="ansi-header-tag">[02]</span>
            <h2 className="ansi-header-title text-4xl md:text-5xl font-serif font-bold whitespace-nowrap">
              SKILLS_MATRIX.ANSI
            </h2>
          </div>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              variants={cardVariants}
              whileHover={{ 
                y: -10, 
                scale: 1.03,
                rotateX: 2,
                rotateY: -2,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
              style={{ perspective: 1000 }}
              className={`relative rounded-2xl p-8 transition-colors duration-300 group overflow-hidden ${
                isDark 
                  ? 'bg-slate-800/40 backdrop-blur-md border border-slate-700/50 hover:bg-slate-800/80 hover:border-teal-500/50 shadow-lg' 
                  : 'bg-white border border-gray-200 hover:border-teal-400/50 shadow-xl shadow-gray-200/50'
              }`}
            >
              {/* Animated background glow on hover */}
              <div className={`absolute -inset-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10 ${
                isDark ? 'bg-linear-to-br from-teal-500/20 to-blue-500/20' : 'bg-linear-to-br from-teal-500/10 to-blue-500/10'
              }`} />
              
              <div className="relative z-10 w-full h-full flex flex-col">
                <motion.div 
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.8, type: "spring" }}
                  className={`mb-6 inline-flex p-4 rounded-xl shadow-inner ${
                    isDark ? 'bg-slate-900/80 text-teal-400' : 'bg-teal-50 text-teal-600'
                  }`}
                >
                  {category.icon}
                </motion.div>
                
                <h3 className={`font-serif text-2xl font-bold mb-6 transition-colors ${
                  isDark ? 'text-white group-hover:text-teal-400' : 'text-gray-900 group-hover:text-teal-600'
                }`}>
                  {category.title}
                </h3>
                
                <div className="flex flex-wrap gap-2 mt-auto">
                  {category.skills.map((skill, i) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 * i, duration: 0.3 }}
                      whileHover={{ scale: 1.1, backgroundColor: isDark ? '#14b8a6' : '#0d9488', color: '#fff' }}
                      className={`text-sm px-4 py-1.5 rounded-full transition-colors duration-300 cursor-default font-medium ${
                        isDark 
                          ? 'bg-slate-900/80 border border-slate-700 text-slate-300' 
                          : 'bg-gray-50 border border-gray-200 text-gray-600'
                      }`}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
