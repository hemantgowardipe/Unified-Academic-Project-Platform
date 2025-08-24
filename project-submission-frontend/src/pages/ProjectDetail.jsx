import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProjectDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [pdfFile, setPdfFile] = useState(null);
    const Project_URL = import.meta.env.VITE_PROJECTS;
    const GitView = import.meta.env.VITE_GITVIEW;

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

    if (!project) {
        return (
            <div style={styles.loadingContainer}>
                <div style={styles.loadingSpinner}>
                    <div style={styles.spinner}></div>
                    <span style={styles.loadingText}>Loading Project...</span>
                </div>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <div style={styles.content}>
                {/* Header Section */}
                <header style={styles.header}>
                    <div style={styles.titleSection}>
                        <h1 style={styles.title}>{project.title}</h1>
                        <div style={styles.titleMeta}>
                            <span style={styles.guideLabel}>Guided by</span>
                            <span style={styles.guideName}>{project.guideName}</span>
                        </div>
                    </div>
                    
                    <div style={styles.metaGrid}>
                        <div style={styles.metaCard}>
                            <span style={styles.metaLabel}>Start Date</span>
                            <span style={styles.metaValue}>{project.startDate}</span>
                        </div>
                        <div style={styles.metaCard}>
                            <span style={styles.metaLabel}>Final Submission</span>
                            <span style={styles.metaValue}>{project.finalSubmissionDate}</span>
                        </div>
                    </div>
                </header>

                {/* Description Section */}
                <section style={styles.section}>
                    <h2 style={styles.sectionTitle}>Project Overview</h2>
                    <div style={styles.descriptionCard}>
                        <p style={styles.description}>{project.description}</p>
                    </div>
                </section>

                {/* Main Content Grid */}
                <div style={styles.mainGrid}>
                    {/* Team Members */}
                    <section style={styles.section}>
                        <h2 style={styles.sectionTitle}>Team Members</h2>
                        <div style={styles.card}>
                            <div style={styles.listContainer}>
                                {project.students?.map((student, idx) => (
                                    <div key={idx} style={styles.listItem}>
                                        <div style={styles.avatarPlaceholder}>
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                                <path d="M10.561 8.073a6.005 6.005 0 01-3.432 5.142.75.75 0 11-.658-1.35 4.5 4.5 0 002.89-4.173L10.561 8.073z"/>
                                                <path fillRule="evenodd" d="M10.943 2.057A4.5 4.5 0 008 6.5 4.5 4.5 0 005.057 2.057 8.003 8.003 0 000 8a8 8 0 1016 0 8.003 8.003 0 00-5.057-5.943zM8 1.5a6.502 6.502 0 00-6.497 6.014A4.5 4.5 0 008 5a4.5 4.5 0 006.497 2.514A6.502 6.502 0 008 1.5z"/>
                                            </svg>
                                        </div>
                                        <span style={styles.listText}>{student}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Milestones */}
                    <section style={styles.section}>
                        <h2 style={styles.sectionTitle}>Milestone Timeline</h2>
                        <div style={styles.card}>
                            <div style={styles.timelineContainer}>
                                {project.milestoneDates?.map((milestone, idx) => (
                                    <div key={idx} style={styles.timelineItem}>
                                        <div style={styles.timelineMarker}>
                                            <div style={{
                                                ...styles.timelineDot,
                                                backgroundColor: idx <= 2 ? '#238636' : '#8b949e'
                                            }}></div>
                                            {idx < project.milestoneDates.length - 1 && (
                                                <div style={styles.timelineLine}></div>
                                            )}
                                        </div>
                                        <div style={styles.timelineContent}>
                                            <span style={styles.timelineText}>{milestone}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>

                {/* Repository Section */}
                <section style={styles.section}>
                    <h2 style={styles.sectionTitle}>Repository</h2>
                    <div style={styles.repoCard}>
                        <div style={styles.repoIcon}>
                            <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                            </svg>
                        </div>
                        <div style={styles.repoDetails}>
                            <a
                                href={project.githubRepo}
                                style={styles.repoLink}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {project.githubRepo}
                            </a>
                            <span style={styles.repoMeta}>Public repository</span>
                        </div>
                    </div>
                </section>

                {/* Action Buttons */}
                <div style={styles.actionGrid}>
                    <a
                        href={`${GitView}//?repo=${encodeURIComponent(project.githubRepo)}`}
                        rel="noopener noreferrer"
                        style={styles.buttonLink}
                    >
                        <button style={styles.primaryButton}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style={styles.buttonIcon}>
                                <path d="M1.643 3.143L.427 1.927A.25.25 0 000 2.104V5.75c0 .138.112.25.25.25h3.646a.25.25 0 00.177-.427L2.715 4.215a6.5 6.5 0 11-1.18 4.458.75.75 0 10-1.493.154 8.001 8.001 0 101.6-5.684zM7.75 4a.75.75 0 01.75.75v2.992l2.028.812a.75.75 0 01-.557 1.392l-2.5-1A.75.75 0 017 8.25v-3.5A.75.75 0 017.75 4z"/>
                            </svg>
                            <span style={styles.buttonTextFull}>View Git Timeline</span>
                            <span style={styles.buttonTextShort}>Git Timeline</span>
                        </button>
                    </a>
                    
                    <button style={styles.secondaryButton} onClick={handleViewPDF}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style={styles.buttonIcon}>
                            <path d="M4 0a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V2a2 2 0 00-2-2H4zm0 1h8a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V2a1 1 0 011-1z"/>
                            <path d="M4.603 12.087a.81.81 0 01-.438-.42c-.195-.388-.13-.776.08-1.102.198-.307.526-.568.897-.787a7.68 7.68 0 011.482-.645 19.701 19.701 0 00.062-1.689 6.179 6.179 0 01-.671-1.377c-.161-.5-.198-.76-.115-.949.056-.133.174-.25.322-.316.215-.097.504-.045.652.174.191.284.339.742.339 1.32 0 .261-.025.487-.065.69-.014.08-.028.15-.044.214.417-.473.964-.85 1.518-.962.132-.027.285-.014.427.034.191.064.389.186.555.365.417.449.535 1.081.32 1.565-.117.265-.305.47-.564.605-.356.185-.756.264-1.204.264-.227 0-.461-.022-.693-.069a14.8 14.8 0 01-1.67.662 5.44 5.44 0 01-.055.02c-.415.924-.85 1.64-1.415 1.985-.145.088-.394.159-.633.094zm2.196-8.59a5.58 5.58 0 01-.227.935c.168.506.407.894.723 1.148.065-.28.099-.577.099-.885 0-.515-.121-.87-.252-1.148a.757.757 0 00-.343-.05z"/>
                        </svg>
                        <span style={styles.buttonTextFull}>View Project Summary</span>
                        <span style={styles.buttonTextShort}>PDF Summary</span>
                    </button>
                    
                    <button
                        style={styles.outlineButton}
                        onClick={() => navigate(`/student/project/${id}/edit`)}
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style={styles.buttonIcon}>
                            <path d="M11.013 1.427a1.75 1.75 0 012.474 0l1.086 1.086a1.75 1.75 0 010 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 01-.927-.928l.929-3.25a1.75 1.75 0 01.445-.758l8.61-8.61zm1.414 1.06a.25.25 0 00-.354 0L10.811 3.75l1.439 1.44 1.263-1.263a.25.25 0 000-.354l-1.086-1.086zM11.189 6.25L9.75 4.81l-6.286 6.287a.25.25 0 00-.064.108l-.558 1.953 1.953-.558a.249.249 0 00.108-.064l6.286-6.286z"/>
                        </svg>
                        <span style={styles.buttonTextFull}>Edit Project</span>
                        <span style={styles.buttonTextShort}>Edit</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        minHeight: '100vh',
        backgroundColor: '#0d1117',
        color: '#f0f6fc',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    },
    loadingContainer: {
        minHeight: '100vh',
        backgroundColor: '#0d1117',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
    },
    loadingSpinner: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
    },
    spinner: {
        width: '32px',
        height: '32px',
        border: '2px solid #21262d',
        borderTop: '2px solid #238636',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
    },
    loadingText: {
        color: '#8b949e',
        fontSize: '14px',
    },
    content: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        '@media (min-width: 768px)': {
            padding: '32px 24px',
            gap: '32px',
        },
    },
    header: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        paddingBottom: '20px',
        borderBottom: '1px solid #21262d',
        '@media (min-width: 768px)': {
            gap: '24px',
            paddingBottom: '24px',
        },
    },
    titleSection: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    },
    title: {
        fontSize: '24px',
        fontWeight: '600',
        margin: '0',
        color: '#f0f6fc',
        lineHeight: '1.25',
        wordBreak: 'break-word',
        '@media (min-width: 768px)': {
            fontSize: '32px',
        },
    },
    titleMeta: {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        fontSize: '14px',
        '@media (min-width: 480px)': {
            flexDirection: 'row',
            alignItems: 'center',
            gap: '8px',
            fontSize: '16px',
        },
    },
    guideLabel: {
        color: '#8b949e',
    },
    guideName: {
        color: '#58a6ff',
        fontWeight: '500',
    },
    metaGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '12px',
        '@media (min-width: 480px)': {
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
        },
    },
    metaCard: {
        backgroundColor: '#161b22',
        border: '1px solid #21262d',
        borderRadius: '8px',
        padding: '14px',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        transition: 'border-color 0.15s ease',
        '@media (min-width: 768px)': {
            padding: '16px',
        },
    },
    metaLabel: {
        fontSize: '11px',
        color: '#8b949e',
        textTransform: 'uppercase',
        fontWeight: '500',
        letterSpacing: '0.5px',
        '@media (min-width: 768px)': {
            fontSize: '12px',
        },
    },
    metaValue: {
        fontSize: '13px',
        color: '#f0f6fc',
        fontWeight: '500',
        '@media (min-width: 768px)': {
            fontSize: '14px',
        },
    },
    section: {
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        '@media (min-width: 768px)': {
            gap: '16px',
        },
    },
    sectionTitle: {
        fontSize: '18px',
        fontWeight: '600',
        margin: '0',
        color: '#f0f6fc',
        '@media (min-width: 768px)': {
            fontSize: '20px',
        },
    },
    descriptionCard: {
        backgroundColor: '#161b22',
        border: '1px solid #21262d',
        borderRadius: '8px',
        padding: '16px',
        transition: 'border-color 0.15s ease',
        '@media (min-width: 768px)': {
            padding: '20px',
        },
    },
    description: {
        fontSize: '14px',
        lineHeight: '1.6',
        color: '#e6edf3',
        margin: '0',
        '@media (min-width: 768px)': {
            fontSize: '16px',
        },
    },
    mainGrid: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        '@media (min-width: 768px)': {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '24px',
        },
    },
    card: {
        backgroundColor: '#161b22',
        border: '1px solid #21262d',
        borderRadius: '8px',
        padding: '16px',
        transition: 'border-color 0.15s ease',
        '@media (min-width: 768px)': {
            padding: '20px',
        },
    },
    listContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        '@media (min-width: 768px)': {
            gap: '16px',
        },
    },
    listItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '6px 0',
        '@media (min-width: 768px)': {
            gap: '12px',
            padding: '8px 0',
        },
    },
    avatarPlaceholder: {
        width: '28px',
        height: '28px',
        backgroundColor: '#21262d',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#8b949e',
        flexShrink: 0,
        '@media (min-width: 768px)': {
            width: '32px',
            height: '32px',
        },
    },
    listText: {
        fontSize: '13px',
        color: '#e6edf3',
        fontWeight: '500',
        wordBreak: 'break-word',
        '@media (min-width: 768px)': {
            fontSize: '14px',
        },
    },
    timelineContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0',
    },
    timelineItem: {
        display: 'flex',
        gap: '10px',
        position: 'relative',
        '@media (min-width: 768px)': {
            gap: '12px',
        },
    },
    timelineMarker: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
    },
    timelineDot: {
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        flexShrink: 0,
        marginTop: '4px',
        '@media (min-width: 768px)': {
            width: '12px',
            height: '12px',
        },
    },
    timelineLine: {
        width: '2px',
        height: '32px',
        backgroundColor: '#30363d',
        marginTop: '4px',
        '@media (min-width: 768px)': {
            height: '40px',
        },
    },
    timelineContent: {
        paddingBottom: '20px',
        flex: 1,
        '@media (min-width: 768px)': {
            paddingBottom: '24px',
        },
    },
    timelineText: {
        fontSize: '13px',
        color: '#e6edf3',
        lineHeight: '1.5',
        wordBreak: 'break-word',
        '@media (min-width: 768px)': {
            fontSize: '14px',
        },
    },
    repoCard: {
        backgroundColor: '#161b22',
        border: '1px solid #21262d',
        borderRadius: '8px',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        transition: 'border-color 0.15s ease',
        '@media (min-width: 480px)': {
            flexDirection: 'row',
            alignItems: 'center',
            gap: '16px',
        },
        '@media (min-width: 768px)': {
            padding: '20px',
        },
    },
    repoIcon: {
        color: '#8b949e',
        display: 'flex',
        alignItems: 'center',
        alignSelf: 'flex-start',
        '@media (min-width: 480px)': {
            alignSelf: 'center',
        },
    },
    repoDetails: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        minWidth: 0,
    },
    repoLink: {
        color: '#58a6ff',
        textDecoration: 'none',
        fontSize: '13px',
        fontFamily: 'SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace',
        fontWeight: '500',
        wordBreak: 'break-all',
        '@media (min-width: 768px)': {
            fontSize: '14px',
        },
    },
    repoMeta: {
        color: '#8b949e',
        fontSize: '11px',
        '@media (min-width: 768px)': {
            fontSize: '12px',
        },
    },
    actionGrid: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        marginTop: '8px',
        '@media (min-width: 480px)': {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '12px',
        },
        '@media (min-width: 768px)': {
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
        },
    },
    buttonLink: {
        textDecoration: 'none',
    },
    primaryButton: {
        width: '100%',
        backgroundColor: '#238636',
        color: '#ffffff',
        border: 'none',
        borderRadius: '8px',
        padding: '12px 16px',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        transition: 'all 0.15s ease',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12)',
        minHeight: '44px',
        '@media (hover: hover)': {
            ':hover': {
                backgroundColor: '#2ea043',
                transform: 'translateY(-1px)',
            },
        },
    },
    secondaryButton: {
        width: '100%',
        backgroundColor: '#21262d',
        color: '#f0f6fc',
        border: '1px solid #30363d',
        borderRadius: '8px',
        padding: '12px 16px',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        transition: 'all 0.15s ease',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12)',
        minHeight: '44px',
        '@media (hover: hover)': {
            ':hover': {
                backgroundColor: '#30363d',
                borderColor: '#8b949e',
            },
        },
    },
    outlineButton: {
        width: '100%',
        backgroundColor: 'transparent',
        color: '#f0f6fc',
        border: '1px solid #30363d',
        borderRadius: '8px',
        padding: '12px 16px',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        transition: 'all 0.15s ease',
        minHeight: '44px',
        '@media (hover: hover)': {
            ':hover': {
                backgroundColor: '#30363d',
            },
        },
    },
    buttonIcon: {
        width: '16px',
        height: '16px',
        flexShrink: 0,
    },
    buttonTextFull: {
        display: 'none',
        '@media (min-width: 480px)': {
            display: 'inline',
        },
    },
    buttonTextShort: {
        display: 'inline',
        '@media (min-width: 480px)': {
            display: 'none',
        },
    },
};

// Add keyframe animation and responsive styles
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    /* Touch-friendly hover states for mobile */
    @media (hover: none) {
        button:active {
            transform: scale(0.98);
            transition: transform 0.1s ease;
        }
    }
    
    /* Better text selection on mobile */
    * {
        -webkit-tap-highlight-color: transparent;
    }
    
    /* Ensure proper touch targets */
    button, a {
        min-height: 44px;
        min-width: 44px;
    }
    
    /* Safe area adjustments for notched devices */
    @supports (padding: max(0px)) {
        .content {
            padding-left: max(16px, env(safe-area-inset-left));
            padding-right: max(16px, env(safe-area-inset-right));
        }
    }
`;
document.head.appendChild(styleSheet);

export default ProjectDetail;