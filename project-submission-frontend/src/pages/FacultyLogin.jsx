import {useNavigate} from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const FacultyLogin = () => {
    const navigate = useNavigate();

     // Set document title on mount
    useEffect(() => {
    document.title = "UAPP | Faculty Login";
  }, []);

    const handleLogin = async (e) => {
        e.preventDefault();

        const auth = import.meta.env.VITE_AUTH;

        const res = await axios.post(`${auth}/login`, {
            username: e.target.username.value,
            password: e.target.password.value
        });

        if (res.data.role === 'ADMIN') {
            localStorage.setItem('token', res.data.token);
            navigate('/admin/dashboard');
        } else {
            alert('Not an admin');
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <h2>Faculty Login</h2>
            <input name="username" placeholder="Username" />
            <input name="password" type="password" placeholder="Password" />
            <button type="submit">Login</button>
        </form>
    );
};

export default FacultyLogin;
