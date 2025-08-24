import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/ProjectDetail.css'; // Import the CSS file

const ProjectDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [pdfFile, setPdfFile] = useState(null);
    const [isDark, setIsDark] = useState(false);
    const Project_URL = import.meta.env.VITE_PROJECTS;
    const GitView = import.meta.env.VITE_GITVIEW;

    // Detect system theme preference
    useEffect(() => {
        const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setIsDark(darkModeMediaQuery.matches);

        const handleThemeChange = (e) => {
            setIsDark(e.matches);
        };

        darkModeMediaQuery.addEventListener('change', handleThemeChange);
        return () => darkModeMediaQuery.removeEventListener('change', handleThemeChange);
    }, []);

    // Fetch project details
    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get(`${Project_URL}/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => setProject(res.data))
            .catch(err => console.error('Error loading project', err));
    }, [id]);

    // Submit project (if needed)
    const handleSubmit = async () => {
        const token = localStorage.getItem('token');
        const formData = new FormData();

        formData.append("project", new Blob([JSON.stringify(project)], { type: "application/json" }));
        formData.append("file", pdfFile);

        try {
            await axios.post('${Project_URL}', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            alert("Project submitted!");
            navigate('/student/dashboard');
        } catch (err) {
            console.error("Error submitting project:", err);
            alert("Failed to submit project.");
        }
    };

    // Handle PDF view
    const handleViewPDF = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${Project_URL}/${id}/pdf`, {
                headers: { Authorization: `Bearer ${token}` },
                responseType: 'blob'
            });

            const file = new Blob([response.data], { type: 'application/pdf' });
            const fileURL = URL.createObjectURL(file);
            window.open(fileURL, '_blank');
        } catch (err) {
            console.error("Error fetching PDF", err);
            alert("Could not load PDF");
        }
    };

    // Theme classes
    const theme = {
        bg: isDark ? 'bg-[#0d1117]' : 'bg-[#ffffff]',
        cardBg: isDark ? 'bg-[#161b22]' : 'bg-white',
        border: isDark ? 'border-[#30363d]' : 'border-[#d1d9e0]',
        text: {
            primary: isDark ? 'text-[#f0f6fc]' : 'text-[#1f2328]',
            secondary: isDark ? 'text-[#8d96a0]' : 'text-[#656d76]',
            muted: isDark ? 'text-[#7d8590]' : 'text-[#848d97]'
        },
        accent: isDark ? 'bg-[#238636]' : 'bg-[#1f883d]',
        accentHover: isDark ? 'hover:bg-[#2ea043]' : 'hover:bg-[#1a7f37]',
        button: isDark ? 'bg-[#21262d] hover:bg-[#30363d]' : 'bg-[#f6f8fa] hover:bg-[#f3f4f6]',
        buttonBorder: isDark ? 'border-[#30363d]' : 'border-[#d1d9e0]'
    };

    if (!project)
        return (
            <div className={`min-h-screen transition-colors duration-200 ${theme.bg} flex items-center justify-center`}>
                <div className="flex flex-col items-center gap-4">
                    <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <span className={theme.text.secondary}>Loading Project...</span>
                </div>
            </div>
        );

    return (
        <div className={`min-h-screen transition-colors duration-200 ${theme.bg}`}>
            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="space-y-8">
                    <header className="space-y-6">
                        <div className="space-y-2">
                            <h1 className={`text-3xl font-bold ${theme.text.primary}`}>{project.title}</h1>
                        </div>

                        <div className="space-y-4">
                            {/* Guide card - will be ordered first on mobile */}
                            <div className={`${theme.cardBg} ${theme.border} border rounded-lg p-4`}>
                                <span className={`text-sm font-medium ${theme.text.secondary}`}>Project Guide</span>
                                <div className={`text-lg font-semibold ${theme.text.primary}`}>{project.guideName}</div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className={`${theme.cardBg} ${theme.border} border rounded-lg p-4`}>
                                    <span className={`text-sm font-medium ${theme.text.secondary}`}>Start Date</span>
                                    <div className={`text-lg font-semibold ${theme.text.primary}`}>{project.startDate}</div>
                                </div>
                                <div className={`${theme.cardBg} ${theme.border} border rounded-lg p-4`}>
                                    <span className={`text-sm font-medium ${theme.text.secondary}`}>Final Submission</span>
                                    <div className={`text-lg font-semibold ${theme.text.primary}`}>{project.finalSubmissionDate}</div>
                                </div>
                            </div>
                        </div>
                    </header>

                    <section className={`${theme.cardBg} ${theme.border} border rounded-lg p-6`}>
                        <h2 className={`text-xl font-semibold ${theme.text.primary} mb-4`}>Project Overview</h2>
                        <div className={`${theme.text.secondary} leading-relaxed`}>
                            {project.description}
                        </div>
                    </section>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <section className={`${theme.cardBg} ${theme.border} border rounded-lg p-6`}>
                            <h2 className={`text-xl font-semibold ${theme.text.primary} mb-4`}>Team Members</h2>
                            <div className="space-y-2">
                                {project.students?.map((student, idx) => (
                                    <div key={idx} className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                        <span className={theme.text.secondary}>{student}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className={`${theme.cardBg} ${theme.border} border rounded-lg p-6`}>
                            <h2 className={`text-xl font-semibold ${theme.text.primary} mb-4`}>Milestone Timeline</h2>
                            <div className="space-y-2">
                                {project.milestoneDates?.map((milestone, idx) => (
                                    <div key={idx} className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        <span className={theme.text.secondary}>{milestone}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    <section className={`${theme.cardBg} ${theme.border} border rounded-lg p-6`}>
                        <h2 className={`text-xl font-semibold ${theme.text.primary} mb-4`}>Repository</h2>
                        <div>
                            <a
                                className="text-blue-600 hover:text-blue-700 hover:underline font-mono text-sm break-all"
                                href={project.githubRepo}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {project.githubRepo}
                            </a>
                        </div>
                    </section>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <a
                            href={`${GitView}//?repo=${encodeURIComponent(project.githubRepo)}`}
                            rel="noopener noreferrer"
                            className="flex-1"
                        >
                            <button className={`w-full ${theme.button} ${theme.buttonBorder} border ${theme.text.primary} px-4 py-2 rounded-md font-medium text-sm transition-colors duration-200 flex items-center justify-center gap-2`}>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                    <path d="M1.643 3.143L.427 1.927A.25.25 0 000 2.104V5.75c0 .138.112.25.25.25h3.646a.25.25 0 00.177-.427L2.715 4.215a6.5 6.5 0 11-1.18 4.458.75.75 0 10-1.493.154 8.001 8.001 0 101.6-5.684zM7.75 4a.75.75 0 01.75.75v2.992l2.028.812a.75.75 0 01-.557 1.392l-2.5-1A.75.75 0 017 8.25v-3.5A.75.75 0 017.75 4z"/>
                                </svg>
                                <span className="hidden sm:inline">View Git Timeline</span>
                                <span className="sm:hidden">Git Timeline</span>
                            </button>
                        </a>
                        
                        <button className={`flex-1 ${theme.button} ${theme.buttonBorder} border ${theme.text.primary} px-4 py-2 rounded-md font-medium text-sm transition-colors duration-200 flex items-center justify-center gap-2`} onClick={handleViewPDF}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M4 0a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V2a2 2 0 00-2-2H4zm0 1h8a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V2a1 1 0 011-1z"/>
                                <path d="M4.603 12.087a.81.81 0 01-.438-.42c-.195-.388-.13-.776.08-1.102.198-.307.526-.568.897-.787a7.68 7.68 0 011.482-.645 19.701 19.701 0 00.062-1.689 6.179 6.179 0 01-.671-1.377c-.161-.5-.198-.76-.115-.949.056-.133.174-.25.322-.316.215-.097.504-.045.652.174.191.284.339.742.339 1.32 0 .261-.025.487-.065.69-.014.08-.028.15-.044.214.417-.473.964-.85 1.518-.962.132-.027.285-.014.427.034.191.064.389.186.555.365.417.449.535 1.081.32 1.565-.117.265-.305.47-.564.605-.356.185-.756.264-1.204.264-.227 0-.461-.022-.693-.069a14.8 14.8 0 01-1.67.662 5.44 5.44 0 01-.055.02c-.415.924-.85 1.64-1.415 1.985-.145.088-.394.159-.633.094zm2.196-8.59a5.58 5.58 0 01-.227.935c.168.506.407.894.723 1.148.065-.28.099-.577.099-.885 0-.515-.121-.87-.252-1.148a.757.757 0 00-.343-.05z"/>
                            </svg>
                            <span className="hidden sm:inline">View Project Summary</span>
                            <span className="sm:hidden">PDF Summary</span>
                        </button>
                        
                        <button
                            className={`flex-1 ${theme.accent} ${theme.accentHover} text-white px-4 py-2 rounded-md font-medium text-sm transition-colors duration-200 flex items-center justify-center gap-2`}
                            onClick={() => navigate(`/student/project/${id}/edit`)}
                        >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M11.013 1.427a1.75 1.75 0 012.474 0l1.086 1.086a1.75 1.75 0 010 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 01-.927-.928l.929-3.25a1.75 1.75 0 01.445-.758l8.61-8.61zm1.414 1.06a.25.25 0 00-.354 0L10.811 3.75l1.439 1.44 1.263-1.263a.25.25 0 000-.354l-1.086-1.086zM11.189 6.25L9.75 4.81l-6.286 6.287a.25.25 0 00-.064.108l-.558 1.953 1.953-.558a.249.249 0 00.108-.064l6.286-6.286z"/>
                            </svg>
                            <span className="hidden sm:inline">Edit Project</span>
                            <span className="sm:hidden">Edit</span>
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ProjectDetail;