import React from 'react';
import { href, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { SiReact, SiTailwindcss, SiDocker, SiMongodb, SiSpringboot, SiVercel, SiRender    } from "react-icons/si";
import CardNav from '../components/CardNav';
import logo from '../assets/react.svg';
import LogoLoop from '../components/LogoLoop';
import '../App.css';
const Landing = () => {
    const navigate = useNavigate();
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasLoaded, setHasLoaded] = useState(false);
    const { scrollY } = useScroll();

    // Smooth parallax effects
    const springConfig = { damping: 25, stiffness: 120 };
    const backgroundY = useSpring(useTransform(scrollY, [0, 2000], [0, -150]), springConfig);
    const heroY = useSpring(useTransform(scrollY, [0, 800], [0, -80]), springConfig);
    
    // Refs for intersection observer
    const heroRef = useRef(null);
    const accessRef = useRef(null);
    const timelineRef = useRef(null);
    const featuresRef = useRef(null);
    const devRef = useRef(null);

    const heroInView = useInView(heroRef, { once: true, margin: '-50px' });
    const accessInView = useInView(accessRef, { once: true, margin: '-100px' });
    const timelineInView = useInView(timelineRef, { once: true, margin: '-100px' });
    const featuresInView = useInView(featuresRef, { once: true, margin: '-100px' });
    const devInView = useInView(devRef, { once: true, margin: '-100px' });

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoaded(true);
            setHasLoaded(true);
        }, 1200);
        return () => clearTimeout(timer);
    }, []);

    // Optimized animation variants
    const fadeUp = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1]
            }
        }
    };

    const staggerContainer = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1
            }
        }
    };

// Logoloop items
const techLogos = [
    { node: <SiReact />, title: "React", href: "https://react.com/" },
  { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
  { node: <SiDocker />, title: "Docker", href: "https://www.docker.com/" },
  { node: <SiMongodb />, title: "MongoDB", href: "https://www.mongodb.com/" },
  { node: <SiSpringboot />, title: "SpringBoot", href: "https://spring.io/" },
  { node: <SiVercel />, title: "Vercel", href: "https://vercel.com/" },
  { node: <SiRender />, title: "Render", href: "https://render.com/" },
];

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }
};

// Navbar items
const items = [
    {
      label: "About",
      bgColor: "#0D0716",
      textColor: "#fff",
      links: [
        { label: "How it works", ariaLabel: "About Company", href: "#how-it-works", onClick: () => scrollToSection('how-it-works') },
        { label: "Features", ariaLabel: "About Careers", href: "#features", onClick: () => scrollToSection('features') }
      ]
    },
    {
      label: "Projects", 
      bgColor: "#170D27",
      textColor: "#fff",
      links: [
        { label: "Docs", ariaLabel: "Documentation", href: "/docs" }
        // { label: "Case Studies", ariaLabel: "Project Case Studies" }
      ]
    },
    // {
    //   label: "Contact",
    //   bgColor: "#271E37", 
    //   textColor: "#fff",
    //   links: [
    //     { label: "Email", ariaLabel: "Email us" },
    //     { label: "Twitter", ariaLabel: "Twitter" },
    //     { label: "LinkedIn", ariaLabel: "LinkedIn" }
    //   ]
    // }
  ];

