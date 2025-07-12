import { useEffect, useState } from 'react';
import { getAllProjects } from '../services/projectService';

const AdminDashboard = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        getAllProjects().then(res => setProjects(res.data));
    }, []);

    return (
        <div style={{ padding: '2rem' }}>
            <h2>All Projects (Admin)</h2>
            <ul>
                {projects.map(p => <li key={p.id}>{p.title} - {p.guideName}</li>)}
            </ul>
        </div>
    );
};

export default AdminDashboard;
