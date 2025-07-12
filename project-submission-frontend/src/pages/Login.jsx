import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { login } from '../services/authService';

const Login = () => {
    const { type } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState({ username: '', password: '' });

    const handleLogin = async () => {
        try {
            const res = await login(data);
            console.log("Login success:", res.data); // 👈 Add this

            localStorage.setItem('token', res.data.token);
            localStorage.setItem('role', res.data.role);

            if (res.data.role === 'STUDENT') navigate('/student/dashboard');
            else if (res.data.role === 'ADMIN') navigate('/admin/dashboard');
            else console.warn('Unknown role:', res.data.role);
        } catch (err) {
            alert('Login failed');
            console.error(err.response?.data || err.message);
        }
    };


    return (
        <div style={{ textAlign: 'center', padding: '4rem' }}>
            <h2>{type.toUpperCase()} Login</h2>
            <input placeholder="Username" onChange={(e) => setData({ ...data, username: e.target.value })} />
            <input type="password" placeholder="Password" onChange={(e) => setData({ ...data, password: e.target.value })} />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