const footerLinks = [
    { label: "How it works?", href: "#how-it-works" },
    { label: "Features", href: "#features" },
    { label: "Documentation", href: "/docs" },
    { label: "Support", href: "#support" }
];

    // Simplified background
    const Background = () => (
        <div className="fixed inset-0 -z-10 bg-gray-50">
            <motion.div
                className="absolute inset-0"
                style={{ y: backgroundY }}
            >
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-blue-50/20 to-gray-100" />
                
                <motion.div
                    className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-100/15 to-indigo-100/8 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                
                <motion.div
                    className="absolute -bottom-32 -left-32 w-80 h-80 bg-gradient-to-tr from-purple-100/10 to-pink-100/8 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.15, 1],
                        opacity: [0.2, 0.4, 0.2]
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 5
                    }}
                />
            </motion.div>
        </div>
    );

    // Gxuri-style loader
    const Loader = () => (
        <motion.div
            className="fixed inset-0 bg-white z-50 flex items-center justify-center"
            initial={{ opacity: 1 }}
            animate={{ 
                opacity: isLoaded ? 0 : 1,
                y: isLoaded ? -100 : 0
            }}
            transition={{ 
                duration: 0.8, 
                delay: isLoaded ? 0.2 : 0,
                ease: [0.4, 0.0, 0.2, 1]
            }}
            style={{ pointerEvents: isLoaded ? 'none' : 'auto' }}
        >
            <div className="text-center overflow-hidden">
                <div className="overflow-hidden">
                    <motion.div
                        className="text-gray-900 text-4xl md:text-5xl font-black mb-6 tracking-tight"
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ 
                            opacity: isLoaded ? 0 : 1, 
                            y: isLoaded ? -50 : 0 
                        }}
                        transition={{ 
                            duration: 0.8, 
                            delay: 0.1,
                            ease: [0.4, 0.0, 0.2, 1]
                        }}
                    >
                        PROJECT PORTAL
                    </motion.div>
                </div>

                <motion.div
                    className="w-16 h-0.5 bg-gray-900 mx-auto"
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ 
                        scaleX: isLoaded ? 0 : 1,
                        opacity: isLoaded ? 0 : 1
                    }}
                    transition={{ 
                        duration: 0.6, 
                        delay: 0.4,
                        ease: [0.4, 0.0, 0.2, 1]
                    }}
                />

                {/* Loading progress indicator */}
                <motion.div
                    className="mt-8 text-xs text-gray-500 font-mono tracking-wider"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isLoaded ? 0 : 1 }}
                    transition={{ duration: 0.4, delay: 0.6 }}
                >
                    LOADING...
                </motion.div>
            </div>
        </motion.div>
    );

    // Counter animation
    const AnimatedCounter = ({ value, suffix = '', duration = 2 }) => {
        const [count, setCount] = useState(0);

        useEffect(() => {
            const target = parseFloat(value);
            const increment = target / (duration * 60);
            let current = 0;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    setCount(target);
                    clearInterval(timer);
                } else {
                    setCount(current);
                }
            }, 1000 / 60);

            return () => clearInterval(timer);
        }, [value, duration]);

        return <span>{Math.floor(count)}{suffix}</span>;
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 overflow-x-hidden">
            {!hasLoaded && <Loader />}
            <Background />

            {/* Navigation */}
            <motion.nav
                initial={{ y: -60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: hasLoaded ? 0 : 1.5 }}
                className="fixed top-0 left-0 right-0 z-40 backdrop-blur-xl bg-white/80 border-b border-gray-200/50"
            >
                <CardNav
            logo={logo}
            logoAlt="Company Logo"
            items={items}
            baseColor="#fff"
            menuColor="#000"
            buttonBgColor="#111"
            buttonTextColor="#fff"
            ease="power3.out"
            />
            </motion.nav>

            <main className="relative z-10">
                {/* Hero Section */}
                <section
                    ref={heroRef}
                    className="min-h-screen flex items-center justify-center px-4 md:px-6 relative overflow-hidden"
                >
                    <div className="max-w-7xl mx-auto text-center w-full">
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: hasLoaded ? 0 : 1.6 }}
                            className="mb-8 md:mb-20"
                        >
                        </motion.div>

                        {/* Main Heading - Gxuri Style */}
                        <div className="mb-8 md:mb-12 overflow-hidden">
                            <motion.h1
                                initial={{ opacity: 0, y: 100 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ 
                                    duration: 1.2, 
                                    delay: hasLoaded ? 0.2 : 1.8,
                                    ease: [0.25, 0.1, 0.25, 1]
                                }}
                                className="text-4xl md:text-7xl lg:text-8xl xl:text-9xl font-black leading-[0.9] tracking-tighter text-gray-900"
                            >
                                FUTURE OF
                            </motion.h1>
                        </div>

                        <div className="mb-8 md:mb-12 overflow-hidden">
                            <motion.h1
                                initial={{ opacity: 0, y: 100 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ 
                                    duration: 1.2, 
                                    delay: hasLoaded ? 0.4 : 2.0,
                                    ease: [0.25, 0.1, 0.25, 1]
                                }}
                                className="text-4xl md:text-7xl lg:text-8xl xl:text-9xl font-black leading-[0.9] tracking-tighter text-gray-900"
                            >
                                PROJECT
                            </motion.h1>
                        </div>

                        <div className="mb-12 md:mb-16 overflow-hidden">
                            <motion.h1
                                initial={{ opacity: 0, y: 100 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ 
                                    duration: 1.2, 
                                    delay: hasLoaded ? 0.6 : 2.2,
                                    ease: [0.25, 0.1, 0.25, 1]
                                }}
                                className="text-4xl md:text-7xl lg:text-8xl xl:text-9xl font-black leading-[0.9] tracking-tighter text-gray-900"
                            >
                                MANAGEMENT
                            </motion.h1>
                        </div>

                        {/* Description */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ 
                                duration: 0.8, 
                                delay: hasLoaded ? 0.8 : 2.4,
                                ease: [0.25, 0.1, 0.25, 1]
                            }}
                            className="max-w-3xl mx-auto mb-10 md:mb-12"
                        >
                            <p className="text-lg md:text-xl lg:text-2xl text-gray-600 leading-relaxed font-light px-4">
                                We build project management platforms people can't help but use.
                                Transforming academic workflows with intelligent automation.
                            </p>
                        </motion.div>

                        {/* Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ 
                                duration: 0.8, 
                                delay: hasLoaded ? 1.0 : 2.6,
                                ease: [0.25, 0.1, 0.25, 1]
                            }}
                            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 md:mb-20 px-4"
                        >
                            <button
                                className="w-full sm:w-auto px-8 py-4 bg-gray-900 text-white rounded-xl font-semibold text-lg hover:bg-gray-800 transition-colors duration-200"
                                onClick={() => navigate('/student/auth')}
                            >
                                START FREE TRIAL
                            </button>
                            
                            <button
                                className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-gray-300 text-gray-900 rounded-xl font-semibold text-lg hover:border-gray-400 backdrop-blur-sm transition-colors duration-200"
                            >
                                WATCH DEMO
                            </button>
                        </motion.div>

                        {/* Stats */}
                    </div>
                </section>

                {/* Choose Portal Section */}
                <section
                    ref={accessRef}
                    className="min-h-screen flex items-center py-20 px-6 border-t border-gray-200"
                >
                    <motion.div
                        className="max-w-6xl mx-auto"
                        initial="hidden"
                        animate={accessInView ? "visible" : "hidden"}
                        variants={staggerContainer}
                    >
                        <motion.div
                            variants={fadeUp}
                            className="text-center mb-16"
                        >
                            <h2 className="text-5xl md:text-7xl font-black mb-6 text-gray-900 tracking-tight">
                                CHOOSE YOUR EXPERIENCE
                            </h2>
                            <div className="max-w-3xl mx-auto">
                                <p className="text-xl text-gray-600 leading-relaxed font-light">
                                    Tailored interfaces designed for optimal productivity in academic environments.
                                </p>
                            </div>
                        </motion.div>

                        <div className="grid md:grid-cols-2 gap-8">
                            {[
                                {
                                    title: 'STUDENT PORTAL',
                                    description: 'Comprehensive project management with real-time collaboration, intelligent analytics, and AI-powered insights.',
                                    features: ['Smart Dashboard', 'Real-time Collaboration', 'Progress Analytics', 'AI Recommendations'],
                                    path: '/student/auth',
                                    number: '01'
                                },
                                {
                                    title: 'FACULTY PORTAL',
                                    description: 'Advanced administrative platform with course management, comprehensive analytics, and automated evaluation.',
                                    features: ['Course Management', 'Advanced Analytics', 'Auto Grading', 'Student Insights'],
                                    path: '/admin/login',
                                    number: '02'
                                }
                            ].map((card, index) => (
                                <motion.div
                                    key={card.title}
                                    variants={fadeUp}
                                    className="group cursor-pointer"
                                    onClick={() => navigate(card.path)}
                                    whileHover={{ y: -8 }}
                                >
                                    <div className="relative bg-white/60 backdrop-blur-sm border border-gray-200 p-10 hover:bg-white hover:shadow-lg transition-all duration-300 group h-full">
                                        <div className="flex items-start justify-between mb-6">
                                            <div className="text-4xl font-black text-gray-200 group-hover:text-gray-300">
                                                {card.number}
                                            </div>
                                            <div className="text-xs text-emerald-600 font-mono bg-emerald-50 px-2 py-1 border border-emerald-200">
                                                ACTIVE
                                            </div>
                                        </div>

                                        <h3 className="text-3xl font-black mb-6 text-gray-900 group-hover:text-gray-700 tracking-tight">
                                            {card.title}
                                        </h3>

                                        <p className="text-gray-600 mb-6 leading-relaxed font-light">
                                            {card.description}
                                        </p>

                                        <div className="space-y-2 mb-8">
                                            {card.features.map((feature, idx) => (
                                                <div key={idx} className="flex items-center space-x-3">
                                                    <div className="w-1 h-1 bg-gray-900 rounded-full" />
                                                    <span className="text-gray-700 font-light text-sm">{feature}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="flex items-center text-gray-900 font-semibold group-hover:translate-x-2 transition-transform duration-200">
                                            <span className="text-sm tracking-wide">ACCESS PORTAL</span>
                                            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </section>

                {/* How It Works */}
                <section
                    ref={timelineRef}
                    id='how-it-works'
                    className="min-h-screen flex items-center py-20 px-6 border-t border-gray-200"
                >
                    <motion.div
                        className="max-w-6xl mx-auto"
                        initial="hidden"
                        animate={timelineInView ? "visible" : "hidden"}
                        variants={staggerContainer}
                    >
                        <motion.div
                            variants={fadeUp}
                            className="text-center mb-16"
                        >
                            <h2 className="text-5xl md:text-7xl font-black mb-6 text-gray-900 tracking-tight">
                                HOW IT WORKS
                            </h2>
                            <div className="max-w-3xl mx-auto">
                                <p className="text-xl text-gray-600 leading-relaxed font-light">
                                    Get started in under 5 minutes with our streamlined onboarding process.
                                </p>
                            </div>
                        </motion.div>

                        <div className="space-y-16">
                            {[
                                {
                                    step: '01',
                                    title: 'CHOOSE YOUR PORTAL',
                                    description: 'Select your role and access level. Each portal is optimized with role-specific features and workflows.'
                                },
                                {
                                    step: '02',
                                    title: 'SECURE AUTHENTICATION',
                                    description: 'Enterprise-grade security with multi-factor authentication. Set up your workspace in seconds.'
                                },
                                {
                                    step: '03',
                                    title: 'SMART DASHBOARD',
                                    description: 'Explore your intelligent dashboard with real-time analytics and AI recommendations.'
                                },
                                {
                                    step: '04',
                                    title: 'COLLABORATE & EXCEL',
                                    description: 'Start managing projects with advanced tools and real-time collaboration features.'
                                }
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    variants={fadeUp}
                                    className="grid md:grid-cols-2 gap-12 items-center"
                                >
                                    <div className={`${index % 2 === 1 ? 'md:order-2' : ''}`}>
                                        <div className="text-6xl font-black text-gray-200 mb-4">
                                            {item.step}
                                        </div>
                                        <h3 className="text-3xl md:text-4xl font-black mb-6 text-gray-900 tracking-tight">
                                            {item.title}
                                        </h3>
                                        <p className="text-lg text-gray-600 leading-relaxed font-light">
                                            {item.description}
                                        </p>
                                    </div>
                                    <div className={`${index % 2 === 1 ? 'md:order-1' : ''}`}>
                                        <div className="w-full h-48 bg-white/50 border border-gray-200 flex items-center justify-center backdrop-blur-sm">
                                            <div className="text-4xl font-black text-gray-300">
                                                {item.step}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </section>

                {/* Features */}
                <section
                    ref={featuresRef}
                    id='features'
                    className="min-h-screen flex items-center py-20 px-6 border-t border-gray-200"
                >
                    <motion.div
                        className="max-w-7xl mx-auto"
                        initial="hidden"
                        animate={featuresInView ? "visible" : "hidden"}
                        variants={staggerContainer}
                    >
                        <motion.div
                            variants={fadeUp}
                            className="text-center mb-16"
                        >
                            <h2 className="text-5xl md:text-7xl font-black mb-6 text-gray-900 tracking-tight">
                                POWERFUL FEATURES
                            </h2>
                            <div className="max-w-3xl mx-auto">
                                <p className="text-xl text-gray-600 leading-relaxed font-light">
                                    Advanced tools and intelligent automation designed to maximize productivity.
                                </p>
                            </div>
                        </motion.div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                {
                                    title: 'AI ANALYTICS',
                                    description: 'Machine learning insights with predictive analytics and intelligent recommendations.',
                                    stat: '99.8%',
                                    statLabel: 'ACCURACY'
                                },
                                {
                                    title: 'REAL-TIME COLLABORATION',
                                    description: 'Seamless team coordination with live editing and workflow management.',
                                    stat: '24/7',
                                    statLabel: 'SUPPORT'
                                },
                                {
                                    title: 'ENTERPRISE SECURITY',
                                    description: 'Military-grade encryption with advanced threat protection.',
                                    stat: '256-BIT',
                                    statLabel: 'ENCRYPTION'
                                },
                                {
                                    title: 'SMART AUTOMATION',
                                    description: 'Intelligent workflow automation with custom triggers.',
                                    stat: '5.2M+',
                                    statLabel: 'AUTOMATIONS'
                                },
                                {
                                    title: 'CLOUD SYNC',
                                    description: 'Universal synchronization with conflict resolution.',
                                    stat: '<15MS',
                                    statLabel: 'SYNC TIME'
                                },
                                {
                                    title: 'PREMIUM SUPPORT',
                                    description: 'Dedicated support team with priority assistance.',
                                    stat: '100%',
                                    statLabel: 'SATISFACTION'
                                }
                            ].map((feature, index) => (
                                <motion.div
                                    key={index}
                                    variants={fadeUp}
                                    className="group"
                                >
                                    <div className="bg-white/50 backdrop-blur-sm border border-gray-200 p-6 hover:bg-white hover:shadow-md transition-all duration-300 h-full">
                                        <div className="flex items-start justify-between mb-6">
                                            <div className="text-xl font-black text-gray-300">
                                                0{index + 1}
                                            </div>
                                            <div className="text-right">
                                                <div className="text-lg font-bold text-gray-900">{feature.stat}</div>
                                                <div className="text-xs text-gray-500 uppercase tracking-wide font-medium">{feature.statLabel}</div>
                                            </div>
                                        </div>
                                        
                                        <h4 className="text-lg font-black mb-3 text-gray-900 tracking-tight">
                                            {feature.title}
                                        </h4>
                                        
                                        <p className="text-gray-600 leading-relaxed font-light text-sm">
                                            {feature.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </section>

                {/* Developer Section */}
                <section
                ref={devRef}
                className="min-h-screen flex flex-col items-center py-20 px-6 border-t border-gray-200"
                >
                <motion.div
                    className="max-w-4xl mx-auto text-center w-full"
                    initial="hidden"
                    animate={devInView ? "visible" : "hidden"}
                    variants={staggerContainer}
                >
                    {/* Heading */}
                    <motion.div variants={fadeUp} className="mb-10">
                    <h2 className="text-5xl md:text-7xl font-black mb-6 text-gray-900 tracking-tight">
                        DEVELOPED BY
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
                        Built with passion and precision by a dedicated team committed to
                        excellence in academic technology.
                    </p>
                    </motion.div>

                    {/* Team Display */}
                    <motion.div
                    variants={fadeUp}
                    className="bg-white border border-gray-200 p-10 hover:shadow-md transition-all duration-300 rounded-2xl"
                    >
                    <div className="text-center mb-8">
                        <h3 className="text-2xl font-black mb-3 text-gray-900 tracking-tight">
                        INTERACTIVE TEAM DISPLAY
                        </h3>
                        <p className="text-gray-600 text-sm font-light">
                        Experience our dynamic team visualization
                        </p>
                    </div>

                    {/* Chroma Grid */}
                    <div className="relative w-full flex justify-center bg-white">
                        {/* // Mobile-optimized props for ChromaGrid */}
                        {/* <ChromaGrid
                            items={items}
                            radius={window.innerWidth < 640 ? 100 : window.innerWidth < 768 ? 150 : 200}
                            damping={0.5} // Slightly higher for smoother mobile performance
                            fadeOut={0.6}
                            ease="power2.out" // Less intensive easing for mobile
                        /> */}
                    </div>
                    </motion.div>
                </motion.div>

                {/* Logo Loop */}
                <div className="w-full mt-12">
                    {/* // Mobile-optimized props for LogoLoop */}
                    <LogoLoop
                        logos={techLogos}
                        speed={window.innerWidth < 768 ? 80 : 120} // Slower on mobile
                        direction="left"
                        logoHeight={window.innerWidth < 768 ? 32 : 42} // Smaller on mobile
                        gap={window.innerWidth < 768 ? 20 : 30} // Tighter spacing on mobile
                        pauseOnHover
                        scaleOnHover
                        fadeOut
                        fadeOutColor="#ffffff"
                        ariaLabel="Technology partners"
                    />
                </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="border-t border-gray-200 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6 py-12">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div className="md:col-span-2">
                            <div className="text-xl font-black text-gray-900 mb-4 tracking-tight">
                                PROJECT PORTAL
                            </div>
                            <p className="text-gray-600 leading-relaxed mb-6 max-w-lg font-light">
                                Transforming academic project management with intelligent automation and seamless collaboration.
                            </p>
                        </div>

                        <div>
                            <h5 className="font-black mb-4 text-gray-900 text-sm tracking-wide">QUICK LINKS</h5>
                            <div className="space-y-3">
    {footerLinks.map((link) => (
        <a
            key={link.label}
            href={link.href}
            className="block text-gray-600 hover:text-gray-900 cursor-pointer text-sm font-light transition-colors"
        >
            {link.label}
        </a>
    ))}
</div>
                        </div>

                        <div>
                            <h5 className="font-black mb-4 text-gray-900 text-sm tracking-wide">SYSTEM STATUS</h5>
                            <div className="space-y-3">
                                {[
                                    { label: 'API', status: 'OPERATIONAL', color: 'emerald' },
                                    { label: 'DATABASE', status: '99.9%', color: 'blue' },
                                    { label: 'CDN', status: 'HEALTHY', color: 'emerald' },
                                    { label: 'SECURITY', status: 'PROTECTED', color: 'purple' }
                                ].map((item) => (
                                    <div key={item.label} className="flex justify-between items-center">
                                        <span className="text-gray-600 text-sm font-light">{item.label}</span>
                                        <span className={`text-${item.color}-600 font-medium text-sm`}>
                                            {item.status}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-gray-300 flex flex-col md:flex-row justify-between items-center">
                        <div className="text-gray-500 text-sm mb-4 md:mb-0 font-light">
                            © 2025 Project Portal. Designed & Developed with precision.
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Landing;