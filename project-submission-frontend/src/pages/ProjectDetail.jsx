import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Sparkles } from "lucide-react";
import axios from 'axios';
import '../styles/ProjectDetail.css';
import useDarkMode from "../hooks/useDarkMode";     // ✅ added
import { getTheme } from "../utils/themeConfig";     // ✅ added
import AiCompanionSidebar from "../components/AiCompanionSidebar";
import AiCompanionModal from "../components/AiCompanionModal";

const ProjectDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [pdfFile, setPdfFile] = useState(null);
    const Project_URL = import.meta.env.VITE_PROJECTS;
    const GitView = import.meta.env.VITE_GITVIEW;
    const role = sessionStorage.getItem('role');
    const [remarkText, setRemarkText] = useState('');
    const [showAiSidebar, setShowAiSidebar] = useState(false);
    const [showAiModal, setShowAiModal] = useState(false);

    // ✅ Theme setup
    const isDark = useDarkMode();
    const theme = getTheme(isDark);

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

    // Set document title on mount
    useEffect(() => {
        document.title = "UAPP | Project Detail";
    }, []);

    const handleAddRemark = async () => {
        if (!remarkText.trim()) return;

        try {
            const token = sessionStorage.getItem("token");

            await axios.post(
                `${Project_URL}/${id}/remarks`,
                { text: remarkText.trim() },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setRemarkText("");

            const res = await axios.get(`${Project_URL}/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setProject(res.data);

        } catch (e) {
            console.error("Add remark error", e);
            alert("Failed to add remark");
        }
    };

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

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this project? This action cannot be undone.")) return;

        try {
            const token = sessionStorage.getItem("token");
            await axios.delete(`${Project_URL}/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            alert("Project deleted successfully!");
            navigate("/student/dashboard");
        } catch (err) {
            console.error("Delete failed", err);
            alert("Failed to delete project. Please try again.");
        }
    };

    if (!project)
        return (
            <div className={`pd-bg ${theme.bg}`}>
                <div className="pd-grid-overlay"></div>
                <div className="pd-gradient-orb pd-gradient-orb-1"></div>
                <div className="pd-gradient-orb pd-gradient-orb-2"></div>
                <div className="pd-loading">
                    <div className="pd-loading-spinner"></div>
                    <span className={`${theme.text.primary}`}>Loading Project...</span>
                </div>
            </div>
        );

    return (
        <div className={`pd-bg transition-colors duration-300 ${theme.bg}`}>
            <div className={`transition-all duration-500 ${showAiSidebar ? "md:mr-[420px]" : ""}`}>
            <div className="pd-grid-overlay"></div>
            <div className="pd-gradient-orb pd-gradient-orb-1"></div>
            <div className="pd-gradient-orb pd-gradient-orb-2"></div>

            <main className="pd-content">
                <div className="pd-container">
                    {/* HEADER */}
                    <header className="pd-header">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                            <h1 className={`text-3xl font-bold ${theme.text.primary}`}>
                                {project.title}
                            </h1>

                            <button
                                onClick={() => setShowAiSidebar(true)}
                                className={`group relative flex items-center gap-2 px-4 py-2 rounded-xl border ${theme.border} ${theme.cardBg} hover:shadow-lg transition-all duration-300`}
                            >
                                {/* Glowing AI Icon */}
                                <div className="relative">
                                <Sparkles
                                    className="w-5 h-5 text-yellow-400 group-hover:scale-110 transition-transform duration-200"
                                />
                                <span className="absolute inset-0 blur-md bg-yellow-400 opacity-40 group-hover:opacity-70 transition-opacity"></span>
                                </div>

                                <span
                                className={`text-sm font-medium ${theme.text.primary} group-hover:text-yellow-300`}
                                >
                                AI Companion
                                </span>
                            </button>
                        </div>


                        <div className="pd-metadata">
                            <div className={`pd-meta-card ${theme.cardBg} ${theme.border}`}>
                                <span className={`pd-meta-label ${theme.text.secondary}`}>Project Guide</span>
                                <span className={`pd-meta-value ${theme.text.primary}`}>{project.guideName}</span>
                            </div>
                            <div className={`pd-meta-card ${theme.cardBg} ${theme.border}`}>
                                <span className={`pd-meta-label ${theme.text.secondary}`}>Project Co-Guide</span>
                                <span className={`pd-meta-value ${theme.text.primary}`}>{project.coGuideName}</span>
                            </div>

                            <div className="pd-meta-grid">
                                <div className={`pd-meta-card ${theme.cardBg} ${theme.border}`}>
                                    <span className={`pd-meta-label ${theme.text.secondary}`}>Start Date</span>
                                    <span className={`pd-meta-value ${theme.text.primary}`}>{project.startDate}</span>
                                </div>
                                <div className={`pd-meta-card ${theme.cardBg} ${theme.border}`}>
                                    <span className={`pd-meta-label ${theme.text.secondary}`}>Final Submission</span>
                                    <span className={`pd-meta-value ${theme.text.primary}`}>
                                        {project.finalSubmissionDate}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* DESCRIPTION */}
                    <section className="pd-description-section">
                        <div className="pd-section-header">
                            <h2 className={`${theme.text.primary}`}>Project Overview</h2>
                            <div className="pd-section-line"></div>
                        </div>
                        <div className={`pd-description-content ${theme.text.secondary}`}>{project.description}</div>
                    </section>

                    {/* TEAM + TIMELINE */}
                    <div className="pd-main-grid">
                        <section className="pd-section">
                            <div className="pd-section-header">
                                <h2 className={`${theme.text.primary}`}>Team Members</h2>
                                <div className="pd-section-line"></div>
                            </div>
                            <div className="pd-list-container">
                                {project.students?.map((student, idx) => (
                                    <div key={idx} className="pd-list-item">
                                        <div className="pd-list-marker"></div>
                                        <span className={`${theme.text.secondary}`}>{student}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="pd-section">
                            <div className="pd-section-header">
                                <h2 className={`${theme.text.primary}`}>Team Lead's E-mail</h2>
                                <div className="pd-section-line"></div>
                            </div>
                            <div className={`pd-description-content ${theme.text.secondary}`}>{project.email}</div>
                        </section>
                    </div>

                    {/* REPO + DEMO */}
                    <section className="pd-section pd-repo-section pd-repo-section--github">
                        <div className="pd-section-header">
                            <h2 className={`${theme.text.primary}`}>Repository</h2>
                            <div className="pd-section-line"></div>
                        </div>
                        <div className="pd-repo-content">
                            <a className={`pd-repo-link ${theme.text.secondary}`} href={project.githubRepo} rel="noopener noreferrer">
                                {project.githubRepo}
                            </a>
                        </div>
                    </section>

                    <section className="pd-section pd-repo-section pd-repo-section--demo">
                        <div className="pd-section-header">
                            <h2 className={`${theme.text.primary}`}>Demo Url</h2>
                            <div className="pd-section-line"></div>
                        </div>
                        <div className="pd-repo-content">
                            <a
                                className={`pd-repo-link ${theme.text.secondary}`}
                                href={project.url}
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                {project.url}
                            </a>
                        </div>
                    </section>

                    {/* ACTIONS */}
                    <div className="pd-actions">
                        <a
                            href={`${GitView}//?repo=${encodeURIComponent(project.githubRepo)}`}
                            rel="noopener noreferrer"
                            className="pd-btn-link"
                        >
                            <button className={`pd-btn ${theme.accent}`}>
                                <span className="pd-btn-text">View Git Timeline</span>
                                <div className="pd-btn-glow"></div>
                            </button>
                        </a>

                        <button className={`pd-btn ${theme.accentHover}`} onClick={handleViewPDF}>
                            <span className="pd-btn-text">View Project Summary PDF</span>
                            <div className="pd-btn-glow"></div>
                        </button>

                        {role === 'STUDENT' && (
                            <button className="pd-btn bg-red-600 hover:bg-red-700 text-white" onClick={handleDelete}>
                                <span className="pd-btn-text">Delete Project</span>
                                <div className="pd-btn-glow"></div>
                            </button>
                        )}

                        {role === 'STUDENT' && (
                            <button className={`pd-btn ${theme.accentHover}`} onClick={() => navigate(`/student/project/${id}/edit`)}>
                                <span className="pd-btn-text">Edit Project</span>
                                <div className="pd-btn-glow"></div>
                            </button>
                        )}

                        {/* <button
                            onClick={() => setShowAiSidebar(true)}
                            className={`pd-btn ${theme.accentHover} flex items-center gap-2`}
                            >
                            <span className="pd-btn-text">AI Companion</span>
                            <div className="pd-btn-glow"></div>
                        </button> */}



                    </div>

                    {/* REMARKS */}
                    <section className="pd-section">
                        <div className="pd-section-header">
                            <h2 className={`${theme.text.primary}`}>Remarks</h2>
                            <div className="pd-section-line"></div>
                        </div>

                        <div className="pd-list-container">
                            {project.remarks && project.remarks.length > 0 ? (
                                project.remarks.map((remark, idx) => (
                                    <div key={idx} className="pd-list-item">
                                        <div className="pd-list-marker"></div>
                                        <div>
                                            <p className={`${theme.text.secondary}`}>
                                                <strong>{remark.author}:</strong> {remark.text}
                                            </p>
                                            <small className="text-gray-400">
                                                {new Date(remark.createdAt).toLocaleString()}
                                            </small>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className={`${theme.text.muted}`}>No remarks yet.</p>
                            )}
                        </div>

                        {role === "ADMIN" && (
                            <div className="mt-4 flex gap-2">
                                <input
                                    type="text"
                                    className={`flex-1 rounded-lg bg-gray-800 border border-gray-700 px-4 py-2 text-sm ${theme.text.primary} placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
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
            {showAiModal && (
            <AiCompanionModal
                projectId={id}
                onClose={() => setShowAiModal(false)}
            />
            )}
            </div>

            {/* AI Companion Sidebar */}
            {showAiSidebar && (
            <AiCompanionSidebar
                projectId={id}
                onClose={() => setShowAiSidebar(false)}
            />
            )}
        </div>
    );
};

export default ProjectDetail;
