
import {Routes, Route, Navigate, useLocation} from 'react-router-dom';
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
import EditProject from "./pages/EditProject.jsx";


const App = () => {
    const location = useLocation();

    const isAuthenticated = () => {
        return !!sessionStorage.getItem("token");
    };

    const role = sessionStorage.getItem("role");
    return (
        <Routes>
            <Route path="/" element={<Landing/>} />
            <Route path="/:type/login" element={<Login />} />
            <Route path="/:type/register" element={<Register />} />
            <Route
                path="/student/dashboard"
                element={
                    isAuthenticated() && role === "STUDENT"
                        ? <StudentDashboard />
                        : <Navigate to={`/${role?.toLowerCase() || 'student'}/login`} state={{ from: location }} replace />
                }
            />

            <Route
                path="/admin/dashboard"
                element={
                    isAuthenticated() && role === "ADMIN"
                        ? <AdminDashboard />
                        : <Navigate to="/admin/login" state={{ from: location }} replace />
                }
            />
            <Route path="/student/create" element={role === 'STUDENT' ? <ProjectForm /> : <Navigate to="/" />} />
            <Route path="/:type/auth" element={<AuthChoice />} />

            <Route path="student/project/:id" element={isAuthenticated() && role === "STUDENT"
            ? <ProjectDetail />
            : <Navigate to={`/`} state={{ from: location }} replace /> }/>

            <Route path="student/project/:id" element={<ProjectDetail />} />
            import EditProject from "./pages/EditProject.jsx";


            <Route path="student/project/:id" element={isAuthenticated() && role === "STUDENT"
                ? <ProjectDetail />
                : <Navigate to={`/`} state={{ from: location }} replace /> }/>
            {/*<Route path="student/project/:id" element={<ProjectDetail />} />*/}


            <Route
                path="/student/project/:id/edit"
                element={
                    isAuthenticated() && role === "STUDENT"
                        ? <EditProject />
                        : <Navigate to="/" replace />
                }
            />


            <Route path="/admin/auth" element={<FacultyLogin />} />
        </Routes>
    );
};

export default App;
