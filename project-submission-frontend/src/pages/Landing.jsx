import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ShinyText from '../components/ShinyText';
import RotatingText from '../components/RotatingText';
import ScrollVelocity from '../components/ScrollVelocity';
import '../App.css'
import { 
  Users, 
  GitBranch, 
  Calendar, 
  Eye, 
  BookOpen, 
  CheckCircle, 
  ArrowRight,
  Github,
  UserCheck,
  Settings,
  BarChart3,
  Clock,
  Target,
  Zap,
  Shield,
  Monitor
} from 'lucide-react';

const UnifiedAcademicPlatform = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      title: "Project Registration",
      description: "Students can easily register their project groups with all team member details, assigned guides, and project timelines.",
      icon: <Users className="w-8 h-8" />,
      color: "from-blue-500 to-purple-600"
    },
    {
      title: "GitHub Integration",
      description: "Seamlessly connect GitHub repositories to track commit history, visualize project progress, and monitor code contributions.",
      icon: <GitBranch className="w-8 h-8" />,
      color: "from-green-500 to-teal-600"
    },
    {
      title: "Admin Dashboard",
      description: "Faculty and admins get comprehensive visibility into all ongoing projects with powerful filtering and evaluation tools.",
      icon: <BarChart3 className="w-8 h-8" />,
      color: "from-purple-500 to-pink-600"
    },
    {
      title: "Timeline Tracking",
      description: "Monitor project milestones, deadlines, and progress with visual timeline representations and automated reminders.",
      icon: <Calendar className="w-8 h-8" />,
      color: "from-orange-500 to-red-600"
    }
  ];

  const roles = [
    {
      title: "Student Portal",
      description: "Register projects, manage team details, connect GitHub repos, and track your academic journey",
      icon: <BookOpen className="w-12 h-12" />,
      features: ["Project Registration", "Team Management", "GitHub Integration", "Progress Tracking"],
      gradient: "from-blue-600 to-purple-600"
    },
    {
      title: "Admin Dashboard",
      description: "Comprehensive oversight of all academic projects with advanced analytics and evaluation tools",
      icon: <Shield className="w-12 h-12" />,
      features: ["Project Oversight", "Faculty Management", "Analytics & Reports", "Evaluation Tools"],
      gradient: "from-purple-600 to-pink-600"
    }
  ];

  const workflowSteps = [
    {
      step: "01",
      title: "Project Registration",
      description: "Students register their project groups with team details and assigned guides",
      icon: <UserCheck className="w-6 h-6" />
    },
    {
      step: "02",
      title: "GitHub Connection",
      description: "Connect project repositories for automatic code tracking and history visualization",
      icon: <Github className="w-6 h-6" />
    },
    {
      step: "03",
      title: "Timeline Setup",
      description: "Define milestones, deadlines, and project phases with automated tracking",
      icon: <Clock className="w-6 h-6" />
    },
    {
      step: "04",
      title: "Admin Oversight",
      description: "Faculty monitors progress, evaluates projects, and provides guidance through the platform",
      icon: <Eye className="w-6 h-6" />
    }
  ];

  const techPairs = [
  [
    {
      icon: <img src="/icons8-react.svg" alt="React" className="w-auto h-auto" />,
      name: "React",
    },
    {
      icon: <img src="/icons8-spring-boot.svg" alt="Spring Boot" className="w-auto h-auto" />,
      name: "Spring Boot",
    },
  ],
  [
    {
      icon: <img src="/icons8-github.svg" alt="GitHub API" className="w-auto h-auto" />,
      name: "GitHub API",
    },
    {
      icon: <img src="/icons8-mongodb.svg" alt="NoSQL" className="w-auto h-auto" />,
      name: "NoSQL",
    },
  ],
];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Monitor className="w-6 h-6 text-white" />
              </div>
                <h1 className="text-3xl font-bold text-slate-100">
                  <RotatingText
                    texts={['Unified', 'Academic', 'Platform']}
                    mainClassName="inline-flex"
                    splitLevelClassName="overflow-hidden"
                    staggerFrom="last"
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "-100%" }}
                    staggerDuration={0.03}
                    transition={{ type: "spring", damping: 30, stiffness: 400 }}
                    rotationInterval={2000}
                  />
                </h1>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <span className="text-sm text-gray-300">Spring Boot • React • GitHub API</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 px-6 py-16">
        <div className="max-w-7xl mx-auto text-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-6xl md:text-7xl font-bold mb-6">
              <ShinyText 
                text="Unified Academic" 
                disabled={false} 
                speed={3} 
                className="block"
              />
              <br />
              <ShinyText 
                text="Project Platform" 
                disabled={false} 
                speed={3} 
                className="block"
              />
            </h2>

            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed font-mono">
              Revolutionizing college project management with centralized tracking, GitHub integration, 
              and comprehensive faculty oversight for academic excellence.
            </p>
          </div>

          {/* Role Selection Buttons - Updated with Landing.jsx navigation routes */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
            {roles.map((role, index) => (
              <div key={index} className="group relative">
                <div className={`bg-gradient-to-r ${role.gradient} p-1 rounded-2xl transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl`}>
                  <div className="bg-slate-900 rounded-xl p-8 h-full min-h-[300px] flex flex-col items-center text-center">
                    <div className="mb-4 text-white group-hover:scale-110 transition-transform duration-300">
                      {role.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{role.title}</h3>
                    <p className="text-gray-300 mb-6 flex-grow">{role.description}</p>
                    <ul className="space-y-2 mb-6">
                      {role.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-400">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <button 
                        onClick={() => {
                            // Updated navigation routes from Landing.jsx
                            if (role.title === 'Student Portal') {
                                navigate('/student/auth'); // Changed from '/login' to '/student/auth'
                            } else if (role.title === 'Admin Dashboard') {
                                navigate('/admin/auth'); // Changed from '/admin_login' to '/admin/auth'
                            }
                        }}
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                        >
                        <span>Access {role.title}</span>
                        <ArrowRight className="w-4 h-4" />
                    </button>

                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              How It Works
            </h3>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto font-mono">
              Experience seamless project management with our intuitive four-step process designed for academic excellence.
            </p>
          </div>

          {/* Workflow Steps */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {workflowSteps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 h-full hover:bg-slate-800/70 transition-all duration-300 group">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-4xl font-bold text-purple-400">{step.step}</span>
                    <div className="text-blue-400 group-hover:scale-110 transition-transform duration-300">
                      {step.icon}
                    </div>
                  </div>
                  <h4 className="text-xl font-semibold mb-3">{step.title}</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">{step.description}</p>
                </div>
                {index < workflowSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-purple-400" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Feature Showcase */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h4 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Key Features
              </h4>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div 
                    key={index}
                    className={`p-6 rounded-xl cursor-pointer transition-all duration-300 border-2 ${
                      activeFeature === index 
                        ? 'border-purple-500 bg-slate-800/70' 
                        : 'border-transparent bg-slate-800/30 hover:bg-slate-800/50'
                    }`}
                    onClick={() => setActiveFeature(index)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg bg-gradient-to-r ${feature.color}`}>
                        {feature.icon}
                      </div>
                      <div>
                        <h5 className="text-xl font-semibold mb-2">{feature.title}</h5>
                        <p className="text-gray-300 text-sm">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <h5 className="text-xl font-semibold">Platform Overview</h5>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Github className="w-5 h-5 text-gray-400" />
                      <span className="text-sm">GitHub Integration</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-green-400">Active</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-gray-400" />
                      <span className="text-sm">Project Teams</span>
                    </div>
                    <span className="text-xs text-blue-400">247 Active</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Target className="w-5 h-5 text-gray-400" />
                      <span className="text-sm">Milestones</span>
                    </div>
                    <span className="text-xs text-purple-400">89% Complete</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg border border-blue-500/30">
                  <div className="flex items-center space-x-2 mb-2">
                    <Zap className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm font-semibold">Real-time Updates</span>
                  </div>
                  <p className="text-xs text-gray-300">
                    Get instant notifications about project progress, commit activities, and milestone achievements.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
  <div className="w-full mt-10">
    <div className="max-w-7xl mx-auto text-center">
      <h3 className="text-5xl font-bold mb-12 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        Built with Modern Technology
      </h3>
    </div>
  <div className="flex items-center justify-center">
    <div className="space-y-4">
  {techPairs.map((pair, idx) => (
    <ScrollVelocity
      key={idx}
      texts={[
        <div key={idx} className="flex items-center gap-10 text-white text-4xl font-mono">
          {pair.map((tech, i) => (
            <div key={i} className="flex items-center gap-2">
              {tech.icon}
              <ShinyText
                text={tech.name}
                disabled={false}
                speed={3}
                className="text-white/40"
              />
            </div>
          ))}
        </div>,
      ]}
      velocity={idx % 2 === 0 ? 70 : -70} // alternate direction for visual variety
      numCopies={20}
      className="text-white/40"
      parallaxClassName="py-2"
      scrollerClassName="text-xl md:text-3xl font-bold tracking-wide flex items-center gap-10"
    />
  ))}
</div>


  </div>
</div>


      {/* Footer */}
      <footer className="relative z-10 px-6 py-8 border-t border-slate-700">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">
            © 2025 Unified Academic Project Platform. Empowering academic excellence through technology.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default UnifiedAcademicPlatform;