import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { ChevronRight, Code, Database, Shield, Rocket, FileText, Users, Settings, Copy, Check, Menu, X, Book, GitBranch } from "lucide-react";

const sections = [
  { id: "intro", label: "Introduction", icon: Book },
  { id: "features", label: "Features", icon: FileText },
  { id: "setup", label: "Quick Start", icon: Rocket },
  { id: "usage", label: "Usage", icon: Users },
  { id: "api", label: "API Reference", icon: Code },
  { id: "db", label: "Database", icon: Database },
  { id: "security", label: "Security", icon: Shield },
  { id: "deployment", label: "Deployment", icon: Settings },
  { id: "future", label: "Roadmap", icon: GitBranch },
];

const CodeBlock = ({ children, title, language = "bash" }) => {
  // ✅ Set page title here
  useEffect(() => {
    document.title = "UAPP | Documentation";
  }, []);
  const [copied, setCopied] = useState(false);
  
  const handleCopy = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-4 sm:my-6">
      {title && (
        <div className="text-xs font-medium text-neutral-600 mb-2 flex items-center gap-2 px-1">
          <Code className="w-3 h-3 flex-shrink-0" />
          <span className="truncate">{title}</span>
        </div>
      )}
      <div className="relative bg-neutral-50 border border-neutral-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <pre className="p-3 sm:p-4 text-xs sm:text-sm font-mono text-neutral-800 leading-relaxed whitespace-pre-wrap break-words min-w-0">
            {children}
          </pre>
        </div>
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 sm:top-3 sm:right-3 p-1.5 bg-white border border-neutral-200 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-neutral-50 z-10"
          title="Copy code"
        >
          {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4 text-neutral-500" />}
        </button>
      </div>
    </div>
  );
};

