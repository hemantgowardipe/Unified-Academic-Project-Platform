import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/ProjectDetail.css';

const ProjectDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [pdfFile, setPdfFile] = useState(null);
    const [isDark, setIsDark] = useState(false);
    const [mounted, setMounted] = useState(false);
    const Project_URL = import.meta.env.VITE_PROJECTS;
    const GitView = import.meta.env.VITE_GITVIEW;
    const role = sessionStorage.getItem('role');
    const [remarkText, setRemarkText] = useState('');

    // Detect system theme preference
    useEffect(() => {
        const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setIsDark(darkModeMediaQuery.matches);
        setTimeout(() => setMounted(true), 100);

        const handleThemeChange = (e) => {
            setIsDark(e.matches);
        };

        darkModeMediaQuery.addEventListener('change', handleThemeChange);
        return () => darkModeMediaQuery.removeEventListener('change', handleThemeChange);
    }, []);

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

    // Enhanced theme system
    const theme = {
        bg: isDark ? 'bg-slate-950' : 'bg-gray-50',
        surfaceHigh: isDark ? 'bg-slate-900' : 'bg-white',
        surfaceMid: isDark ? 'bg-slate-800/50' : 'bg-white/80',
        border: isDark ? 'border-slate-800' : 'border-gray-200',
        borderHover: isDark ? 'group-hover:border-slate-700' : 'group-hover:border-gray-300',
        text: {
            headline: isDark ? 'text-slate-100' : 'text-gray-900',
            body: isDark ? 'text-slate-300' : 'text-gray-700',
            subtle: isDark ? 'text-slate-400' : 'text-gray-500',
            link: isDark ? 'text-blue-400' : 'text-blue-600'
        },
        accent: isDark ? 'bg-emerald-600' : 'bg-emerald-600',
        accentHover: isDark ? 'hover:bg-emerald-500' : 'hover:bg-emerald-700',
        button: isDark ? 'bg-slate-800 hover:bg-slate-700' : 'bg-gray-100 hover:bg-gray-200',
        glass: isDark ? 'backdrop-blur-xl bg-slate-900/80' : 'backdrop-blur-xl bg-white/80',
        input: isDark ? 'bg-slate-800 border-slate-700 text-slate-100' : 'bg-white border-gray-300 text-gray-900',
        remarkText: isDark ? 'text-slate-400' : 'text-gray-500'
    };

    if (!project)
        return (
            <div className={`min-h-screen transition-all duration-700 ${theme.bg} flex items-center justify-center relative overflow-hidden`}>
                {/* Ambient background effects */}
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-400/10 to-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute top-1/3 -left-32 w-64 h-64 bg-gradient-to-br from-violet-400/10 to-purple-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                
                <div className="flex flex-col items-center gap-6 text-center relative z-10">
                    <div className="relative">
                        <div className={`w-16 h-16 ${theme.surfaceHigh} ${theme.border} border-2 rounded-2xl flex items-center justify-center shadow-2xl`}>
                            <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                        <div className="absolute -inset-4 bg-gradient-to-r from-emerald-600/20 to-blue-600/20 blur-xl rounded-full opacity-75"></div>
                    </div>
                    <div className="space-y-2">
                        <h3 className={`text-lg font-medium tracking-tight ${theme.text.headline}`}>Loading Project</h3>
                        <p className={`text-sm ${theme.text.subtle}`}>Fetching project details...</p>
                    </div>
                </div>
            </div>
        );

    return (
        <div className={`min-h-screen transition-all duration-700 ${theme.bg} relative`}>
            {/* Ambient background effects */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-400/10 to-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute top-1/3 -left-32 w-64 h-64 bg-gradient-to-br from-violet-400/10 to-purple-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <main className="relative z-10">
                <div className="max-w-6xl mx-auto px-6 py-12">
                    {/* HEADER */}
                    <header className={`space-y-8 transition-all duration-1000 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                                <span className={`text-sm font-medium tracking-widest uppercase ${theme.text.subtle}`}>Active Project</span>
                            </div>
                            <h1 className={`text-4xl md:text-5xl font-bold tracking-tight ${theme.text.headline}`}>
                                {project.title}
                            </h1>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className={`group ${theme.surfaceHigh} ${theme.border} ${theme.borderHover} border rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}>
                                <div className="space-y-2">
                                    <span className={`text-xs font-medium tracking-wider uppercase ${theme.text.subtle}`}>Project Guide</span>
                                    <div className={`text-lg font-semibold ${theme.text.headline}`}>{project.guideName}</div>
                                </div>
                            </div>
                            
                            <div className={`group ${theme.surfaceHigh} ${theme.border} ${theme.borderHover} border rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}>
                                <div className="space-y-2">
                                    <span className={`text-xs font-medium tracking-wider uppercase ${theme.text.subtle}`}>Project Co-Guide</span>
                                    <div className={`text-lg font-semibold ${theme.text.headline}`}>{project.coGuideName}</div>
                                </div>
                            </div>

                            <div className={`group ${theme.surfaceHigh} ${theme.border} ${theme.borderHover} border rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}>
                                <div className="space-y-2">
                                    <span className={`text-xs font-medium tracking-wider uppercase ${theme.text.subtle}`}>Start Date</span>
                                    <div className={`text-lg font-semibold ${theme.text.headline}`}>{project.startDate}</div>
                                </div>
                            </div>

                            <div className={`group ${theme.surfaceHigh} ${theme.border} ${theme.borderHover} border rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}>
                                <div className="space-y-2">
                                    <span className={`text-xs font-medium tracking-wider uppercase ${theme.text.subtle}`}>Final Submission</span>
                                    <div className={`text-lg font-semibold ${theme.text.headline}`}>{project.finalSubmissionDate}</div>
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* DESCRIPTION */}
                    <section className={`transition-all duration-1000 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <div className={`group ${theme.surfaceHigh} ${theme.border} ${theme.borderHover} border rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-500`}>
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <h2 className={`text-2xl font-bold tracking-tight ${theme.text.headline}`}>Project Overview</h2>
                                </div>
                                <div className={`text-lg leading-relaxed ${theme.text.body} font-light`}>
                                    {project.description}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* TEAM + EMAIL */}
                    <div className={`grid grid-cols-1 xl:grid-cols-2 gap-8 transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <section className={`group ${theme.surfaceHigh} ${theme.border} ${theme.borderHover} border rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-500`}>
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                        </svg>
                                    </div>
                                    <h2 className={`text-2xl font-bold tracking-tight ${theme.text.headline}`}>Team Members</h2>
                                </div>
                                <div className="space-y-4">
                                    {project.students?.map((student, idx) => (
                                        <div 
                                            key={idx} 
                                            className={`flex items-center gap-4 p-4 ${theme.surfaceMid} rounded-xl transition-all duration-300 hover:scale-105`}
                                            style={{ animationDelay: `${idx * 100}ms` }}
                                        >
                                            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                                {student.charAt(0).toUpperCase()}
                                            </div>
                                            <span className={`font-medium ${theme.text.body}`}>{student}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        <section className={`group ${theme.surfaceHigh} ${theme.border} ${theme.borderHover} border rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-500`}>
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                        </svg>
                                    </div>
                                    <h2 className={`text-2xl font-bold tracking-tight ${theme.text.headline}`}>Team Lead's E-mail</h2>
                                </div>
                                <div className={`p-4 ${theme.surfaceMid} rounded-xl`}>
                                    <a 
                                        href={`mailto:${project.email}`}
                                        className={`${theme.text.link} hover:underline font-mono text-sm md:text-base break-all transition-all duration-200 hover:scale-105 inline-block`}
                                    >
                                        {project.email}
                                    </a>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* REPO */}
                    <section className={`transition-all duration-1000 delay-400 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <div className={`group ${theme.surfaceHigh} ${theme.border} ${theme.borderHover} border rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-500`}>
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-black rounded-xl flex items-center justify-center shadow-lg">
                                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                        </svg>
                                    </div>
                                    <h2 className={`text-2xl font-bold tracking-tight ${theme.text.headline}`}>Repository</h2>
                                </div>
                                <div className={`p-6 ${theme.surfaceMid} rounded-2xl`}>
                                    <a
                                        className={`${theme.text.link} hover:underline font-mono text-sm md:text-base break-all transition-all duration-200 hover:scale-105 inline-block`}
                                        href={project.githubRepo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {project.githubRepo}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* ACTIONS */}
                    <div className={`transition-all duration-1000 delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <div className={`${theme.glass} ${theme.border} border rounded-2xl p-6 shadow-2xl`}>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <a
                                    href={`${GitView}//?repo=${encodeURIComponent(project.githubRepo)}`}
                                    rel="noopener noreferrer"
                                    className="flex-1 group"
                                >
                                    <button className={`w-full ${theme.button} ${theme.border} border px-6 py-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-3 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl ${theme.text.body}`}>
                                        <svg className="w-5 h-5 transition-transform duration-200 group-hover:rotate-12" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M1.643 3.143L.427 1.927A.25.25 0 000 2.104V5.75c0 .138.112.25.25.25h3.646a.25.25 0 00.177-.427L2.715 4.215a6.5 6.5 0 11-1.18 4.458.75.75 0 10-1.493.154 8.001 8.001 0 101.6-5.684zM7.75 4a.75.75 0 01.75.75v2.992l2.028.812a.75.75 0 01-.557 1.392l-2.5-1A.75.75 0 017 8.25v-3.5A.75.75 0 017.75 4z"/>
                                        </svg>
                                        <span className="font-semibold">View Git Timeline</span>
                                    </button>
                                </a>

                                <button 
                                    className={`flex-1 group ${theme.button} ${theme.border} border px-6 py-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-3 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl ${theme.text.body}`} 
                                    onClick={handleViewPDF}
                                >
                                    <svg className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M4 0a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V2a2 2 0 00-2-2H4zm0 1h8a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V2a1 1 0 011-1z"/>
                                        <path d="M4.603 12.087a.81.81 0 01-.438-.42c-.195-.388-.13-.776.08-1.102.198-.307.526-.568.897-.787a7.68 7.68 0 011.482-.645 19.701 19.701 0 00.062-1.689 6.179 6.179 0 01-.671-1.377c-.161-.5-.198-.76-.115-.949.056-.133.174-.25.322-.316.215-.097.504-.045.652.174.191.284.339.742.339 1.32 0 .261-.025.487-.065.69-.014.08-.028.15-.044.214.417-.473.964-.85 1.518-.962.132-.027.285-.014.427.034.191.064.389.186.555.365.417.449.535 1.081.32 1.565-.117.265-.305.47-.564.605-.356.185-.756.264-1.204.264-.227 0-.461-.022-.693-.069a14.8 14.8 0 01-1.67.662 5.44 5.44 0 01-.055.02c-.415.924-.85 1.64-1.415 1.985-.145.088-.394.159-.633.094zm2.196-8.59a5.58 5.58 0 01-.227.935c.168.506.407.894.723 1.148.065-.28.099-.577.099-.885 0-.515-.121-.87-.252-1.148a.757.757 0 00-.343-.05z"/>
                                    </svg>
                                    <span className="font-semibold">View Project Summary PDF</span>
                                </button>

                                {/* STUDENT-ONLY: Edit button */}
                                {role === 'STUDENT' && (
                                    <button
                                        className={`flex-1 group ${theme.accent} ${theme.accentHover} text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl relative overflow-hidden`}
                                        onClick={() => navigate(`/student/project/${id}/edit`)}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        <svg className="w-5 h-5 transition-transform duration-200 group-hover:rotate-12 relative z-10" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M11.013 1.427a1.75 1.75 0 012.474 0l1.086 1.086a1.75 1.75 0 010 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 01-.927-.928l.929-3.25a1.75 1.75 0 01.445-.758l8.61-8.61zm1.414 1.06a.25.25 0 00-.354 0L10.811 3.75l1.439 1.44 1.263-1.263a.25.25 0 000-.354l-1.086-1.086zM11.189 6.25L9.75 4.81l-6.286 6.287a.25.25 0 00-.064.108l-.558 1.953 1.953-.558a.249.249 0 00.108-.064l6.286-6.286z"/>
                                        </svg>
                                        <span className="font-semibold relative z-10">Edit Project</span>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Remarks Section */}
                    <section className={`transition-all duration-1000 delay-600 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <div className={`group ${theme.surfaceHigh} ${theme.border} ${theme.borderHover} border rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-500`}>
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                        </svg>
                                    </div>
                                    <h2 className={`text-2xl font-bold tracking-tight ${theme.text.headline}`}>Remarks</h2>
                                </div>

                                <div className="space-y-4">
                                    {project.remarks && project.remarks.length > 0 ? (
                                        project.remarks.map((remark, idx) => (
                                            <div 
                                                key={idx} 
                                                className={`p-6 ${theme.surfaceMid} rounded-xl border-l-4 border-emerald-500`}
                                            >
                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-2">
                                                        <span className={`font-semibold ${theme.text.headline}`}>{remark.author}</span>
                                                        <span className={`text-xs ${theme.text.subtle}`}>
                                                            {new Date(remark.createdAt).toLocaleString()}
                                                        </span>
                                                    </div>
                                                    <p className={`${theme.text.body} leading-relaxed`}>{remark.text}</p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className={`text-center ${theme.text.subtle} py-8`}>No remarks yet.</p>
                                    )}
                                </div>

                                {/* Show remark input only for ADMIN */}
                                {role === "ADMIN" && (
                                    <div className="flex gap-3 pt-6 border-t border-opacity-20" style={{ borderColor: isDark ? '#475569' : '#d1d5db' }}>
                                        <input
                                            type="text"
                                            className={`flex-1 rounded-xl ${theme.input} border px-4 py-3 text-sm placeholder-opacity-60 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200`}
                                            placeholder="Add a remark..."
                                            value={remarkText}
                                            onChange={(e) => setRemarkText(e.target.value)}
                                            style={{ 
                                                backgroundColor: isDark ? '#1e293b' : '#ffffff',
                                                borderColor: isDark ? '#374151' : '#d1d5db',
                                                color: isDark ? '#f1f5f9' : '#1f2937'
                                            }}
                                        />
                                        <button
                                            onClick={handleAddRemark}
                                            className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-blue-600 text-white text-sm font-semibold hover:scale-105 active:scale-95 focus:ring-2 focus:ring-emerald-500 transition-all duration-200 shadow-lg hover:shadow-xl"
                                        >
                                            Add Remark
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>

                </div>
            </main>
        </div>
    );
};

export default ProjectDetail;