import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, ArrowLeft, Maximize2, Minimize2, SkipBack, SkipForward, Settings, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
export default function VideoDemo() {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [videoError, setVideoError] = useState(false);

  // Update progress and time
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      setProgress((video.currentTime / video.duration) * 100);
      setCurrentTime(video.currentTime);
    };

    const updateDuration = () => {
      setDuration(video.duration);
      setIsLoading(false);
    };

    const handleError = () => {
      setVideoError(true);
      setIsLoading(false);
    };

    video.addEventListener('timeupdate', updateProgress);
    video.addEventListener('loadedmetadata', updateDuration);
    video.addEventListener('error', handleError);
    
    return () => {
      video.removeEventListener('timeupdate', updateProgress);
      video.removeEventListener('loadedmetadata', updateDuration);
      video.removeEventListener('error', handleError);
    };
  }, []);

  // Auto-hide controls
  useEffect(() => {
    let timeout;
    if (showControls && isPlaying) {
      timeout = setTimeout(() => setShowControls(false), 3000);
    }
    return () => clearTimeout(timeout);
  }, [showControls, isPlaying]);

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    
    if (video.paused) {
      video.play().catch(() => setVideoError(true));
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e) => {
    const video = videoRef.current;
    const vol = parseFloat(e.target.value);
    video.volume = vol;
    setVolume(vol);
    if (vol > 0) setIsMuted(false);
  };

  const handlePlaybackRate = (rate) => {
    const video = videoRef.current;
    video.playbackRate = rate;
    setPlaybackRate(rate);
    setShowSettings(false);
  };

  const handleProgressClick = (e) => {
    const video = videoRef.current;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    video.currentTime = (clickX / width) * video.duration;
  };

  const skip = (seconds) => {
    const video = videoRef.current;
    video.currentTime = Math.max(0, Math.min(video.duration, video.currentTime + seconds));
  };

  const toggleFullscreen = () => {
    const videoContainer = videoRef.current.parentElement;
    if (!document.fullscreenElement) {
      videoContainer.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const handleVideoClick = () => {
    setShowControls(true);
    togglePlay();
  };

  const goBack = () => {
    // In a real app, this would use navigate('/')
    console.log('Navigate back');
  };

  if (videoError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-red-500/20 rounded-full flex items-center justify-center">
            <Play className="w-8 h-8 text-red-400" />
          </div>
          <h2 className="text-xl font-semibold text-white">Video unavailable</h2>
          <p className="text-gray-400">The demo video could not be loaded.</p>
          <button 
            onClick={goBack}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full font-medium hover:bg-white/20 transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <button 
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-lg font-medium hover:bg-white/20 transition-all duration-300 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-200" />
            Back
          </button>
          <div className="text-right">
            <h1 className="text-2xl font-bold text-white">Demo Video</h1>
            <p className="text-gray-400">Product Showcase</p>
          </div>
        </div>

        <div 
          className="relative group cursor-pointer"
          onMouseMove={() => setShowControls(true)}
          onMouseLeave={() => isPlaying && setShowControls(false)}
        >
          {/* Video Container */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black/50 backdrop-blur-sm border border-white/10">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-10">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                  <p className="text-white/80">Loading video...</p>
                </div>
              </div>
            )}

            <video
              ref={videoRef}
              className="w-full aspect-video object-cover"
              onClick={handleVideoClick}
              poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='450' fill='%23000'%3E%3Crect width='100%25' height='100%25' fill='%23111'/%3E%3Ctext x='50%25' y='50%25' font-size='24' fill='%23666' text-anchor='middle' dy='.3em'%3EDemo Video%3C/text%3E%3C/svg%3E"
            >
              <source src="/uapp_demo_video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Play Button Overlay */}
            {!isPlaying && !isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                <button
                  onClick={handleVideoClick}
                  className="w-20 h-20 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-110 border border-white/20 group"
                >
                  <Play className="w-8 h-8 text-gray-900 ml-1 group-hover:scale-110 transition-transform duration-300" fill="currentColor" />
                </button>
              </div>
            )}

            {/* Controls Overlay */}
            <div className={`absolute bottom-0 left-0 right-0 transition-all duration-500 ${showControls ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
              {/* Progress Bar */}
              <div className="px-4 pb-3">
                <div 
                  className="w-full h-1.5 bg-white/20 rounded-full cursor-pointer hover:h-2 transition-all duration-200 group"
                  onClick={handleProgressClick}
                >
                  <div className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full transition-all duration-150 relative group-hover:shadow-lg group-hover:shadow-blue-500/50" style={{ width: `${progress}%` }}>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                  </div>
                </div>
              </div>

              {/* Control Panel */}
              <div className="bg-black/80 backdrop-blur-xl border-t border-white/10 px-6 py-4">
                <div className="flex items-center justify-between">
                  
                  {/* Left Controls */}
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => skip(-10)}
                      className="w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-full transition-all duration-200 text-white/80 hover:text-white hover:scale-105"
                    >
                      <SkipBack className="w-5 h-5" />
                    </button>

                    <button 
                      onClick={togglePlay} 
                      className="w-12 h-12 flex items-center justify-center hover:bg-white/10 rounded-full transition-all duration-200 text-white hover:scale-105"
                    >
                      {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
                    </button>

                    <button 
                      onClick={() => skip(10)}
                      className="w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-full transition-all duration-200 text-white/80 hover:text-white hover:scale-105"
                    >
                      <SkipForward className="w-5 h-5" />
                    </button>

                    {/* Volume Controls */}
                    <div className="flex items-center gap-2 ml-4">
                      <button 
                        onClick={toggleMute} 
                        className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-md transition-colors duration-200 text-white/80 hover:text-white"
                      >
                        {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </button>

                      <div className="relative group/volume">
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.01"
                          value={isMuted ? 0 : volume}
                          onChange={handleVolumeChange}
                          className="w-20 h-1 bg-white/20 rounded-full appearance-none cursor-pointer slider"
                        />
                      </div>
                    </div>

                    {/* Time Display */}
                    <div className="text-sm text-white/60 font-mono ml-4">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </div>
                  </div>

                  {/* Right Controls */}
                  <div className="flex items-center gap-2">
                    {/* Settings Dropdown */}
                    <div className="relative">
                      <button 
                        onClick={() => setShowSettings(!showSettings)}
                        className="w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-full transition-all duration-200 text-white/80 hover:text-white"
                      >
                        <Settings className="w-4 h-4" />
                      </button>
                      
                      {showSettings && (
                        <div className="absolute bottom-full right-0 mb-2 bg-black/90 backdrop-blur-xl border border-white/10 rounded-lg p-2 min-w-32">
                          <div className="text-xs text-white/60 font-medium mb-2 px-2">Playback Speed</div>
                          {[0.5, 0.75, 1, 1.25, 1.5, 2].map(rate => (
                            <button
                              key={rate}
                              onClick={() => handlePlaybackRate(rate)}
                              className={`w-full text-left px-2 py-1.5 text-sm rounded transition-colors duration-150 ${
                                playbackRate === rate ? 'bg-white/20 text-white' : 'text-white/80 hover:bg-white/10 hover:text-white'
                              }`}
                            >
                              {rate}x {rate === 1 && '(Normal)'}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    <button className="w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-full transition-all duration-200 text-white/80 hover:text-white">
                      <Download className="w-4 h-4" />
                    </button>

                    <button 
                      onClick={toggleFullscreen} 
                      className="w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-full transition-all duration-200 text-white/80 hover:text-white"
                    >
                      {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 12px;
          height: 12px;
          background: white;
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 0 10px rgba(255,255,255,0.5);
        }
        .slider::-moz-range-thumb {
          width: 12px;
          height: 12px;
          background: white;
          border-radius: 50%;
          cursor: pointer;
          border: none;
          transition: all 0.2s ease;
        }
        .slider::-moz-range-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 0 10px rgba(255,255,255,0.5);
        }
      `}</style>
    </div>
  );
}