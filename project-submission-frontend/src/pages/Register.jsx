import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { register } from '../services/AuthService';

const Register = () => {
    const { type } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        if (!data.username.trim()) {
            newErrors.username = 'Username is required';
        }


        if (!data.password.trim()) {
            newErrors.password = 'Password is required';
        } else if (data.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }

        if (data.password !== data.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }


        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleRegister = async () => {
        if (loading) return;

        if (!validateForm()) return;

        setLoading(true);
        try {
            await register({
                username: data.username,
                password: data.password,
                role: type.toUpperCase()
            });
            alert('Registration successful! Please login to continue.');
            navigate(`/:type/login`);
        } catch (err) {
            console.error(err);
            alert('Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleRegister();
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left side - Registration Form */}
            <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-white">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    {/* Logo/Brand */}
                    <div className="mb-8">
                        <h1 className="text-xl font-medium text-gray-900 tracking-wide">
                            /UAPP
                        </h1>
                    </div>

                    {/* Welcome Text */}
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 leading-tight">
                            Create your Group<br />
                            Get started today
                        </h2>
                    </div>

                    {/* Registration Form */}
                    <div className="space-y-6">
                        <div>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="GroupId"
                                    value={data.username}
                                    onChange={(e) => setData({ ...data, username: e.target.value })}
                                    onKeyPress={handleKeyPress}
                                    className={`block w-full pl-10 pr-4 py-3 text-gray-900 placeholder-gray-500 border ${
                                        errors.username ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-gray-900'
                                    } rounded-lg focus:ring-2 focus:border-transparent outline-none transition-all`}
                                    autoComplete="username"
                                />
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                            </div>
                            {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username}</p>}
                        </div>


                        <div>
                            <div className="relative">
                                <input
                                    type="password"
                                    placeholder="Password (min. 8 characters)"
                                    value={data.password}
                                    onChange={(e) => setData({ ...data, password: e.target.value })}
                                    onKeyPress={handleKeyPress}
                                    className={`block w-full pl-10 pr-4 py-3 text-gray-900 placeholder-gray-500 border ${
                                        errors.password ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-gray-900'
                                    } rounded-lg focus:ring-2 focus:border-transparent outline-none transition-all`}
                                    autoComplete="new-password"
                                />
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                            </div>
                            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                        </div>

                        <div>
                            <div className="relative">
                                <input
                                    type="password"
                                    placeholder="Confirm password"
                                    value={data.confirmPassword}
                                    onChange={(e) => setData({ ...data, confirmPassword: e.target.value })}
                                    onKeyPress={handleKeyPress}
                                    className={`block w-full pl-10 pr-4 py-3 text-gray-900 placeholder-gray-500 border ${
                                        errors.confirmPassword ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-gray-900'
                                    } rounded-lg focus:ring-2 focus:border-transparent outline-none transition-all`}
                                    autoComplete="new-password"
                                />
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                            {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
                        </div>

                        {/* Create account button */}
                        <button
                            onClick={handleRegister}
                            disabled={loading}
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                        >
                            {loading ? 'Creating account...' : 'Create account'}
                        </button>

                        {/* Sign in link */}
                        <p className="text-center text-sm text-gray-600">
                            Already have an account?{' '}
                            <button
                                onClick={() => navigate(`/student/login`)}
                                className="text-gray-900 hover:text-gray-700 font-medium transition-colors"
                            >
                                Sign in
                            </button>
                        </p>
                    </div>
                </div>
            </div>

            {/* Right side - Benefits/Features */}
            <div className="hidden lg:block relative w-0 flex-1 bg-gray-900">
                <div className="absolute inset-0 flex items-center justify-center p-12">
                    <div className="max-w-lg text-center">
                        {/* Feature icon */}
                        <div className="flex justify-center mb-8">
                            <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                        </div>

                        {/* Benefits text */}
                        <h3 className="text-2xl font-bold text-white mb-6">
                            Join thousands of developers
                        </h3>

                        <div className="space-y-4 text-left">
                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="ml-3">
                                    <p className="text-white font-medium">Premium UI components</p>
                                    <p className="text-gray-400 text-sm">Access to hundreds of professionally designed components</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="ml-3">
                                    <p className="text-white font-medium">React & Tailwind ready</p>
                                    <p className="text-gray-400 text-sm">Copy-paste components that work out of the box</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="ml-3">
                                    <p className="text-white font-medium">Regular updates</p>
                                    <p className="text-gray-400 text-sm">New components and templates every month</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;