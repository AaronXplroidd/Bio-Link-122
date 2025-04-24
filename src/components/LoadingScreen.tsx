import React, { useEffect, useState } from 'react';
import '../styles/LoadingScreen.css';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [tagline, setTagline] = useState('');
  const taglines = [
    'sabar bentar bang!...',
    'Identifying A Page...',
    'Loading lama?sabar bang:(...',
    'Loading awesomeness...',
  ];
  const [currentTaglineIndex, setCurrentTaglineIndex] = useState(0);

  useEffect(() => {
    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 10;
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 200);

    // Tagline typing effect
    let charIndex = 0;
    const typeInterval = setInterval(() => {
      const currentTagline = taglines[currentTaglineIndex];
      if (charIndex <= currentTagline.length) {
        setTagline(currentTagline.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          setCurrentTaglineIndex((prev) => (prev + 1) % taglines.length);
          setTagline('');
          charIndex = 0;
        }, 1500);
      }
    }, 80);

    // Complete loading after 5 seconds
    setTimeout(() => {
      clearInterval(progressInterval);
      setProgress(100);
      setTimeout(() => {
        onLoadingComplete();
      }, 1000);
    }, 5000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(typeInterval);
    };
  }, [onLoadingComplete, currentTaglineIndex]);

  // Calculate stroke dash offset for circular progress
  const circumference = 2 * Math.PI * 90; // Radius = 90
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className={`loading-screen ${progress === 100 ? 'fade-out' : ''}`}>
      <div className="loading-content">
        <svg className="progress-ring" width="200" height="200">
          <circle
            className="progress-ring__circle-bg"
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="#1a1a1a"
            strokeWidth="10"
          />
          <circle
            className="progress-ring__circle"
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="#00ffcc"
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
          />
        </svg>
        <div className="progress-text">{Math.round(progress)}%</div>
        <h1 className="tagline-text">{tagline}</h1>
      </div>
    </div>
  );
};

export default LoadingScreen;
