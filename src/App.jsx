/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { FaBolt, FaHandshake, FaMoneyBillWave, FaUserGraduate, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import './App.css';

const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const form = useRef();

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

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.body.classList.add('dark-mode');
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  };

  const projectsData = [
  {
    id: 1,
    title: "Portfolio Website",
    description: "A sleek and responsive personal portfolio site built to showcase projects, skills, and achievements. Features smooth animations, email integration via EmailJS, and a modern UI tailored for students and professionals.",
    technologies: "React, EmailJs",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
    url: "https://sumangoswami.vercel.app/"
  },
  {
  id: 2,
  title: "Music Listening Platform",
  description: "A modern web app for streaming and discovering music. Built with HTML, CSS and JavaScript, it allows users to explore tracks, create playlists, and enjoy a smooth, student-friendly listening experience with a responsive design.",
  technologies: "HTML5, CSS3, JavaScript",
  image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwa90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  url: "https://beats-snowy.vercel.app/"
  },
  {
    id: 3,
    title: "Mental Health Care Platform",
    description: "A student-friendly mental wellness platform focused on awareness and support. Provides interactive modules, self-help resources, and engaging UI elements built with HTML, CSS, and JavaScript for accessibility and impact.",
    technologies: "HTML5, CSS3, JavaScript",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    url: "https://vdhur.netlify.app/"
  },
  {
    id: 4,
    title: "MyRupaya Chatbot",
    description: "An AI-powered financial chatbot that helps users find the best credit cards based on their lifestyle. Built with React Native and Firebase, it provides real-time recommendations, secure login, and an engaging mobile experience.",
    technologies: "React Native, Expo, Firebase",
    image: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
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
    <div className={`App ${isDarkMode ? 'dark-mode' : ''}`}>
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <span className="logo-icon"></span>
            <span>StudHub</span>
          </div>
          <ul className="nav-menu">
            <li className="nav-item">
              <a 
                href="#home" 
                className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}
                onClick={() => setActiveSection('home')}
              >
                Home
              </a>
            </li>
            <li className="nav-item">
              <a 
                href="#projects" 
                className={`nav-link ${activeSection === 'projects' ? 'active' : ''}`}
                onClick={() => setActiveSection('projects')}
              >
                Projects
              </a>
            </li>
            <li className="nav-item">
              <a 
                href="#technologies" 
                className={`nav-link ${activeSection === 'technologies' ? 'active' : ''}`}
                onClick={() => setActiveSection('technologies')}
              >
                Technologies
              </a>
            </li>
            <li className="nav-item">
              <a 
                href="#about" 
                className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
                onClick={() => setActiveSection('about')}
              >
                About
              </a>
            </li>
            <li className="nav-item">
              <a 
                href="#contact" 
                className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
                onClick={() => setActiveSection('contact')}
              >
                Contact
              </a>
            </li>
            <li className="nav-item">
              <button className="theme-toggle" onClick={toggleDarkMode}>
                {isDarkMode ? '☀️' : '🌙'}
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section with Improved Visual */}
      <section id="home" className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="title-word title-word-1">StudHub</span>
            <span className="title-word title-word-2">Web Solutions</span>
            <span className="title-word title-word-3">For Students</span>
          </h1>
          <p className="hero-description">Get custom websites and apps designed specifically for your college needs at student-friendly prices!</p>
          <div className="hero-buttons">
            <a href="#projects" className="btn btn-primary">View Projects</a>
            <a href="#contact" className="btn btn-secondary">Get Quote</a>
          </div>
        </div>
       <div className="hero-visual">
  <div className="main-visual">
    <div className="visual-element">
      <div className="circle circle-1"></div>
      <div className="circle circle-2"></div>
      <div className="circle circle-3"></div>
      <div className="central-icon"><FaHandshake size={80} color="#FFFFFF" /></div>
    </div>
  </div>
  <div className="floating-card card-1">
    <FaBolt size={20} style={{ marginRight: "8px" }} /> Fast Delivery
  </div>
  <div className="floating-card card-2">
    <FaMoneyBillWave size={20} style={{ marginRight: "8px" }} /> Budget Friendly
  </div>
  <div className="floating-card card-3">
    <FaUserGraduate size={20} style={{ marginRight: "8px" }} /> Student Discounts
  </div>
