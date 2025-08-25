import { useEffect, useState } from 'react';
import { getAllProjectsAdmin } from '../services/ProjectService';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllProjectsAdmin()
            .then(res => setProjects(res.data))
            .catch(err => console.error('Admin load error', err));
    }, []);

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map(p => (
                    <div key={p.id} className="bg-gray-800 p-4 rounded shadow">
                        <h2 className="font-semibold">{p.title}</h2>
                        <p className="text-sm text-gray-300">{p.guideName}</p>
                        <button
                            onClick={() => navigate(`/admin/project/${p.id}`)}
                            className="mt-3 px-3 py-1 bg-blue-600 rounded"
                        >
                            View
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminDashboard;