import { useState, useEffect } from 'react';
import { User, Plus, LogOut, BookOpen, Trophy, Calendar, Bell, Settings, Search, ArrowRight } from 'lucide-react';

const Dashboard = () => {
    const [time, setTime] = useState(new Date());
    const [userName] = useState("Alex Johnson");
    const [searchQuery, setSearchQuery] = useState("");
    const [recentProjects] = useState([
        { id: 1, title: "AI Study Assistant", status: "In Progress", dueDate: "2024-07-15", progress: 75 },
        { id: 2, title: "React Portfolio", status: "Completed", dueDate: "2024-07-10", progress: 100 },
        { id: 3, title: "Data Visualization", status: "Review", dueDate: "2024-07-20", progress: 90 }
    ]);

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const handleLogout = () => {
        // Mock logout functionality
        alert("Logging out...");
    };

    const handleCreateProject = () => {
        alert("Navigate to create project page");
    };

    const getGreeting = () => {
        const hour = time.getHours();
        if (hour < 12) return "Good morning";
        if (hour < 17) return "Good afternoon";
        return "Good evening";
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Completed': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
            case 'In Progress': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'Review': return 'bg-amber-100 text-amber-800 border-amber-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-indigo-300/30 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-br from-purple-200/30 to-pink-300/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-cyan-200/20 to-blue-300/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
            </div>

            {/* Glass Morphism Header */}
            <header className="relative z-10 bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-lg">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                                <BookOpen className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                    StudySpace Pro
                                </h1>
                                <p className="text-sm text-gray-600">Premium Student Experience</p>
                            </div>
                        </div>

                        {/* Search Bar */}
                        <div className="hidden md:flex items-center bg-white/50 backdrop-blur-sm rounded-2xl px-4 py-2 border border-white/30">
                            <Search className="w-4 h-4 text-gray-400 mr-2" />
                            <input
                                type="text"
                                placeholder="Search projects..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-transparent outline-none text-sm placeholder-gray-400 w-48"
                            />
                        </div>

                        <div className="flex items-center space-x-3">
                            <button className="p-2 hover:bg-white/20 rounded-xl transition-all duration-300">
                                <Bell className="w-5 h-5 text-gray-600" />
                            </button>
                            <button className="p-2 hover:bg-white/20 rounded-xl transition-all duration-300">
                                <Settings className="w-5 h-5 text-gray-600" />
                            </button>
                            <div className="flex items-center space-x-3 bg-white/30 backdrop-blur-sm rounded-2xl px-4 py-2 border border-white/30">
                                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                                    <User className="w-4 h-4 text-white" />
                                </div>
                                <span className="text-sm font-medium text-gray-900">{userName}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="relative z-10 max-w-7xl mx-auto px-6 py-8">
                {/* Welcome Section */}
                <div className="mb-8">
                    <h2 className="text-4xl font-bold text-gray-900 mb-2">
                        {getGreeting()}, {userName.split(' ')[0]}!
                        <span className="text-2xl ml-2">🚀</span>
                    </h2>
                    <p className="text-gray-600 text-lg">
                        Ready to make today productive? You have 2 deadlines approaching.
                    </p>
                    <div className="mt-2 text-sm text-gray-500">
                        {time.toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })} • {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500 hover:scale-105 group">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Active Projects</p>
                                <p className="text-3xl font-bold text-gray-900">3</p>
                                <p className="text-xs text-green-600 mt-1">+2 this week</p>
                            </div>
                            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <BookOpen className="w-7 h-7 text-white" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500 hover:scale-105 group">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Completed</p>
                                <p className="text-3xl font-bold text-gray-900">12</p>
                                <p className="text-xs text-green-600 mt-1">92% success rate</p>
                            </div>
                            <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <Trophy className="w-7 h-7 text-white" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500 hover:scale-105 group">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Due This Week</p>
                                <p className="text-3xl font-bold text-gray-900">2</p>
                                <p className="text-xs text-amber-600 mt-1">Review pending</p>
                            </div>
                            <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <Calendar className="w-7 h-7 text-white" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500 hover:scale-105 group">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Average Score</p>
                                <p className="text-3xl font-bold text-gray-900">94%</p>
                                <p className="text-xs text-green-600 mt-1">+5% from last month</p>
                            </div>
                            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <span className="text-white font-bold text-lg">A+</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Quick Actions */}
                    <div className="lg:col-span-1">
                        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h3>
                            <div className="space-y-4">
                                <button
                                    onClick={handleCreateProject}
                                    className="w-full group bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center space-x-3"
                                >
                                    <Plus className="w-5 h-5 group-hover:rotate-180 transition-transform duration-300" />
                                    <span>Create New Project</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                                </button>

                                <button className="w-full bg-gray-100/80 backdrop-blur-sm hover:bg-gray-200/80 text-gray-800 font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                                    View All Projects
                                </button>

                                <button className="w-full bg-gray-100/80 backdrop-blur-sm hover:bg-gray-200/80 text-gray-800 font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                                    My Profile
                                </button>

                                <button className="w-full bg-gray-100/80 backdrop-blur-sm hover:bg-gray-200/80 text-gray-800 font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                                    Settings
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Recent Projects */}
                    <div className="lg:col-span-2">
                        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-2xl font-bold text-gray-900">Recent Projects</h3>
                                <button className="text-indigo-600 hover:text-indigo-800 font-medium text-sm">
                                    View All
                                </button>
                            </div>

                            <div className="space-y-4">
                                {recentProjects.map((project) => (
                                    <div key={project.id} className="p-6 bg-gradient-to-r from-white/50 to-gray-50/50 backdrop-blur-sm rounded-2xl hover:shadow-lg transition-all duration-300 cursor-pointer group border border-white/30">
                                        <div className="flex items-center justify-between mb-4">
                                            <h4 className="font-semibold text-gray-900 text-lg group-hover:text-indigo-600 transition-colors">
                                                {project.title}
                                            </h4>
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(project.status)}`}>
                                                {project.status}
                                            </span>
                                        </div>

                                        <div className="mb-3">
                                            <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                                                <span>Progress</span>
                                                <span>{project.progress}%</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div
                                                    className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                                                    style={{ width: `${project.progress}%` }}
                                                ></div>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <p className="text-sm text-gray-600">
                                                Due: {new Date(project.dueDate).toLocaleDateString()}
                                            </p>
                                            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all duration-300" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Logout Section */}
                <div className="mt-12 flex justify-center">
                    <button
                        onClick={handleLogout}
                        className="group bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold py-3 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center space-x-3"
                    >
                        <LogOut className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                        <span>Logout</span>
                    </button>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;