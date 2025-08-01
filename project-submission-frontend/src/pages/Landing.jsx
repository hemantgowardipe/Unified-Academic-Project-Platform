import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';
import '../App.css';
// Note: Ensure Google Fonts are imported in your HTML or index.css as:
// @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:wght@400;600&display=swap');

const Landing = () => {
    const navigate = useNavigate();

    const buttonsRef = useRef(null);
    const buttonsInView = useInView(buttonsRef, { once: true, margin: '-100px' });
    const buttonsControls = useAnimation();

    useEffect(() => {
        if (buttonsInView) {
            buttonsControls.start('visible');
        }
    }, [buttonsInView, buttonsControls]);

    // Variants for card hover with scale and glow
    const cardHover = {
        scale: 1.05,
        boxShadow: '0 0 25px rgba(139,92,246,0.8)',
        transition: { duration: 0.3, ease: 'easeInOut' },
    };

    // Scroll fade-in variants with slide up
    const fadeSlideUp = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: 'easeOut',
            },
        },
    };

    return (
        <div
            className="min-h-screen relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex flex-col overflow-x-hidden"
            style={{
                backgroundImage:
                    "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1470&q=80')",
                backgroundAttachment: 'fixed',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
            aria-label="Landing page background"
        >
            {/* Background Overlay for contrast */}
            <div
                aria-hidden="true"
                className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-[2px] pointer-events-none"
            />

            {/* Top Navbar */}
            <motion.header
                initial={{ y: -70, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
                className="flex items-center justify-center py-6 bg-black bg-opacity-50 backdrop-blur-md sticky top-0 z-40 shadow-lg"
            >
                <motion.div
                    whileHover={{ scale: 1.1, filter: 'drop-shadow(0 0 12px #9F7AEA)' }}
                    className="flex items-center cursor-pointer select-none"
                    onClick={() => navigate('/')}
                    aria-label="Project Portal Home"
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') navigate('/');
                    }}
                >
                    {/* Logo with gradient text and premium font */}
                    <h1
                        className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 font-playfair text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-widest select-none"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        Project Portal
                    </h1>
                </motion.div>
            </motion.header>

            {/* Foreground 3D model container */}
            <motion.div
                aria-hidden="true"
                className="absolute right-0 top-20 md:top-32 xl:top-40 w-48 sm:w-64 md:w-96 pointer-events-none select-none"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 0.5, x: 0 }}
                transition={{ delay: 0.8, duration: 1.8, ease: 'easeOut' }}
                style={{ filter: 'drop-shadow(0 0 20px #8b5cf6)' }}
            >
                {/*
          Use an external free 3D model embed or image placeholder here.
          For example, a mechanical gear or futuristic component SVG or PNG with transparency.
          Replace the <img> src with your imported 3D asset or embed react-three-fiber if you prefer.
        */}
                <img
                    src="https://cdn.pixabay.com/photo/2018/09/24/21/46/gear-3693623_960_720.png"
                    alt="Futuristic mechanical gear"
                    className="w-full h-auto animate-float"
                    style={{ filter: 'drop-shadow(0 4px 6px rgba(255, 255, 255, 0.3))' }}
                />
            </motion.div>

            {/* Main content */}
            <main className="flex-grow flex flex-col items-center justify-center px-6 py-20 md:py-32 text-center relative z-20 max-w-7xl mx-auto">
                {/* Headline with strong gradient and spacing */}
                <motion.h2
                    className="text-5xl sm:text-6xl md:text-7xl font-playfair font-extrabold mb-6 tracking-widest max-w-5xl drop-shadow-lg leading-tight"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    style={{ fontFamily: "'Playfair Display', serif" }}
                >
                    Welcome to{' '}
                    <motion.span
                        className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-500 to-indigo-500"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.5, ease: 'backOut' }}
                    >
                        Project Portal
                    </motion.span>
                </motion.h2>

                {/* Subheading with modern clean font */}
                <motion.p
                    className="text-xl sm:text-2xl mb-14 max-w-xl mx-auto text-purple-200 font-poppins opacity-90"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 1 }}
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                    Choose your role to continue:
                </motion.p>

                {/* Buttons with scroll reveal and staggered animations */}
                <motion.div
                    ref={buttonsRef}
                    animate={buttonsControls}
                    initial="hidden"
                    variants={{
                        visible: {
                            opacity: 1,
                            y: 0,
                            transition: { staggerChildren: 0.25, delayChildren: 0.2 },
                        },
                        hidden: { opacity: 0, y: 50 },
                    }}
                    className="flex flex-col sm:flex-row gap-8 justify-center max-w-md w-full"
                >
                    {[{ label: 'Student', path: '/student/auth' }, { label: 'Faculty', path: '/admin/auth' }].map(
                        ({ label, path }) => (
                            <motion.button
                                key={label}
                                onClick={() => navigate(path)}
                                whileHover={cardHover}
                                whileTap={{ scale: 0.95 }}
                                className="flex-1 px-10 py-5 rounded-3xl bg-gradient-to-r from-purple-600 via-indigo-700 to-indigo-600 font-poppins font-semibold text-white shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-500 transition-transform duration-300"
                                aria-label={`Continue as ${label}`}
                                tabIndex={0}
                                // Adding accessible keyboard focus styles
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') navigate(path);
                                }}
                            >
                                {label}
                            </motion.button>
                        )
                    )}
                </motion.div>

                {/* Animated feature cards */}
                <motion.div
                    className="mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl w-full"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    variants={{
                        visible: {
                            opacity: 1,
                            transition: { staggerChildren: 0.3 },
                        },
                        hidden: { opacity: 0 },
                    }}
                    aria-label="Feature highlights"
                >
                    {[
                        {
                            title: 'Cutting-Edge Tech',
                            desc:
                                'Leverage futuristic, mechanical interfaces built on the latest technologies for a seamless experience.',
                            icon: (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-16 w-16 text-purple-400 mb-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M20 12H4"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M10 6l-6 6 6 6"
                                    />
                                </svg>
                            ),
                        },
                        {
                            title: 'Smooth Animations',
                            desc:
                                'Enjoy engaging transitions and motion effects that bring the UI to life without sacrificing performance.',
                            icon: (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-16 w-16 text-indigo-400 mb-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 4v16m8-8H4"
                                    />
                                </svg>
                            ),
                        },
                        {
                            title: 'Responsive & Accessible',
                            desc:
                                'A fully responsive design that adapts beautifully across all devices, with accessibility in mind.',
                            icon: (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-16 w-16 text-fuchsia-400 mb-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    aria-hidden="true"
                                >
                                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h8" />
                                </svg>
                            ),
                        },
                    ].map(({ title, desc, icon }, i) => (
                        <motion.article
                            key={i}
                            className="bg-black bg-opacity-40 backdrop-blur-md rounded-3xl p-8 shadow-lg cursor-default select-none"
                            variants={fadeSlideUp}
                            whileHover={{
                                scale: 1.05,
                                boxShadow: '0 0 30px rgba(139,92,246,0.9)',
                            }}
                            transition={{ duration: 0.3 }}
                            tabIndex={0}
                            aria-label={title}
                            role="region"
                        >
                            <div aria-hidden="true" className="flex justify-center">
                                {icon}
                            </div>
                            <h3
                                className="text-2xl font-playfair font-bold mb-4 text-center text-gradient"
                                style={{ fontFamily: "'Playfair Display', serif" }}
                            >
                                {title}
                            </h3>
                            <p className="text-purple-200 font-poppins text-center leading-relaxed">{desc}</p>
                        </motion.article>
                    ))}
                </motion.div>
            </main>

            {/* Floating blobs for subtle ambient motion */}
            <motion.div
                aria-hidden="true"
                className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden"
            >
                {[
                    { size: 96, top: '10%', left: '8%', color: 'bg-purple-700', delay: 0 },
                    { size: 64, top: '45%', left: '85%', color: 'bg-indigo-600', delay: 2 },
                    { size: 80, top: '70%', left: '28%', color: 'bg-fuchsia-500', delay: 4 },
                    { size: 100, top: '80%', left: '60%', color: 'bg-purple-800', delay: 1.5 },
                ].map(({ size, top, left, color, delay }, i) => (
                    <motion.div
                        key={i}
                        style={{ top, left, width: size, height: size }}
                        className={`rounded-full blur-3xl opacity-25 absolute ${color}`}
                        animate={{ y: [0, 15, 0] }}
                        transition={{ repeat: Infinity, duration: 10, delay, ease: 'easeInOut' }}
                    />
                ))}
            </motion.div>

            {/* Custom floating "animate-float" animation using Tailwind arbitrary values */}
            <style>
                {`
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-15px); }
          }
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }

          /* Text gradient utility for cards headings */
          .text-gradient {
            background: linear-gradient(90deg, #9f7aea 0%, #d946ef 50%, #818cf8 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        `}
            </style>
        </div>
    );
};

export default Landing;
