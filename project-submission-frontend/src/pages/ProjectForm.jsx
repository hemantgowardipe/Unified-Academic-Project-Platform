import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProject } from '../services/projectService';
import '../styles/ProjectForm.css';

const ProjectForm = () => {
    const navigate = useNavigate();
    const [project, setProject] = useState({
        title: '',
        description: '',
        students: [''],
        guideName: '',
        startDate: '',
        finalSubmissionDate: '',
        githubRepo: ''
    });

    const handleStudentChange = (index, value) => {
        const updated = [...project.students];
        updated[index] = value;
        setProject({ ...project, students: updated });
    };

    const addStudent = () => {
        setProject({ ...project, students: [...project.students, ''] });
    };

    const handleSubmit = async () => {
        await createProject(project);
        alert("Project submitted!");
        navigate('/student/dashboard');
    };

    return (
        <div className="form-container">
            <h2 className="form-heading">Create New Project</h2>

            <input
                type="text"
                placeholder="Project Title"
                className="form-input"
                value={project.title}
                onChange={(e) => setProject({ ...project, title: e.target.value })}
            />

            <textarea
                placeholder="Project Description"
                className="form-textarea"
                value={project.description}
                onChange={(e) => setProject({ ...project, description: e.target.value })}
            />

            <div className="form-section">
                <label>Student Emails</label>
                {project.students.map((email, index) => (
                    <input
                        key={index}
                        type="email"
                        placeholder={`Student ${index + 1}`}
                        className="form-input"
                        value={email}
                        onChange={(e) => handleStudentChange(index, e.target.value)}
                    />
                ))}
                <button type="button" onClick={addStudent} className="add-btn">+ Add Student</button>
            </div>

            <input
                type="text"
                placeholder="Guide Name"
                className="form-input"
                value={project.guideName}
                onChange={(e) => setProject({ ...project, guideName: e.target.value })}
            />

            <label>Start Date</label>
            <input
                type="date"
                className="form-input"
                value={project.startDate}
                onChange={(e) => setProject({ ...project, startDate: e.target.value })}
            />

            <label>Final Submission Date</label>
            <input
                type="date"
                className="form-input"
                value={project.finalSubmissionDate}
                onChange={(e) => setProject({ ...project, finalSubmissionDate: e.target.value })}
            />

            <input
                type="url"
                placeholder="GitHub Repo URL"
                className="form-input"
                value={project.githubRepo}
                onChange={(e) => setProject({ ...project, githubRepo: e.target.value })}
            />

            <button onClick={handleSubmit} className="submit-btn">Submit Project</button>
        </div>
    );
};

export default ProjectForm;
