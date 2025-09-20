import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { login } from '../services/AuthService';
import api from "../services/axiosInstance.js";

const Login = () => {
    const { type } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState({ username: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            sessionStorage.clear();
            window.location.reload();
        }
    }, []);

    const handleLogin = async () => {
        if (loading) return;

        if (!data.username.trim() || !data.password.trim()) {
            alert("Username and password cannot be empty");
            return;
        }
        setLoading(true);

        try {
            sessionStorage.clear();
            const res = await login(data);
            const token = res.data.token;
            const role = res.data.role;

            sessionStorage.setItem('token', token);
            sessionStorage.setItem('role', role);
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            if (role === 'STUDENT') navigate('/student/dashboard');
            else if (role === 'ADMIN') navigate('/admin/dashboard');
        } catch (err) {
            console.error(err.response?.data || err.message);
            alert('Login failed');
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left side - Login Form */}
            <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-white">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    {/* Logo/Brand */}
                    <div className="mb-8">
                        <h1 className="text-xl font-medium text-gray-900 tracking-wide">
                            \UAPP
                        </h1>
                    </div>

                    {/* Welcome Text */}
                    <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 leading-tight">
                        Welcome to<br />
                        {type === 'admin' ? 'Faculty Portal - UAPP' : 'Student Portal - UAPP'}
                    </h2>
                    </div>

                    {/* Login Form */}
                    <div className="space-y-6">
                        <div>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder={type === "admin" ? "Username" : "GroupId"}
                                    value={data.username}
                                    onChange={(e) => setData({ ...data, username: e.target.value })}
                                    onKeyPress={handleKeyPress}
                                    className="block w-full pl-10 pr-4 py-3 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all"
                                    autoComplete="username"
                                />
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="relative">
                                <input
                                    type="password"
                                    placeholder={type === "admin" ? "Password" : "Password (min. 8 characters)"}
                                    value={data.password}
                                    onChange={(e) => setData({ ...data, password: e.target.value })}
                                    onKeyPress={handleKeyPress}
                                    className="block w-full pl-10 pr-4 py-3 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all"
                                    autoComplete="current-password"
                                />
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                            </div>
                        </div>



                        {/* Sign in button */}
                        <button
                            onClick={handleLogin}
                            disabled={loading}
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                        >
                            {loading ? 'Signing in...' : 'Sign in'}
                        </button>

                        {/* Sign up link - only show for students */}
                        {type !== "admin" && (
                        <p className="text-center text-sm text-gray-600">
                            Don't have an account?{' '}
                            <a
                            href="/student/register"
                            className="text-gray-900 hover:text-gray-700 font-medium transition-colors"
                            >
                            Sign up
                            </a>
                        </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Right side - Testimonial */}
            <div className="hidden lg:block relative w-0 flex-1 bg-gray-800">
                <div className="absolute inset-0 flex items-center justify-center p-12">
                    <div className="max-w-lg text-center">
                        {/* Quote icon */}
                        <div className="flex justify-center mb-8">
                            <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                                </svg>
                            </div>
                        </div>

                        {/* Testimonial text */}
                        <blockquote className="text-xl text-white leading-relaxed mb-8">
                            "You made it so simple. My new site is so much faster and easier to work with than my old site. I just choose the page, make the change."
                        </blockquote>


                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;