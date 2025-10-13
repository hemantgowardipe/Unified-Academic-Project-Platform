import React from 'react';
import A from '/A.jpg';
import H from '/hemant.jpg';
const DevelopedBy = () => {
    return (
        <section className="py-20 px-4 bg-gradient-to-br from-white via-gray-50 to-gray-100 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-16 items-start">


                    <div className="animate-fade-in-up">
                        <div className="grid md:grid-cols-2 gap-8 items-center">
                            {/* Content */}
                            <div className="space-y-6">
                                {/* Main Heading */}
                                <div className="space-y-3">
                                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">

                                        <span className="bg-gradient-to-r from-gray-800 to-black bg-clip-text text-transparent">
                      Aniket S. Dhakate
                    </span>
                                    </h1>
                                </div>

                                {/* Description */}
                                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                                    Creating, deploying, and optimizing full-stack web applications with modern tech.
                                </p>


                                {/* Social Links */}
                                <div className="flex space-x-3 pt-2">
                                    <a
                                        href="https://www.linkedin.com/in/aniket-dhakate-726811277/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 hover:text-gray-900 transition-all duration-300 hover:scale-110"
                                    >
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                        </svg>
                                    </a>

                                    <a
                                        href="https://github.com/AniketDhakate007"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 rounded-full bg-gray-800 hover:bg-black text-white transition-all duration-300 hover:scale-110"
                                    >
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                        </svg>
                                    </a>

                                    <a
                                        href="https://www.instagram.com/aniket_dhakate/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 transition-all duration-300 hover:scale-110"
                                    >
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                        </svg>

                                    </a>
                                </div>
                            </div>

                            {/* Image Section */}
                            <div className="relative h-[250px] md:h-[300px] flex items-center justify-center">
                                {/* Background Gradient Shapes */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-40 h-40 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full opacity-30 absolute -top-4 -right-4 animate-pulse"></div>
                                    <div className="w-28 h-28 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full opacity-40 absolute -bottom-4 -left-4 animate-pulse" style={{ animationDelay: '1s' }}></div>
                                </div>

                                {/* Main Image */}
                                <div className="relative z-10 transform hover:scale-105 transition-transform duration-500">
                                    <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden shadow-2xl ring-4 ring-white">
                                        <img
                                            src={A}
                                            alt="Aniket - Developer"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>

                                {/* Floating Elements */}
                                <div className="absolute top-8 left-4 z-20 animate-bounce" style={{ animationDelay: '2s' }}>
                                    <div className="w-2 h-2 bg-gray-600 rounded-full shadow-lg"></div>
                                </div>
                                <div className="absolute bottom-12 right-8 z-20 animate-bounce" style={{ animationDelay: '3s' }}>
                                    <div className="w-2 h-2 bg-gray-500 rounded-full shadow-lg"></div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="animate-fade-in-up" style={{ animationDelay: '300ms', animationFillMode: 'both' }}>
                        <div className="grid md:grid-cols-2 gap-8 items-center">
                            {/* Content */}
                            <div className="space-y-6">
                                {/* Main Heading */}
                                <div className="space-y-3">
                                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                                        <span className="bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
                      Hemant R. Gowardipe
                    </span>
                                    </h1>
                                </div>

                                {/* Description */}
                                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                                    Creating, deploying, and optimizing full-stack web applications with modern tech.
                                </p>



                                {/* Social Links */}
                                <div className="flex space-x-3 pt-2">
                                    <a
                                        href="https://www.linkedin.com/in/hemant-gowardipe-96614b24a/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 hover:text-gray-900 transition-all duration-300 hover:scale-110"
                                    >
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                        </svg>
                                    </a>

                                    <a
                                        href="https://github.com/hemantgowardipe"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 rounded-full bg-gray-800 hover:bg-black text-white transition-all duration-300 hover:scale-110"
                                    >
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                        </svg>
                                    </a>

                                    <a
                                        href="https://www.instagram.com/hemant_gowardipe/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 transition-all duration-300 hover:scale-110"
                                    >
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                        </svg>

                                    </a>
                                </div>
                            </div>

                            {/* Image Section */}
                            <div className="relative h-[250px] md:h-[300px] flex items-center justify-center">
                                {/* Background Gradient Shapes */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-40 h-40 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full opacity-30 absolute -top-4 -right-4 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                                    <div className="w-28 h-28 bg-gradient-to-br from-gray-500 to-gray-600 rounded-full opacity-40 absolute -bottom-4 -left-4 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
                                </div>

                                {/* Main Image */}
                                <div className="relative z-10 transform hover:scale-105 transition-transform duration-500">
                                    <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden shadow-2xl ring-4 ring-white">
                                        <img
                                            src={H}
                                            alt="Sarah Chen - Developer"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>

                                {/* Floating Elements */}
                                <div className="absolute top-8 left-4 z-20 animate-bounce" style={{ animationDelay: '2.5s' }}>
                                    <div className="w-2 h-2 bg-gray-700 rounded-full shadow-lg"></div>
                                </div>
                                <div className="absolute bottom-12 right-8 z-20 animate-bounce" style={{ animationDelay: '3.5s' }}>
                                    <div className="w-2 h-2 bg-gray-600 rounded-full shadow-lg"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes wave {
                    0%, 100% { transform: rotate(0deg); }
                    25% { transform: rotate(20deg); }
                    75% { transform: rotate(-15deg); }
                }

                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-wave {
                    animation: wave 2s ease-in-out infinite;
                }

                .animate-fade-in-up {
                    animation: fade-in-up 0.8s ease-out;
                }
            `}</style>
        </section>
    );
};

export default DevelopedBy;