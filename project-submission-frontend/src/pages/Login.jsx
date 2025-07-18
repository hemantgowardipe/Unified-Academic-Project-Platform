import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { login } from '../services/authService';
import '../styles/Login.css'

const Login = () => {
    const { type } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState({ username: '', password: '' });
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        setLoading(true);
        try {
            const res = await login(data);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('role', res.data.role);

            if (res.data.role === 'STUDENT') navigate('/student/dashboard');
            else if (res.data.role === 'ADMIN') navigate('/admin/dashboard');
            else console.warn('Unknown role:', res.data.role);
        } catch (err) {
            alert('Login failed');
            console.error(err.response?.data || err.message);
        }
        setLoading(false);
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
