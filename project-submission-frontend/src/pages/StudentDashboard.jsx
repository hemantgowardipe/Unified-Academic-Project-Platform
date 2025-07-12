import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyProjects } from '../services/projectService';

const StudentDashboard = () => {
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getMyProjects().then(res => setProjects(res.data));
    }, []);

    return (
        <div style={{ padding: '2rem' }}>
            <h2>Your Projects</h2>
            <button onClick={() => navigate('/student/create')}>+ Add Project</button>
            <ul>
                {projects.map(p => <li key={p.id}>{p.title}</li>)}
            </ul>
        </div>
    );
};

export default StudentDashboard;
