import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { register } from '../services/AuthService';
import '../styles/Register.css'

const Register = () => {
    const { type } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState({ username: '', password: '' });
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        setLoading(true);
        try {
            await register({ ...data, role: type.toUpperCase() });
            alert('Registered! Now login');
            navigate(`/${type}/login`);
        } catch (err) {
            alert('Registration failed');
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
                    <h2 className="login-title glow">{type?.toUpperCase()} REGISTER</h2>
                    <div className="login-subtitle">Create your access matrix</div>
                </div>
                <div className="login-form">
                    <input
                        className="login-input"
                        placeholder="Group Name"
                        autoComplete="username"
                        onChange={(e) => setData({ ...data, username: e.target.value })}
                    />
                    <input
                        className="login-input"
                        type="password"
                        placeholder="Password"
                        autoComplete="new-password"
                        onChange={(e) => setData({ ...data, password: e.target.value })}
                    />
                    <button className="login-btn" onClick={handleRegister} disabled={loading}>
                        {loading ? 'Registering...' : '→'}
                    </button>
                </div>
                <div className="login-footer">
                    <span className="login-ready-dot"></span> READY
                </div>
            </div>
        </div>
    );
};

export default Register;
