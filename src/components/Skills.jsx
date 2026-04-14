import { motion } from 'framer-motion';
import { Database, Server, Code, Layers, GitBranch } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { MOTION } from '../constants/motion';

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
      transition: MOTION.cardReveal
    }
  };

  return (
    <section id="skills" className="section-shell relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-1/2 left-1/4 w-96 h-96 rounded-full blur-[100px] ${
          isDark ? 'bg-rose-500/8' : 'bg-rose-400/12'
        }`} />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={MOTION.sectionReveal}
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
                transition: MOTION.hoverSpring
              }}
              style={{ perspective: 1000 }}
              className={`terminal-card terminal-card-hover relative rounded-2xl p-8 transition-colors duration-300 group overflow-hidden ${
                isDark 
                  ? 'text-slate-200' 
                  : 'text-gray-700'
              }`}
            >
              {/* Animated background glow on hover */}
              <div className={`absolute -inset-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10 ${
                isDark ? 'bg-linear-to-br from-rose-500/20 to-orange-500/20' : 'bg-linear-to-br from-rose-500/10 to-orange-500/10'
              }`} />
              
              <div className="relative z-10 w-full h-full flex flex-col">
                <motion.div 
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={MOTION.hoverSpring}
                  className={`terminal-icon-box mb-6 inline-flex p-4 rounded-xl shadow-inner ${
                    isDark ? 'text-amber-300' : 'text-rose-600'
                  }`}
                >
                  {category.icon}
                </motion.div>
                
                <h3 className={`font-serif text-2xl font-bold mb-6 transition-colors ${
                  isDark ? 'text-white group-hover:text-rose-300' : 'text-gray-900 group-hover:text-rose-600'
                }`}>
                  {category.title}
                </h3>
                
                <div className="flex flex-wrap gap-2 mt-auto">
                  {category.skills.map((skill, i) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.08 * i, duration: 0.24 }}
                      whileHover={{ scale: 1.08, backgroundColor: '#7a1c27', color: '#fff3e8' }}
                      className={`terminal-chip text-sm px-4 py-1.5 rounded-full transition-colors duration-300 cursor-default font-medium ${
                        isDark 
                          ? 'text-slate-200' 
                          : 'text-rose-800'
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
