import React, { useEffect } from 'react';

const ShinyText = ({ text, disabled = false, speed = 5, className = '' }) => {
  useEffect(() => {
    // Inject the keyframes if they don't exist
    if (!document.getElementById('shine-keyframes')) {
      const style = document.createElement('style');
      style.id = 'shine-keyframes';
      style.textContent = `
        @keyframes shine {
          0% { background-position: 100%; }
          100% { background-position: -100%; }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <div
      className={`text-[#b5b5b5a4] bg-clip-text inline-block ${className}`}
      style={{
        backgroundImage: 'linear-gradient(120deg, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 60%)',
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text',
        animation: disabled ? 'none' : `shine ${speed}s linear infinite`,
      }}
    >
      {text}
    </div>
  );
};

export default ShinyText;