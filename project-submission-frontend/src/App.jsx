import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard.jsx';
import CreateProject from './pages/CreateProject';

function App() {
    const isLoggedIn = !!localStorage.getItem("role");

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/student/login" element={<Login />} />
            <Route path="/student/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/student/login" />} />
            <Route path="/student/create" element={isLoggedIn ? <CreateProject /> : <Navigate to="/student/login" />} />
        </Routes>
    );
}

export default App;
