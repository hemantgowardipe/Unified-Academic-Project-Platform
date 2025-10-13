import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { SiReact, SiTailwindcss, SiDocker, SiMongodb, SiSpringboot, SiVercel, SiRender    } from "react-icons/si";
import CardNav from '../components/CardNav';
import logo from '../assets/react.svg';
import LogoLoop from '../components/LogoLoop';
import { event } from '../utils/analytics';
import '../App.css';
import api from "../services/axiosInstance.js";
import LandingPagePopup from "../components/LandingPagePopup";
import DevelopedBy from "../components/DevelopedBy.jsx";

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

    // FAQ section
    const [openIndex, setOpenIndex] = useState(null);
    const faqRef = useRef(null);
    const faqInView = useInView(faqRef, { once: true, margin: '-100px' });

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoaded(true);
            setHasLoaded(true);
        }, 1200);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const fetchDates = async () => {
            try {
                const res = await api.get("/important-dates");
                if (res.data.length > 0) {
                    // sort by date, pick nearest upcoming
                    const upcoming = res.data
                        .map(d => ({ ...d, date: new Date(d.date) }))
                        .filter(d => d.date > new Date())
                        .sort((a, b) => a.date - b.date);

                    if (upcoming.length > 0) {
                        setImportantDate(upcoming[0]); // nearest upcoming event
                    }
                }
            } catch (err) {
                console.error("Failed to fetch important dates", err);
            }
        };
        fetchDates();
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
                // { label: "Features", ariaLabel: "About Careers", href: "#features", onClick: () => scrollToSection('features') }
            ]
        },
        {
            label: "Documentation",
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
        // { label: "Features", href: "#features" },
        { label: "Documentation", href: "/docs" },
        { label: "Support", href: "https://chat.whatsapp.com/F162QexkCIpDifqYXOefGm" }
    ];

