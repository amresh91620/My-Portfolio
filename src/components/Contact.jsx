import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Linkedin, Github } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Contact = () => {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      const subject = encodeURIComponent(`[Portfolio] ${formData.subject}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      );

      window.location.href = `mailto:amresh91620@gmail.com?subject=${subject}&body=${body}`;

      setSubmitStatus({
        type: 'success',
        message: 'Your mail draft is ready. Please click send in your email app.'
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      setSubmitStatus({
        type: 'error',
        message: 'Something went wrong. Please email me directly at amresh91620@gmail.com.'
      });
    }
  };

  const handleChange = (e) => {
    if (submitStatus.message) {
      setSubmitStatus({ type: '', message: '' });
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 50, damping: 15 }
    }
  };

  const contactMethods = [
    {
      icon: <Mail size={24} />,
      title: "Email",
      value: "amresh91620@gmail.com",
      link: "mailto:amresh91620@gmail.com"
    },
    {
      icon: <Phone size={24} />,
      title: "Phone",
      value: "+91 91232 33736",
      link: "tel:+919123233736"
    },
    {
      icon: <MapPin size={24} />,
      title: "Location",
      value: "Ahmedabad, India",
      link: null
    }
  ];

  return (
    <section id="contact" className={`py-24 px-6 relative overflow-hidden transition-colors duration-500 ${
      isDark ? 'bg-slate-950' : 'bg-gray-50'
    }`}>
      {/* Animated Hero-style background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className={`absolute top-1/3 -left-20 w-80 h-80 rounded-full blur-[100px] ${
            isDark ? 'bg-rose-500/10' : 'bg-rose-200/40'
          }`}
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 30, 0],
            y: [0, 50, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className={`absolute bottom-0 -right-20 w-96 h-96 rounded-full blur-[120px] ${
            isDark ? 'bg-orange-500/10' : 'bg-orange-200/40'
          }`}
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4],
            x: [0, -40, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="ansi-header">
            <span className="ansi-header-tag">[05]</span>
            <h2 className="ansi-header-title font-serif text-4xl md:text-6xl font-bold">
              CONTACT_TERMINAL.IO
            </h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Contact Details */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-10"
          >
            <div>
              <motion.h3 variants={itemVariants} className={`font-serif text-3xl font-bold mb-6 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Let's architect something <span className="gradient-text">amazing</span> together.
              </motion.h3>
              <motion.p variants={itemVariants} className={`text-lg leading-relaxed ${
                isDark ? 'text-slate-400' : 'text-gray-600'
              }`}>
                Whether you have a localized project or a global vision, I'm here to bring your digital dreams to life. 
                Full-stack expertise, delivered with care.
              </motion.p>
            </div>

            <div className="space-y-6">
              {contactMethods.map((method, idx) => (
                <motion.div 
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ x: 10, scale: 1.02 }}
                  className={`group flex items-start gap-5 p-6 rounded-2xl border transition-[background-color,border-color,box-shadow,transform] duration-300 ${
                    isDark 
                      ? 'bg-slate-900/50 border-white/5 hover:border-rose-500/50 hover:bg-slate-900/80 shadow-2xl' 
                      : 'bg-white border-gray-100 hover:border-rose-500/30 shadow-xl'
                  }`}
                >
                  <div className={`p-3 rounded-xl ${
                    isDark ? 'bg-slate-800 text-rose-300' : 'bg-rose-50 text-rose-600'
                  }`}>
                    {method.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-bold text-sm uppercase tracking-widest mb-1 opacity-60 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {method.title}
                    </h4>
                    {method.link ? (
                      <a href={method.link} className={`text-lg font-medium transition-colors break-all ${
                        isDark ? 'text-slate-200 hover:text-orange-300' : 'text-gray-700 hover:text-orange-600'
                      }`}>
                        {method.value}
                      </a>
                    ) : (
                      <p className={`text-lg font-medium ${isDark ? 'text-slate-200' : 'text-gray-700'}`}>
                        {method.value}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div variants={itemVariants} className="pt-8">
              <h4 className={`font-bold mb-6 text-sm uppercase tracking-widest opacity-60 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Digital Footprint
              </h4>
              <div className="flex gap-4">
                {[
                  { icon: <Github size={22} />, href: "https://github.com/amresh91620" },
                  { icon: <Linkedin size={22} />, href: "https://www.linkedin.com/in/amresh-kumar-gond-709b38259/" }
                ].map((social, idx) => (
                  <motion.a 
                    key={idx}
                    href={social.href}
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-4 rounded-xl border transition-[background-color,border-color,color,transform] ${
                      isDark 
                        ? 'bg-slate-900/50 border-white/5 text-slate-400 hover:text-rose-300 hover:border-rose-500/50' 
                        : 'bg-white border-gray-100 text-gray-500 hover:text-rose-600 hover:border-rose-500/30 shadow-lg'
                    }`}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: "spring" }}
            className={`lg:col-span-7 relative p-1 rounded-3xl group overflow-hidden ${
              isDark ? 'bg-white/5' : 'bg-black/5'
            }`}
          >
            {/* Animated border effect */}
            <div className="absolute inset-0 bg-linear-to-br from-rose-500 via-orange-500 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-sm"></div>
            
            <div className={`relative rounded-[22px] p-8 md:p-12 h-full ${
              isDark ? 'bg-slate-900' : 'bg-white'
            }`}>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label htmlFor="name" className={`text-sm font-bold uppercase tracking-widest opacity-60 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={`w-full bg-transparent border-b-2 py-3 focus:outline-none transition-[border-color] ${
                        isDark ? 'border-white/10 text-white focus:border-rose-500' : 'border-gray-200 text-gray-900 focus:border-rose-500'
                      }`}
                      placeholder="Enter your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className={`text-sm font-bold uppercase tracking-widest opacity-60 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={`w-full bg-transparent border-b-2 py-3 focus:outline-none transition-[border-color] ${
                        isDark ? 'border-white/10 text-white focus:border-rose-500' : 'border-gray-200 text-gray-900 focus:border-rose-500'
                      }`}
                      placeholder="name@email.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className={`text-sm font-bold uppercase tracking-widest opacity-60 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className={`w-full bg-transparent border-b-2 py-3 focus:outline-none transition-[border-color] ${
                      isDark ? 'border-white/10 text-white focus:border-rose-500' : 'border-gray-200 text-gray-900 focus:border-rose-500'
                    }`}
                    placeholder="Project Inquiry"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className={`text-sm font-bold uppercase tracking-widest opacity-60 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="4"
                    className={`w-full bg-transparent border-b-2 py-3 focus:outline-none transition-[border-color] resize-none ${
                      isDark ? 'border-white/10 text-white focus:border-rose-500' : 'border-gray-200 text-gray-900 focus:border-rose-500'
                    }`}
                    placeholder="Tell me about your amazing idea..."
                  ></textarea>
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-linear-to-r from-rose-500 to-orange-500 text-white font-bold py-5 rounded-2xl shadow-xl hover:shadow-rose-500/40 transition-[background-color,box-shadow,transform] duration-300 flex items-center justify-center gap-3 group"
                >
                  Send Message
                  <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </motion.button>

                {submitStatus.message && (
                  <p
                    aria-live="polite"
                    className={`text-sm text-center ${
                      submitStatus.type === 'success'
                        ? isDark
                          ? 'text-rose-300'
                          : 'text-rose-700'
                        : isDark
                          ? 'text-amber-300'
                          : 'text-amber-700'
                    }`}
                  >
                    {submitStatus.message}
                  </p>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
