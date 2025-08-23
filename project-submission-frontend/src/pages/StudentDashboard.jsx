import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyProjects } from '../services/ProjectService';
import { Plus, Folder, Calendar, ArrowRight } from 'lucide-react';

const StudentDashboard = () => {
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        getMyProjects()
            .then(res => {
                setProjects(res.data);
                setIsLoading(false);
            })
            .catch(err => {
                console.error('Error fetching projects', err);
                setIsLoading(false);
            });
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-30 overflow-hidden">
                <div className="absolute inset-y-0 right-1/2 -z-10 mr-8 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-16 lg:mr-0 xl:mr-16 xl:origin-center"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-6 sm:py-12">
                {/* Header */}
                <header className="mb-8 sm:mb-12">
                    <div className="flex flex-col gap-4 sm:gap-6 sm:flex-row sm:items-center sm:justify-between">
                        <div className="text-center sm:text-left">
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-1 sm:mb-2">
                                Your Projects
                            </h1>
                            <p className="text-base sm:text-lg text-gray-600">
                                Manage and track your creative work
                            </p>
                        </div>
                        
                        <button
                            className="group relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 w-full sm:w-auto"
                            onClick={() => navigate('/student/create')}
                            aria-label="Add new project"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <Plus className="w-4 h-4 sm:w-5 sm:h-5 relative z-10" />
                            <span className="relative z-10">Add Project</span>
                            <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                        </button>
                    </div>
                </header>

                {/* Projects Grid */}
                <main>
                    {isLoading ? (
                        <LoadingSkeleton />
                    ) : projects.length === 0 ? (
                        <div className="text-center py-12 sm:py-20 px-4">
                            <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center">
                                <Folder className="w-8 h-8 sm:w-12 sm:h-12 text-indigo-500" />
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">No projects yet</h3>
                            <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 max-w-sm sm:max-w-md mx-auto">
                                Start building something amazing! Create your first project to get started.
                            </p>
                            <button
                                className="inline-flex items-center gap-2 bg-indigo-600 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-200"
                                onClick={() => navigate('/student/create')}
                            >
                                <Plus className="w-4 h-4" />
                                Create Project
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                            {projects.map(project => (
                                <ProjectCard 
                                    key={project.id} 
                                    project={project} 
                                    onClick={() => navigate(`/student/project/${project.id}`)} 
                                />
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

// Loading Skeleton Component
const LoadingSkeleton = () => {
    return (
        <>
            {/* Inline CSS for premium shimmer animation */}
            <style jsx>{`
                @keyframes shimmer {
                    0% {
                        transform: translateX(-100%);
                        opacity: 0;
                    }
                    50% {
                        opacity: 1;
                    }
                    100% {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                }

                @keyframes pulse {
                    0%, 100% {
                        opacity: 1;
                    }
                    50% {
                        opacity: 0.7;
                    }
                }

                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .skeleton-card {
                    animation: fadeIn 0.6s ease-out;
                    animation-fill-mode: both;
                }

                .skeleton-card:nth-child(1) { animation-delay: 0.1s; }
                .skeleton-card:nth-child(2) { animation-delay: 0.15s; }
                .skeleton-card:nth-child(3) { animation-delay: 0.2s; }
                .skeleton-card:nth-child(4) { animation-delay: 0.25s; }
                .skeleton-card:nth-child(5) { animation-delay: 0.3s; }
                .skeleton-card:nth-child(6) { animation-delay: 0.35s; }

                .skeleton-base {
                    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
                    background-size: 200% 100%;
                    animation: pulse 2s ease-in-out infinite;
                    position: relative;
                    overflow: hidden;
                }

                .skeleton-base::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(
                        90deg,
                        transparent 0%,
                        rgba(255, 255, 255, 0.6) 20%,
                        rgba(255, 255, 255, 0.8) 60%,
                        transparent 100%
                    );
                    transform: translateX(-100%);
                    animation: shimmer 2.5s infinite;
                    animation-delay: 0.5s;
                }

                .skeleton-icon {
                    background: linear-gradient(135deg, #e8e8e8 0%, #f5f5f5 100%);
                    position: relative;
                    overflow: hidden;
                }

                .skeleton-icon::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(
                        135deg,
                        transparent 0%,
                        rgba(255, 255, 255, 0.7) 50%,
                        transparent 100%
                    );
                    transform: translateX(-100%) translateY(-100%);
                    animation: shimmer 2.8s infinite;
                    animation-delay: 1s;
                }
            `}</style>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                {[...Array(6)].map((_, index) => (
                    <div key={index} className="skeleton-card">
                        <div className="bg-white/90 backdrop-blur-sm border border-white/30 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                            {/* Header */}
                            <div className="flex items-start justify-between mb-4 sm:mb-6">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 skeleton-icon rounded-xl sm:rounded-2xl shadow-sm"></div>
                                <div className="w-4 h-4 sm:w-5 sm:h-5 skeleton-base rounded"></div>
                            </div>

                            {/* Content */}
                            <div className="space-y-3 sm:space-y-4">
                                <div className="h-5 sm:h-6 skeleton-base rounded-lg w-3/4"></div>
                                <div className="space-y-2.5">
                                    <div className="h-4 skeleton-base rounded-md w-full"></div>
                                    <div className="h-4 skeleton-base rounded-md w-11/12"></div>
                                    <div className="h-4 skeleton-base rounded-md w-3/4"></div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-100/60 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 sm:w-4 sm:h-4 skeleton-base rounded"></div>
                                    <div className="h-3 sm:h-4 skeleton-base rounded w-20"></div>
                                </div>
                                <div className="w-2.5 h-2.5 skeleton-base rounded-full"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

// Enhanced Project Card Component
const ProjectCard = ({ project, onClick }) => {
    const cardRef = useRef(null);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const el = cardRef.current;
        if (!el || isMobile) return; // Disable tilt on mobile

        const handleMouseMove = (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const midX = rect.width / 2;
            const midY = rect.height / 2;
            const rotateX = ((y - midY) / midY) * 6; // Reduced for better mobile performance
            const rotateY = ((x - midX) / midX) * 6;
            setTilt({ x: rotateX, y: rotateY });
        };

        const handleMouseEnter = () => setIsHovered(true);
        const handleMouseLeave = () => {
            setTilt({ x: 0, y: 0 });
            setIsHovered(false);
        };

        el.addEventListener('mousemove', handleMouseMove);
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            el.removeEventListener('mousemove', handleMouseMove);
            el.removeEventListener('mouseenter', handleMouseEnter);
            el.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [isMobile]);

    return (
        <article
            ref={cardRef}
            className="group relative bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 cursor-pointer shadow-md sm:shadow-lg hover:shadow-xl sm:hover:shadow-2xl transition-all duration-500 active:scale-95 sm:active:scale-100"
            onClick={onClick}
            style={{
                transform: isMobile 
                    ? 'none' 
                    : `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(${isHovered ? '10px' : '0px'})`,
                transition: tilt.x === 0 && tilt.y === 0 ? 'all 0.5s ease' : 'transform 0.1s ease-out',
            }}
            tabIndex={0}
            role="button"
            aria-label={`Open project ${project.title}`}
            onKeyDown={e => { if (e.key === 'Enter') onClick(); }}
        >
            {/* Gradient Border Effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -m-px"></div>
            
            {/* Glow Effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-400/30 via-purple-400/30 to-pink-400/30 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
            
            {/* Content */}
            <div className="relative z-10">
                {/* Header */}
                <div className="flex items-start justify-between mb-4 sm:mb-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
                        <Folder className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all duration-300" />
                </div>

                {/* Project Info */}
                <div className="space-y-3 sm:space-y-4">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-indigo-900 transition-colors duration-300 line-clamp-2">
                        {project.title}
                    </h3>
                    
                    <p className="text-sm sm:text-base text-gray-600 line-clamp-3 leading-relaxed">
                        {project.description}
                    </p>
                </div>

                {/* Footer */}
                <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                        {project.startDate}
                        {project.guideName}
                    </div>
                    
                    <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                </div>
            </div>

            {/* Shimmer Effect */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden">
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ease-out"></div>
            </div>
        </article>
    );
};

export default StudentDashboard;