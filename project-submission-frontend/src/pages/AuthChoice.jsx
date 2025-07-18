import { useNavigate } from 'react-router-dom';
import { LogIn, UserPlus } from 'lucide-react';
import '../styles/AuthChoice.css';

const AuthChoice = () => {
    const navigate = useNavigate();

    return (
        <div className="auth-bg">
            <div className="auth-wrapper">
                <div className="auth-card">
                    <div className="auth-header">
                        <h2 className="glow">Welcome</h2>
                        <p className="auth-subtitle">
                            Sign in or create a new account to manage your projects
                        </p>
                    </div>
                    <div className="auth-actions">
                        <button onClick={() => navigate('/student/login')} className="auth-button">
                            <LogIn className="icon" /> Login
                        </button>
                        <button
                            onClick={() => navigate('/student/register')}
                            className="auth-button outline"
                        >
                            <UserPlus className="icon" /> Register
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthChoice;
