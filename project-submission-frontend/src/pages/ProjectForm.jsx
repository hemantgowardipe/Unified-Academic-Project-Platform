import { useState } from 'react';

const ProjectForm = () => {
    // Mock functions for demo purposes
    const navigate = (path) => console.log(`Navigating to: ${path}`);
    const createProject = async (project) => {
        console.log('Creating project:', project);
        return Promise.resolve();
    };

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
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-12 px-4">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-4 shadow-lg">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
                        Create New Project
                    </h1>
                    <p className="text-slate-600 text-lg">Set up your project details and collaborate with your team</p>
                </div>

                {/* Form Card */}
                <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 space-y-8">
                    {/* Project Title */}
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Project Title
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Enter your project title"
                                className="w-full px-4 py-4 bg-white/80 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-slate-800 placeholder-slate-400 shadow-sm"
                                value={project.title}
                                onChange={(e) => setProject({ ...project, title: e.target.value })}
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Project Description */}
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Project Description
                        </label>
                        <textarea
                            placeholder="Describe your project goals, features, and scope..."
                            rows={4}
                            className="w-full px-4 py-4 bg-white/80 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-slate-800 placeholder-slate-400 shadow-sm resize-none"
                            value={project.description}
                            onChange={(e) => setProject({ ...project, description: e.target.value })}
                        />
                    </div>

                    {/* Students Section */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <label className="block text-sm font-semibold text-slate-700">
                                Team Members
                            </label>
                            <span className="text-xs text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                                {project.students.length} member{project.students.length !== 1 ? 's' : ''}
                            </span>
                        </div>
                        <div className="space-y-3">
                            {project.students.map((email, index) => (
                                <div key={index} className="relative">
                                    <input
                                        type="email"
                                        placeholder={`Team member ${index + 1} email`}
                                        className="w-full px-4 py-4 bg-white/80 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-slate-800 placeholder-slate-400 shadow-sm"
                                        value={email}
                                        onChange={(e) => handleStudentChange(index, e.target.value)}
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                                        <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                        </svg>
                                    </div>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={addStudent}
                                className="w-full py-3 border-2 border-dashed border-blue-300 text-blue-600 rounded-2xl hover:border-blue-400 hover:bg-blue-50/50 transition-all duration-300 font-medium flex items-center justify-center gap-2 group"
                            >
                                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                Add Team Member
                            </button>
                        </div>
                    </div>

                    {/* Guide Name */}
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Project Guide
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Enter guide name"
                                className="w-full px-4 py-4 bg-white/80 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-slate-800 placeholder-slate-400 shadow-sm"
                                value={project.guideName}
                                onChange={(e) => setProject({ ...project, guideName: e.target.value })}
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Date Inputs */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Start Date
                            </label>
                            <div className="relative">
                                <input
                                    type="date"
                                    className="w-full px-4 py-4 bg-white/80 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-slate-800 shadow-sm"
                                    value={project.startDate}
                                    onChange={(e) => setProject({ ...project, startDate: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Final Submission Date
                            </label>
                            <div className="relative">
                                <input
                                    type="date"
                                    className="w-full px-4 py-4 bg-white/80 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-slate-800 shadow-sm"
                                    value={project.finalSubmissionDate}
                                    onChange={(e) => setProject({ ...project, finalSubmissionDate: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    {/* GitHub Repo */}
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            GitHub Repository
                        </label>
                        <div className="relative">
                            <input
                                type="url"
                                placeholder="https://github.com/username/repository"
                                className="w-full px-4 py-4 bg-white/80 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-slate-800 placeholder-slate-400 shadow-sm"
                                value={project.githubRepo}
                                onChange={(e) => setProject({ ...project, githubRepo: e.target.value })}
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                                <svg className="w-5 h-5 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-6">
                        <button
                            onClick={handleSubmit}
                            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-3 group"
                        >
                            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                            Submit Project
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectForm;