import { useEffect, useState } from 'react';
import useDarkMode from "../hooks/useDarkMode";
import { getTheme } from "../utils/themeConfig";
import { getAllProjectsAdmin } from '../services/ProjectService';
import { useNavigate } from 'react-router-dom';
import PropTypes from "prop-types";
import { Search, Users, Eye, ArrowRight, Code, Layers, Clock, GitBranch, UserCheck, Filter } from 'lucide-react';
import api from "../services/axiosInstance.js";
import ManageImportantDates from "../components/ManageImportantDates.jsx";

const AdminDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();

  const isDark = useDarkMode();
  const theme = getTheme(isDark);

  useEffect(() => {
    setMounted(true);
    fetchProjects();
  }, []);

   // Set document title on mount
    useEffect(() => {
    document.title = "UAPP | Admin Dashboard";
  }, []);

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const res = await getAllProjectsAdmin();
      setProjects(res.data);
    } catch (err) {
      console.error("Admin load error", err);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredProjects = projects.filter(
    (p) =>
      p.guideName?.toLowerCase().includes(search.toLowerCase()) ||
      p.title?.toLowerCase().includes(search.toLowerCase())
  );
    return (
        <div className={`min-h-screen transition-colors duration-200 ${theme.bg}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <header className={`mb-8 transition-all duration-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="space-y-1">
                            <h1 className={`text-2xl font-semibold ${theme.text.primary} flex items-center gap-2`}>
                                <Users className="w-6 h-6" />
                                Faculty Dashboard
                            </h1>
                            <p className={`text-sm ${theme.text.secondary}`}>
                                Monitor and manage all student projects
                            </p>
                        </div>
                        <ManageImportantDates theme={theme} />
                        
                        <div className="flex items-center gap-3">
                            <div className={`hidden sm:flex items-center gap-4 text-xs ${theme.text.secondary}`}>
                                <div className={`flex items-center gap-2 px-3 py-1.5 ${theme.button} ${theme.buttonBorder} border rounded-md`}>
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    <span>{projects.length} projects</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Search Section */}
                <div className={`mb-8 transition-all duration-500 delay-75 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <div className="relative max-w-md">
                        <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${theme.text.muted}`} />
                        <input
                            type="text"
                            placeholder="Search by project title or guide name..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className={`w-full pl-10 pr-4 py-2.5 ${theme.searchBg} ${theme.searchBorder} border rounded-lg ${theme.text.primary} placeholder-${theme.text.muted.replace('text-', '')} focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200`}
                        />
                        {search && (
                            <button
                                onClick={() => setSearch("")}
                                className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${theme.text.muted} hover:${theme.text.secondary} transition-colors`}
                            >
                                ×
                            </button>
                        )}
                    </div>
                </div>

                {/* Projects Section */}
                <main className={`transition-all duration-500 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    {isLoading ? (
                        <LoadingSkeleton theme={theme} />
                    ) : filteredProjects.length === 0 ? (
                        <EmptyState search={search} theme={theme} />
                    ) : (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className={`text-lg font-semibold ${theme.text.primary}`}>
                                    {search ? 'Search Results' : 'All Projects'}
                                </h2>
                                <div className="flex items-center gap-4">
                                    {search && (
                                        <span className={`text-xs ${theme.text.muted} flex items-center gap-1`}>
                                            <Filter className="w-3 h-3" />
                                            Filtered by: "{search}"
                                        </span>
                                    )}
                                    <span className={`text-xs ${theme.text.muted}`}>
                                        {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
                                    </span>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                                {filteredProjects.map((project, index) => (
                                    <ProjectCard 
                                        key={project.id} 
                                        project={project} 
                                        index={index}
                                        theme={theme}
                                        onClick={() => navigate(`/admin/project/${project.id}`)} 
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

// Empty State Component
const EmptyState = ({ search, theme }) => {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className={`w-16 h-16 ${theme.cardBg} ${theme.border} border rounded-lg flex items-center justify-center mb-4`}>
                {search ? (
                    <Search className={`w-8 h-8 ${theme.text.muted}`} />
                ) : (
                    <Users className={`w-8 h-8 ${theme.text.muted}`} />
                )}
            </div>
            
            <div className="text-center space-y-2 max-w-md">
                <h3 className={`text-lg font-semibold ${theme.text.primary}`}>
                    {search ? 'No projects found' : 'No projects yet'}
                </h3>
                <p className={`text-sm ${theme.text.secondary} leading-relaxed`}>
                    {search 
                        ? `No projects match "${search}". Try adjusting your search terms.`
                        : 'No student projects have been created yet.'
                    }
                </p>
            </div>
            
            {search && (
                <button
                    className={`mt-6 ${theme.button} ${theme.buttonBorder} border ${theme.text.secondary} px-4 py-2 rounded-md font-medium text-sm transition-colors duration-200 flex items-center gap-2`}
                    onClick={() => window.location.reload()}
                >
                    View all projects
                </button>
            )}
        </div>
    );
};

// Loading Skeleton Component
const LoadingSkeleton = ({ theme }) => {
    const skeletonBg = theme.cardBg.replace('bg-', 'bg-opacity-50 bg-');
    
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between mb-6">
                <div className={`h-6 ${skeletonBg} rounded-md w-32 animate-pulse`}></div>
                <div className={`h-4 ${skeletonBg} rounded-md w-20 animate-pulse`}></div>
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
                            <div className={`h-4 ${skeletonBg} rounded w-24`}></div>
                            <div className={`w-2 h-2 ${skeletonBg} rounded-full`}></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Project Card Component
const ProjectCard = ({ project, index, theme, onClick }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), index * 50);
        return () => clearTimeout(timer);
    }, [index]);

    const getProjectIcon = () => {
        const icons = [Code, Users, GitBranch, Layers];
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
                <div className="flex items-center gap-2">
                    <Eye className={`w-4 h-4 ${theme.text.muted} group-hover:${theme.text.secondary} transition-colors duration-200`} />
                    <ArrowRight className={`w-4 h-4 ${theme.text.muted} group-hover:${theme.text.secondary} group-hover:translate-x-0.5 transition-all duration-200`} />
                </div>
            </div>

            {/* Content */}
            <div className="space-y-3">
                <h3 className={`text-base font-medium ${theme.text.primary} group-hover:text-blue-600 transition-colors duration-200 line-clamp-1`}>
                    {project.title}
                </h3>
                
                {project.description && (
                    <p className={`${theme.text.secondary} line-clamp-2 text-sm leading-relaxed`}>
                        {project.description}
                    </p>
                )}

                {project.guideName && (
                    <div className={`flex items-center gap-2 text-xs ${theme.text.muted}`}>
                        <UserCheck className="w-3 h-3" />
                        <span className="font-medium">Guide:</span>
                        <span className="truncate">{project.guideName}</span>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className={`mt-6 pt-4 border-t ${theme.border} transition-colors duration-200`}>
                <div className="flex items-center justify-between">
                    <div className={`flex items-center gap-2 text-xs ${theme.text.muted}`}>
                        <Clock className="w-3 h-3" />
                        <span>{project.startDate}</span>
                    </div>
                    
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                </div>
            </div>
        </button>
    );
};

EmptyState.propTypes = {
  search: PropTypes.string.isRequired, // search term entered by user
  theme: PropTypes.oneOf(["light", "dark"]).isRequired, // enforce specific theme values
};
LoadingSkeleton.propTypes = {
  theme: PropTypes.oneOf(["light", "dark"]).isRequired, // skeleton theme
};
ProjectCard.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    link: PropTypes.string,
    guideName: PropTypes.string,      // 👈 add this
    startDate: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
  theme: PropTypes.oneOf(["light", "dark"]).isRequired,
  onClick: PropTypes.func,
};

export default AdminDashboard;