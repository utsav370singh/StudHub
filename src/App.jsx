/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { 
  FaBolt, FaHandshake, FaMoneyBillWave, FaUserGraduate, 
  FaLinkedin, FaGithub, FaEnvelope, FaWhatsapp, FaPhone, 
  FaInstagram, FaCode, FaMobile, FaPalette, FaRocket 
} from "react-icons/fa";

const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const form = useRef();
  const canvasRef = useRef(null);

  // 3D Particle Background Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = isDarkMode ? 
          `hsl(${Math.random() * 60 + 200}, 70%, ${Math.random() * 30 + 50}%)` :
          `hsl(${Math.random() * 60 + 200}, 70%, ${Math.random() * 30 + 30}%)`;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        else if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        else if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();

        // Glow effect
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;
      }
    }

    const createParticles = () => {
      particles = [];
      const particleCount = Math.min(100, Math.floor((canvas.width * canvas.height) / 15000));
      
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const connectParticles = () => {
      const maxDistance = 150;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            const opacity = 1 - (distance / maxDistance);
            ctx.strokeStyle = isDarkMode ? 
              `rgba(100, 150, 255, ${opacity * 0.3})` :
              `rgba(70, 130, 255, ${opacity * 0.2})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      connectParticles();
      animationFrameId = requestAnimationFrame(animate);
    };

    const init = () => {
      resizeCanvas();
      createParticles();
      animate();
    };

    // Mouse interaction
    const handleMouseMove = (e) => {
      if (particles.length > 0) {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        particles.forEach(particle => {
          const dx = mouseX - particle.x;
          const dy = mouseY - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            const force = (100 - distance) / 100;
            particle.x -= dx * force * 0.02;
            particle.y -= dy * force * 0.02;
          }
        });
      }
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    init();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isDarkMode]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 100) {
          setActiveSection(section.id);
        }
      });
    };

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const projectsData = [
    {
      id: 1,
      title: "Portfolio Website",
      description: "A sleek and responsive personal portfolio site built to showcase projects, skills, and achievements.",
      technologies: ["React", "Tailwind CSS", "EmailJS"],
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1171&q=80",
      url: "https://sumangoswami.vercel.app/"
    },
    {
      id: 2,
      title: "Music Listening Platform",
      description: "A modern web app for streaming and discovering music with smooth, student-friendly listening experience.",
      technologies: ["HTML5", "CSS3", "JavaScript"],
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
      url: "https://beats-snowy.vercel.app/"
    },
    {
      id: 3,
      title: "Mental Health Care Platform",
      description: "A student-friendly mental wellness platform focused on awareness and support with interactive modules.",
      technologies: ["HTML5", "CSS3", "JavaScript"],
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
      url: "https://vdhur.netlify.app/"
    },
    {
      id: 4,
      title: "MyRupaya Chatbot",
      description: "AI-powered financial chatbot that helps users find the best credit cards based on their lifestyle.",
      technologies: ["React Native", "Firebase", "AI"],
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
      url: "https://myrupaya-ai.vercel.app/"
    }
  ];

  const technologiesData = [
    { name: "HTML", icon: "🟧", level: 95 },
    { name: "CSS", icon: "🎨", level: 90 },
    { name: "JavaScript", icon: "📜", level: 88 },
    { name: "React", icon: "⚛️", level: 85 },
    { name: "React Native", icon: "📱", level: 80 },
    { name: "Node.js", icon: "🟢", level: 82 },
    { name: "Python", icon: "🐍", level: 85 },
    { name: "Java", icon: "☕", level: 78 },
    { name: "C++", icon: "🔷", level: 75 },
    { name: "MongoDB", icon: "🍃", level: 80 },
    { name: "MySQL", icon: "🐬", level: 75 },
    { name: "Firebase", icon: "🔥", level: 78 }
  ];

  const servicesData = [
    {
      icon: FaCode,
      title: "Web Development",
      description: "Responsive websites and web applications tailored for students and college projects."
    },
    {
      icon: FaMobile,
      title: "Mobile Apps",
      description: "Cross-platform mobile applications using React Native for iOS and Android."
    },
    {
      icon: FaPalette,
      title: "UI/UX Design",
      description: "Beautiful and intuitive designs that enhance user experience and engagement."
    },
    {
      icon: FaRocket,
      title: "Project Deployment",
      description: "Complete deployment solutions with domain setup and hosting configuration."
    }
  ];

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm('service_pnr5uok', 'template_smpcie9', form.current, 'she8kcUPDszRB7iPb')
      .then((result) => {
          console.log(result.text);
          setIsSubmitted(true);
          form.current.reset();
          setTimeout(() => setIsSubmitted(false), 5000);
      }, (error) => {
          console.log(error.text);
      });
  };

  return (
    <div className="min-h-screen bg-transparent relative overflow-hidden">
      {/* 3D Interactive Background Canvas - Full Page */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full z-0"
        style={{ 
          background: isDarkMode 
            ? 'linear-gradient(125deg, #0f172a 0%, #1e293b 50%, #334155 100%)'
            : 'linear-gradient(125deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)'
        }}
      />

      {/* Content Container with Higher Z-index */}
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="fixed w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg z-50 shadow-lg">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-2">
                <img 
                  src="logo.png" 
                  alt="StudHub - Student Web Solutions"
                  className="w-20 h-20 object-contain rounded-lg"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80";
                  }}
                />
              </div>

              {/* Desktop Menu */}
              <div className="hidden md:flex items-center space-x-8">
                {['home', 'services', 'projects', 'technologies', 'about', 'contact'].map((item) => (
                  <a
                    key={item}
                    href={`#${item}`}
                    className={`font-medium transition-all duration-300 ${
                      activeSection === item
                        ? 'text-blue-600 dark:text-blue-400 scale-110'
                        : 'text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400'
                    }`}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </a>
                ))}
                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:scale-110 transition-transform"
                >
                  {isDarkMode ? '☀️' : '🌙'}
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
              <div className="md:hidden py-4 border-t dark:border-gray-700">
                <div className="flex flex-col space-y-4">
                  {['home', 'services', 'projects', 'technologies', 'about', 'contact'].map((item) => (
                    <a
                      key={item}
                      href={`#${item}`}
                      onClick={() => setIsMenuOpen(false)}
                      className={`font-medium px-4 py-2 rounded-lg transition-all ${
                        activeSection === item
                          ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Hero Section */}
        <section id="home" className="pt-20 pb-16 md:pt-28 md:pb-24 relative min-h-screen flex items-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 text-sm font-medium mb-6 backdrop-blur-sm">
                  <FaUserGraduate className="mr-2" />
                  Student-Friendly Web Solutions
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
                  <span className="block">Build Your</span>
                  <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent pb-2">
                    Digital Presence
                  </span>
                </h1>
                
                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed backdrop-blur-sm bg-white/10 dark:bg-black/10 p-4 rounded-lg">
                  Get custom websites and mobile apps designed specifically for college students. 
                  Affordable prices, fast delivery, and unlimited revisions until you're satisfied.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <a href="#projects" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-center backdrop-blur-sm">
                    View Projects
                  </a>
                  <a href="#contact" className="border-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 text-center backdrop-blur-sm">
                    Get Free Quote
                  </a>
                </div>

                <div className="mt-8 flex flex-wrap gap-6 justify-center lg:justify-start">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 backdrop-blur-sm bg-white/10 dark:bg-black/10 px-3 py-2 rounded-lg">
                    <FaBolt className="text-yellow-500 mr-2" />
                    Fast Delivery
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 backdrop-blur-sm bg-white/10 dark:bg-black/10 px-3 py-2 rounded-lg">
                    <FaMoneyBillWave className="text-green-500 mr-2" />
                    Budget Friendly
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 backdrop-blur-sm bg-white/10 dark:bg-black/10 px-3 py-2 rounded-lg">
                    <FaHandshake className="text-purple-500 mr-2" />
                    Student Discounts
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="relative z-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 shadow-2xl backdrop-blur-sm">
                  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                    <FaHandshake className="text-white text-6xl mx-auto mb-4" />
                    <h3 className="text-white text-xl font-semibold text-center mb-2">Let's Build Together!</h3>
                    <p className="text-blue-100 text-center">Custom solutions for your college projects and startups</p>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-yellow-400 rounded-full opacity-20 animate-pulse backdrop-blur-sm"></div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-purple-400 rounded-full opacity-20 animate-pulse delay-1000 backdrop-blur-sm"></div>
                <div className="absolute top-1/2 -right-8 w-16 h-16 bg-blue-300 rounded-full opacity-30 animate-bounce backdrop-blur-sm"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-16 relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                What We Offer
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto backdrop-blur-sm bg-white/10 dark:bg-black/10 p-4 rounded-lg">
                Comprehensive web and mobile solutions designed specifically for student needs and budgets
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {servicesData.map((service, index) => (
                <div key={index} className="group bg-white/10 dark:bg-gray-800/80 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-2 backdrop-blur-sm border border-white/20">
                  <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <service.icon className="text-white text-2xl" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-16 relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Featured Projects
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 backdrop-blur-sm bg-white/10 dark:bg-black/10 p-4 rounded-lg max-w-2xl mx-auto">
                Check out some of my work designed specifically for students
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
              {projectsData.map((project) => (
                <div key={project.id} className="group bg-white/10 dark:bg-gray-800/80 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden backdrop-blur-sm border border-white/20">
                  <div className="relative overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <button 
                        onClick={() => window.open(project.url, "_blank")}
                        className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                      >
                        View Live Demo
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full text-sm backdrop-blur-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technologies Section */}
        <section id="technologies" className="py-16 relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Technologies We Use
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 backdrop-blur-sm bg-white/10 dark:bg-black/10 p-4 rounded-lg max-w-2xl mx-auto">
                Modern technologies to build fast, responsive, and scalable applications
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
              {technologiesData.map((tech, index) => (
                <div key={index} className="bg-white/10 dark:bg-gray-700/80 rounded-xl p-4 text-center group hover:shadow-lg transition-all duration-300 backdrop-blur-sm border border-white/20">
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                    {tech.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {tech.name}
                  </h3>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${tech.level}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-300 mt-1 block">
                    {tech.level}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  About StudHub
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 backdrop-blur-sm bg-white/10 dark:bg-black/10 p-4 rounded-lg">
                  We are developers who specializes in creating affordable digital solutions for students. 
                  We understand the budget constraints that students face, which is why we offer competitive 
                  pricing without compromising on quality.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 backdrop-blur-sm bg-white/10 dark:bg-black/10 p-4 rounded-lg">
                  Whether you need a website for your student organization, a portfolio for yourself, 
                  or a custom web application for a project, We can help bring your ideas to life.
                </p>

                <div className="grid sm:grid-cols-3 gap-6">
                  <div className="text-center backdrop-blur-sm bg-white/10 dark:bg-black/10 p-4 rounded-lg border border-white/20">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-3">
                      <FaBolt className="text-blue-600 dark:text-blue-400 text-xl" />
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Fast Delivery</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Quick turnaround</p>
                  </div>
                  <div className="text-center backdrop-blur-sm bg-white/10 dark:bg-black/10 p-4 rounded-lg border border-white/20">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-3">
                      <FaMoneyBillWave className="text-green-600 dark:text-green-400 text-xl" />
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Budget Friendly</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Student discounts</p>
                  </div>
                  <div className="text-center backdrop-blur-sm bg-white/10 dark:bg-black/10 p-4 rounded-lg border border-white/20">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-3">
                      <FaHandshake className="text-purple-600 dark:text-purple-400 text-xl" />
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Direct Support</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Unlimited revisions</p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="bg-white/10 dark:bg-gray-800/80 rounded-2xl p-8 shadow-xl backdrop-blur-sm border border-white/20">
                  <img 
                    src="logo.png" 
                    alt="StudHub - Student Web Solutions"
                    className="w-full h-64 object-contain rounded-lg"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80";
                    }}
                  />
                  <div className="mt-6 text-center">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      Let's Work Together!
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Get your project started today with a free consultation
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Get In Touch
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 backdrop-blur-sm bg-white/10 dark:bg-black/10 p-4 rounded-lg max-w-2xl mx-auto">
                Let's discuss your project and find a solution that fits your budget
              </p>
            </div>

            {/* Contact Methods */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {/* Email */}
              <div className="bg-white/10 dark:bg-gray-800/80 rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 backdrop-blur-sm">
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaEnvelope className="text-red-600 dark:text-red-400 text-2xl" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Email</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">Send me a detailed message</p>
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=studhub22@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full font-medium transition-colors duration-300"
                >
                  Email Now
                </a>
              </div>

              {/* WhatsApp */}
              <div className="bg-white/10 dark:bg-gray-800/80 rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 backdrop-blur-sm">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaWhatsapp className="text-green-600 dark:text-green-400 text-2xl" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">WhatsApp</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">Chat with me directly</p>
                <a
                  href="https://wa.me/919079956406"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full font-medium transition-colors duration-300"
                >
                  Message Now
                </a>
              </div>

              {/* Call */}
              <div className="bg-white/10 dark:bg-gray-800/80 rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 backdrop-blur-sm">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaPhone className="text-blue-600 dark:text-blue-400 text-2xl" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Call</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">Let's talk about your project</p>
                <a
                  href="tel:+919079956406"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-medium transition-colors duration-300"
                >
                  Call Now
                </a>
              </div>

              {/* Instagram */}
              <div className="bg-white/10 dark:bg-gray-800/80 rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 backdrop-blur-sm">
                <div className="w-16 h-16 bg-pink-100 dark:bg-pink-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaInstagram className="text-pink-600 dark:text-pink-400 text-2xl" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Instagram</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">DM me for quick responses</p>
                <a
                  href="https://www.instagram.com/direct/t/17843001501580857/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-full font-medium transition-colors duration-300"
                >
                  DM Now
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="max-w-2xl mx-auto bg-white/10 dark:bg-gray-700/80 rounded-2xl p-8 shadow-lg backdrop-blur-sm border border-white/20">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                Send a Direct Message
              </h3>
              
              {isSubmitted ? (
                <div className="bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-600 text-green-700 dark:text-green-300 px-4 py-3 rounded-lg text-center">
                  <p className="font-semibold">✅ Thank you for your message!</p>
                  <p>I'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form ref={form} onSubmit={sendEmail} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Your Name
                      </label>
                      <input 
                        type="text" 
                        name="user_name"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                        placeholder="Enter your name"
                        required 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Your Email
                      </label>
                      <input 
                        type="email" 
                        name="user_email"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                        placeholder="Enter your email"
                        required 
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      College/University
                    </label>
                    <input 
                      type="text" 
                      name="college"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                      placeholder="Where do you study?"
                      required 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Project Details
                    </label>
                    <textarea 
                      name="message"
                      rows="4"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                      placeholder="Tell me about your project requirements..."
                      required
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 backdrop-blur-sm"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900/80 text-white py-12 backdrop-blur-lg relative border-t border-white/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <img 
                    src="logo.png" 
                    alt="StudHub - Student Web Solutions"
                    className="w-28 h-28 object-contain rounded-lg"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80";
                    }}
                  />
                </div>
                <p className="text-gray-400">
                  Creating affordable digital solutions for students worldwide.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-gray-400">
                  {['home', 'services', 'projects', 'about', 'contact'].map((item) => (
                    <li key={item}>
                      <a href={`#${item}`} className="hover:text-white transition-colors">
                        {item.charAt(0).toUpperCase() + item.slice(1)}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Services</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>Web Development</li>
                  <li>Mobile Apps</li>
                  <li>UI/UX Design</li>
                  <li>Project Deployment</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Connect</h4>
                <div className="flex space-x-4">
                  <a href="https://www.linkedin.com/in/utsavsingh265" className="text-gray-400 hover:text-white transition-colors">
                    <FaLinkedin size={40} />
                  </a>
                  <a href="https://github.com/utsav370singh" className="text-gray-400 hover:text-white transition-colors">
                    <FaGithub size={40} />
                  </a>
                  <a href="https://www.instagram.com/studhub22" className="text-gray-400 hover:text-white transition-colors">
                    <FaInstagram size={40} />
                  </a>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
              <p>&copy; {new Date().getFullYear()} StudHub. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;