import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import useDarkMode from "../hooks/useDarkMode";
import { getTheme } from "../utils/themeConfig";
import { getMyProjects } from '../services/ProjectService';
import { Plus, Folder, ArrowRight, Code, Layers, Clock, GitBranch } from 'lucide-react';

const StudentDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  const isDark = useDarkMode();
  const theme = getTheme(isDark);
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);

    getMyProjects()
      .then(res => setProjects(res.data))
      .catch(err => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

    return (
        <div className={`min-h-screen transition-colors duration-200 ${theme.bg}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <header className={`mb-8 transition-all duration-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="space-y-1">
                            <h1 className={`text-2xl font-semibold ${theme.text.primary}`}>
                                Your Projects
                            </h1>
                            <p className={`text-sm ${theme.text.secondary}`}>
                                Manage and track your development projects
                            </p>
                        </div>
                        
                        <div className="flex items-center gap-3">
                            <div className={`hidden sm:flex items-center gap-2 px-3 py-1.5 ${theme.button} ${theme.buttonBorder} border rounded-md text-xs ${theme.text.secondary}`}>
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span>{projects.length} projects</span>
                            </div>
                            
                            <button
                                className={`${theme.accent} ${theme.accentHover} text-white px-4 py-2 rounded-md font-medium text-sm transition-colors duration-200 flex items-center gap-2 shadow-sm`}
                                onClick={() => navigate('/student/create')}
                            >
                                <Plus className="w-4 h-4" />
                                New
                            </button>
                        </div>
                    </div>
                </header>

                {/* Projects Section */}
                <main className={`transition-all duration-500 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    {isLoading ? (
                        <LoadingSkeleton theme={theme} />
                    ) : projects.length === 0 ? (
                        <EmptyState navigate={navigate} theme={theme} />
                    ) : (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className={`text-lg font-semibold ${theme.text.primary}`}>
                                    Recent projects
                                </h2>
                                <span className={`text-xs ${theme.text.muted}`}>
                                    {projects.length} {projects.length === 1 ? 'project' : 'projects'}
                                </span>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                                {projects.map((project, index) => (
                                    <ProjectCard 
                                        key={project.id} 
                                        project={project} 
                                        index={index}
                                        theme={theme}
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

// Clean Empty State
const EmptyState = ({ navigate, theme }) => {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className={`w-16 h-16 ${theme.cardBg} ${theme.border} border rounded-lg flex items-center justify-center mb-4`}>
                <Folder className={`w-8 h-8 ${theme.text.muted}`} />
            </div>
            
            <div className="text-center space-y-2 max-w-md">
                <h3 className={`text-lg font-semibold ${theme.text.primary}`}>
                    No projects yet
                </h3>
                <p className={`text-sm ${theme.text.secondary} leading-relaxed`}>
                    Create your first project to get started with tracking your work.
                </p>
            </div>
            
            <button
                className={`mt-6 ${theme.accent} ${theme.accentHover} text-white px-4 py-2 rounded-md font-medium text-sm transition-colors duration-200 flex items-center gap-2`}
                onClick={() => navigate('/student/create')}
            >
                <Plus className="w-4 h-4" />
                Create project
            </button>
        </div>
    );
};

// Clean Loading Skeleton
const LoadingSkeleton = ({ theme }) => {
    const skeletonBg = theme.cardBg.replace('bg-', 'bg-opacity-50 bg-');
    
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between mb-6">
                <div className={`h-6 ${skeletonBg} rounded-md w-32 animate-pulse`}></div>
                <div className={`h-4 ${skeletonBg} rounded-md w-16 animate-pulse`}></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {[...Array(6)].map((_, index) => (
                    <div 
                        key={index} 
                        className={`${theme.cardBg} ${theme.border} border rounded-lg p-6 animate-pulse`}
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className={`w-10 h-10 ${skeletonBg} rounded-md`}></div>
                            <div className={`w-4 h-4 ${skeletonBg} rounded`}></div>
                        </div>
                        
                        <div className="space-y-3">
                            <div className={`h-5 ${skeletonBg} rounded w-3/4`}></div>
                            <div className={`h-4 ${skeletonBg} rounded w-full`}></div>
                            <div className={`h-4 ${skeletonBg} rounded w-5/6`}></div>
                        </div>
                        
                        <div className={`mt-6 pt-4 border-t ${theme.border} flex items-center justify-between`}>
                            <div className={`h-4 ${skeletonBg} rounded w-20`}></div>
                            <div className={`w-2 h-2 ${skeletonBg} rounded-full`}></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Clean Project Card
const ProjectCard = ({ project, index, theme, onClick }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), index * 50);
        return () => clearTimeout(timer);
    }, [index]);

    const getProjectIcon = () => {
        const icons = [Code, Folder, GitBranch, Layers];
        const IconComponent = icons[index % icons.length];
        return <IconComponent className={`w-5 h-5 ${theme.text.secondary}`} />;
    };

    return (
        <button
        type="button"
        onClick={onClick}
        style={{ transitionDelay: `${index * 25}ms` }}
        className={`group w-full text-left ${theme.cardBg} ${theme.border} border rounded-lg p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 ${theme.button} ${theme.buttonBorder} border rounded-md flex items-center justify-center group-hover:scale-105 transition-transform duration-200`}>
                    {getProjectIcon()}
                </div>
                <ArrowRight className={`w-4 h-4 ${theme.text.muted} group-hover:${theme.text.secondary} group-hover:translate-x-0.5 transition-all duration-200`} />
            </div>

            {/* Content */}
            <div className="space-y-3">
                <h3 className={`text-base font-medium ${theme.text.primary} group-hover:text-blue-600 transition-colors duration-200 line-clamp-1`}>
                    {project.title}
                </h3>
                
                <p className={`${theme.text.secondary} line-clamp-2 text-sm leading-relaxed`}>
                    {project.description}
                </p>
            </div>

            {/* Footer */}
            <div className={`mt-6 pt-4 border-t ${theme.border} transition-colors duration-200`}>
                <div className="flex items-center justify-between">
                    <div className={`flex items-center gap-2 text-xs ${theme.text.muted}`}>
                        <Clock className="w-3 h-3" />
                        <span>{project.startDate}</span>
                        {project.guideName && (
                            <>
                                <span className="text-gray-400">•</span>
                                <span className="truncate max-w-20">{project.guideName}</span>
                            </>
                        )}
                    </div>
                    
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
            </div>
        </button>
    );
};
// EmptyState
EmptyState.propTypes = {
    navigate: PropTypes.func.isRequired,
    theme: PropTypes.shape({
        cardBg: PropTypes.string.isRequired,
        border: PropTypes.string.isRequired,
        text: PropTypes.shape({
            primary: PropTypes.string.isRequired,
            secondary: PropTypes.string.isRequired,
            muted: PropTypes.string.isRequired,
        }).isRequired,
        accent: PropTypes.string,
        accentHover: PropTypes.string.isRequired,
        button: PropTypes.string.isRequired,
        buttonBorder: PropTypes.string.isRequired,
    }).isRequired
};

// LoadingSkeleton
LoadingSkeleton.propTypes = {
    theme: PropTypes.shape({
        cardBg: PropTypes.string.isRequired,
        border: PropTypes.string.isRequired,
        text: PropTypes.shape({
            primary: PropTypes.string,
            secondary: PropTypes.string,
            muted: PropTypes.string,
        }),
        accent: PropTypes.string,
        accentHover: PropTypes.string,
        button: PropTypes.string,
        buttonBorder: PropTypes.string,
    }).isRequired
};

// ProjectCard
ProjectCard.propTypes = {
    project: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
        startDate: PropTypes.string.isRequired,
        guideName: PropTypes.string
    }).isRequired,
    index: PropTypes.number.isRequired,
    theme: PropTypes.shape({
        cardBg: PropTypes.string.isRequired,
        border: PropTypes.string.isRequired,
        text: PropTypes.shape({
            primary: PropTypes.string.isRequired,
            secondary: PropTypes.string.isRequired,
            muted: PropTypes.string.isRequired,
        }).isRequired,
        accent: PropTypes.string,
        accentHover: PropTypes.string.isRequired,
        button: PropTypes.string.isRequired,
        buttonBorder: PropTypes.string.isRequired,
    }).isRequired,
    onClick: PropTypes.func.isRequired
};
export default StudentDashboard;