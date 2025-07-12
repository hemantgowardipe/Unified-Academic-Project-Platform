import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProject } from '../services/projectService';

const ProjectForm = () => {
    const navigate = useNavigate();
    const [project, setProject] = useState({
        title: '',
        description: '',
        studentEmails: [''],
        guideName: '',
        startDate: '',
        finalSubmissionDate: '',
        milestoneDates: [''],
        githubRepo: ''
    });

    const handleSubmit = async () => {
        await createProject(project);
        alert("Project submitted");
        navigate('/student/dashboard');
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h2>Create Project</h2>
            <input placeholder="Title" onChange={(e) => setProject({ ...project, title: e.target.value })} />
            <textarea placeholder="Description" onChange={(e) => setProject({ ...project, description: e.target.value })}></textarea>
            <input placeholder="Guide Name" onChange={(e) => setProject({ ...project, guideName: e.target.value })} />
            <input placeholder="GitHub Repo" onChange={(e) => setProject({ ...project, githubRepo: e.target.value })} />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default ProjectForm;
