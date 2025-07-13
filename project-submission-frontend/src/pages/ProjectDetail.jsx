import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

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

    if (!project) return <div className="loading">Loading...</div>;

    return (
        <div className="detail-container">
            <h2>{project.title}</h2>
            <p><strong>Description:</strong> {project.description}</p>
            <p><strong>GitHub Repo:</strong> {project.githubRepoUrl}</p>

            <a
                href={`https://9000-firebase-studio-1751998542305.cluster-w5vd22whf5gmav2vgkomwtc4go.cloudworkstations.dev/?repo=${encodeURIComponent(project.githubRepoUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
            >
                <button className="gitview-btn">View Git Timeline</button>
            </a>

        </div>
    );
};

export default ProjectDetail;