const FeatureItem = ({ children, status }) => (
  <div className="flex items-center gap-2 sm:gap-3 py-2">
    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
      status === 'completed' ? 'bg-green-500' : 
      status === 'beta' ? 'bg-blue-500' : 
      'bg-amber-500'
    }`} />
    <span className="text-neutral-700 text-sm sm:text-base min-w-0 flex-1">{children}</span>
    {status === 'beta' && (
      <span className="text-xs px-1.5 py-0.5 bg-blue-50 text-blue-700 rounded font-medium flex-shrink-0">
        Beta
      </span>
    )}
    {status === 'planned' && (
      <span className="text-xs px-1.5 py-0.5 bg-amber-50 text-amber-700 rounded font-medium flex-shrink-0">
        Soon
      </span>
    )}
  </div>
);

const APIEndpoint = ({ method, endpoint, description }) => (
  <div className="border border-neutral-200 rounded-lg p-3 sm:p-4 bg-white">
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
      <span className={`px-2 py-1 text-xs font-mono rounded font-medium inline-block w-fit ${
        method === 'GET' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
        method === 'POST' ? 'bg-green-50 text-green-700 border border-green-200' :
        method === 'PATCH' ? 'bg-orange-50 text-orange-700 border border-orange-200' :
        'bg-neutral-50 text-neutral-700 border border-neutral-200'
      }`}>
        {method}
      </span>
      <code className="font-mono text-xs sm:text-sm text-neutral-800 break-all">{endpoint}</code>
    </div>
    {description && <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">{description}</p>}
  </div>
);

const Docs = () => {
  const [activeSection, setActiveSection] = useState("intro");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const observerOptions = {
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <div className="w-6 h-6 sm:w-7 sm:h-7 bg-black rounded-md flex items-center justify-center flex-shrink-0">
              <Code className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
            </div>
            <span className="text-base sm:text-lg font-semibold text-neutral-900 truncate">
              Unified Project Platform
            </span>
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md hover:bg-neutral-100 transition-colors flex-shrink-0"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex w-64 flex-col border-r border-neutral-200 sticky top-16 h-[calc(100vh-4rem)]">
          <nav className="p-6 flex-1">
            <div className="space-y-1">
              {sections.map((section) => {
                const Icon = section.icon;
                const isActive = activeSection === section.id;
                return (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-left transition-colors text-sm ${
                      isActive 
                        ? 'bg-neutral-100 text-neutral-900 font-medium' 
                        : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{section.label}</span>
                    {isActive && <ChevronRight className="w-3 h-3 ml-auto" />}
                  </button>
                );
              })}
            </div>
          </nav>
        </aside>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <button className="fixed inset-0 bg-black/20" onClick={() => setMobileMenuOpen(false)} aria-label="Close mobile menu"></button>
            <div className="fixed left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white border-r border-neutral-200 p-4 sm:p-6 overflow-y-auto">
              <div className="flex items-center gap-3 mb-6 sm:mb-8">
                <div className="w-6 h-6 sm:w-7 sm:h-7 bg-black rounded-md flex items-center justify-center">
                  <Code className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </div>
                <span className="font-semibold text-neutral-900">Documentation</span>
              </div>
              <nav className="space-y-1">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-left text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 transition-colors text-sm"
                    >
                      <Icon className="w-4 h-4" />
                      <span>{section.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 w-full min-w-0">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
            {/* Introduction */}
            <section id="intro" className="mb-12 sm:mb-16">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 mb-4 leading-tight">
                  Unified Project Platform
                </h1>
                <p className="text-lg sm:text-xl text-neutral-600 mb-6 sm:mb-8 leading-relaxed">
                  A comprehensive internal project management portal designed for educational institutions. 
                  Streamline project submissions, evaluations, and collaboration between students and faculty.
                </p>

                {/* Video Demo Section */}
                <div className="mb-8 sm:mb-12">
                  <div className="border border-neutral-200 rounded-xl overflow-hidden bg-gradient-to-br from-neutral-50 to-neutral-100/50">
                    <div className="p-4 sm:p-6 border-b border-neutral-200 bg-white/80">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="ml-3 text-sm font-medium text-neutral-700">Platform Demo</span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-semibold text-neutral-900">See it in Action</h3>
                      <p className="text-sm text-neutral-600 mt-1">Complete walkthrough of the platform features and workflows</p>
                    </div>
                    
                    <div className="relative aspect-video bg-neutral-900">
                      <video 
                        controls 
                        preload="metadata"
                        playsInline
                        className="w-full h-full object-cover relative z-10"
                        poster="/demo_vid-poster.png"
                      >
                        <source src="/demo_vid.mp4" type="video/mp4"/>
                        <track kind="captions" src="" label="No captions available" />
                        Your browser does not support the video tag.
                      </video>
                      
                      {/* Video Overlay Info - positioned to not interfere with controls */}
                      <div className="absolute top-4 left-4 right-4 pointer-events-none">
                        <div className="bg-black/60 backdrop-blur-sm rounded-lg p-2 sm:p-3 text-white">
                          <div className="flex items-center justify-between text-xs sm:text-sm">
                            <span className="font-medium">Platform Demo</span>
                            <span className="text-neutral-300">5:30 min</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Video Description */}
                    <div className="p-4 sm:p-6 bg-white">
                      <div className="grid sm:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-neutral-500" />
                          <span className="text-neutral-600">Student workflow</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Settings className="w-4 h-4 text-neutral-500" />
                          <span className="text-neutral-600">Admin features</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4 text-neutral-500" />
                          <span className="text-neutral-600">Security overview</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                  <div className="border border-neutral-200 rounded-lg p-4 sm:p-6 bg-neutral-50/50">
                    <h3 className="font-semibold text-neutral-900 mb-3">Target Users</h3>
                    <p className="text-neutral-600 text-sm leading-relaxed">
                      Built specifically for students and faculty members in academic institutions 
                      who need efficient project management and evaluation tools.
                    </p>
                  </div>
                  <div className="border border-neutral-200 rounded-lg p-4 sm:p-6 bg-neutral-50/50">
                    <h3 className="font-semibold text-neutral-900 mb-3">Technology Stack</h3>
                    <div className="flex flex-wrap gap-2">
                      {['Spring Boot', 'MongoDB Atlas', 'React', 'JWT Auth'].map((tech) => (
                        <span key={tech} className="px-2 py-1 bg-white border border-neutral-200 rounded text-xs font-medium text-neutral-700">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </section>

            {/* Features */}
            <section id="features" className="mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-3">Features</h2>
              <p className="text-neutral-600 mb-6 sm:mb-8">Core functionality and capabilities of the platform</p>
              
              <div className="grid sm:grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-1 sm:gap-y-2">
                <FeatureItem status="completed">Student Registration & Login</FeatureItem>
                <FeatureItem status="completed">Project Submission Management</FeatureItem>
                <FeatureItem status="completed">PDF Upload & Storage</FeatureItem>
                <FeatureItem status="completed">GitHub Repository Integration</FeatureItem>
                <FeatureItem status="completed">Student Dashboard</FeatureItem>
                <FeatureItem status="completed">Admin Management Panel</FeatureItem>
                <FeatureItem status="completed">Git Timeline Visualization</FeatureItem>
                <FeatureItem status="completed">JWT Authentication System</FeatureItem>
                <FeatureItem status="beta">Redis Caching Layer</FeatureItem>
                <FeatureItem status="beta">AI Chatbot Microservice</FeatureItem>
              </div>
            </section>

            {/* Quick Start */}
            <section id="setup" className="mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-3">Quick Start</h2>
              <p className="text-neutral-600 mb-6 sm:mb-8">Get the platform running locally in a few simple steps</p>

              <div className="space-y-6 sm:space-y-8">
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4">Backend Setup</h3>
                  <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-3 sm:p-4 mb-4">
                    <h4 className="font-medium text-neutral-900 mb-2 text-sm sm:text-base">Prerequisites</h4>
                    <p className="text-xs sm:text-sm text-neutral-600">Java 21, Maven, MongoDB Atlas account, Redis (optional)</p>
                  </div>
                  <CodeBlock title="Install and run the backend">
{`mvn clean install
mvn spring-boot:run`}
                  </CodeBlock>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4">Frontend Setup</h3>
                  <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-3 sm:p-4 mb-4">
                    <h4 className="font-medium text-neutral-900 mb-2 text-sm sm:text-base">Prerequisites</h4>
                    <p className="text-xs sm:text-sm text-neutral-600">Node.js 18+, npm or yarn package manager</p>
                  </div>
                  <CodeBlock title="Install and start the frontend">
{`npm install
npm run dev`}
                  </CodeBlock>
                </div>
              </div>
            </section>

            {/* Usage */}
            <section id="usage" className="mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-3">Usage</h2>
              <p className="text-neutral-600 mb-6 sm:mb-8">Understanding the platform workflows</p>

              <div className="space-y-6 sm:space-y-8">
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4">Student Workflow</h3>
                  <div className="border border-neutral-200 rounded-lg p-4 sm:p-6 overflow-x-auto">
                    <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-neutral-600 min-w-max">
                      <span className="font-medium text-neutral-900">Register</span>
                      <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                      <span className="font-medium text-neutral-900">Submit Project</span>
                      <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                      <span className="font-medium text-neutral-900">Upload PDF</span>
                      <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                      <span className="font-medium text-neutral-900">Link Repository</span>
                      <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                      <span className="font-medium text-neutral-900">Track Progress</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4">Admin Workflow</h3>
                  <div className="border border-neutral-200 rounded-lg p-4 sm:p-6 overflow-x-auto">
                    <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-neutral-600 min-w-max">
                      <span className="font-medium text-neutral-900">Login</span>
                      <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                      <span className="font-medium text-neutral-900">Review Projects</span>
                      <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                      <span className="font-medium text-neutral-900">Add Remarks</span>
                      <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                      <span className="font-medium text-neutral-900">Manage Users</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* API Reference */}
            <section id="api" className="mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-3">API Reference</h2>
              <p className="text-neutral-600 mb-6 sm:mb-8">RESTful API endpoints for platform integration</p>

              <div className="space-y-6 sm:space-y-8">
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4">Authentication</h3>
                  <div className="space-y-3">
                    <APIEndpoint 
                      method="POST" 
                      endpoint="/auth/login" 
                      description="Authenticate user credentials and receive JWT token"
                    />
                    <APIEndpoint 
                      method="POST" 
                      endpoint="/auth/register" 
                      description="Register new user account with email verification"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4">Project Management</h3>
                  <div className="space-y-3">
                    <APIEndpoint 
                      method="POST" 
                      endpoint="/api/projects" 
                      description="Create a new project submission"
                    />
                    <APIEndpoint 
                      method="GET" 
                      endpoint="/api/projects/{id}" 
                      description="Retrieve project details and metadata"
                    />
                    <APIEndpoint 
                      method="PATCH" 
                      endpoint="/api/projects/{id}/remarks" 
                      description="Add administrative remarks to project"
                    />
                    <APIEndpoint 
                      method="GET" 
                      endpoint="/api/projects/{id}/pdf" 
                      description="Download project documentation PDF"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Database */}
            <section id="db" className="mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-3">Database Schema</h2>
              <p className="text-neutral-600 mb-6 sm:mb-8">MongoDB document structure and data models</p>

              <div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-4">Project Document</h3>
                <CodeBlock title="MongoDB Document Structure">
{`{
  "_id": "65ef4f2cba123456789",
  "title": "AI Chatbot for College Information System",
  "description": "Intelligent chatbot for handling student FAQs and information queries",
  "students": ["Alice Johnson", "Bob Smith"],
  "guideName": "Dr. Sharma",
  "coGuideName": "Prof. Verma",
  "githubRepo": "https://github.com/college/ai-chatbot",
  "startDate": "2025-01-15",
  "finalSubmissionDate": "2025-04-30",
  "status": "in-progress",
  "milestones": [
    {
      "title": "Research and Planning Phase",
      "dueDate": "2025-02-15",
      "completed": true,
      "completedAt": "2025-02-10T10:00:00Z"
    }
  ],
  "remarks": [
    {
      "text": "Excellent progress on the initial research phase. Consider expanding the NLP capabilities.",
      "author": "Dr. Sharma",
      "authorRole": "guide",
      "createdAt": "2025-02-10T10:00:00Z",
      "rating": 4.5
    }
  ],
  "tags": ["AI", "NLP", "Web Development", "Machine Learning"],
  "category": "Computer Science",
  "semester": "Spring 2025",
  "createdAt": "2025-01-15T09:00:00Z",
  "updatedAt": "2025-02-10T10:00:00Z"
}`}
                </CodeBlock>
              </div>
            </section>

            {/* Security */}
            <section id="security" className="mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-3">Security</h2>
              <p className="text-neutral-600 mb-6 sm:mb-8">Authentication and authorization mechanisms</p>

              <div className="space-y-6">
                <div className="border border-neutral-200 rounded-lg p-4 sm:p-6">
                  <h3 className="font-semibold text-neutral-900 mb-3">JWT Authentication</h3>
                  <p className="text-neutral-600 text-sm mb-4 leading-relaxed">
                    Stateless authentication using JSON Web Tokens with configurable expiration times 
                    and secure signing algorithms.
                  </p>
                  <div className="bg-neutral-50 border border-neutral-200 rounded p-3 text-xs font-mono text-neutral-700 overflow-x-auto">
                    <div className="whitespace-nowrap">Authorization: Bearer &lt;jwt_token&gt;</div>
                  </div>
                </div>

                <div className="border border-neutral-200 rounded-lg p-4 sm:p-6">
                  <h3 className="font-semibold text-neutral-900 mb-3">Role-Based Access Control</h3>
                  <p className="text-neutral-600 text-sm mb-4 leading-relaxed">
                    Granular permission system with distinct roles for students, faculty, and administrators.
                  </p>
                  <div className="grid sm:grid-cols-3 gap-3 sm:gap-4 text-xs">
                    <div className="bg-neutral-50 border border-neutral-200 rounded p-3">
                      <div className="font-medium text-neutral-900 mb-1">Student</div>
                      <div className="text-neutral-600">Project CRUD, View feedback</div>
                    </div>
                    <div className="bg-neutral-50 border border-neutral-200 rounded p-3">
                      <div className="font-medium text-neutral-900 mb-1">Faculty</div>
                      <div className="text-neutral-600">Review projects, Add remarks</div>
                    </div>
                    <div className="bg-neutral-50 border border-neutral-200 rounded p-3">
                      <div className="font-medium text-neutral-900 mb-1">Admin</div>
                      <div className="text-neutral-600">Full system access, User management</div>
                    </div>
                  </div>
                </div>

                <div className="border border-neutral-200 rounded-lg p-4 sm:p-6">
                  <h3 className="font-semibold text-neutral-900 mb-3">Session Management</h3>
                  <p className="text-neutral-600 text-sm leading-relaxed">
                    Secure session handling with automatic token refresh and logout on expiration.
                  </p>
                </div>
              </div>
            </section>

            {/* Deployment */}
            <section id="deployment" className="mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-3">Deployment</h2>
              <p className="text-neutral-600 mb-6 sm:mb-8">Production deployment guide and recommendations</p>

              <div className="space-y-6">
                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="border border-neutral-200 rounded-lg p-4 sm:p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Database className="w-5 h-5 text-neutral-600" />
                      <h3 className="font-semibold text-neutral-900">Backend Deployment</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-neutral-50 rounded p-3">
                        <div className="font-medium text-neutral-900 text-sm mb-1">Recommended: Render</div>
                        <p className="text-xs text-neutral-600">Automatic deployments from Git with built-in CI/CD</p>
                      </div>
                      <CodeBlock>
{`# Environment Variables
DB_URI=mongodb+srv://...
JWT_SECRET=your-secret-key
REDIS_URL=redis://...`}
                      </CodeBlock>
                    </div>
                  </div>

                  <div className="border border-neutral-200 rounded-lg p-4 sm:p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Code className="w-5 h-5 text-neutral-600" />
                      <h3 className="font-semibold text-neutral-900">Frontend Deployment</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-neutral-50 rounded p-3">
                        <div className="font-medium text-neutral-900 text-sm mb-1">Recommended: Vercel</div>
                        <p className="text-xs text-neutral-600">Edge network deployment with instant rollbacks</p>
                      </div>
                      <CodeBlock>
{`# Environment Variables
REACT_APP_API_URL=https://api.yourapp.com
REACT_APP_ENV=production`}
                      </CodeBlock>
                    </div>
                  </div>
                </div>

                <div className="border border-neutral-200 rounded-lg p-4 sm:p-6">
                  <h3 className="font-semibold text-neutral-900 mb-4">Domain Configuration</h3>
                  <p className="text-neutral-600 text-sm mb-4 leading-relaxed">
                    Configure custom domains and subdomains for professional deployment.
                  </p>
                  <div className="bg-neutral-50 border border-neutral-200 rounded p-3 sm:p-4 font-mono text-xs sm:text-sm text-neutral-700 overflow-x-auto">
                    <div className="whitespace-nowrap">Frontend: https://projects.college.edu</div>
                    <div className="whitespace-nowrap">API: https://api-projects.college.edu</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Roadmap */}
            <section id="future" className="mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-3">Roadmap</h2>
              <p className="text-neutral-600 mb-6 sm:mb-8">Planned features and improvements for future releases</p>

              <div className="space-y-6">
                <div className="border border-neutral-200 rounded-lg p-4 sm:p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-6 h-6 bg-neutral-100 border border-neutral-200 rounded flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-neutral-700">Q2</span>
                    </div>
                    <h3 className="font-semibold text-neutral-900">Q2 2025</h3>
                  </div>
                  <div className="space-y-2">
                    <FeatureItem status="planned">Faculty Guide Login Portal</FeatureItem>
                    <FeatureItem status="planned">Advanced Project Evaluation System</FeatureItem>
                  </div>
                </div>

                <div className="border border-neutral-200 rounded-lg p-4 sm:p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-6 h-6 bg-neutral-100 border border-neutral-200 rounded flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-neutral-700">Q3</span>
                    </div>
                    <h3 className="font-semibold text-neutral-900">Q3 2025</h3>
                  </div>
                  <div className="space-y-2">
                    <FeatureItem status="planned">Real-time Notification System</FeatureItem>
                    <FeatureItem status="planned">CI/CD Pipeline Integration</FeatureItem>
                  </div>
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-neutral-200 pt-8 sm:pt-12 pb-6 sm:pb-8">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
                    <Code className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-semibold text-neutral-900">Unified Project Platform</span>
                </div>
                <div className="text-sm text-neutral-500">
                  © {new Date().getFullYear()} All rights reserved
                </div>
              </div>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
};
FeatureItem.propTypes = {
  children: PropTypes.node.isRequired,
  status: PropTypes.string.isRequired,
};
CodeBlock.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  language: PropTypes.string,
};
APIEndpoint.propTypes = {
  method: PropTypes.string.isRequired,
  endpoint: PropTypes.string.isRequired,
  description: PropTypes.string,
};
export default Docs;