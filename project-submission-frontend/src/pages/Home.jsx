import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div style={{
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", height: "100vh"
        }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Welcome to Project Portal</h1>
            <p>Select your role to continue</p>
            <Link to="/student/dashboard" >
                <button style={{
                    padding: '12px 24px', marginTop: '2rem',
                    background: '#4f46e5', color: 'white', borderRadius: '8px', border: 'none'
                }}>
                    I am a Student
                </button>
            </Link>
        </div>
    );
};

export default Home;
