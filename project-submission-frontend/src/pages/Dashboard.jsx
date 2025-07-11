import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("role");
        navigate('/');
    };

    return (
        <div style={{
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", height: "100vh"
        }}>
            <h2 style={{ marginBottom: '1rem' }}>Student Dashboard</h2>
            <Link to="/student/create">
                <button style={{
                    padding: '10px 20px',
                    background: '#22c55e',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    marginBottom: '1rem'
                }}>
                    ➕ Create Project
                </button>
            </Link>
            <button onClick={handleLogout} style={{
                padding: '10px 20px',
                background: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '6px'
            }}>
                Logout
            </button>
        </div>
    );
};

export default Dashboard;
