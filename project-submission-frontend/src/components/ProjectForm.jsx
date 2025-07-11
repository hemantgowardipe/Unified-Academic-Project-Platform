import React, { useState } from 'react';
import { submitProject } from '../services/projectService';
import styles from './ProjectForm.module.css';

const ProjectForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        studentEmails: [''],
        guideName: '',
        startDate: '',
        finalSubmissionDate: '',
        milestoneDates: [''],
        githubRepo: '',
    });

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleEmailChange = (index, value) => {
        const updated = [...formData.studentEmails];
        updated[index] = value;
        setFormData({...formData, studentEmails: updated});
    };

    const handleMilestoneChange = (index, value) => {
        const updated = [...formData.milestoneDates];
        updated[index] = value;
        setFormData({...formData, milestoneDates: updated});
    };

    const addStudent = () => {
        setFormData({...formData, studentEmails: [...formData.studentEmails, '']});
    };

    const addMilestone = () => {
        setFormData({...formData, milestoneDates: [...formData.milestoneDates, '']});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await submitProject(formData);
            alert('Project submitted successfully!');
            setFormData({
                title: '',
                description: '',
                studentEmails: [''],
                guideName: '',
                startDate: '',
                finalSubmissionDate: '',
                milestoneDates: [''],
                githubRepo: '',
            });
        } catch (err) {
            alert('Error submitting project.');
            console.error(err);
        }
    };

    return (
        <div className={styles.container}>
            <h2>Submit Your Project</h2>
            <form onSubmit={handleSubmit}>
                <input name="title" placeholder="Project Title" value={formData.title} onChange={handleChange} required />
                <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />

                <h4>Team Members</h4>
                {formData.studentEmails.map((email, index) => (
                    <input key={index} placeholder={`Student ${index+1} Email`} value={email} onChange={(e) => handleEmailChange(index, e.target.value)} required />
                ))}
                <button type="button" onClick={addStudent} className={styles.addBtn}>+ Add Student</button>

                <input name="guideName" placeholder="Guide Name" value={formData.guideName} onChange={handleChange} required />
                <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required />
                <input type="date" name="finalSubmissionDate" value={formData.finalSubmissionDate} onChange={handleChange} required />

                <h4>Milestones</h4>
                {formData.milestoneDates.map((date, index) => (
                    <input key={index} type="date" value={date} onChange={(e) => handleMilestoneChange(index, e.target.value)} required />
                ))}
                <button type="button" onClick={addMilestone} className={styles.addBtn}>+ Add Milestone</button>

                <input name="githubRepo" placeholder="GitHub Repo URL" value={formData.githubRepo} onChange={handleChange} required />

                <button type="submit" className={styles.submitBtn}>Submit</button>
            </form>
        </div>
    );
};

export default ProjectForm;