</div>

      </section>

      {/* Projects Section */}
      <section id="projects" className="projects">
        <div className="container">
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">Check out some of my work designed specifically for students</p>
          
          <div className="projects-grid">
            {projectsData.map(project => (
              <div key={project.id} className="project-card">
                <div className="project-image">
                  <img src={project.image} alt={project.title} />
                  <div className="project-overlay">
                    <button className="project-btn" onClick={() => window.open(project.url, "_blank")}>View Details</button>
                  </div>
                </div>
                <div className="project-info">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="technologies">
                    <span>{project.technologies}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section id="technologies" className="technologies">
        <div className="container">
          <h2 className="section-title">Technologies I Work With</h2>
          <p className="section-subtitle">I use a wide range of technologies to build modern, responsive applications</p>
          
          <div className="technologies-grid">
            {technologiesData.map((tech, index) => (
              <div key={index} className="tech-card">
                <div className="tech-header">
                  <span className="tech-icon">{tech.icon}</span>
                  <h3>{tech.name}</h3>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${tech.level}%` }}
                  ></div>
                </div>
                <span className="tech-level">{tech.level}%</span>
              </div>
            ))}
          </div>
        </div>
      </section>

        <section id="about" className="about">
          <div className="container">
            <h2 className="section-title">About Us</h2>
            <div className="about-content">
          <div className="about-text">
            <p>We are developers who specialize in creating affordable digital solutions for students. We understand the budget constraints that students face, which is why we offer competitive pricing without compromising on quality.</p>
            <p>Whether you need a website for your student organization, a portfolio for yourself, or a custom web application for a project, We can help bring your ideas to life.</p>
            <div className="features">
              <div className="feature">
            <span className="feature-icon">💬</span>
            <h4>Direct Communication</h4>
            <p>Discuss your project directly with us</p>
              </div>
              <div className="feature">
            <span className="feature-icon">⚡</span>
            <h4>Fast Turnaround</h4>
            <p>Quick delivery for tight deadlines</p>
              </div>
              <div className="feature">
            <span className="feature-icon">🔄</span>
            <h4>Unlimited Revisions</h4>
            <p>Until you're completely satisfied</p>
              </div>
            </div>
          </div>
          <div className="about-image">
            <div className="image-frame">
              <img 
            src="logo.png" 
            alt="Developer logo with a friendly and approachable style, set against a clean background. The logo represents a focus on student-friendly digital solutions and conveys a welcoming and supportive atmosphere." 
              />
            </div>
          </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">Let's discuss your project and find a solution that fits your budget</p>
          
          <div className="contact-methods">
            <div className="contact-card">
              <div className="contact-icon">📧</div>
              <h3>Email</h3>
              <p>Send me a detailed message</p>
              <a href="mailto:utsav25singh@gmail.com" className="btn-contact">Email Now</a>
            </div>
            
            <div className="contact-card">
              <div className="contact-icon">💬</div>
              <h3>WhatsApp</h3>
              <p>Chat with us directly on WhatsApp</p>
              <a href="https://wa.me/9079956406" className="btn-contact" target="_blank" rel="noopener noreferrer">Message Now</a>
            </div>
            
            <div className="contact-card">
              <div className="contact-icon">📞</div>
              <h3>Call</h3>
              <p>Let's talk about your project on a Call</p>
              <a href="tel:+919079956406" className="btn-contact">Call Now</a>
            </div>
            
            <div className="contact-card">
              <div className="contact-icon">📱</div>
              <h3>Instagram</h3>
              <p>DM me for quick responses on Instagram</p>
              <a href="https://instagram.com/yourprofile" className="btn-contact" target="_blank" rel="noopener noreferrer">DM Now</a>
            </div>
          </div>

          <div className="contact-form">
            <h3>Send me a message directly</h3>
            {isSubmitted ? (
              <div className="success-message">
                <p>✅ Thank you for your message! I'll get back to you soon.</p>
              </div>
            ) : (
              <form ref={form} onSubmit={sendEmail}>
                <div className="form-group">
                  <input type="text" name="user_name" placeholder="Your Name" required />
                </div>
                <div className="form-group">
                  <input type="email" name="user_email" placeholder="Your Email" required />
                </div>
                <div className="form-group">
                  <input type="text" name="college" placeholder="Your College/University" required />
                </div>
                <div className="form-group">
                  <textarea name="message" placeholder="Tell me about your project" required></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Send Message</button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
  <div className="container">
    <div className="footer-content">
      
      <div className="footer-section">
        <h3>StudHub</h3>
        <p>Creating affordable digital solutions for students</p>
      </div>

      <div className="footer-section">
        <h4>Quick Links</h4>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#technologies">Technologies</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </div>

      <div className="footer-section">
        <h4>Connect With Me</h4>
        <div className="social-links">
          <a href="https://instagram.com/yourprofile" className="social-link">
            <FaInstagram size={24} />
          </a>
          <a href="https://linkedin.com/in/yourprofile" className="social-link">
            <FaLinkedin size={24} />
          </a>
          <a href="https://github.com/yourprofile" className="social-link">
            <FaGithub size={24} />
          </a>
        </div>
      </div>

    </div>
    <div className="footer-bottom">
      <p>&copy; {new Date().getFullYear()} StudHub. All rights reserved.</p>
    </div>
  </div>
</footer>
    </div>
  );
};

export default App;