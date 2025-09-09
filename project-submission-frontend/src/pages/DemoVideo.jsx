import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, ArrowLeft  } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function VideoDemo() {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      const progress = (video.currentTime / video.duration) * 100;
      setProgress(progress);
    };

    video.addEventListener('timeupdate', updateProgress);
    return () => video.removeEventListener('timeupdate', updateProgress);
  }, []);

  useEffect(() => {
    let timeout;
    if (showControls && isPlaying) {
      timeout = setTimeout(() => {
        setShowControls(false);
      }, 2000);
    }
    return () => clearTimeout(timeout);
  }, [showControls, isPlaying]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleVideoClick = () => {
    setShowControls(true);
    togglePlay();
  };

  const handleMouseMove = () => {
    setShowControls(true);
  };

  const handleMouseLeave = () => {
    if (isPlaying) {
      setShowControls(false);
    }
  };

  const handleProgressClick = (e) => {
    const video = videoRef.current;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newTime = (clickX / width) * video.duration;
    video.currentTime = newTime;
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div 
          className="relative group cursor-pointer"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Video Container */}
          <div className="relative rounded-xl overflow-hidden shadow-2xl bg-gray-50 border border-gray-100">
            <video
              ref={videoRef}
              className="w-full aspect-video object-cover"
              onClick={handleVideoClick}
              poster="/demovideo-poster.png"
              muted
            >
              <source src="/uapp_demo_video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Play Button Overlay */}
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/5">
                <button
                  onClick={handleVideoClick}
                  className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-200"
                >
                  <Play className="w-6 h-6 text-gray-700 ml-0.5" fill="currentColor" />
                </button>
              </div>
            )}

            {/* Minimal Controls */}
            <div className={`absolute bottom-0 left-0 right-0 transition-opacity duration-300 ${
              showControls ? 'opacity-100' : 'opacity-0'
            }`}>
              {/* Progress Bar */}
              <div 
                className="w-full h-1 bg-gray-300 cursor-pointer hover:h-1.5 transition-all duration-200"
                onClick={handleProgressClick}
              >
                <div 
                  className="h-full bg-gray-900 transition-all duration-100"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Control Panel */}
              <div className="bg-white/95 backdrop-blur-sm border-t border-gray-200 px-4 py-3">
                <div className="flex items-center justify-between">
                  <button
                    onClick={togglePlay}
                    className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-md transition-colors duration-200"
                  >
                    {isPlaying ? (
                      <Pause className="w-4 h-4 text-gray-700" fill="currentColor" />
                    ) : (
                      <Play className="w-4 h-4 text-gray-700 ml-0.5" fill="currentColor" />
                    )}
                  </button>
                  
                  <div className="text-xs text-gray-500 font-mono">
                    Demo
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Back to Site Button */}
        <div className="mt-8 text-center">
          <button 
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}