// FAQ questions and answers
    const faqs = [
        {
            id: '01',
            question: 'What problem does the Unified Academic Project Portal (UAPP) aim to solve?',
            answer: 'The UAPP addresses the significant lack of a centralised system for managing student academic projects in institutions. Existing manual or fragmented methods lead to inefficient tracking, limited faculty visibility into code development, delayed feedback, and reduced accountability, as general version control or project coordination tools do not cater to specific academic workflows.',
            category: 'PLATFORM'
        },
        {
            id: '02',
            question: 'What is the core solution offered by the UAPP?',
            answer: 'The UAPP proposes a centralised web portal designed to streamline the management, tracking, and evaluation of student projects. Its key innovation is GitHub integration, enabling the automatic fetching and visualisation of commit histories to provide real-time insights into code development progress. This unified platform combines project registration, code tracking, and evaluation.',
            category: 'SECURITY'
        },
        {
            id: '03',
            question: 'What technologies are being used to build the UAPP?',
            answer: 'The UAPP is developed with a modern technology stack: Spring Boot for the backend, ReactJS for the frontend, and D3.js or vis.js for Git tree visualisation. The GitHub repository further indicates significant use of CSS (43.7%), JavaScript (39.8%), and Java (16.2%), featuring a modular architecture with components like auth-service and project-submission-frontend',
            category: 'AI & ANALYTICS'
        },
        {
            id: '04',
            question: ' What is the current development status of the UAPP project?',
            answer: 'The UAPP project is currently in its development phase, having commenced in the 2025-2026 academic year, which is also its proposed completion timeframe. The GitHub repository, "AniketDhakate007/Unified-Academic-Project-Platform," has been established with initial components and 11 commits. The project team has defined its methodology, selected the modern tech stack, and is actively developing core functionalities, including student registration, GitHub API integration, and role-based dashboards.',
            category: 'INTEGRATION'
        },
    ];

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

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
        <div>
            <LandingPagePopup />
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
                <div className="max-w-7xl mx-auto flex items-center justify-between px-3 sm:px-6 lg:px-10">
                    <CardNav
                        logo={logo}
                        logoAlt="Company Logo"
                        items={items}
                        baseColor="#fff"
                        menuColor="#000"
                        buttonBgColor="#111"
                        buttonTextColor="#fff"
                        ease="back.out(1.7)"
                    />
                </div>
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

                        {/* Main Heading */}
                        <div className="mb-6 md:mb-12 overflow-hidden">
                            <motion.h1
                                initial={{ opacity: 0, y: 100 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1.2, delay: hasLoaded ? 0.2 : 1.8 }}
                                className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-tight sm:leading-[0.9] tracking-tighter text-gray-900 break-words"
                            >
                                FUTURE OF
                            </motion.h1>
                        </div>

                        <div className="mb-6 md:mb-12 overflow-hidden">
                            <motion.h1
                                initial={{ opacity: 0, y: 100 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1.2, delay: hasLoaded ? 0.4 : 2.0 }}
                                className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-tight sm:leading-[0.9] tracking-tighter text-gray-900 break-words"
                            >
                                PROJECT
                            </motion.h1>
                        </div>

                        <div className="mb-8 md:mb-16 overflow-hidden">
                            <motion.h1
                                initial={{ opacity: 0, y: 100 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1.2, delay: hasLoaded ? 0.6 : 2.2 }}
                                className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-tight sm:leading-[0.9] tracking-tighter text-gray-900 break-words"
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
                            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-12 md:mb-20 px-2 sm:px-4"
                        >
                            <button
                                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gray-900 text-white rounded-lg sm:rounded-xl font-semibold text-base sm:text-lg hover:bg-gray-800 transition-colors duration-200"
                                onClick={() => {
                                    event({
                                        action: "click_get_started",
                                        category: "engagement",
                                        label: "Landing Hero",
                                        value: 1,
                                    });
                                    document.getElementById("choose-portal")?.scrollIntoView({ behavior: "smooth" });
                                }}
                            >
                                GET STARTED
                            </button>
                            <button
                                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-gray-300 text-gray-900 rounded-lg sm:rounded-xl font-semibold text-base sm:text-lg hover:border-gray-400 backdrop-blur-sm transition-colors duration-200"
                                onClick={() => navigate('/DemoVideo')}
                            >
                                WATCH DEMO
                            </button>
                        </motion.div>

                        {/* Stats */}
                    </div>

                </section>

                {/* Choose Portal Section */}
                <section
                    id='choose-portal'
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
                                    path: '/student/login',
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
                            <h2 className="text-5xl md:text-7xl font-black mb-6 text-gray-900 tracking-wide">
                                HOW IT WORKS
                            </h2>
                            <div className="max-w-3xl mx-auto">
                                <p className="text-xl text-gray-600 leading-relaxed font-light tracking-wide">
                                    Get started in under 5 minutes with our streamlined onboarding process.
                                </p>
                            </div>
                        </motion.div>

                        <div className="space-y-16">
                            {[
                                {
                                    step: '01',
                                    title: 'CHOOSE YOUR PORTAL',
                                    description: 'Select your role and access level. Each portal is optimized with role-specific features and workflows.',
                                    image: '/choose_portal.png'  // replace with your actual image path
                                },
                                {
                                    step: '02',
                                    title: 'SECURE AUTHENTICATION',
                                    description: 'Enterprise-grade security with multi-factor authentication. Set up your workspace in seconds.',
                                    image: '/secure-auth.png'
                                },
                                {
                                    step: '03',
                                    title: 'SMART DASHBOARD',
                                    description: 'Explore your intelligent dashboard with real-time analytics and AI recommendations.',
                                    image: '/smart-dashboard.png'
                                },
                                {
                                    step: '04',
                                    title: 'COLLABORATE & EXCEL',
                                    description: 'Start managing projects with advanced tools and real-time collaboration features.',
                                    image: '/manage-project.png'
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
                                        <div className="w-full h-48 flex items-center justify-center">
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="max-h-48 rounded-xl shadow-lg object-contain"
                                            />
                                        </div>
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
                    </motion.div>
                    <DevelopedBy/>
                </section>

                {/* FAQ Section */}
                <section
                    ref={faqRef}
                    id="faq"
                    className="min-h-screen flex items-center py-20 px-6 border-t border-gray-200"
                >
                    <motion.div
                        className="max-w-6xl mx-auto w-full"
                        initial="hidden"
                        animate={faqInView ? "visible" : "hidden"}
                        variants={staggerContainer}
                    >
                        {/* Header */}
                        <motion.div
                            variants={fadeUp}
                            className="text-center mb-16"
                        >
                            <h2 className="text-5xl md:text-7xl font-black mb-6 text-gray-900 tracking-tight">
                                FREQUENTLY ASKED
                            </h2>
                            <div className="max-w-4xl mx-auto">
                                <p className="text-xl text-gray-600 leading-relaxed font-light tracking-wider">
                                    Everything you need to know about our platform, security, and implementation process.
                                </p>
                            </div>
                        </motion.div>

                        {/* FAQ List */}
                        <div className="max-w-6xl mx-auto">
                            <div className="bg-white border border-gray-200 overflow-hidden">
                                {faqs.map((faq, index) => (
                                    <motion.div
                                        key={faq.id}
                                        variants={fadeUp}
                                        className="group border-b border-gray-200 last:border-b-0"
                                    >
                                        {/* Question Header */}
                                        <button
                                            className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-all duration-200"
                                            onClick={() => toggleFAQ(index)}
                                            aria-expanded={openIndex === index}
                                        >
                                            <div className="flex items-center space-x-4 flex-1">
                                                <div className="text-lg font-black text-gray-300 min-w-[3rem]">
                                                    {faq.id}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center space-x-3 mb-1">
                                                <span className="text-xs text-gray-500 font-mono bg-gray-100 px-2 py-1 tracking-wide uppercase">
                                                    {faq.category}
                                                </span>
                                                    </div>
                                                    <h3 className="text-lg md:text-xl font-semibold text-gray-900 leading-tight">
                                                        {faq.question}
                                                    </h3>
                                                </div>
                                            </div>

                                            {/* Simple Plus/Minus Icon */}
                                            <motion.div
                                                animate={{ rotate: openIndex === index ? 45 : 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="ml-6 flex-shrink-0"
                                            >
                                                <svg
                                                    className="w-5 h-5 text-gray-400"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                                    />
                                                </svg>
                                            </motion.div>
                                        </button>

                                        {/* Answer Content */}
                                        <AnimatePresence>
                                            {openIndex === index && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    transition={{
                                                        duration: 0.3,
                                                        ease: [0.25, 0.1, 0.25, 1]
                                                    }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="px-8 pb-6">
                                                        <div className="pl-16">
                                                            <p className="text-black leading-relaxed font-light">
                                                                {faq.answer}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Bottom CTA */}
                        <motion.div
                            variants={fadeUp}
                            className="text-center mt-16"
                        >
                            <div className="bg-white/60 backdrop-blur-sm border border-gray-200 p-10 hover:bg-white hover:shadow-lg transition-all duration-300">
                                <h3 className="text-2xl font-black mb-4 text-gray-900 tracking-tight">
                                    STILL HAVE QUESTIONS?
                                </h3>
                                <p className="text-gray-600 mb-6 font-light">
                                    Our team is here to help with personalized support and detailed answers.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                    <button className="w-full sm:w-auto px-8 py-4 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors duration-200"
                                            onClick={() => window.open("https://chat.whatsapp.com/F162QexkCIpDifqYXOefGm", "_blank")}
                                    >
                                        CONTACT SUPPORT
                                    </button>
                                    {/* <button className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-gray-300 text-gray-900 rounded-xl font-semibold hover:border-gray-400 transition-colors duration-200">
                                SCHEDULE DEMO
                            </button> */}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
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
                    </div>

                    <div className="pt-6 border-t border-gray-300 flex flex-col md:flex-row justify-between items-center">
                        <div className="text-gray-500 text-sm mb-4 md:mb-0 font-light">
                            © 2025 Project Portal. Designed & Developed with precision.
                        </div>
                    </div>
                </div>
            </footer>
        </div>
        </div>
    );
};

export default Landing;