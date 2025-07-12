import { useNavigate, useParams } from 'react-router-dom';

const AuthChoice = () => {
    const { type } = useParams(); // student or admin
    const navigate = useNavigate();

    return (
        <div style={{ textAlign: 'center', padding: '4rem' }}>
            <h2>{type.toUpperCase()} Access</h2>
            <button onClick={() => navigate(`/${type}/login`)}>Login</button>
            <button onClick={() => navigate(`/${type}/register`)} style={{ marginLeft: '1rem' }}>Register</button>
        </div>
    );
};

export default AuthChoice;
