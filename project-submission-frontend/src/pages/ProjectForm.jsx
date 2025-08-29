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
        coGuideName: '',
        email: '',
        startDate: '',
        finalSubmissionDate: '',
        githubRepo: '',
        createdBy: '' // capture this from logged-in user (JWT)
    });

    const [pdfFile, setPdfFile] = useState(null);
    const [errors, setErrors] = useState({});

    const handleStudentChange = (index, value) => {
        const updated = [...project.students];
        updated[index] = value;
        setProject({ ...project, students: updated });
    };

    const addStudent = () => {
        setProject({ ...project, students: [...project.students, ''] });
    };

    const removeStudent = (index) => {
        if (project.students.length > 1) {
            const updated = project.students.filter((_, i) => i !== index);
            setProject({ ...project, students: updated });
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!project.title.trim()) newErrors.title = 'Project title is required';
        if (!project.description.trim()) newErrors.description = 'Project description is required';
        if (!project.githubRepo.trim()) newErrors.githubRepo = 'GitHub repository URL is required';
        if (!pdfFile) newErrors.pdfFile = 'Project summary PDF is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
                        <h2 className="text-3xl font-bold text-white flex items-center">
                            <svg className="w-8 h-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Create New Project
                        </h2>
                        <p className="text-blue-100 mt-2">Fill in the details to submit your project</p>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 space-y-6">
                        {/* Project Title */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 flex items-center">
                                Project Title <span className="text-red-500 ml-1">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter your project title"
                                value={project.title}
                                onChange={(e) => setProject({ ...project, title: e.target.value })}
                                className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                    errors.title ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-blue-400'
                                }`}
                            />
                            {errors.title && <p className="text-red-500 text-sm flex items-center"><svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>{errors.title}</p>}
                        </div>

                        {/* Project Description */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 flex items-center">
                                Project Description <span className="text-red-500 ml-1">*</span>
                            </label>
                            <textarea
                                rows="4"
                                placeholder="Describe your project in detail..."
                                value={project.description}
                                onChange={(e) => setProject({ ...project, description: e.target.value })}
                                className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
                                    errors.description ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-blue-400'
                                }`}
                            />
                            {errors.description && <p className="text-red-500 text-sm flex items-center"><svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>{errors.description}</p>}
                        </div>
                        {/* Guide Name and Co Guide  Row */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">Faculty Guide</label>
                                <input
                                    type="text"
                                    placeholder="Enter Guide's name"
                                    value={project.guideName}
                                    onChange={(e) => setProject({ ...project, guideName: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">Faculty Co-Guide</label>
                                <input
                                    type="text"
                                    placeholder="Enter Co-Guide's Name"
                                    value={project.coGuideName}
                                    onChange={(e) => setProject({ ...project, coGuideName: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                />
                            </div>
                        </div>

                        {/* Student list */}
                        <div className="space-y-3">
                            <label className="text-sm font-semibold text-gray-700 flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                </svg>
                                Team Members
                            </label>
                            <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                                {project.students.map((email, index) => (
                                    <div key={index} className="flex items-center space-x-3">
                                        <div className="flex-1">
                                            <input
                                                type="text"
                                                placeholder={`Student ${index + 1} `}
                                                value={email}
                                                onChange={(e) => handleStudentChange(index, e.target.value)}
                                                className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                            />
                                        </div>
                                        {project.students.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeStudent(index)}
                                                className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addStudent}
                                    className="w-full py-2 px-4 text-blue-600 border-2 border-dashed border-blue-300 rounded-lg hover:bg-blue-50 hover:border-blue-400 transition-all duration-200 flex items-center justify-center"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Add Team Member
                                </button>
                            </div>
                        </div>

                        {/*created by*/}
                        <div className="grid md:grid-cols-2 gap-6">

                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">Team Lead's Email</label>
                                <input
                                    type="email"
                                    placeholder="Enter team lead's email"
                                    value={project.email}
                                    onChange={(e) => setProject({ ...project, email: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                />
                            </div>
                        </div>

                        {/* Date Fields */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 flex items-center">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    Start Date
                                </label>
                                <input
                                    type="date"
                                    value={project.startDate}
                                    onChange={(e) => setProject({ ...project, startDate: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 flex items-center">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    Final Submission Date
                                </label>
                                <input
                                    type="date"
                                    value={project.finalSubmissionDate}
                                    onChange={(e) => setProject({ ...project, finalSubmissionDate: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                />
                            </div>
                        </div>

                        {/* GitHub Repository */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                </svg>
                                GitHub Repository URL <span className="text-red-500 ml-1">*</span>
                            </label>
                            <input
                                type="url"
                                placeholder="https://github.com/username/repository"
                                value={project.githubRepo}
                                onChange={(e) => setProject({ ...project, githubRepo: e.target.value })}
                                className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                    errors.githubRepo ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-blue-400'
                                }`}
                            />
                            {errors.githubRepo && <p className="text-red-500 text-sm flex items-center"><svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>{errors.githubRepo}</p>}
                        </div>

                        {/* PDF Upload */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                                Project Summary PDF <span className="text-red-500 ml-1">*</span>
                            </label>
                            <div className={`relative border-2 border-dashed rounded-lg p-6 transition-all duration-200 ${
                                errors.pdfFile ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-blue-400'
                            } ${pdfFile ? 'bg-green-50 border-green-300' : 'bg-gray-50'}`}>
                                <input
                                    type="file"
                                    accept="application/pdf"
                                    onChange={(e) => setPdfFile(e.target.files[0])}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                                <div className="text-center">
                                    {pdfFile ? (
                                        <div className="flex items-center justify-center">
                                            <svg className="w-8 h-8 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className="text-green-700 font-medium">{pdfFile.name}</span>
                                        </div>
                                    ) : (
                                        <>
                                            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <p className="mt-2 text-sm text-gray-600">
                                                <span className="font-medium text-blue-600">Click to upload</span> or drag and drop
                                            </p>
                                            <p className="text-xs text-gray-500">PDF files only</p>
                                        </>
                                    )}
                                </div>
                            </div>
                            {errors.pdfFile && <p className="text-red-500 text-sm flex items-center"><svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>{errors.pdfFile}</p>}
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end pt-6">
                            <button
                                type="submit"
                                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transform hover:scale-105 transition-all duration-200 flex items-center"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                                Submit Project
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProjectForm;