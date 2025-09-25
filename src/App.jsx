/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect, useRef, useCallback } from 'react';
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
  const [isMobile, setIsMobile] = useState(false);
  const form = useRef();
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);

  // Detect device type and handle resize
  useEffect(() => {
    const checkDevice = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      // Force proper viewport scaling for desktop mode on phones
      const viewport = document.querySelector('meta[name="viewport"]');
      if (viewport && !mobile) {
        viewport.setAttribute('content', 'width=1200, initial-scale=0.5, maximum-scale=2.0, user-scalable=yes');
      }
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    return () => {
      window.removeEventListener('resize', checkDevice);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Optimized 3D Particle Background Effect
  const initParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1; // Reduced size for performance
        this.speedX = (Math.random() - 0.5) * 0.8; // Reduced speed
        this.speedY = (Math.random() - 0.5) * 0.8;
        this.color = isDarkMode ? 
          `hsl(${Math.random() * 60 + 200}, 70%, ${Math.random() * 30 + 50}%)` :
          `hsl(${Math.random() * 60 + 200}, 70%, ${Math.random() * 30 + 30}%)`;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Boundary check with bounce effect
        if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
        if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const createParticles = () => {
      particles = [];
      // Optimized particle count based on screen size and device type
      const baseCount = isMobile ? 30 : 60;
      const areaFactor = (canvas.width * canvas.height) / (1920 * 1080);
      const particleCount = Math.min(baseCount, Math.floor(baseCount * areaFactor));
      
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const connectParticles = () => {
      const maxDistance = isMobile ? 100 : 150;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            const opacity = 1 - (distance / maxDistance);
            ctx.strokeStyle = isDarkMode ? 
              `rgba(100, 150, 255, ${opacity * 0.2})` :
              `rgba(70, 130, 255, ${opacity * 0.1})`;
            ctx.lineWidth = 0.3;
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
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    const init = () => {
      resizeCanvas();
      createParticles();
      
      // Throttle animation for better performance
      setTimeout(() => {
        animate();
      }, isMobile ? 100 : 50);
    };

    // Optimized mouse interaction
    const handleMouseMove = (e) => {
      if (particles.length === 0) return;
      
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      let particleMoved = false;

      particles.forEach(particle => {
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 80) {
          const force = (80 - distance) / 80;
          particle.x -= dx * force * 0.01;
          particle.y -= dy * force * 0.01;
          particleMoved = true;
        }
      });

      // Only request new frame if particles moved
      if (particleMoved) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    // Throttled event listeners
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        resizeCanvas();
        createParticles();
      }, 250);
    };

    let mouseMoveTimeout;
    const throttledMouseMove = (e) => {
      clearTimeout(mouseMoveTimeout);
      mouseMoveTimeout = setTimeout(() => handleMouseMove(e), 16); // ~60fps
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', throttledMouseMove);
    init();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', throttledMouseMove);
      clearTimeout(resizeTimeout);
      clearTimeout(mouseMoveTimeout);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isDarkMode, isMobile]);

  useEffect(() => {
    initParticles();
  }, [initParticles]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      const scrollPosition = window.scrollY + 100;

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(section.id);
        }
      });
    };

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }

    // Throttled scroll handler
    let scrollTimeout;
    const throttledScroll = () => {
      if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
          handleScroll();
          scrollTimeout = null;
        }, 50);
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', throttledScroll);
      clearTimeout(scrollTimeout);
    };
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

  // Optimized project data
  const projectsData = [
    {
      id: 1,
      title: "Portfolio Website",
      description: "A sleek and responsive personal portfolio site built to showcase projects, skills, and achievements.",
      technologies: ["React", "Tailwind CSS", "EmailJS"],
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", // Reduced quality
      url: "https://sumangoswami.vercel.app/"
    },
    {
      id: 2,
      title: "Music Platform",
      description: "A modern web app for streaming and discovering music with smooth listening experience.",
      technologies: ["HTML5", "CSS3", "JavaScript"],
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      url: "https://beats-snowy.vercel.app/"
    },
    {
      id: 3,
      title: "Mental Health Platform",
      description: "A student-friendly mental wellness platform focused on awareness and support.",
      technologies: ["HTML5", "CSS3", "JavaScript"],
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      url: "https://vdhur.netlify.app/"
    },
    {
      id: 4,
      title: "MyRupaya Chatbot",
      description: "AI-powered financial chatbot that helps users find the best credit cards.",
      technologies: ["React Native", "Firebase", "AI"],
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
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

  // Optimized image loading
  const preloadImages = (urls) => {
    urls.forEach(url => {
      const img = new Image();
      img.src = url;
    });
  };

  useEffect(() => {
    const imageUrls = projectsData.map(project => project.image);
    preloadImages(imageUrls);
  }, []);

  return (
    <div className="min-h-screen bg-transparent relative overflow-hidden">
      {/* Viewport meta tag for proper desktop mode rendering */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
      
      {/* Optimized 3D Interactive Background Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full z-0"
        style={{ 
          background: isDarkMode 
            ? 'linear-gradient(125deg, #0f172a 0%, #1e293b 50%, #334155 100%)'
            : 'linear-gradient(125deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)'
        }}
      />

      {/* Content Container with Performance Optimizations */}
      <div className="relative z-10">
        {/* Optimized Navigation */}
        <nav className="fixed w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg z-50 shadow-lg border-b border-gray-200 dark:border-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-2">
                <img 
                  src="logo.png" 
                  alt="StudHub - Student Web Solutions"
                  className="w-16 h-16 md:w-20 md:h-20 object-contain rounded-lg"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80";
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
                  aria-label="Toggle dark mode"
                >
                  {isDarkMode ? '☀️' : '🌙'}
                </button>
              </div>

              {/* Mobile Menu Buttons - Right Side */}
              <div className="flex items-center space-x-2 md:hidden">
                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:scale-110 transition-transform"
                  aria-label="Toggle dark mode"
                >
                  {isDarkMode ? '☀️' : '🌙'}
                </button>
                
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
                  aria-label="Toggle menu"
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
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
              <div className="md:hidden py-4 border-t dark:border-gray-700 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg">
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

        {/* Hero Section with Optimized Layout */}
        <section id="home" className="pt-20 pb-16 md:pt-28 md:pb-24 relative min-h-screen flex items-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 text-sm font-medium mb-6 backdrop-blur-sm">
                  <FaUserGraduate className="mr-2" />
                  Student-Friendly Web Solutions
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
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

                <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
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

              <div className="relative mt-8 lg:mt-0">
                <div className="relative z-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 md:p-8 shadow-2xl backdrop-blur-sm">
                  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                    <FaHandshake className="text-white text-4xl md:text-6xl mx-auto mb-4" />
                    <h3 className="text-white text-lg md:text-xl font-semibold text-center mb-2">Let's Build Together!</h3>
                    <p className="text-blue-100 text-center text-sm md:text-base">Custom solutions for your college projects and startups</p>
                  </div>
                </div>
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

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {servicesData.map((service, index) => (
                <div key={index} className="group bg-white/10 dark:bg-gray-800/80 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-2 backdrop-blur-sm border border-white/20">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <service.icon className="text-white text-xl md:text-2xl" />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section with Optimized Images */}
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

            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              {projectsData.map((project) => (
                <div key={project.id} className="group bg-white/10 dark:bg-gray-800/80 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden backdrop-blur-sm border border-white/20">
                  <div className="relative overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <button 
                        onClick={() => window.open(project.url, "_blank")}
                        className="bg-white text-blue-600 px-4 py-2 md:px-6 md:py-2 rounded-full font-semibold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 text-sm md:text-base"
                      >
                        View Live Demo
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-4 md:p-6">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm md:text-base">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full text-xs md:text-sm backdrop-blur-sm">
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

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
              {technologiesData.map((tech, index) => (
                <div key={index} className="bg-white/10 dark:bg-gray-700/80 rounded-xl p-3 md:p-4 text-center group hover:shadow-lg transition-all duration-300 backdrop-blur-sm border border-white/20">
                  <div className="text-2xl md:text-3xl mb-2 group-hover:scale-110 transition-transform">
                    {tech.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm md:text-base">
                    {tech.name}
                  </h3>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${tech.level}%` }}
                    ></div>
                  </div>
                  <span className="text-xs md:text-sm text-gray-600 dark:text-gray-300 mt-1 block">
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
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
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

                <div className="grid sm:grid-cols-3 gap-4 md:gap-6">
                  <div className="text-center backdrop-blur-sm bg-white/10 dark:bg-black/10 p-4 rounded-lg border border-white/20">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-3">
                      <FaBolt className="text-blue-600 dark:text-blue-400 text-lg md:text-xl" />
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm md:text-base">Fast Delivery</h4>
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">Quick turnaround</p>
                  </div>
                  <div className="text-center backdrop-blur-sm bg-white/10 dark:bg-black/10 p-4 rounded-lg border border-white/20">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-3">
                      <FaMoneyBillWave className="text-green-600 dark:text-green-400 text-lg md:text-xl" />
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm md:text-base">Budget Friendly</h4>
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">Student discounts</p>
                  </div>
                  <div className="text-center backdrop-blur-sm bg-white/10 dark:bg-black/10 p-4 rounded-lg border border-white/20">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-3">
                      <FaHandshake className="text-purple-600 dark:text-purple-400 text-lg md:text-xl" />
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm md:text-base">Direct Support</h4>
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">Unlimited revisions</p>
                  </div>
                </div>
              </div>

              <div className="relative mt-8 lg:mt-0">
                <div className="bg-white/10 dark:bg-gray-800/80 rounded-2xl p-6 md:p-8 shadow-xl backdrop-blur-sm border border-white/20">
                  <img 
                    src="logo.png" 
                    alt="StudHub - Student Web Solutions"
                    className="w-full h-48 md:h-64 object-contain rounded-lg"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80";
                    }}
                  />
                  <div className="mt-4 md:mt-6 text-center">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-2">
                      Let's Work Together!
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
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
        <footer className="bg-gray-900/95 text-white py-8 md:py-12 backdrop-blur-lg relative border-t border-white/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid md:grid-cols-4 gap-6 md:gap-8 mb-6 md:mb-8">
              <div>
                <div className="flex items-center space-x-2 mb-3 md:mb-4">
                  <img 
                    src="logo.png" 
                    alt="StudHub - Student Web Solutions"
                    className="w-16 h-16 md:w-28 md:h-28 object-contain rounded-lg"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80";
                    }}
                  />
                </div>
                <p className="text-gray-400 text-sm md:text-base">
                  Creating affordable digital solutions for students worldwide.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3 md:mb-4 text-base md:text-lg">Quick Links</h4>
                <ul className="space-y-2 text-gray-400">
                  {['home', 'services', 'projects', 'about', 'contact'].map((item) => (
                    <li key={item}>
                      <a href={`#${item}`} className="hover:text-white transition-colors text-sm md:text-base">
                        {item.charAt(0).toUpperCase() + item.slice(1)}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3 md:mb-4 text-base md:text-lg">Services</h4>
                <ul className="space-y-2 text-gray-400">
                  <li className="text-sm md:text-base">Web Development</li>
                  <li className="text-sm md:text-base">Mobile Apps</li>
                  <li className="text-sm md:text-base">UI/UX Design</li>
                  <li className="text-sm md:text-base">Project Deployment</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3 md:mb-4 text-base md:text-lg">Connect</h4>
                <div className="flex space-x-3 md:space-x-4">
                  <a href="https://www.linkedin.com/in/utsavsingh265" className="text-gray-400 hover:text-white transition-colors">
                    <FaLinkedin size={isMobile ? 24 : 40} />
                  </a>
                  <a href="https://github.com/utsav370singh" className="text-gray-400 hover:text-white transition-colors">
                    <FaGithub size={isMobile ? 24 : 40} />
                  </a>
                  <a href="https://www.instagram.com/studhub22" className="text-gray-400 hover:text-white transition-colors">
                    <FaInstagram size={isMobile ? 24 : 40} />
                  </a>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-800 pt-4 md:pt-8 text-center text-gray-400">
              <p className="text-sm md:text-base">&copy; {new Date().getFullYear()} StudHub. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;