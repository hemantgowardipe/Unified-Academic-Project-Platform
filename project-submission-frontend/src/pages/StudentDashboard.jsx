import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyProjects } from '../services/ProjectService';
import { Plus, Folder, Calendar, ArrowRight, Sparkles, Layers, Clock } from 'lucide-react';

const StudentDashboard = () => {
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [mounted, setMounted] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setMounted(true);
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
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50/80 relative overflow-hidden">
            {/* Premium Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03]">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, rgb(99 102 241) 1px, transparent 0)`,
                    backgroundSize: '32px 32px'
                }}></div>
            </div>
            
            {/* Gradient Orbs */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-indigo-600/20 rounded-full blur-3xl"></div>
            <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-to-br from-violet-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-gradient-to-br from-indigo-400/20 to-blue-600/20 rounded-full blur-3xl"></div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
                {/* Premium Header */}
                <header className={`mb-12 sm:mb-16 transition-all duration-1000 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
                    <div className="flex flex-col gap-6 sm:gap-8 lg:flex-row lg:items-end lg:justify-between">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/25">
                                    <Sparkles className="w-5 h-5 text-white" />
                                </div>
                                <div className="h-8 w-px bg-gradient-to-b from-gray-300 to-transparent"></div>
                                <span className="text-sm font-medium text-gray-600 tracking-wide uppercase">Dashboard</span>
                            </div>
                            <div className="space-y-2">
                                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                                    <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                                        Your
                                    </span>
                                    <br />
                                    <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent">
                                        Projects
                                    </span>
                                </h1>
                                <p className="text-lg sm:text-xl text-gray-600 font-light max-w-2xl leading-relaxed">
                                    Manage, track, and showcase your creative work with precision
                                </p>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                            <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm border border-gray-200/60 rounded-full text-sm text-gray-600">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                <span>{projects.length} Active</span>
                            </div>
                            
                            <button
                                className="group relative overflow-hidden bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-700 text-white px-8 py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl hover:shadow-indigo-500/25 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center gap-3"
                                onClick={() => navigate('/student/create')}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                                <Plus className="w-5 h-5 relative z-10 group-hover:rotate-90 transition-transform duration-300" />
                                <span className="relative z-10">New Project</span>
                                <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 group-active:opacity-30 transition-all duration-200"></div>
                            </button>
                        </div>
                    </div>
                </header>

                {/* Projects Section */}
                <main className={`transition-all duration-1000 delay-200 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {isLoading ? (
                        <LoadingSkeleton />
                    ) : projects.length === 0 ? (
                        <EmptyState navigate={navigate} />
                    ) : (
                        <div className="space-y-8">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <h2 className="text-2xl font-bold text-gray-900">Recent Work</h2>
                                    <div className="h-6 w-px bg-gray-300"></div>
                                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                                        {projects.length} {projects.length === 1 ? 'Project' : 'Projects'}
                                    </span>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                                {projects.map((project, index) => (
                                    <ProjectCard 
                                        key={project.id} 
                                        project={project} 
                                        index={index}
                                        onClick={() => navigate(`/student/project/${project.id}`)} 
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

// Premium Empty State
const EmptyState = ({ navigate }) => {
    return (
        <div className="flex flex-col items-center justify-center py-20 px-4">
            <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-indigo-100 to-violet-100 rounded-3xl flex items-center justify-center shadow-lg">
                    <Layers className="w-12 h-12 text-indigo-600" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                    <Plus className="w-4 h-4 text-white" />
                </div>
            </div>
            
            <div className="text-center space-y-4 max-w-md">
                <h3 className="text-2xl font-bold text-gray-900">Ready to create?</h3>
                <p className="text-gray-600 leading-relaxed">
                    Your workspace is ready. Start your first project and bring your ideas to life.
                </p>
            </div>
            
            <button
                className="mt-8 group bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center gap-3"
                onClick={() => navigate('/student/create')}
            >
                <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                Create Your First Project
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
        </div>
    );
};

// Premium Loading Skeleton
const LoadingSkeleton = () => {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div className="h-8 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-pulse rounded-lg w-48"></div>
                <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-pulse rounded-full w-24"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                {[...Array(6)].map((_, index) => (
                    <div 
                        key={index} 
                        className="group bg-white/80 backdrop-blur-sm border border-gray-200/60 rounded-3xl p-8 shadow-lg"
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        <div className="flex items-start justify-between mb-6">
                            <div className="w-14 h-14 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-pulse rounded-2xl"></div>
                            <div className="w-6 h-6 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-pulse rounded-lg"></div>
                        </div>
                        
                        <div className="space-y-4">
                            <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-pulse rounded-lg w-3/4"></div>
                            <div className="space-y-3">
                                <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-pulse rounded w-full"></div>
                                <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-pulse rounded w-5/6"></div>
                                <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-pulse rounded w-2/3"></div>
                            </div>
                        </div>
                        
                        <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-4 h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-pulse rounded"></div>
                                <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-pulse rounded w-20"></div>
                            </div>
                            <div className="w-3 h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-pulse rounded-full"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Premium Project Card
const ProjectCard = ({ project, index, onClick }) => {
    const cardRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), index * 100);
        return () => clearTimeout(timer);
    }, [index]);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        setMousePosition({ x, y });
    };

    const getProjectTypeIcon = () => {
        // You can customize this based on project type
        const icons = [Folder, Layers, Sparkles];
        const IconComponent = icons[index % icons.length];
        return <IconComponent className="w-6 h-6 text-white" />;
    };

    const getGradientClass = () => {
        const gradients = [
            'from-indigo-600 to-violet-600',
            'from-violet-600 to-purple-600',
            'from-purple-600 to-pink-600',
            'from-pink-600 to-rose-600',
            'from-rose-600 to-orange-600',
            'from-orange-600 to-amber-600',
        ];
        return gradients[index % gradients.length];
    };

    return (
        <article
            ref={cardRef}
            className={`group relative bg-white/80 backdrop-blur-sm border border-gray-200/60 rounded-3xl p-8 cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-gray-500/10 transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] overflow-hidden ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                transitionDelay: `${index * 50}ms`
            }}
        >
            {/* Spotlight Effect */}
            <div 
                className="absolute rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                    background: 'radial-gradient(circle 100px at center, rgba(99, 102, 241, 0.1), transparent)',
                    width: '200px',
                    height: '200px',
                    left: mousePosition.x - 100,
                    top: mousePosition.y - 100,
                    transform: 'translate3d(0, 0, 0)',
                }}
            />
            
            {/* Border Gradient */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500/20 via-violet-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -m-[1px]"></div>
            
            {/* Content */}
            <div className="relative z-10">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                    <div className={`w-14 h-14 bg-gradient-to-br ${getGradientClass()} rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:scale-110 group-hover:shadow-xl transition-all duration-300`}>
                        {getProjectTypeIcon()}
                    </div>
                    <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-indigo-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                </div>

                {/* Project Info */}
                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-900 transition-colors duration-300 line-clamp-2 leading-tight">
                        {project.title}
                    </h3>
                    
                    <p className="text-gray-600 line-clamp-3 leading-relaxed text-sm">
                        {project.description}
                    </p>
                </div>

                {/* Footer */}
                <div className="mt-8 pt-6 border-t border-gray-100 group-hover:border-gray-200 transition-colors duration-300">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span className="font-medium">{project.startDate}</span>
                            </div>
                            {project.guideName && (
                                <>
                                    <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                                    <span className="truncate max-w-24">{project.guideName}</span>
                                </>
                            )}
                        </div>
                        
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-green-500 rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                            <span className="text-xs text-green-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                Active
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Shine Effect */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden">
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 ease-out skew-x-12"></div>
            </div>
        </article>
    );
};

export default StudentDashboard;