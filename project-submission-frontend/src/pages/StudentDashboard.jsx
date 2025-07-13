import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyProjects } from '../services/projectService';
import '../App.css';

const StudentDashboard = () => {
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getMyProjects()
            .then(res => setProjects(res.data))
            .catch(err => console.error('Error fetching projects', err));
    }, []);

    return (
        <div className="container">
            <h2 className="header">Your Projects</h2>
            <button className="create-btn" onClick={() => navigate('/student/create')}>
                + Add Project
            </button>

            <div className="project-grid">
                {projects.map(p => (
                    <div className="card" key={p.id} onClick={() => navigate(`/student/project/${p.id}`)}>
                        <h3>{p.title}</h3>
                        <p>{p.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StudentDashboard;
