import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import '../App.css';

const Landing = () => {
    const navigate = useNavigate();
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasLoaded, setHasLoaded] = useState(false);
    const { scrollY } = useScroll();

    // Optimized spring config for smoother animations
    const springConfig = { damping: 25, stiffness: 80, mass: 0.8 };
    const backgroundY = useSpring(useTransform(scrollY, [0, 2000], [0, -150]), springConfig);
    const heroY = useSpring(useTransform(scrollY, [0, 800], [0, -80]), springConfig);

    // Refs for intersection observer
    const heroRef = useRef(null);
    const accessRef = useRef(null);
    const timelineRef = useRef(null);
    const featuresRef = useRef(null);
    const devRef = useRef(null);

    const heroInView = useInView(heroRef, { once: false, margin: '-50px' });
    const accessInView = useInView(accessRef, { once: false, margin: '-50px' });
    const timelineInView = useInView(timelineRef, { once: false, margin: '-50px' });
    const featuresInView = useInView(featuresRef, { once: false, margin: '-50px' });
    const devInView = useInView(devRef, { once: false, margin: '-50px' });

    useEffect(() => {
        const hasLoadedBefore = sessionStorage.getItem('hasLoaded');

        if (hasLoadedBefore) {
            setIsLoaded(true);
            setHasLoaded(true);
        } else {
            const timer = setTimeout(() => {
                setIsLoaded(true);
                setHasLoaded(true);
                sessionStorage.setItem('hasLoaded', 'true');
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    // Simplified animation variants
    const fadeUp = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1]
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

    // Enhanced background with better performance
    const BykinsBackground = () => (
        <div className="fixed inset-0 -z-10 bg-black">
            <motion.div
                className="absolute inset-0"
                style={{ y: backgroundY }}
            >
                <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900/95 to-black" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.01)_0%,transparent_70%)]" />
            </motion.div>
        </div>
    );

    // Cleaner loader animation
    const BykinsLoader = () => (
        <motion.div
            className="fixed inset-0 bg-black z-50 flex items-center justify-center"
            initial={{ opacity: 1 }}
            animate={{
                opacity: isLoaded ? 0 : 1,
                pointerEvents: isLoaded ? 'none' : 'auto'
            }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
            <div className="text-center">
                <motion.div
                    className="text-white text-5xl md:text-6xl font-black mb-6 tracking-tight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    PROJECT PORTAL
                </motion.div>

                <motion.div
                    className="w-24 h-0.5 bg-white mx-auto"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                />
            </div>
        </motion.div>
    );

    // Optimized counter animation
    const AnimatedCounter = ({ value, suffix = '', duration = 1.5 }) => {
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
        <div className="min-h-screen bg-black text-white overflow-x-hidden">
            {!hasLoaded && <BykinsLoader />}
            <BykinsBackground />

            {/* Enhanced Navigation */}
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: hasLoaded ? 0 : 1.6, ease: [0.22, 1, 0.36, 1] }}
                className="fixed top-0 left-0 right-0 z-40 backdrop-blur-xl bg-black/70 border-b border-gray-800/50"
            >
                <div className="max-w-7xl mx-auto px-6 py-5">
                    <div className="flex items-center justify-between">
                        <motion.div
                            className="flex items-center space-x-3 cursor-pointer"
                            onClick={() => navigate('/')}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <span className="text-xl font-black text-white tracking-tight">
                                PROJECT PORTAL
                            </span>
                        </motion.div>

                        <div className="hidden md:flex items-center space-x-6 text-sm">
                            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-emerald-950/30 border border-emerald-900/30">
                                <motion.div
                                    className="w-2 h-2 bg-emerald-400 rounded-full"
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        opacity: [0.8, 1, 0.8]
                                    }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                                <span className="text-emerald-400 font-medium">ONLINE</span>
                            </div>
                            <span className="text-gray-400 font-mono">v4.0.0</span>
                        </div>
                    </div>
                </div>
            </motion.nav>

            <main className="relative z-10">
                {/* Enhanced Hero Section */}
                <section
                    ref={heroRef}
                    className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden"
                >
                    <motion.div
                        className="max-w-7xl mx-auto text-center"
                        style={{ y: heroY }}
                        initial="hidden"
                        animate={heroInView ? "visible" : "hidden"}
                        variants={staggerContainer}
                    >
                        <motion.div
                            variants={fadeUp}
                            className="mb-8"
                        >
                            <div className="inline-flex items-center space-x-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/80 text-sm font-medium mb-10 backdrop-blur-sm">
                                <motion.div
                                    className="w-2 h-2 bg-white rounded-full"
                                    animate={{
                                        scale: [1, 1.3, 1],
                                        opacity: [0.6, 1, 0.6]
                                    }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                                <span>NEW: AI-POWERED PROJECT INSIGHTS</span>
                            </div>
                        </motion.div>

                        {/* Refined typography */}
                        <motion.h1
                            variants={fadeUp}
                            className="text-6xl md:text-8xl lg:text-9xl font-black leading-[0.85] mb-8 tracking-tighter text-white"
                        >
                            FUTURE OF
                        </motion.h1>

                        <motion.h1
                            variants={fadeUp}
                            className="text-6xl md:text-8xl lg:text-9xl font-black leading-[0.85] mb-12 tracking-tighter text-white"
                        >
                            PROJECT MANAGEMENT
                        </motion.h1>

                        <motion.div
                            variants={fadeUp}
                            className="max-w-3xl mx-auto mb-12"
                        >
                            <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light">
                                We build project management platforms people can't help but use.
                                Transforming academic workflows with intelligent automation and seamless collaboration.
                            </p>
                        </motion.div>

                        <motion.div
                            variants={fadeUp}
                            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
                        >
                            <motion.button
                                className="px-8 py-4 bg-white text-black rounded-full font-semibold text-lg"
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => navigate('/student/auth')}
                            >
                                START FREE TRIAL
                            </motion.button>

                            <motion.button
                                className="px-8 py-4 bg-transparent border-2 border-white/30 text-white rounded-full font-semibold text-lg hover:border-white/50 backdrop-blur-sm"
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                WATCH DEMO
                            </motion.button>
                        </motion.div>

                        {/* Simplified stats */}
                        <motion.div
                            variants={fadeUp}
                            className="grid grid-cols-3 gap-8 max-w-xl mx-auto text-center"
                        >
                            <div className="border-r border-gray-700">
                                <div className="text-2xl font-bold text-white mb-1">
                                    <AnimatedCounter value="50" suffix="K+" />
                                </div>
                                <div className="text-sm text-gray-400 uppercase tracking-wider">Active Users</div>
                            </div>
                            <div className="border-r border-gray-700">
                                <div className="text-2xl font-bold text-white mb-1">
                                    <AnimatedCounter value="99.9" suffix="%" />
                                </div>
                                <div className="text-sm text-gray-400 uppercase tracking-wider">Uptime</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-white mb-1">24/7</div>
                                <div className="text-sm text-gray-400 uppercase tracking-wider">Support</div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Simplified scroll indicator */}
                    <motion.div
                        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <div className="text-gray-400 text-xs uppercase tracking-wider mb-3">Scroll</div>
                        <div className="w-px h-12 bg-gradient-to-b from-gray-400 to-transparent mx-auto"></div>
                    </motion.div>
                </section>

                {/* Enhanced Portal Selection */}
                <section
                    ref={accessRef}
                    className="min-h-screen flex items-center py-20 px-6 border-t border-gray-800/50"
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
                            <h2 className="text-4xl md:text-6xl font-black mb-6 text-white tracking-tight">
                                CHOOSE YOUR EXPERIENCE
                            </h2>
                            <div className="max-w-2xl mx-auto">
                                <p className="text-lg text-gray-400 leading-relaxed font-light">
                                    Tailored interfaces designed for optimal productivity in academic environments.
                                </p>
                            </div>
                        </motion.div>

                        <div className="grid md:grid-cols-2 gap-8">
                            {[
                                {
                                    title: 'STUDENT PORTAL',
                                    description: 'Comprehensive project management with real-time collaboration, analytics, and AI-powered insights for academic excellence.',
                                    features: ['Smart Dashboard', 'Real-time Collaboration', 'Progress Analytics', 'AI Recommendations'],
                                    path: '/student/auth',
                                    number: '01'
                                },
                                {
                                    title: 'FACULTY PORTAL',
                                    description: 'Advanced administrative platform with course management, comprehensive analytics, and detailed performance insights.',
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
                                >
                                    <div className="relative bg-white/[0.02] backdrop-blur-sm border border-white/10 p-8 hover:bg-white/[0.04] hover:border-white/20 transition-all duration-300 h-full">
                                        <div className="flex items-start justify-between mb-6">
                                            <div className="text-5xl font-black text-gray-700 group-hover:text-gray-600 transition-colors">
                                                {card.number}
                                            </div>
                                            <div className="text-xs text-emerald-400 font-mono bg-emerald-400/10 px-2 py-1">
                                                ACTIVE
                                            </div>
                                        </div>

                                        <h3 className="text-3xl font-black mb-6 text-white group-hover:text-gray-200 transition-colors tracking-tight">
                                            {card.title}
                                        </h3>

                                        <p className="text-gray-400 mb-8 leading-relaxed font-light">
                                            {card.description}
                                        </p>

                                        <div className="space-y-2 mb-8">
                                            {card.features.map((feature, idx) => (
                                                <div key={idx} className="flex items-center space-x-3">
                                                    <div className="w-1 h-1 bg-white rounded-full" />
                                                    <span className="text-gray-300 font-light text-sm">{feature}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <motion.div
                                            className="flex items-center text-white font-medium"
                                            whileHover={{ x: 4 }}
                                        >
                                            <span className="text-sm tracking-wide">ACCESS PORTAL</span>
                                            <svg
                                                className="w-4 h-4 ml-2"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </section>

                {/* Streamlined How It Works */}
                <section
                    ref={timelineRef}
                    className="min-h-screen flex items-center py-20 px-6 border-t border-gray-800/50"
                >
                    <motion.div
                        className="max-w-5xl mx-auto"
                        initial="hidden"
                        animate={timelineInView ? "visible" : "hidden"}
                        variants={staggerContainer}
                    >
                        <motion.div
                            variants={fadeUp}
                            className="text-center mb-16"
                        >
                            <h2 className="text-4xl md:text-6xl font-black mb-6 text-white tracking-tight">
                                HOW IT WORKS
                            </h2>
                            <div className="max-w-2xl mx-auto">
                                <p className="text-lg text-gray-400 leading-relaxed font-light">
                                    Get started in under 5 minutes with our streamlined process.
                                </p>
                            </div>
                        </motion.div>

                        <div className="space-y-16">
                            {[
                                {
                                    step: '01',
                                    title: 'CHOOSE YOUR PORTAL',
                                    description: 'Select your role and access optimized features designed for maximum efficiency.'
                                },
                                {
                                    step: '02',
                                    title: 'SECURE AUTHENTICATION',
                                    description: 'Enterprise-grade security with personalized workspace setup in seconds.'
                                },
                                {
                                    step: '03',
                                    title: 'SMART DASHBOARD',
                                    description: 'Explore intelligent analytics and AI recommendations tailored to your workflow.'
                                },
                                {
                                    step: '04',
                                    title: 'COLLABORATE & EXCEL',
                                    description: 'Start managing projects with advanced tools and real-time collaboration.'
                                }
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    variants={fadeUp}
                                    className="grid md:grid-cols-2 gap-12 items-center"
                                >
                                    <div className={`${index % 2 === 1 ? 'md:order-2' : ''}`}>
                                        <div className="text-6xl font-black text-gray-800 mb-4">
                                            {item.step}
                                        </div>
                                        <h3 className="text-3xl font-black mb-4 text-white tracking-tight">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-400 leading-relaxed font-light">
                                            {item.description}
                                        </p>
                                    </div>
                                    <div className={`${index % 2 === 1 ? 'md:order-1' : ''}`}>
                                        <div className="w-full h-48 bg-white/[0.02] border border-white/10 flex items-center justify-center">
                                            <div className="text-4xl font-black text-gray-600">
                                                {item.step}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </section>

                {/* Enhanced Features Grid */}
                <section
                    ref={featuresRef}
                    className="min-h-screen flex items-center py-20 px-6 border-t border-gray-800/50"
                >
                    <motion.div
                        className="max-w-6xl mx-auto"
                        initial="hidden"
                        animate={featuresInView ? "visible" : "hidden"}
                        variants={staggerContainer}
                    >
                        <motion.div
                            variants={fadeUp}
                            className="text-center mb-16"
                        >
                            <h2 className="text-4xl md:text-6xl font-black mb-6 text-white tracking-tight">
                                POWERFUL FEATURES
                            </h2>
                            <div className="max-w-2xl mx-auto">
                                <p className="text-lg text-gray-400 leading-relaxed font-light">
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
                                    description: 'Universal synchronization with offline support.',
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
                                    <div className="bg-white/[0.02] backdrop-blur-sm border border-white/10 p-6 hover:bg-white/[0.04] hover:border-white/20 transition-all duration-300 h-full">
                                        <div className="flex items-start justify-between mb-6">
                                            <div className="text-xl font-black text-gray-700">
                                                0{index + 1}
                                            </div>
                                            <div className="text-right">
                                                <div className="text-lg font-bold text-white">{feature.stat}</div>
                                                <div className="text-xs text-gray-500 uppercase">{feature.statLabel}</div>
                                            </div>
                                        </div>

                                        <h4 className="text-lg font-black mb-3 text-white tracking-tight">
                                            {feature.title}
                                        </h4>

                                        <p className="text-gray-400 leading-relaxed font-light text-sm">
                                            {feature.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </section>

                {/* Simplified Developer Section */}
                <section
                    ref={devRef}
                    className="min-h-screen flex items-center py-20 px-6 border-t border-gray-800/50"
                >
                    <motion.div
                        className="max-w-4xl mx-auto text-center"
                        initial="hidden"
                        animate={devInView ? "visible" : "hidden"}
                        variants={staggerContainer}
                    >
                        <motion.div variants={fadeUp} className="mb-12">
                            <h2 className="text-4xl md:text-6xl font-black mb-6 text-white tracking-tight">DEVELOPED BY</h2>
                            <p className="text-lg text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
                                Built with passion by a dedicated team committed to excellence in academic technology.
                            </p>
                        </motion.div>

                        <motion.div
                            variants={fadeUp}
                            className="bg-white/[0.02] backdrop-blur-sm border border-white/10 p-8"
                        >
                            <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-12">
                                <div className="text-center">
                                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-xl font-black mb-4 mx-auto text-black">
                                        PP
                                    </div>
                                    <h3 className="text-xl font-black mb-2 text-white tracking-tight">PROJECT PORTAL TEAM</h3>
                                    <p className="text-gray-400 text-sm font-light mb-4">Full-Stack Development</p>

                                    <div className="flex items-center justify-center space-x-3">
                                        {['GITHUB', 'LINKEDIN'].map((social) => (
                                            <motion.div
                                                key={social}
                                                className="px-3 py-1 bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 cursor-pointer"
                                                whileHover={{ scale: 1.05 }}
                                            >
                                                <span className="text-xs font-medium text-white">{social}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                <div className="border-l border-white/20 h-24 hidden md:block" />

                                <div className="text-center md:text-left">
                                    <h4 className="text-lg font-black mb-4 text-white tracking-tight">TECH STACK</h4>
                                    <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
                                        {['REACT', 'SPRING BOOT', 'MONGODB', 'TAILWIND'].map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-2 py-1 bg-white/[0.05] border border-white/10 text-xs font-medium text-white"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="text-sm text-gray-400 font-light">
                                        Built for academic excellence
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </section>
            </main>

            {/* Simplified Footer */}
            <footer className="border-t border-gray-800/50 bg-black/50">
                <div className="max-w-6xl mx-auto px-6 py-12">
                    <div className="grid md:grid-cols-3 gap-8 mb-8">
                        <div>
                            <div className="text-xl font-black text-white mb-4 tracking-tight">
                                PROJECT PORTAL
                            </div>
                            <p className="text-gray-400 leading-relaxed mb-6 font-light text-sm">
                                Transforming academic project management with intelligent automation and seamless collaboration.
                            </p>
                            <div className="flex space-x-3">
                                {['GH', 'LI', 'TW'].map((social) => (
                                    <motion.div
                                        key={social}
                                        className="w-8 h-8 bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 flex items-center justify-center text-white cursor-pointer"
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        <span className="text-xs font-bold">{social}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h5 className="font-black mb-4 text-white text-sm tracking-wide">QUICK LINKS</h5>
                            <div className="space-y-2">
                                {[
                                    { label: 'API', status: 'OPERATIONAL', color: 'emerald' },
                                    { label: 'DATABASE', status: '99.9%', color: 'blue' },
                                    { label: 'SECURITY', status: 'PROTECTED', color: 'purple' }
                                ].map((item) => (
                                    <div key={item.label} className="flex justify-between items-center">
                                        <span className="text-gray-400 text-sm font-light">{item.label}</span>
                                        <span className={`text-${item.color}-400 font-medium text-sm`}>
                                            {item.status}
                                        </span>
                                    </div>
                                ))}

                                <div className="pt-3 border-t border-gray-800">
                                    <div className="flex items-center space-x-2">
                                        <motion.div
                                            className="w-2 h-2 bg-emerald-400 rounded-full"
                                            animate={{
                                                scale: [1, 1.2, 1],
                                                opacity: [0.8, 1, 0.8]
                                            }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        />
                                        <span className="text-sm font-mono text-emerald-400 font-medium">ALL SYSTEMS OPERATIONAL</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
                        <div className="text-gray-400 text-sm mb-4 md:mb-0 font-light">
                            © 2025 Project Portal. Designed & Developed with precision.
                        </div>
                        <div className="flex items-center space-x-6 text-sm">
                            {['PRIVACY', 'TERMS', 'SECURITY'].map((link) => (
                                <span
                                    key={link}
                                    className="text-gray-400 hover:text-white cursor-pointer font-light"
                                >
                                    {link}
                                </span>
                            ))}
                            <div className="flex items-center space-x-2 px-2 py-1 bg-emerald-950/20 border border-emerald-900/30">
                                <motion.div
                                    className="w-2 h-2 bg-emerald-400 rounded-full"
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        opacity: [0.8, 1, 0.8]
                                    }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                                <span className="text-emerald-400 font-mono text-xs font-bold">v4.0.0</span>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Landing;