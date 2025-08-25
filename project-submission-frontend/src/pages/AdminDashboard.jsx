import { useEffect, useState } from 'react';
import { getAllProjectsAdmin } from '../services/ProjectService';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getAllProjectsAdmin()
      .then(res => setProjects(res.data))
      .catch(err => console.error('Admin load error', err));
  }, []);

  // Filter projects based on guideName
  const filteredProjects = projects.filter(p =>
    p.guideName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* Search Input */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search by Guide Name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 rounded-lg text-black outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProjects.length > 0 ? (
          filteredProjects.map(p => (
            <div key={p.id} className="bg-gray-800 p-4 rounded shadow hover:shadow-lg transition">
              <h2 className="font-semibold text-lg">{p.title}</h2>
              <p className="text-sm text-gray-300">Guide: {p.guideName}</p>
              <button
                onClick={() => navigate(`/admin/project/${p.id}`)}
                className="mt-3 px-3 py-1 bg-blue-600 rounded hover:bg-blue-700 transition"
              >
                View
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-400 col-span-full text-center">No projects found for this guide.</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
