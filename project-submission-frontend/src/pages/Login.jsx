import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [passkey, setPasskey] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        if (passkey === "student123") {
            localStorage.setItem("role", "student");
            navigate("student/dashboard");
        } else {
            alert("Invalid passkey.");
        }
    };

    return (
        <div style={{
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", height: "100vh"
        }}>
            <h2 style={{ marginBottom: '1rem' }}>Student Login</h2>
            <input
                type="password"
                placeholder="Enter passkey"
                value={passkey}
                onChange={(e) => setPasskey(e.target.value)}
                style={{ padding: '10px', width: '240px', borderRadius: '6px', border: '1px solid #ccc' }}
            />
            <button onClick={handleLogin} style={{
                marginTop: '1rem',
                padding: '10px 20px',
                background: '#4f46e5',
                color: 'white',
                border: 'none',
                borderRadius: '6px'
            }}>
                Login
            </button>
        </div>
    );
};

export default Login;
