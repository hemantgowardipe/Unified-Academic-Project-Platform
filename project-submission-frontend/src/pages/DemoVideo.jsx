import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, ArrowLeft, Maximize2, Minimize2, SkipBack, SkipForward, Settings } from 'lucide-react';

export default function VideoDemo() {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
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
  const [isHovering, setIsHovering] = useState(false);

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

  useEffect(() => {
    let timeout;
    if (showControls && isPlaying && !isHovering) {
      timeout = setTimeout(() => setShowControls(false), 2500);
    }
    return () => clearTimeout(timeout);
  }, [showControls, isPlaying, isHovering]);

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
    const container = containerRef.current;
    if (!document.fullscreenElement) {
      container.requestFullscreen().catch(() => {});
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

  if (videoError) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="text-center space-y-6 max-w-md">
          <div className="w-20 h-20 mx-auto bg-red-500/10 rounded-full flex items-center justify-center backdrop-blur-xl border border-red-500/20">
            <Play className="w-10 h-10 text-red-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Video Unavailable</h2>
            <p className="text-gray-400">We couldn't load this video. Please try again later.</p>
          </div>
          <button 
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-black rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Floating Back Button */}
      <div className="fixed top-6 left-6 z-50">
        <button 
          onClick={() => window.history.back()}
          className="flex items-center gap-2 px-4 py-2.5 bg-black/60 backdrop-blur-xl border border-white/10 text-white rounded-full font-medium hover:bg-black/80 transition-all duration-300 hover:scale-105 shadow-xl"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Back</span>
        </button>
      </div>

      {/* Video Container - Cinema Mode */}
      <div 
        ref={containerRef}
        className="relative w-full h-screen flex items-center justify-center bg-black"
        onMouseMove={() => setShowControls(true)}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => {
          setIsHovering(false);
          if (isPlaying) setShowControls(false);
        }}
      >
        {/* Loading State */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black z-20">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-white/10 border-t-white/80 rounded-full animate-spin"></div>
                <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-b-white/40 rounded-full animate-spin" style={{animationDirection: 'reverse', animationDuration: '1s'}}></div>
              </div>
              <p className="text-white/60 text-sm font-medium">Loading video...</p>
            </div>
          </div>
        )}

        {/* Video Element */}
        <video
          ref={videoRef}
          className="w-full h-full object-contain cursor-pointer"
          onClick={handleVideoClick}
          poster="/demovideo-poster.png">
          <source src="/uapp_demo_video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Center Play Button - Only when paused */}
        {!isPlaying && !isLoading && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <button
              onClick={handleVideoClick}
              className="pointer-events-auto w-24 h-24 bg-white/95 backdrop-blur-xl rounded-full flex items-center justify-center shadow-2xl hover:shadow-white/20 transition-all duration-500 hover:scale-110 group"
            >
              <Play className="w-10 h-10 text-black ml-1.5 group-hover:scale-110 transition-transform duration-300" fill="currentColor" />
            </button>
          </div>
        )}

        {/* Bottom Controls */}
        <div 
          className={`absolute bottom-0 left-0 right-0 transition-all duration-300 ${
            showControls ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
        >
          {/* Gradient Overlay for better contrast */}
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none"></div>

          <div className="relative px-6 pb-6 space-y-3">
            {/* Progress Bar */}
            <div 
              className="w-full h-1 bg-white/20 rounded-full cursor-pointer hover:h-1.5 transition-all duration-200 group/progress"
              onClick={handleProgressClick}
            >
              <div 
                className="h-full bg-white rounded-full transition-all duration-100 relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg opacity-0 group-hover/progress:opacity-100 transition-opacity duration-200 scale-0 group-hover/progress:scale-100"></div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between gap-4">
              {/* Left Controls */}
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => skip(-10)}
                  className="w-9 h-9 flex items-center justify-center hover:bg-white/20 rounded-full transition-all duration-200 text-white/80 hover:text-white"
                >
                  <SkipBack className="w-5 h-5" />
                </button>

                <button 
                  onClick={togglePlay} 
                  className="w-11 h-11 flex items-center justify-center hover:bg-white/20 rounded-full transition-all duration-200 text-white hover:scale-105"
                >
                  {isPlaying ? <Pause className="w-6 h-6" fill="white" /> : <Play className="w-6 h-6 ml-0.5" fill="white" />}
                </button>

                <button 
                  onClick={() => skip(10)}
                  className="w-9 h-9 flex items-center justify-center hover:bg-white/20 rounded-full transition-all duration-200 text-white/80 hover:text-white"
                >
                  <SkipForward className="w-5 h-5" />
                </button>

                {/* Volume */}
                <div className="hidden sm:flex items-center gap-2 ml-2">
                  <button 
                    onClick={toggleMute} 
                    className="w-9 h-9 flex items-center justify-center hover:bg-white/20 rounded-full transition-all duration-200 text-white/90 hover:text-white"
                  >
                    {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </button>

                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-20 h-1 bg-white/30 rounded-full appearance-none cursor-pointer slider"
                  />
                </div>

                {/* Time */}
                <div className="hidden md:block text-sm text-white/80 font-medium tabular-nums ml-2">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>
              </div>

              {/* Right Controls */}
              <div className="flex items-center gap-2">
                {/* Settings */}
                <div className="relative">
                  <button 
                    onClick={() => setShowSettings(!showSettings)}
                    className={`w-9 h-9 flex items-center justify-center hover:bg-white/20 rounded-full transition-all duration-200 ${showSettings ? 'bg-white/20 text-white' : 'text-white/80 hover:text-white'}`}
                  >
                    <Settings className="w-5 h-5" />
                  </button>
                  
                  {showSettings && (
                    <div className="absolute bottom-full right-0 mb-3 bg-black/95 backdrop-blur-xl border border-white/20 rounded-xl p-2 min-w-40 shadow-2xl">
                      <div className="text-xs text-white/50 font-semibold mb-2 px-3 pt-1">Speed</div>
                      {[0.5, 0.75, 1, 1.25, 1.5, 2].map(rate => (
                        <button
                          key={rate}
                          onClick={() => handlePlaybackRate(rate)}
                          className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-all duration-200 font-medium ${
                            playbackRate === rate 
                              ? 'bg-white text-black' 
                              : 'text-white/90 hover:bg-white/10'
                          }`}
                        >
                          {rate === 1 ? 'Normal' : `${rate}×`}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <button 
                  onClick={toggleFullscreen} 
                  className="w-9 h-9 flex items-center justify-center hover:bg-white/20 rounded-full transition-all duration-200 text-white/80 hover:text-white"
                >
                  {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 14px;
          height: 14px;
          background: white;
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        }
        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.15);
          box-shadow: 0 2px 12px rgba(255,255,255,0.4);
        }
        .slider::-moz-range-thumb {
          width: 14px;
          height: 14px;
          background: white;
          border-radius: 50%;
          cursor: pointer;
          border: none;
          transition: all 0.2s ease;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        }
        .slider::-moz-range-thumb:hover {
          transform: scale(1.15);
          box-shadow: 0 2px 12px rgba(255,255,255,0.4);
        }
      `}</style>
    </div>
  );
}