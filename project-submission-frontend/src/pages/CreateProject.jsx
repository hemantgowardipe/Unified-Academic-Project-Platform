import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import api from "../services/axiosInstance.js";

const CreateProject = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        studentEmails: [''],
        guideName: '',
        startDate: '',
        finalSubmissionDate: '',
        milestoneDates: [''],
        githubRepo: '',
        file: null
    });

     // Set document title on mount
    useEffect(() => {
    document.title = "UAPP | Create Project";
  }, []);

    const Project_URL = import.meta.env.VITE_PROJECTS;

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleFileChange = (e) => {
        setFormData({...formData, file: e.target.files[0]});
    };

    const handleArrayChange = (field, index, value) => {
        const updated = [...formData[field]];
        updated[index] = value;
        setFormData({...formData, [field]: updated});
    };

    const addField = (field) => {
        setFormData({...formData, [field]: [...formData[field], '']});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Construct JSON body (we're not storing the file yet)
        const payload = { ...formData };
        delete payload.file;

        try {
            await axios.post(Project_URL, payload);
            alert("Project submitted successfully!");
            navigate("/student/dashboard");
        } catch (err) {
            alert("Submission failed");
            console.error(err);
        }
    };

    return (
        <div style={{ maxWidth: "700px", margin: "3rem auto", padding: "2rem", background: "#fff", borderRadius: "12px", boxShadow: "0 0 20px rgba(0,0,0,0.1)" }}>
            <h2 style={{ marginBottom: "1rem", textAlign: "center" }}>Create New Project</h2>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <input name="title" placeholder="Project Title" onChange={handleChange} required />
                <textarea name="description" placeholder="Project Description" onChange={handleChange} required />

                <div>
                    <strong>Team Members</strong>
                    {formData.studentEmails.map((email, idx) => (
                        <input key={idx} value={email} onChange={(e) => handleArrayChange("studentEmails", idx, e.target.value)} placeholder={`Student ${idx+1} Email`} />
                    ))}
                    <button type="button" onClick={() => addField("studentEmails")}>+ Add</button>
                </div>

                <input name="guideName" placeholder="Guide Name" onChange={handleChange} required />
                <input type="date" name="startDate" onChange={handleChange} required />
                <input type="date" name="finalSubmissionDate" onChange={handleChange} required />

                <div>
                    <strong>Milestone Dates</strong>
                    {formData.milestoneDates.map((date, idx) => (
                        <input key={idx} type="date" value={date} onChange={(e) => handleArrayChange("milestoneDates", idx, e.target.value)} />
                    ))}
                    <button type="button" onClick={() => addField("milestoneDates")}>+ Add</button>
                </div>

                <input name="githubRepo" placeholder="GitHub Repo URL" onChange={handleChange} required />

                <label>
                    Upload Project PDF (optional):
                    <input type="file" accept=".pdf" onChange={handleFileChange} />
                </label>

                <button type="submit" style={{ padding: '10px', background: '#4f46e5', color: 'white', border: 'none', borderRadius: '6px' }}>
                    Submit Project
                </button>
            </form>
        </div>
    );
};

export default CreateProject;