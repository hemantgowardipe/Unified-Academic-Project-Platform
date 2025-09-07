import {useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { login } from '../services/AuthService';
import { event } from "../utils/analytics";
import '../styles/Login.css'
import api from "../services/axiosInstance.js";

const Login = () => {
    const { type } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState({ username: '', password: '' });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            sessionStorage.clear();
            window.location.reload();
        }

    }, []);
    // Set document title on mount
    useEffect(() => {
    document.title = "UAPP | Login";
  }, []);


    const handleLogin = async () => {
    if (loading) return;

    // ✅ Validation: username & password must not be empty
    if (!data.username.trim() || !data.password.trim()) {
        alert("Username and password cannot be empty");
        return;
    }
        setLoading(true);

        try {
            // 1) clear any stale token to avoid accidental reuse
            sessionStorage.clear();

            // 2) call login with raw axios so no old header is attached
            const res = await login(data);

            const token = res.data.token;
            const role = res.data.role;

            // 3) store fresh token & role
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('role', role);

            // 4) set default header on API instance immediately to avoid race:
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            // 🔹 5) Track successful login
            event({
            action: "login_success",
            category: "auth",
            label: role === "STUDENT" ? "Student Login" : "Admin Login",
            value: 1,
            });

            // 6) navigate
            if (role === 'STUDENT') navigate('/student/dashboard');
            else if (role === 'ADMIN') navigate('/admin/dashboard');
        } catch (err) {
            console.error(err.response?.data || err.message);
            alert('Login failed');
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="login-bg">
            <div className="login-container">
                <div className="login-header">
                    <div className="login-circles">
                        <div className="login-circle-outer">
                            <div className="login-circle-inner"></div>
                        </div>
                    </div>
                    <h2 className="login-title glow">{type?.toUpperCase()} LOGIN</h2>
                    <div className="login-subtitle">Access Matrix</div>
                </div>
                <div className="login-form">
                    <input
                        className="login-input"
                        placeholder="Group userId"
                        autoComplete="username"
                        onChange={(e) => setData({ ...data, username: e.target.value })}
                    />
                    <input
                        className="login-input"
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        onChange={(e) => setData({ ...data, password: e.target.value })}
                    />
                    <button className="login-btn" onClick={handleLogin} disabled={loading}>
                        {loading ? 'Authenticating...' : '→'}
                    </button>
                </div>
                <div className="login-footer">
                    <span className="login-ready-dot"></span> READY
                </div>
            </div>
        </div>
    );
};

export default Login;
