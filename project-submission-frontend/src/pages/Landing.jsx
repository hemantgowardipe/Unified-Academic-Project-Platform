import { useNavigate } from 'react-router-dom';

const Landing = () => {
    const navigate = useNavigate();

    return (
        <div style={{ textAlign: 'center', padding: '4rem' }}>
            <h1>Welcome to Project Portal</h1>
            <p>Choose your role to continue:</p>
            <button onClick={() => navigate('/student/auth')}>Student</button>
            <button onClick={() => navigate('/admin/auth')} style={{ marginLeft: '1rem' }}>Faculty</button>
        </div>
    );
};

export default Landing;
