import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Project_URL = import.meta.env.VITE_PROJECTS;

const EditProject = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [pdfFile, setPdfFile] = useState(null);

     // Set document title on mount
    useEffect(() => {
    document.title = "UAPP | Edit Project";
  }, []);

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        axios
            .get(`${Project_URL}/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => setProject(res.data))
            .catch((err) => console.error(err));
    }, [id]);

    const handleChange = (field, value) => {
        setProject({ ...project, [field]: value });
    };

    const handleArrayChange = (field, index, value) => {
        const updatedArray = [...project[field]];
        updatedArray[index] = value;
        setProject({ ...project, [field]: updatedArray });
    };

    const addArrayItem = (field) => {
        setProject({ ...project, [field]: [...project[field], ""] });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const token = sessionStorage.getItem("token");

        const formData = new FormData();
        formData.append(
            "project",
            new Blob([JSON.stringify(project)], { type: "application/json" })
        );
        if (pdfFile) formData.append("file", pdfFile);

        try {
            await axios.put(`${Project_URL}/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });
            alert("Project updated successfully!");
            navigate(`/student/project/${id}`);
        } catch (err) {
            console.error("Error updating project", err);
        }
    };

    if (!project) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center p-6">
            <form
                onSubmit={handleUpdate}
                className="w-full max-w-3xl bg-gray-800 p-8 rounded-lg shadow-lg space-y-6"
            >
                <h1 className="text-2xl font-bold mb-4">Edit Project</h1>

                <h4>Title</h4>

                <input
                    type="text"
                    value={project.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    placeholder="Project Title"
                    className="w-full p-3 rounded bg-gray-700 border border-gray-600"
                />
                <h4>Description</h4>
                <textarea
                    value={project.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                    placeholder="Description"
                    className="w-full p-3 rounded bg-gray-700 border border-gray-600"
                />
<h4>Guide Name</h4>
                <input
                    type="text"
                    value={project.guideName}
                    onChange={(e) => handleChange("guideName", e.target.value)}
                    placeholder="Guide Name"
                    className="w-full p-3 rounded bg-gray-700 border border-gray-600"
                />
                <h4>Co-Guide Name</h4>
                <input
                    type="text"
                    value={project.coGuideName}
                    onChange={(e) => handleChange("coGuideName", e.target.value)}
                    placeholder="Co-Guide Name"
                    className="w-full p-3 rounded bg-gray-700 border border-gray-600"
                />
                <h4>Github Repository</h4>
                <input
                    type="text"
                    value={project.githubRepo}
                    onChange={(e) => handleChange("githubRepo", e.target.value)}
                    placeholder="GitHub Repo URL"
                    className="w-full p-3 rounded bg-gray-700 border border-gray-600"
                />
                <h4>Demo application Url</h4>
                <input
                    type="text"
                    value={project.url}
                    onChange={(e) => handleChange("url", e.target.value)}
                    placeholder="Demo Application Url"
                    className="w-full p-3 rounded bg-gray-700 border border-gray-600"
                />

                <div className="flex space-x-4">
                    <input
                        type="date"
                        value={project.startDate}
                        onChange={(e) => handleChange("startDate", e.target.value)}
                        className="w-1/2 p-3 rounded bg-gray-700 border border-gray-600"
                    />
                    <input
                        type="date"
                        value={project.finalSubmissionDate}
                        onChange={(e) => handleChange("finalSubmissionDate", e.target.value)}
                        className="w-1/2 p-3 rounded bg-gray-700 border border-gray-600"
                    />
                </div>

                <div>
                    <label className="block mb-2 font-semibold">Students</label>
                    {project.students?.map((student, idx) => (
                        <input
                            key={idx}
                            type="text"
                            value={student}
                            onChange={(e) =>
                                handleArrayChange("students", idx, e.target.value)
                            }
                            className="w-full p-3 rounded bg-gray-700 border border-gray-600 mb-2"
                        />
                    ))}
                    <button
                        type="button"
                        onClick={() => addArrayItem("students")}
                        className="px-3 py-1 bg-blue-500 rounded"
                    >
                        + Add Student
                    </button>
                </div>
                <h4>Team Lead's Email</h4>
                <input
                    type="text"
                    value={project.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="Team Lead's Email"
                    className="w-full p-3 rounded bg-gray-700 border border-gray-600"
                />



                <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => setPdfFile(e.target.files[0])}
                    className="w-full p-3 rounded bg-gray-700 border border-gray-600"
                />

                <button
                    type="submit"
                    className="w-full py-3 bg-green-600 rounded hover:bg-green-500 transition"
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default EditProject;