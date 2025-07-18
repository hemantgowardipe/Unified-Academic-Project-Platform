
import { Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ProjectForm from './pages/ProjectForm';
import { getRole } from './utils/authUtils.jsx';
import AuthChoice from "./pages/AuthChoice.jsx";
import ProjectDetail from "./pages/ProjectDetail.jsx";
import FacultyLogin from "./pages/FacultyLogin.jsx";

const App = () => {
    const role = getRole();

    return (
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/:type/login" element={<Login />} />
            <Route path="/:type/register" element={<Register />} />
            <Route path="/student/dashboard" element={role === 'STUDENT' ? <StudentDashboard /> : <Navigate to="/" />} />
            <Route path="/admin/dashboard" element={role === 'ADMIN' ? <AdminDashboard /> : <Navigate to="/" />} />
            <Route path="/student/create" element={role === 'STUDENT' ? <ProjectForm /> : <Navigate to="/" />} />
            <Route path="/:type/auth" element={<AuthChoice />} />
            <Route path="student/project/:id" element={<ProjectDetail />} />
            <Route path="/admin/auth" element={<FacultyLogin />} />
        </Routes>
    );
};

export default App;
