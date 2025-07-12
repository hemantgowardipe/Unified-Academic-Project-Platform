import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { register } from '../services/authService';

const Register = () => {
    const { type } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState({ username: '', password: '' });

    const handleRegister = async () => {
        try {
            await register({ ...data, role: type.toUpperCase() });
            alert('Registered! Now login');
            navigate(`/${type}/login`);
        } catch (err) {
            alert('Registration failed');
        }
    };

    return (
        <div style={{ textAlign: 'center', padding: '4rem' }}>
            <h2>{type.toUpperCase()} Register</h2>
            <input placeholder="Username" onChange={(e) => setData({ ...data, username: e.target.value })} />
            <input type="password" placeholder="Password" onChange={(e) => setData({ ...data, password: e.target.value })} />
            <button onClick={handleRegister}>Register</button>
        </div>
    );
};

export default Register;
