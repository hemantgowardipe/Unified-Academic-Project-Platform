import { useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom";
import '../App.css'
const Landing = () => {
    const navigate = useNavigate();

    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [scrollY, setScrollY] = useState(0);
    const [activeStep, setActiveStep] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);

        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('scroll', handleScroll);

        // Auto-rotate steps
        const interval = setInterval(() => {
            setActiveStep((prev) => (prev + 1) % 4);
        }, 3000);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', handleScroll);
            clearInterval(interval);
        };
    }, []);

    const steps = [
        {
            number: "01",
            title: "Register or Login",
            description: "Students create their account and join the platform",
            icon: "👤"
        },
        {
            number: "02",
            title: "Create Projects",
            description: "Build and showcase your innovative projects",
            icon: "🚀"
        },
        {
            number: "03",
            title: "Monitor Progress",
            description: "Track development milestones in real-time",
            icon: "📊"
        },
        {
            number: "04",
            title: "View Git History",
            description: "Detailed version control and progress tracking",
            icon: "📝"
        }
    ];

    return (
        <div className={`landing-wrapper ${isLoaded ? 'loaded' : ''}`}>
            {/* Animated background */}
            <div className="animated-bg">
                <div
                    className="gradient-orb gradient-orb-1"
                    style={{
                        transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
                    }}
                ></div>
                <div
                    className="gradient-orb gradient-orb-2"
                    style={{
                        transform: `translate(${-mousePosition.x * 0.03}px, ${-mousePosition.y * 0.03}px)`
                    }}
                ></div>
                <div
                    className="gradient-orb gradient-orb-3"
                    style={{
                        transform: `translate(-50%, -50%) translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`
                    }}
                ></div>
                <div className="grid-overlay"></div>
                <div className="noise-overlay"></div>
            </div>

            {/* Floating particles */}
            <div className="particles">
                {[...Array(30)].map((_, i) => (
                    <div
                        key={i}
                        className={`particle particle-${i % 10}`}
                        style={{
                            animationDelay: `${i * 0.5}s`,
                            left: `${Math.random() * 100}%`
                        }}
                    ></div>
                ))}
            </div>

            {/* Navigation */}
            <nav className="nav-header">
                <div className="nav-container">
                    <div className="logo">
                        <span className="logo-text">Unified Academic</span>
                        <span className="logo-accent"> Projects Portal</span>
                    </div>
                    <div className="nav-links">
                        <a href="#features" className="nav-link">Features</a>
                        <a href="#how-it-works" className="nav-link">How it Works</a>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-container">
                    <div className="hero-content">
                        <div className="hero-badge">
                            <span className="badge-dot"></span>
                            <span>Live Now</span>
                        </div>

                        <h1 className="hero-title">
              <span className="title-line">
                <span className="title-word gradient-text">Revolutionize</span>
              </span>
                            <span className="title-line">
                <span className="title-word gradient-text">Academic</span>
                <span className="title-word gradient-text">Projects</span>
              </span>
                        </h1>

                        <p className="hero-description">
                            Revolutionizing college project management with centralized tracking, GitHub integration, and
                            comprehensive faculty oversight for academic excellence.
                        </p>

                        <div className="hero-cta">
                            <button
                                onClick={() => navigate('/student/auth')}
                                className="cta-button cta-primary"
                            >
                <span className="button-content">
                  <span className="button-text">Start as Student</span>
                  <span className="button-arrow">→</span>
                </span>
                                <div className="button-glow"></div>
                            </button>

                            <button
                                onClick={() => navigate('/admin/auth')}
                                className="cta-button cta-secondary"
                            >
                <span className="button-content">
                  <span className="button-text">Faculty Access</span>
                  <span className="button-arrow">→</span>
                </span>
                            </button>
                        </div>

                        <div className="hero-stats">
                            <div className="stat">
                                <div className="stat-number">28+</div>
                                <div className="stat-label">Active Projects</div>
                            </div>
                            <div className="stat-divider"></div>
                            <div className="stat">
                                <div className="stat-number">100+</div>
                                <div className="stat-label">Students</div>
                            </div>
                            <div className="stat-divider"></div>

                        </div>
                    </div>

                    <div className="hero-visual">
                        <div className="visual-container">
                            <div
                                className="floating-card card-1"
                                style={{
                                    transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`
                                }}
                            >
                                <div className="card-header">
                                    <div className="card-icon">📊</div>
                                    <div className="card-title">Progress Tracking</div>
                                </div>
                                <div className="progress-bars">
                                    <div className="progress-bar">
                                        <div className="progress-fill" style={{width: '75%'}}></div>
                                    </div>
                                    <div className="progress-bar">
                                        <div className="progress-fill" style={{width: '60%'}}></div>
                                    </div>
                                </div>
                            </div>

                            <div
                                className="floating-card card-2"
                                style={{
                                    transform: `translate(${-mousePosition.x * 0.02}px, ${-mousePosition.y * 0.02}px)`
                                }}
                            >
                                <div className="card-header">
                                    <div className="card-icon">🔄</div>
                                    <div className="card-title">Git Integration</div>
                                </div>
                                <div className="commit-list">
                                    <div className="commit">feat: Add authentication</div>
                                    <div className="commit">fix: Update dashboard</div>
                                </div>
                            </div>

                            <div
                                className="floating-card card-3"
                                style={{
                                    transform: `translate(${mousePosition.x * 0.015}px, ${mousePosition.y * 0.015}px)`
                                }}
                            >
                                <div className="card-header">
                                    <div className="card-icon">👥</div>
                                    <div className="card-title">Collaboration</div>
                                </div>
                                <div className="avatar-group">
                                    <div className="avatar"></div>
                                    <div className="avatar"></div>
                                    <div className="avatar"></div>
                                </div>
                            </div>

                            <div className="orbit-ring"></div>
                            <div className="orbit-ring orbit-ring-2"></div>
                        </div>
                    </div>
                </div>

                <div className="scroll-indicator">
                    <div className="scroll-dot"></div>
                </div>
            </section>

            {/* How it Works Section */}
            <section id="how-it-works" className="how-it-works">
                <div className="section-container">
                    <div className="section-header">
                        <div className="section-badge">How it Works</div>
                        <h2 className="gradient-text">
                            <span>Simple Process,</span>
                            <span className="gradient-text">Powerful Results</span>
                        </h2>
                    </div>

                    <div className="steps-container">
                        {steps.map((step, index) => (
                            <div
                                key={index}
                                className={`step-card ${activeStep === index ? 'active' : ''}`}
                                onMouseEnter={() => setActiveStep(index)}
                            >
                                <div className="step-number">{step.number}</div>
                                <div className="step-icon">{step.icon}</div>
                                <h3 className="step-title">{step.title}</h3>
                                <p className="step-description">{step.description}</p>
                                <div className="step-line"></div>
                            </div>
                        ))}
                    </div>

                    <div className="process-visual">
                        <div className="process-timeline">
                            <div
                                className="timeline-progress"
                                style={{width: `${(activeStep + 1) * 25}%`}}
                            ></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section id="features" className="features-section">
                <div className="features-container">
                    <div className="feature-card">
                        <div className="feature-icon">🎯</div>
                        <h3>Real-time Tracking</h3>
                        <p>Monitor project progress with live updates and analytics</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🔐</div>
                        <h3>Secure Platform</h3>
                        <p>Enterprise-grade security for all your academic projects</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🤝</div>
                        <h3>Easy Collaboration</h3>
                        <p>Work seamlessly with team members and faculty advisors</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Landing;