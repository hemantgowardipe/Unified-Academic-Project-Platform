import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useAnimation, useInView, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import '../App.css';

const Landing = () => {
    const navigate = useNavigate();
    const [isLoaded, setIsLoaded] = useState(false);
    const { scrollY } = useScroll();

    // Parallax transforms
    const backgroundY = useTransform(scrollY, [0, 1000], [0, -200]);
    const backgroundScale = useTransform(scrollY, [0, 1000], [1, 1.05]);

    const buttonsRef = useRef(null);
    const featuresRef = useRef(null);
    const heroRef = useRef(null);
    const buttonsInView = useInView(buttonsRef, { once: true, margin: '-50px' });
    const featuresInView = useInView(featuresRef, { once: true, margin: '-50px' });
    const heroInView = useInView(heroRef, { once: true, margin: '-50px' });

    const buttonsControls = useAnimation();
    const featuresControls = useAnimation();

    useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (buttonsInView) buttonsControls.start('visible');
    }, [buttonsInView, buttonsControls]);

    useEffect(() => {
        if (featuresInView) featuresControls.start('visible');
    }, [featuresInView, featuresControls]);

    // Fixed animation variants
    const cardHover = {
        scale: 1.02,
        y: -5,
        boxShadow: '0 25px 50px rgba(255,135,0,0.2), 0 0 0 1px rgba(255,255,255,0.1)',
        transition: {
            duration: 0.3,
            ease: [0.25, 0.46, 0.45, 0.94]
        },
    };

    const slideInVariants = {
        hidden: { opacity: 0, x: -40, filter: 'blur(2px)' },
        visible: {
            opacity: 1,
            x: 0,
            filter: 'blur(0px)',
            transition: {
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1]
            },
        },
    };

    const fadeInScale = {
        hidden: { opacity: 0, scale: 0.95, filter: 'blur(2px)' },
        visible: {
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)',
            transition: {
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1]
            },
        },
    };

    // Automotive Video Background Component
    const AutomotiveBackground = () => (
        <div className="fixed inset-0 overflow-hidden">
            {/* V10 Engine Video Background */}
            <motion.div
                className="absolute inset-0 z-0"
                style={{ y: backgroundY, scale: backgroundScale }}
            >
                <img
                    src="https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/1d517065-b856-40f1-8347-2d9171282bfe.png"
                    alt=""
                    className="w-full h-full object-cover opacity-30"
                    style={{ filter: 'brightness(0.7) contrast(1.2)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-slate-700/80 via-gray-600/70 to-slate-800/90" />
            </motion.div>

            {/* Car Hood Popping Animation Overlay */}
            <motion.div
                className="absolute top-0 right-0 w-1/2 h-full z-1"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 0.4, x: 0 }}
                transition={{ duration: 2, delay: 1 }}
            >
                <img
                    src="https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/fa8e6007-b543-49d0-bdb1-02baaedf7a02.png"
                    alt=""
                    className="w-full h-full object-cover"
                    style={{
                        filter: 'brightness(0.8) contrast(1.1) saturate(1.2)',
                        mixBlendMode: 'screen'
                    }}
                />
            </motion.div>

            {/* Dynamic Automotive Gradients */}
            <motion.div
                className="absolute inset-0 z-2"
                animate={{
                    background: [
                        'radial-gradient(circle at 20% 80%, rgba(255,135,0,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,69,0,0.06) 0%, transparent 50%)',
                        'radial-gradient(circle at 60% 40%, rgba(255,135,0,0.08) 0%, transparent 50%), radial-gradient(circle at 40% 80%, rgba(255,69,0,0.06) 0%, transparent 50%)',
                        'radial-gradient(circle at 80% 60%, rgba(255,135,0,0.08) 0%, transparent 50%), radial-gradient(circle at 20% 40%, rgba(255,69,0,0.06) 0%, transparent 50%)'
                    ]
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                }}
            />

            {/* McLaren Racing Stripes */}
            <div className="absolute inset-0 z-3">
                <motion.div
                    className="absolute top-0 left-1/4 w-0.5 h-full bg-gradient-to-b from-orange-500/30 via-transparent to-orange-500/30"
                    animate={{ opacity: [0.3, 0.8, 0.3] }}
                    transition={{ duration: 4, repeat: Infinity }}
                />
                <motion.div
                    className="absolute top-0 right-1/3 w-0.5 h-full bg-gradient-to-b from-red-500/20 via-transparent to-red-500/20"
                    animate={{ opacity: [0.5, 0.9, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                />
            </div>

            {/* Automotive Mesh Pattern */}
            <div
                className="absolute inset-0 opacity-5 z-4"
                style={{
                    backgroundImage: `
            linear-gradient(45deg, transparent 48%, rgba(255,135,0,0.4) 49%, rgba(255,135,0,0.4) 50%, transparent 51%),
            linear-gradient(-45deg, transparent 48%, rgba(255,69,0,0.3) 49%, rgba(255,69,0,0.3) 50%, transparent 51%)
          `,
                    backgroundSize: '60px 60px',
                }}
            />

            {/* Premium Vignette */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-700/60 via-transparent to-slate-700/60 z-5" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-800/80 via-transparent to-slate-700/40 z-5" />
        </div>
    );

    // Automotive-Inspired Card Component
    const AutomotiveCard = ({ children, className = '', delay = 0, ...props }) => (
        <motion.div
            className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-700/70 via-slate-600/50 to-gray-800/70 backdrop-blur-2xl border border-orange-500/20 shadow-2xl ${className}`}
            whileHover={cardHover}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{
                opacity: 1,
                y: 0,
                transition: {
                    duration: 0.6,
                    delay,
                    ease: [0.22, 1, 0.36, 1]
                }
            }}
            viewport={{ once: true, margin: '-50px' }}
            {...props}
        >
            {/* McLaren-style border glow */}
            <motion.div
                className="absolute inset-0 rounded-2xl border border-orange-500/30"
                initial={{ opacity: 0 }}
                whileHover={{
                    opacity: 1,
                    boxShadow: '0 0 30px rgba(255,135,0,0.3), inset 0 0 30px rgba(255,135,0,0.1)'
                }}
                transition={{ duration: 0.3 }}
            />

            {/* Racing stripe effect */}
            <motion.div
                className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay }}
            />

            {/* Automotive shine effect */}
            <motion.div
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 translate-x-[-200%]"
                whileHover={{ translateX: ['-200%', '200%'] }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
            />

            {children}
        </motion.div>
    );

    // Loading animation with automotive theme
    const AutomotiveLoader = () => (
        <motion.div
            className="fixed inset-0 bg-slate-900 z-50 flex items-center justify-center"
            initial={{ opacity: 1 }}
            animate={{ opacity: isLoaded ? 0 : 1 }}
            transition={{ duration: 1 }}
            style={{ pointerEvents: isLoaded ? 'none' : 'auto' }}
        >
            <motion.div
                className="flex flex-col items-center space-y-6"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                {/* Automotive loading bars */}
                <div className="flex space-x-2">
                    {[...Array(5)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="w-1 h-8 bg-gradient-to-t from-orange-500 to-red-600 rounded-full"
                            animate={{
                                scaleY: [1, 2, 1],
                                opacity: [0.5, 1, 0.5]
                            }}
                            transition={{
                                duration: 0.8,
                                repeat: Infinity,
                                delay: i * 0.1
                            }}
                        />
                    ))}
                </div>

                <motion.div
                    className="text-2xl font-bold text-white tracking-wider"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    PROJECT PORTAL
                </motion.div>

                <motion.div
                    className="text-sm text-orange-400 font-mono"
                    animate={{ opacity: [0.3, 0.8, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    INITIALIZING SYSTEMS...
                </motion.div>
            </motion.div>
        </motion.div>
    );

    return (
        <div className="min-h-screen relative text-white overflow-x-hidden font-sans">
            <AutomotiveLoader />

            {/* Automotive Background */}
            <AutomotiveBackground />

            {/* Enhanced McLaren Navbar */}
            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                className="relative z-50 px-6 py-8"
            >
                <nav className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between">
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="cursor-pointer"
                            onClick={() => navigate('/')}
                        >
                            <div className="flex items-center space-x-4">
                                {/* McLaren-style logo element */}
                                <motion.div
                                    className="relative"
                                    whileHover={{ rotate: 180 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <div className="w-3 h-10 bg-gradient-to-b from-orange-500 to-red-600 rounded-full" />
                                    <motion.div
                                        className="absolute inset-0 w-3 h-10 bg-gradient-to-b from-orange-500 to-red-600 rounded-full"
                                        animate={{
                                            boxShadow: [
                                                '0 0 0 rgba(255,135,0,0)',
                                                '0 0 20px rgba(255,135,0,0.6)',
                                                '0 0 0 rgba(255,135,0,0)'
                                            ]
                                        }}
                                        transition={{ duration: 3, repeat: Infinity }}
                                    />
                                </motion.div>

                                <motion.h1
                                    className="text-3xl md:text-4xl font-black tracking-tight text-white"
                                    style={{
                                        fontFamily: 'system-ui, -apple-system, sans-serif',
                                        textShadow: '0 0 30px rgba(255,135,0,0.3)'
                                    }}
                                >
                                    PROJECT PORTAL
                                </motion.h1>
                            </div>
                        </motion.div>

                        {/* Automotive HUD Elements */}
                        <motion.div
                            className="hidden md:flex items-center space-x-8"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.8, duration: 0.8 }}
                        >
                            <div className="flex items-center space-x-3 text-sm text-gray-300 font-mono">
                                <motion.div
                                    className="w-3 h-3 bg-green-500 rounded-full border border-green-400"
                                    animate={{
                                        scale: [1, 1.3, 1],
                                        boxShadow: [
                                            '0 0 0 rgba(34,197,94,0)',
                                            '0 0 15px rgba(34,197,94,0.6)',
                                            '0 0 0 rgba(34,197,94,0)'
                                        ]
                                    }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                                <span>SYSTEMS ONLINE</span>
                            </div>

                            <div className="text-sm text-orange-400 font-mono border border-orange-500/30 px-3 py-1 rounded-full bg-orange-500/10">
                                v2.0.24-McLAREN
                            </div>
                        </motion.div>
                    </div>
                </nav>
            </motion.header>

            {/* Main Content */}
            <main className="relative z-40 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Hero Section */}
                    <motion.section
                        ref={heroRef}
                        className="py-24 md:py-40 text-center"
                        initial="hidden"
                        animate={heroInView ? "visible" : "hidden"}
                        variants={{
                            visible: { transition: { staggerChildren: 0.3 } },
                            hidden: {}
                        }}
                    >
                        <motion.div variants={slideInVariants} className="mb-12">
                            <motion.h2
                                className="text-7xl md:text-8xl lg:text-9xl font-black leading-tight mb-8"
                                style={{
                                    fontFamily: 'system-ui, -apple-system, sans-serif',
                                    textShadow: '0 0 40px rgba(255,135,0,0.2)'
                                }}
                            >
                                WELCOME TO{' '}
                                <motion.span
                                    className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-orange-600"
                                    whileHover={{
                                        scale: 1.02,
                                        filter: 'drop-shadow(0 0 30px rgba(255,135,0,0.8))'
                                    }}

                                >
                                    PROJECT PORTAL

                                    {/* Racing stripe underline */}
                                    <motion.div
                                        className="absolute -bottom-6 left-0 right-0 h-2 bg-gradient-to-r from-orange-400 via-red-500 to-orange-600 rounded-full"
                                        initial={{ scaleX: 0, opacity: 0 }}
                                        animate={{ scaleX: 1, opacity: 1 }}
                                        transition={{ delay: 1.2, duration: 1.5, ease: "easeOut" }}
                                    />

                                    {/* Side accents */}
                                    <motion.div
                                        className="absolute -left-8 top-1/2 w-4 h-4 bg-orange-500 rounded-full"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 2, duration: 0.5 }}
                                    />
                                    <motion.div
                                        className="absolute -right-8 top-1/2 w-4 h-4 bg-red-500 rounded-full"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 2.2, duration: 0.5 }}
                                    />
                                </motion.span>
                            </motion.h2>
                        </motion.div>

                        <motion.div variants={fadeInScale} className="mb-20">
                            <motion.p
                                className="text-2xl md:text-3xl text-gray-200 max-w-4xl mx-auto leading-relaxed font-medium"
                                style={{ textShadow: '0 0 20px rgba(0,0,0,0.5)' }}
                            >
                                Experience precision-engineered project management with{' '}
                                <span className="text-orange-400 font-bold">McLaren-inspired</span> performance and elegance.
                            </motion.p>

                            {/* Automotive scanning line */}
                            <motion.div
                                className="relative mt-8 mx-auto w-32 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent rounded-full"
                                animate={{
                                    scaleX: [0, 1, 0],
                                    opacity: [0, 1, 0]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    repeatDelay: 3
                                }}
                            />
                        </motion.div>

                        {/* Enhanced Role Selection Cards */}
                        <motion.div
                            ref={buttonsRef}
                            animate={buttonsControls}
                            initial="hidden"
                            variants={{
                                visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
                                hidden: { opacity: 0 },
                            }}
                            className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto mb-40"
                        >
                            {[
                                {
                                    label: 'STUDENT ACCESS',
                                    path: '/student/auth',
                                    description: 'Access your projects, submissions, and academic progress with real-time analytics and performance tracking',
                                    icon: (
                                        <motion.svg
                                            className="w-10 h-10 mb-6 text-orange-500"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            whileHover={{ rotate: 10, scale: 1.1 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </motion.svg>
                                    ),
                                    bgGradient: 'from-orange-600/20 to-red-600/20',
                                },
                                {
                                    label: 'FACULTY ACCESS',
                                    path: '/admin/login',
                                    description: 'Manage projects, evaluate submissions, and track student performance metrics with advanced administrative tools',
                                    icon: (
                                        <motion.svg
                                            className="w-10 h-10 mb-6 text-orange-500"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            whileHover={{ rotate: -10, scale: 1.1 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                        </motion.svg>
                                    ),
                                    bgGradient: 'from-red-600/20 to-orange-600/20',
                                },
                            ].map((item, index) => (
                                <motion.div
                                    key={item.label}
                                    variants={{
                                        hidden: { opacity: 0, y: 60 },
                                        visible: {
                                            opacity: 1,
                                            y: 0,
                                            transition: { duration: 0.8, delay: index * 0.2 }
                                        },
                                    }}
                                    className="group"
                                >
                                    <AutomotiveCard
                                        className={`p-10 h-full cursor-pointer group relative bg-gradient-to-br ${item.bgGradient}`}
                                        onClick={() => navigate(item.path)}
                                        delay={index * 0.2}
                                        whileHover={{
                                            y: -10,
                                            scale: 1.02,
                                            transition: { duration: 0.3 }
                                        }}
                                    >
                                        {/* Performance indicator */}
                                        <div className="absolute top-4 right-4 flex items-center space-x-2">
                                            <motion.div
                                                className="w-2 h-2 bg-green-500 rounded-full"
                                                animate={{ opacity: [1, 0.3, 1] }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                            />
                                            <span className="text-xs text-gray-400 font-mono">READY</span>
                                        </div>

                                        <div className="flex flex-col items-center text-center h-full justify-between relative z-10">
                                            <div>
                                                <motion.div
                                                    animate={{
                                                        y: [0, -8, 0],
                                                    }}
                                                    transition={{
                                                        duration: 4,
                                                        repeat: Infinity,
                                                        ease: "easeInOut",
                                                        delay: index * 0.5
                                                    }}
                                                >
                                                    {item.icon}
                                                </motion.div>

                                                <motion.h3
                                                    className="text-3xl font-black mb-6 text-white group-hover:text-orange-400 transition-colors duration-500 tracking-wider"
                                                    style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                                                    whileHover={{ scale: 1.05 }}
                                                >
                                                    {item.label}
                                                </motion.h3>

                                                <p className="text-gray-300 leading-relaxed mb-10 group-hover:text-gray-200 transition-colors duration-300 text-lg">
                                                    {item.description}
                                                </p>
                                            </div>

                                            <motion.div
                                                className="flex items-center text-orange-500 font-bold text-lg group-hover:text-orange-400 transition-colors duration-300"
                                                whileHover={{ x: 8 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <span className="mr-3 tracking-wider">ENTER PORTAL</span>
                                                <motion.svg
                                                    className="w-6 h-6"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    animate={{ x: [0, 5, 0] }}
                                                    transition={{ duration: 2, repeat: Infinity }}
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </motion.svg>
                                            </motion.div>
                                        </div>
                                    </AutomotiveCard>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.section>

                    {/* Enhanced Features Section */}
                    <motion.section
                        ref={featuresRef}
                        animate={featuresControls}
                        initial="hidden"
                        variants={{
                            visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
                            hidden: { opacity: 0 },
                        }}
                        className="pb-32"
                    >
                        <motion.div
                            variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
                            className="text-center mb-20"
                        >
                            <motion.h3
                                className="text-5xl md:text-6xl font-black mb-8 tracking-tight"
                                style={{
                                    fontFamily: 'system-ui, -apple-system, sans-serif',
                                    textShadow: '0 0 30px rgba(255,135,0,0.2)'
                                }}
                            >
                                ENGINEERED FOR{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
                  EXCELLENCE
                </span>
                            </motion.h3>
                            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                                Built with precision engineering and cutting-edge technology for superior performance and reliability.
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                {
                                    title: 'Performance Analytics',
                                    description: 'Real-time insights and performance metrics with advanced data visualization and predictive analytics.',
                                    icon: (
                                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                        </svg>
                                    ),
                                    stat: '99.9%',
                                    statLabel: 'Uptime'
                                },
                                {
                                    title: 'Collaborative Workspace',
                                    description: 'Seamless team collaboration with intelligent project management tools and real-time synchronization.',
                                    icon: (
                                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    ),
                                    stat: '24/7',
                                    statLabel: 'Support'
                                },
                                {
                                    title: 'Advanced Security',
                                    description: 'Enterprise-grade security with multi-factor authentication, encryption, and comprehensive access controls.',
                                    icon: (
                                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                    ),
                                    stat: '256-bit',
                                    statLabel: 'Encryption'
                                },
                                {
                                    title: 'AI-Powered Insights',
                                    description: 'Machine learning algorithms provide intelligent recommendations and automated workflow optimization.',
                                    icon: (
                                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                        </svg>
                                    ),
                                    stat: '1M+',
                                    statLabel: 'Data Points'
                                },
                                {
                                    title: 'Cross-Platform Sync',
                                    description: 'Seamless synchronization across all devices with offline capabilities and cloud integration.',
                                    icon: (
                                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                        </svg>
                                    ),
                                    stat: '<1ms',
                                    statLabel: 'Latency'
                                },
                                {
                                    title: 'Premium Support',
                                    description: '24/7 dedicated support with priority assistance and comprehensive documentation resources.',
                                    icon: (
                                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                    ),
                                    stat: '100%',
                                    statLabel: 'Satisfaction'
                                },
                            ].map((feature, index) => (
                                <AutomotiveCard
                                    key={index}
                                    className="p-8 h-full group"
                                    delay={index * 0.1}
                                >
                                    <div className="flex flex-col h-full">
                                        {/* Top section with icon and stats */}
                                        <div className="flex items-start justify-between mb-6">
                                            <motion.div
                                                className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-orange-500/30 to-red-500/30 rounded-2xl flex items-center justify-center text-orange-500 group-hover:text-orange-400 transition-colors duration-300 border border-orange-500/20"
                                                whileHover={{
                                                    scale: 1.1,
                                                    rotate: 10,
                                                    boxShadow: '0 0 30px rgba(255,135,0,0.4)'
                                                }}
                                                animate={{
                                                    boxShadow: [
                                                        '0 0 0 rgba(255,135,0,0)',
                                                        '0 0 15px rgba(255,135,0,0.2)',
                                                        '0 0 0 rgba(255,135,0,0)'
                                                    ]
                                                }}
                                                transition={{
                                                    boxShadow: {
                                                        duration: 4,
                                                        repeat: Infinity,
                                                        delay: index * 0.3
                                                    }
                                                }}
                                            >
                                                {feature.icon}
                                            </motion.div>

                                            {/* Performance stat */}
                                            <div className="text-right">
                                                <div className="text-2xl font-black text-orange-400">{feature.stat}</div>
                                                <div className="text-xs text-gray-400 font-mono">{feature.statLabel}</div>
                                            </div>
                                        </div>

                                        <div className="flex-1">
                                            <motion.h4
                                                className="text-xl font-bold mb-4 text-white group-hover:text-orange-400 transition-colors duration-300 tracking-wide"
                                                whileHover={{ x: 5 }}
                                                style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                                            >
                                                {feature.title}
                                            </motion.h4>
                                            <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                                                {feature.description}
                                            </p>
                                        </div>

                                        {/* Progress indicator */}
                                        <motion.div
                                            className="mt-6 h-1 bg-gray-800 rounded-full overflow-hidden"
                                            initial={{ opacity: 0 }}
                                            whileInView={{ opacity: 1 }}
                                            transition={{ delay: 0.5 }}
                                        >
                                            <motion.div
                                                className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${Math.random() * 30 + 70}%` }}
                                                transition={{ duration: 2, delay: index * 0.2 }}
                                            />
                                        </motion.div>
                                    </div>
                                </AutomotiveCard>
                            ))}
                        </div>
                    </motion.section>
                </div>
            </main>

            {/* Premium Automotive Footer */}
            <motion.footer
                className="relative z-40 mt-24 border-t border-orange-500/20"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
            >
                {/* Footer background */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-800/70 to-slate-900/90 backdrop-blur-md" />

                <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
                    <div className="grid md:grid-cols-4 gap-12 mb-16">
                        {/* Brand Section */}
                        <div className="md:col-span-2 space-y-6">
                            <div className="flex items-center space-x-4">
                                <div className="w-3 h-8 bg-gradient-to-b from-orange-500 to-red-600 rounded-full" />
                                <h4 className="text-2xl font-black text-white tracking-wider">PROJECT PORTAL</h4>
                            </div>
                            <p className="text-gray-300 leading-relaxed max-w-lg text-lg">
                                Experience the future of project management with precision-engineered tools designed for academic excellence and professional growth.
                            </p>
                            <div className="flex space-x-4 pt-4">
                                {['GitHub', 'LinkedIn', 'Twitter', 'Discord'].map((social) => (
                                    <motion.div
                                        key={social}
                                        className="w-12 h-12 bg-gray-800/60 rounded-xl flex items-center justify-center text-gray-400 hover:text-orange-400 hover:bg-orange-500/20 cursor-pointer transition-all duration-300 border border-gray-700/50 hover:border-orange-500/30"
                                        whileHover={{ scale: 1.1, y: -3 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <span className="text-sm font-bold">{social[0]}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="space-y-6">
                            <h5 className="text-white font-bold text-lg tracking-wider">QUICK ACCESS</h5>
                            <div className="space-y-3">
                                {['Student Portal', 'Faculty Portal', 'Documentation', 'API Reference', 'Status Page'].map((link) => (
                                    <motion.div
                                        key={link}
                                        className="text-gray-400 hover:text-orange-400 cursor-pointer transition-colors duration-300 flex items-center space-x-2"
                                        whileHover={{ x: 8 }}
                                    >
                                        <div className="w-1 h-1 bg-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <span>{link}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Performance Stats */}
                        <div className="space-y-6">
                            <h5 className="text-white font-bold text-lg tracking-wider">PERFORMANCE</h5>
                            <div className="space-y-4">
                                {[
                                    { label: 'Uptime', value: '99.9%', color: 'text-green-400' },
                                    { label: 'Response Time', value: '<100ms', color: 'text-blue-400' },
                                    { label: 'Users Active', value: '10K+', color: 'text-orange-400' },
                                ].map((stat) => (
                                    <div key={stat.label} className="flex justify-between items-center">
                                        <span className="text-gray-400 text-sm">{stat.label}</span>
                                        <motion.span
                                            className={`font-mono font-bold ${stat.color}`}
                                            animate={{ opacity: [0.7, 1, 0.7] }}
                                            transition={{ duration: 2, repeat: Infinity, delay: Math.random() }}
                                        >
                                            {stat.value}
                                        </motion.span>
                                    </div>
                                ))}

                                <div className="pt-4">
                                    <div className="flex items-center space-x-2 mb-2">
                                        <motion.div
                                            className="w-3 h-3 bg-green-500 rounded-full border border-green-400"
                                            animate={{
                                                scale: [1, 1.2, 1],
                                                boxShadow: [
                                                    '0 0 0 rgba(34,197,94,0)',
                                                    '0 0 10px rgba(34,197,94,0.6)',
                                                    '0 0 0 rgba(34,197,94,0)'
                                                ]
                                            }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        />
                                        <span className="text-sm font-mono text-green-400">ALL SYSTEMS OPERATIONAL</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="pt-8 border-t border-orange-500/20 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
                        <div className="text-gray-400">
                            © 2024 Project Portal. Engineered for Excellence.
                        </div>
                        <div className="flex items-center space-x-8 text-sm text-gray-400">
                            {['Privacy Policy', 'Terms of Service', 'Security'].map((link) => (
                                <motion.span
                                    key={link}
                                    className="hover:text-orange-400 cursor-pointer transition-colors font-medium"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    {link}
                                </motion.span>
                            ))}
                            <div className="flex items-center space-x-3 border border-orange-500/30 px-4 py-2 rounded-full bg-orange-500/10">
                                <div className="w-2 h-2 bg-orange-500 rounded-full" />
                                <span className="font-mono text-orange-400 font-bold">v2.0.24-McLAREN</span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.footer>

            <style jsx>{`
                .font-sans {
                    font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                }
            `}</style>
        </div>
    );
};

export default Landing;