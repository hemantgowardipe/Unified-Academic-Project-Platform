import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/ProjectDetail.css';

// Theme configuration function
export function getTheme(isDark) {
    return {
        bg: isDark ? "bg-[#0d1117]" : "bg-[#ffffff]",
        cardBg: isDark ? "bg-[#161b22]" : "bg-white",
        border: isDark ? "border-[#30363d]" : "border-[#d1d9e0]",
        text: {
            primary: isDark ? "text-[#f0f6fc]" : "text-[#1f2328]",
            secondary: isDark ? "text-[#8d96a0]" : "text-[#656d76]",
            muted: isDark ? "text-[#7d8590]" : "text-[#848d97]",
        },
        accent: isDark ? "bg-[#1f6feb]" : "bg-[#0969da]",
        accentHover: isDark ? "hover:bg-[#388bfd]" : "hover:bg-[#0860ca]",
        button: isDark
            ? "bg-[#21262d] hover:bg-[#30363d]"
            : "bg-[#f6f8fa] hover:bg-[#f3f4f6]",
        buttonBorder: isDark ? "border-[#30363d]" : "border-[#d1d9e0]",
        searchBg: isDark ? "bg-[#0d1117]" : "bg-white",
        searchBorder: isDark
            ? "border-[#30363d] focus:border-[#388bfd]"
            : "border-[#d1d9e0] focus:border-[#0969da]",
    };
}

const ProjectDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [pdfFile, setPdfFile] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const Project_URL = import.meta.env.VITE_PROJECTS;
    const GitView = import.meta.env.VITE_GITVIEW;
    const role = sessionStorage.getItem('role');
    const [remarkText, setRemarkText] = useState('');

    // Get current theme
    const theme = getTheme(isDarkMode);

    // Auto theme detection and state management
    useEffect(() => {
        // Check for saved theme preference or default to system preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setIsDarkMode(savedTheme === 'dark');
        } else {
            // Auto-detect system theme
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setIsDarkMode(prefersDark);
        }

        // Listen for system theme changes
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleThemeChange = (e) => {
            if (!localStorage.getItem('theme')) {
                setIsDarkMode(e.matches);
            }
        };

        mediaQuery.addEventListener('change', handleThemeChange);
        return () => mediaQuery.removeEventListener('change', handleThemeChange);
    }, []);

    // Save theme preference when it changes
    useEffect(() => {
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        // Apply theme to document body
        document.body.className = isDarkMode ? 'dark-theme' : 'light-theme';
    }, [isDarkMode]);

    // Theme toggle function
    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    // 🔹 Fetch project details
    const loadProject = () => {
        const token = sessionStorage.getItem('token');
        axios
            .get(`${Project_URL}/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => setProject(res.data))
            .catch((err) => console.error('Error loading project', err));
    };

    useEffect(() => {
        loadProject();
    }, [id]);

    const handleAddRemark = async () => {
        if (!remarkText.trim()) return;

        try {
            const token = sessionStorage.getItem("token");

            await axios.post(
                `${Project_URL}/${id}/remarks`,
                { text: remarkText.trim() }, // ✅ matches AddRemarkRequest
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setRemarkText("");

            // Refresh project after adding remark
            const res = await axios.get(`${Project_URL}/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setProject(res.data);

        } catch (e) {
            console.error("Add remark error", e);
            alert("Failed to add remark");
        }
    };

    // 🔹 View PDF
    const handleViewPDF = async () => {
        try {
            const token = sessionStorage.getItem('token');
            const response = await axios.get(`${Project_URL}/${id}/pdf`, {
                headers: { Authorization: `Bearer ${token}` },
                responseType: 'blob',
            });

            const file = new Blob([response.data], { type: 'application/pdf' });
            const fileURL = URL.createObjectURL(file);
            window.open(fileURL, '_blank');
        } catch (err) {
            console.error('Error fetching PDF', err);
            alert('Could not load PDF');
        }
    };

    if (!project)
        return (
            <div className="pd-bg" data-theme={isDarkMode ? 'dark' : 'light'}>
                <div className="pd-grid-overlay"></div>
                <div className="pd-gradient-orb pd-gradient-orb-1"></div>
                <div className="pd-gradient-orb pd-gradient-orb-2"></div>
                <div className="pd-loading">
                    <div className="pd-loading-spinner"></div>
                    <span>Loading Project...</span>
                </div>
            </div>
        );

    return (
        <div className="pd-bg" data-theme={isDarkMode ? 'dark' : 'light'}>
            <div className="pd-grid-overlay"></div>
            <div className="pd-gradient-orb pd-gradient-orb-1"></div>
            <div className="pd-gradient-orb pd-gradient-orb-2"></div>

            {/* Theme Toggle Button - Only Addition to UI */}
            <button
                onClick={toggleTheme}
                className="fixed top-4 right-4 z-50 p-3 rounded-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
            >
                {isDarkMode ? (
                    <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"/>
                    </svg>
                ) : (
                    <svg className="w-5 h-5 text-slate-700" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"/>
                    </svg>
                )}
            </button>

            <main className="pd-content">
                <div className="pd-container">
                    {/* HEADER - Exact same structure */}
                    <header className="pd-header">
                        <div className="pd-title-section">
                            <h1 className="pd-title">{project.title}</h1>
                            <div className="pd-title-glow"></div>
                        </div>

                        <div className="pd-metadata">
                            <div className="pd-meta-card">
                                <span className="pd-meta-label">Project Guide</span>
                                <span className="pd-meta-value">{project.guideName}</span>
                            </div>
                            <div className="pd-meta-card">
                                <span className="pd-meta-label">Project Co-Guide</span>
                                <span className="pd-meta-value">{project.coGuideName}</span>
                            </div>

                            <div className="pd-meta-grid">
                                <div className="pd-meta-card">
                                    <span className="pd-meta-label">Start Date</span>
                                    <span className="pd-meta-value">{project.startDate}</span>
                                </div>
                                <div className="pd-meta-card">
                                    <span className="pd-meta-label">Final Submission</span>
                                    <span className="pd-meta-value">
                    {project.finalSubmissionDate}
                  </span>
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* DESCRIPTION - Exact same structure */}
                    <section className="pd-description-section">
                        <div className="pd-section-header">
                            <h2>Project Overview</h2>
                            <div className="pd-section-line"></div>
                        </div>
                        <div className="pd-description-content">{project.description}</div>
                    </section>

                    {/* TEAM + TIMELINE - Exact same structure */}
                    <div className="pd-main-grid">
                        <section className="pd-section">
                            <div className="pd-section-header">
                                <h2>Team Members</h2>
                                <div className="pd-section-line"></div>
                            </div>
                            <div className="pd-list-container">
                                {project.students?.map((student, idx) => (
                                    <div key={idx} className="pd-list-item">
                                        <div className="pd-list-marker"></div>
                                        <span>{student}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                        <section className="pd-section">
                            <div className="pd-section-header">
                                <h2>Team Lead's E-mail</h2>
                                <div className="pd-section-line"></div>
                            </div>
                            <div className="pd-description-content">{project.email}</div>
                        </section>
                    </div>

                    {/* REPO - Exact same structure */}
                    <section className="pd-section pd-repo-section">
                        <div className="pd-section-header">
                            <h2>Repository</h2>
                            <div className="pd-section-line"></div>
                        </div>
                        <div className="pd-repo-content">
                            <a
                                className="pd-repo-link"
                                href={project.githubRepo}
                                rel="noopener noreferrer"
                            >
                                {project.githubRepo}
                            </a>
                        </div>
                    </section>

                    {/* ACTIONS - Exact same structure */}
                    <div className="pd-actions">
                        <a
                            href={`${GitView}//?repo=${encodeURIComponent(project.githubRepo)}`}
                            rel="noopener noreferrer"
                            className="pd-btn-link"
                        >
                            <button className="pd-btn">
                                <span className="pd-btn-text">View Git Timeline</span>
                                <div className="pd-btn-glow"></div>
                            </button>
                        </a>

                        <button className="pd-btn" onClick={handleViewPDF}>
                            <span className="pd-btn-text">View Project Summary PDF</span>
                            <div className="pd-btn-glow"></div>
                        </button>

                        {/* STUDENT-ONLY: Edit button - Exact same structure */}
                        {role === 'STUDENT' && (
                            <button
                                className="pd-btn"
                                onClick={() => navigate(`/student/project/${id}/edit`)}
                            >
                                <span className="pd-btn-text">Edit Project</span>
                                <div className="pd-btn-glow"></div>
                            </button>
                        )}
                    </div>

                    {/* ADMIN-ONLY: Remarks section - Exact same structure */}
                    <section className="pd-section">
                        <div className="pd-section-header">
                            <h2>Remarks</h2>
                            <div className="pd-section-line"></div>
                        </div>

                        <div className="pd-list-container">
                            {project.remarks && project.remarks.length > 0 ? (
                                project.remarks.map((remark, idx) => (
                                    <div key={idx} className="pd-list-item">
                                        <div className="pd-list-marker"></div>
                                        <div>
                                            <p><strong>{remark.author}:</strong> {remark.text}</p>
                                            <small className="text-gray-400">
                                                {new Date(remark.createdAt).toLocaleString()}
                                            </small>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-400">No remarks yet.</p>
                            )}
                        </div>

                        {/* Show remark input only for ADMIN - Exact same structure */}
                        {role === "ADMIN" && (
                            <div className="mt-4 flex gap-2">
                                <input
                                    type="text"
                                    className="flex-1 rounded-lg bg-gray-800 border border-gray-700 px-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                    placeholder="Write a remark..."
                                    value={remarkText}
                                    onChange={(e) => setRemarkText(e.target.value)}
                                />
                                <button
                                    onClick={handleAddRemark}
                                    className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium hover:opacity-90 focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 transition"
                                >
                                    Add Remark
                                </button>
                            </div>
                        )}
                    </section>

                </div>
            </main>
        </div>
    );
};

export default ProjectDetail;