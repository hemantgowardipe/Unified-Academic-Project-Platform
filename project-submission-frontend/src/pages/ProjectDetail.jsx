import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/ProjectDetail.css';

const ProjectDetail = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get(`http://localhost:8081/api/projects/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => setProject(res.data))
            .catch(err => console.error('Error loading project', err));
    }, [id]);

    if (!project)
        return (
            <div className="pd-bg">
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
        <div className="pd-bg">
            <div className="pd-grid-overlay"></div>
            <div className="pd-gradient-orb pd-gradient-orb-1"></div>
            <div className="pd-gradient-orb pd-gradient-orb-2"></div>

            <main className="pd-content">
                <div className="pd-container">
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

                            <div className="pd-meta-grid">
                                <div className="pd-meta-card">
                                    <span className="pd-meta-label">Start Date</span>
                                    <span className="pd-meta-value">{project.startDate}</span>
                                </div>
                                <div className="pd-meta-card">
                                    <span className="pd-meta-label">Final Submission</span>
                                    <span className="pd-meta-value">{project.finalSubmissionDate}</span>
                                </div>
                            </div>
                        </div>
                    </header>

                    <section className="pd-description-section">
                        <div className="pd-section-header">
                            <h2>Project Overview</h2>
                            <div className="pd-section-line"></div>
                        </div>
                        <div className="pd-description-content">
                            {project.description}
                        </div>
                    </section>

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
                                <h2>Milestone Timeline</h2>
                                <div className="pd-section-line"></div>
                            </div>
                            <div className="pd-list-container">
                                {project.milestoneDates?.map((milestone, idx) => (
                                    <div key={idx} className="pd-list-item">
                                        <div className="pd-list-marker"></div>
                                        <span>{milestone}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

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

                    <div className="pd-actions">
                        <a
                            href={`https://9000-firebase-studio-1751998542305.cluster-w5vd22whf5gmav2vgkomwtc4go.cloudworkstations.dev/?repo=${encodeURIComponent(project.githubRepo)}`}
                            rel="noopener noreferrer"
                            className="pd-btn-link"
                        >
                            <button className="pd-btn">
                                <span className="pd-btn-text">View Git Timeline</span>
                                <div className="pd-btn-glow"></div>
                            </button>
                        </a>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ProjectDetail;