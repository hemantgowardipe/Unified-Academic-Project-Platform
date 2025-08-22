import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/ProjectForm.css';
import {createProject} from "../services/ProjectService.jsx";

const ProjectForm = () => {
    const navigate = useNavigate();

    const [project, setProject] = useState({
        title: '',
        description: '',
        students: [''],
        guideName: '',
        startDate: '',
        finalSubmissionDate: '',
        githubRepo: '',
        createdBy: '' // capture this from logged-in user (JWT)
    });

    const [pdfFile, setPdfFile] = useState(null);

    const handleStudentChange = (index, value) => {
        const updated = [...project.students];
        updated[index] = value;
        setProject({ ...project, students: updated });
    };

    const addStudent = () => {
        setProject({ ...project, students: [...project.students, ''] });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('file', pdfFile);
        formData.append(
            'project',
            new Blob([JSON.stringify(project)], { type: 'application/json' })
        );

        try {
            await createProject(formData);
            alert('Project submitted successfully!');
            navigate('/student/dashboard');
        } catch (error) {
            console.error('Error submitting project:', error);
            alert('Something went wrong.');
        }
    };

    return (
        <div className="form-container">
            <h2>Create New Project</h2>

            <input
                type="text"
                placeholder="Project Title"
                value={project.title}
                onChange={(e) => setProject({ ...project, title: e.target.value })}
            />

            <textarea
                placeholder="Project Description"
                value={project.description}
                onChange={(e) => setProject({ ...project, description: e.target.value })}
            />

            <div>
                <label>Student Emails</label>
                {project.students.map((email, index) => (
                    <input
                        key={index}
                        type="email"
                        placeholder={`Student ${index + 1}`}
                        value={email}
                        onChange={(e) => handleStudentChange(index, e.target.value)}
                    />
                ))}
                <button type="button" onClick={addStudent}>+ Add Student</button>
            </div>

            <input
                type="text"
                placeholder="Guide Name"
                value={project.guideName}
                onChange={(e) => setProject({ ...project, guideName: e.target.value })}
            />

            <label>Start Date</label>
            <input
                type="date"
                value={project.startDate}
                onChange={(e) => setProject({ ...project, startDate: e.target.value })}
            />

            <label>Final Submission Date</label>
            <input
                type="date"
                value={project.finalSubmissionDate}
                onChange={(e) => setProject({ ...project, finalSubmissionDate: e.target.value })}
            />

            <input
                type="url"
                placeholder="GitHub Repo URL"
                value={project.githubRepo}
                onChange={(e) => setProject({ ...project, githubRepo: e.target.value })}
            />

            <input
                type="email"
                placeholder="Created By (Team lead)"
                value={project.createdBy}
                onChange={(e) => setProject({ ...project, createdBy: e.target.value })}
            />

            <div className="form-section">
                <label className="block font-semibold mb-2">Project Summary PDF</label>
                <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => setPdfFile(e.target.files[0])}
                    className="form-input"
                />
            </div>

            <button onClick={handleSubmit}>Submit Project</button>
        </div>
    );
};

export default ProjectForm;
