import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyProjects } from '../services/projectService';
import '../styles/studentDashboard.css';

const StudentDashboard = () => {
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getMyProjects()
            .then(res => setProjects(res.data))
            .catch(err => console.error('Error fetching projects', err));
    }, []);

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h2 className="dashboard-title glow">Your Projects</h2>
                <button
                    className="create-btn"
                    onClick={() => navigate('/student/create')}
                    aria-label="Add new project"
                >
                    + Add Project
                    <span className="btn-glow"></span>
                </button>
            </header>

            <main className="project-grid">
                {projects.length === 0 ? (
                    <p className="empty-msg">No projects found. Start by adding a new project.</p>
                ) : (
                    projects.map(project => (
                        <ProjectCard key={project.id} project={project} onClick={() => navigate(`/student/project/${project.id}`)} />
                    ))
                )}
            </main>
        </div>
    );
};

// Card with 3D tilt effect
const ProjectCard = ({ project, onClick }) => {
    const cardRef = useRef(null);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const el = cardRef.current;
        if (!el) return;

        const handleMouseMove = (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const midX = rect.width / 2;
            const midY = rect.height / 2;
            const rotateX = ((y - midY) / midY) * 12; // max 12deg rotation
            const rotateY = ((x - midX) / midX) * 12;
            setTilt({ x: rotateX, y: rotateY });
        };

        const resetTilt = () => setTilt({ x: 0, y: 0 });

        el.addEventListener('mousemove', handleMouseMove);
        el.addEventListener('mouseleave', resetTilt);

        return () => {
            el.removeEventListener('mousemove', handleMouseMove);
            el.removeEventListener('mouseleave', resetTilt);
        };
    }, []);

    return (
        <article
            ref={cardRef}
            className="project-card"
            onClick={onClick}
            style={{
                transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transition: tilt.x === 0 && tilt.y === 0 ? 'transform 0.5s ease' : 'none',
            }}
            tabIndex={0}
            role="button"
            aria-label={`Open project ${project.title}`}
            onKeyDown={e => { if (e.key === 'Enter') onClick(); }}
        >
            <h3 className="project-title">{project.title}</h3>
            <p className="project-desc">{project.description}</p>
        </article>
    );
};

export default StudentDashboard;
