import { motion } from 'framer-motion';
import { Github, ExternalLink, Folder, Star } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Projects = () => {
  const { isDark } = useTheme();

  const projects = [
    {
      title: 'BookHive online book store',
      description: 'BookHive is an online bookstore that lets users browse and purchase a wide variety of books. Users can explore different genres, view detailed book descriptions, and discover bestsellers and new arrivals. With an easy-to-use interface and secure checkout, BookHive provides a seamless shopping experience for book lovers everywhere.',
      tech: ['React', 'Node.js', 'Express', 'MongoDB','JWT', 'Redux'],
      github: 'https://github.com/amresh91620/BookHive_online_book_store',
      external: 'https://book-hive-online-book-store.vercel.app/'
    },
    {
      title: 'Blog Web Application',
      description: 'A full-stack Blogging Website built with React.js, Express.js, and PostgreSQL. This project allows multiple users to create, update, and delete blogs with authentication and authorization. It also includes features like comments, categories, and an admin panel for managing users and blogs.',
      tech: ['React.js', 'Tailwind CSS', 'JavaScript', 'Node.js', 'Express.js','PostgreSQL'],
      github: 'https://github.com/amresh91620/BlogWebApplication',
      external: '#'
    },
    {
      title: 'Super Market Management System',
      description: 'A robust desktop application built to handle complex inventory management, billing operations, and sales tracking for retail environments. Includes secure employee login and detailed reporting.',
      tech: ['C# .NET', 'SQL Server', 'Windows Forms'],
      github: '#',
      live: '#'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 }
    }
  };

  return (
    <section id="projects" className="py-24 px-6 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className={`absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full blur-[120px] ${
          isDark ? 'bg-indigo-500/10' : 'bg-indigo-400/10'
        }`} />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
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
            <span className="gradient-text font-sans text-2xl md:text-3xl mr-0 md:mr-3">04.</span>
            Featured Projects
          </h2>
          <div className={`h-[2px] w-full flex-grow rounded-full ${
            isDark ? 'bg-slate-800' : 'bg-gray-200'
          }`}></div>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              variants={cardVariants}
              key={index}
              className={`rounded-2xl overflow-hidden group flex flex-col transition-[background-color,border-color,box-shadow] duration-300 ${
                isDark 
                  ? 'bg-slate-800/40 backdrop-blur-md border border-slate-700/50 hover:border-teal-500/50 hover:shadow-2xl hover:shadow-teal-500/10' 
                  : 'bg-white border border-gray-200 shadow-xl shadow-gray-200/50 hover:border-teal-400/50 hover:shadow-2xl hover:shadow-teal-500/10'
              }`}
            >
              <div className="p-8 flex flex-col h-full relative">
                {/* Header: Folder Icon and Links */}
                <div className="flex justify-between items-start mb-6">
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Folder size={40} strokeWidth={1.5} className={isDark ? 'text-teal-400' : 'text-teal-600'} />
                  </motion.div>
                  <div className="flex gap-3">
                    {project.github && project.github !== '#' && (
                      <a href={project.github} className={`transition-colors transform hover:scale-110 ${
                        isDark ? 'text-slate-400 hover:text-teal-400' : 'text-gray-500 hover:text-teal-600'
                      }`} target="_blank" rel="noopener noreferrer">
                        <Github size={22} />
                      </a>
                    )}
                    {(project.live || project.external) && (project.live !== '#' || project.external !== '#') && (
                      <a href={project.live || project.external} className={`transition-colors transform hover:scale-110 ${
                        isDark ? 'text-slate-400 hover:text-teal-400' : 'text-gray-500 hover:text-teal-600'
                      }`} target="_blank" rel="noopener noreferrer">
                        <ExternalLink size={22} />
                      </a>
                    )}
                  </div>
                </div>
                
                {/* Title */}
                <h3 className={`font-serif text-2xl font-bold mb-4 transition-colors ${
                  isDark ? 'text-white group-hover:text-teal-400' : 'text-gray-900 group-hover:text-teal-600'
                }`}>
                  {project.title}
                </h3>
                
                {/* Description */}
                <p className={`mb-8 leading-relaxed flex-grow text-[15px] ${
                  isDark ? 'text-slate-400' : 'text-gray-600'
                }`}>
                  {project.description}
                </p>
                
                {/* Tech Stack */}
                <div className={`flex flex-wrap gap-2 mt-auto pt-6 border-t transition-colors duration-300 ${isDark ? 'border-slate-700/50' : 'border-gray-200'}`}>
                  {project.tech.map((tech, i) => (
                    <span 
                      key={i} 
                      className={`text-xs font-mono px-3 py-1 rounded-full ${
                        isDark 
                          ? 'bg-slate-900/50 text-teal-400 border border-slate-700' 
                          : 'bg-teal-50 text-teal-700 border border-teal-100'
                      }`}
                    >
                      {tech}
                    </span>
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

export default Projects;
