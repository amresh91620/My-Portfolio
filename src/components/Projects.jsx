import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Folder, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { MOTION } from '../constants/motion';

const Projects = () => {
  const { isDark } = useTheme();
  const [activeProjectIndex, setActiveProjectIndex] = useState(null);

  const projects = [
    {
      title: 'BookHive online book store',
      description: 'BookHive is an online bookstore that lets users browse and purchase a wide variety of books. Users can explore different genres, view detailed book descriptions, and discover bestsellers and new arrivals. With an easy-to-use interface and secure checkout, BookHive provides a seamless shopping experience for book lovers everywhere.',
      tech: ['React', 'Node.js', 'Express', 'MongoDB','JWT', 'Redux'],
      github: 'https://github.com/amresh91620/BookHive_online_book_store',
      external: 'https://book-hive-online-book-store.vercel.app/',
      stack: {
        frontend: ['React', 'Redux', 'Tailwind CSS'],
        backend: ['Node.js', 'Express', 'JWT Auth'],
        database: ['MongoDB', 'Mongoose']
      },
      caseStudy: {
        problem: 'Users needed fast book discovery with secure checkout and persistent carts across sessions.',
        solution: 'Built a filterable catalog, JWT-based auth flow, and optimized API routes with lean payloads.',
        result: 'Improved browsing speed and reduced friction from browse-to-checkout for first-time users.'
      },
      features: ['Catalog filters', 'Secure auth', 'Checkout flow', 'Order history'],
      screenshots: ['Home feed view', 'Book details panel', 'Checkout summary']
    },
    {
      title: 'Blog Web Application',
      description: 'A full-stack Blogging Website built with React.js, Express.js, and PostgreSQL. This project allows multiple users to create, update, and delete blogs with authentication and authorization. It also includes features like comments, categories, and an admin panel for managing users and blogs.',
      tech: ['React.js', 'Tailwind CSS', 'JavaScript', 'Node.js', 'Express.js','PostgreSQL'],
      github: 'https://github.com/amresh91620/BlogWebApplication',
      external: '#',
      stack: {
        frontend: ['React.js', 'Context API', 'Tailwind CSS'],
        backend: ['Express.js', 'RBAC', 'REST APIs'],
        database: ['PostgreSQL']
      },
      caseStudy: {
        problem: 'Blog admins needed structured moderation while authors required smooth writing and publishing.',
        solution: 'Implemented role-based controls, separated author and admin flows, and added guarded endpoints.',
        result: 'Delivered cleaner content workflows with better moderation control and fewer unauthorized actions.'
      },
      features: ['Role-based access', 'Post editor', 'Comments', 'Admin moderation'],
      screenshots: ['Blog feed', 'Editor panel', 'Admin dashboard']
    },
    {
      title: 'Super Market Management System',
      description: 'A robust desktop application built to handle complex inventory management, billing operations, and sales tracking for retail environments. Includes secure employee login and detailed reporting.',
      tech: ['C# .NET', 'SQL Server', 'Windows Forms'],
      github: '#',
      live: '#',
      stack: {
        frontend: ['Windows Forms'],
        backend: ['.NET Application Layer'],
        database: ['SQL Server']
      },
      caseStudy: {
        problem: 'Retail operations needed reliable inventory and billing without manual reconciliation delays.',
        solution: 'Designed synchronized inventory modules with automated billing and report generation layers.',
        result: 'Reduced manual tracking overhead and improved day-end accuracy for sales and stock records.'
      },
      features: ['Inventory sync', 'Billing system', 'Employee login', 'Sales reports'],
      screenshots: ['Dashboard', 'Billing module', 'Reports view']
    }
  ];

  useEffect(() => {
    if (activeProjectIndex === null) return;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setActiveProjectIndex(null);
      }
      if (event.key === 'ArrowRight') {
        setActiveProjectIndex((prev) => (prev + 1) % projects.length);
      }
      if (event.key === 'ArrowLeft') {
        setActiveProjectIndex((prev) => (prev - 1 + projects.length) % projects.length);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [activeProjectIndex, projects.length]);

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
      transition: MOTION.cardReveal
    }
  };

  return (
    <section id="projects" className="section-shell relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className={`absolute top-1/4 right-1/4 w-150 h-150 rounded-full blur-[120px] ${
          isDark ? 'bg-rose-500/12' : 'bg-rose-400/12'
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
            <span className="ansi-header-tag">[04]</span>
            <h2 className="ansi-header-title text-4xl md:text-5xl font-serif font-bold whitespace-nowrap">
              PROJECT_ARCHIVE.DAT
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
          {projects.map((project, index) => (
            <motion.div
              variants={cardVariants}
              key={index}
              onClick={() => setActiveProjectIndex(index)}
              className={`terminal-card terminal-card-hover rounded-2xl overflow-hidden group flex flex-col transition-[background-color,border-color,box-shadow] duration-300 ${
                isDark 
                  ? 'text-slate-200' 
                  : 'text-gray-700'
              } cursor-pointer`}
            >
              <div className="p-8 flex flex-col h-full relative">
                {/* Header: Folder Icon and Links */}
                <div className="flex justify-between items-start mb-6">
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Folder size={40} strokeWidth={1.5} className={isDark ? 'text-rose-300' : 'text-rose-600'} />
                  </motion.div>
                  <div className="flex gap-3">
                    {project.github && project.github !== '#' && (
                      <a href={project.github} onClick={(event) => event.stopPropagation()} className={`transition-colors transform hover:scale-110 ${
                        isDark ? 'text-slate-400 hover:text-amber-300' : 'text-gray-500 hover:text-amber-600'
                      }`} target="_blank" rel="noopener noreferrer">
                        <Github size={22} />
                      </a>
                    )}
                    {(project.live || project.external) && (project.live !== '#' || project.external !== '#') && (
                      <a href={project.live || project.external} onClick={(event) => event.stopPropagation()} className={`transition-colors transform hover:scale-110 ${
                        isDark ? 'text-slate-400 hover:text-amber-300' : 'text-gray-500 hover:text-amber-600'
                      }`} target="_blank" rel="noopener noreferrer">
                        <ExternalLink size={22} />
                      </a>
                    )}
                  </div>
                </div>
                
                {/* Title */}
                <h3 className={`font-serif text-2xl font-bold mb-4 transition-colors ${
                  isDark ? 'text-white group-hover:text-rose-300' : 'text-gray-900 group-hover:text-rose-600'
                }`}>
                  {project.title}
                </h3>
                
                {/* Description */}
                <p className={`mb-8 leading-relaxed grow text-[15px] ${
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
                          ? 'bg-slate-900/50 text-amber-300 border border-slate-700' 
                          : 'bg-amber-50 text-amber-700 border border-amber-100'
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

      {activeProjectIndex !== null && (
        <div className="project-debug-overlay" role="dialog" aria-modal="true" aria-label="Project debug panel">
          <div className="project-debug-shell">
            <div className="project-debug-header">
              <div>
                <p className="project-debug-kicker">DEBUG PANEL</p>
                <h3 className="project-debug-title">{projects[activeProjectIndex].title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveProjectIndex(null)}
                className="project-debug-close"
                aria-label="Close debug panel"
              >
                <X size={18} />
              </button>
            </div>

            <div className="project-debug-body">
              <div className="project-debug-block">
                <h4>Stack</h4>
                <p><strong>Frontend:</strong> {projects[activeProjectIndex].stack.frontend.join(', ')}</p>
                <p><strong>Backend:</strong> {projects[activeProjectIndex].stack.backend.join(', ')}</p>
                <p><strong>Database:</strong> {projects[activeProjectIndex].stack.database.join(', ')}</p>
              </div>

              <div className="project-debug-block">
                <h4>Tech Tree</h4>
                <p>&gt; app.root</p>
                {projects[activeProjectIndex].tech.map((node) => (
                  <p key={node} className="project-tree-node">|- {node}</p>
                ))}
              </div>

              <div className="project-debug-block project-case-study">
                <h4>Problem / Solution / Result</h4>
                <p><strong>Problem:</strong> {projects[activeProjectIndex].caseStudy.problem}</p>
                <p><strong>Solution:</strong> {projects[activeProjectIndex].caseStudy.solution}</p>
                <p><strong>Result:</strong> {projects[activeProjectIndex].caseStudy.result}</p>
              </div>

              <div className="project-debug-block">
                <h4>Screenshots</h4>
                <div className="project-shot-grid">
                  {projects[activeProjectIndex].screenshots.map((shot) => (
                    <div key={shot} className="project-shot-card">
                      <div className="project-shot-screen">preview</div>
                      <p>{shot}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="project-debug-block">
                <h4>Links</h4>
                <div className="project-debug-links">
                  {projects[activeProjectIndex].github && projects[activeProjectIndex].github !== '#' && (
                    <a href={projects[activeProjectIndex].github} target="_blank" rel="noopener noreferrer">open github</a>
                  )}
                  {(projects[activeProjectIndex].live || projects[activeProjectIndex].external) &&
                    ((projects[activeProjectIndex].live || projects[activeProjectIndex].external) !== '#') && (
                      <a href={projects[activeProjectIndex].live || projects[activeProjectIndex].external} target="_blank" rel="noopener noreferrer">open live preview</a>
                  )}
                </div>
              </div>
            </div>

            <div className="project-debug-footer">
              <button type="button" onClick={() => setActiveProjectIndex((prev) => (prev - 1 + projects.length) % projects.length)}>
                <ChevronLeft size={16} /> prev
              </button>
              <span>{activeProjectIndex + 1} / {projects.length}</span>
              <button type="button" onClick={() => setActiveProjectIndex((prev) => (prev + 1) % projects.length)}>
                next <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
