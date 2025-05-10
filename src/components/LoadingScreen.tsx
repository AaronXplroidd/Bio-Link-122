import React, { useEffect, useState, useRef } from 'react';
import '../styles/LoadingScreen.css';

interface LoadingScreenProps {
  progress?: number;
  onComplete?: () => void;
  autoProgress?: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({
  progress = 0,
  onComplete,
  autoProgress = true
}) => {
  const [loadingProgress, setLoadingProgress] = useState(progress);
  const [time, setTime] = useState(new Date());
  const [visible, setVisible] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto/manual progress handler
  useEffect(() => {
    const finish = () => {
      setTimeout(() => {
        setVisible(false);
        onComplete?.();
      }, 500);
    };

    if (autoProgress) {
      intervalRef.current = setInterval(() => {
        setLoadingProgress(prev => {
          const next = Math.min(prev + Math.random() * 4 + 1, 100);
          if (next >= 100) {
            clearInterval(intervalRef.current!);
            finish();
          }
          return next;
        });
      }, 150);
    } else {
      setLoadingProgress(progress);
      if (progress >= 100) finish();
    }

    return () => clearInterval(intervalRef.current!);
  }, [autoProgress, progress, onComplete]);

  // Update jam analog
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Lock scroll saat loading
  useEffect(() => {
    document.body.style.overflow = visible ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [visible]);

  // Hitung sudut jarum jam
  const hours = time.getHours() % 12;
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const hourAngle = hours * 30 + minutes * 0.5;
  const minuteAngle = minutes * 6;
  const secondAngle = seconds * 6;

  const renderClockMarkings = () =>
    Array.from({ length: 60 }, (_, i) => {
      const angle = i * 6;
      const isHourMark = i % 5 === 0;
      return (
        <div
          key={i}
          className={`clock-marking ${isHourMark ? 'hour-mark' : ''}`}
          style={{ transform: `rotate(${angle}deg)` }}
        />
      );
    });

  if (!visible) return null;

  return (
    <div className="loading-container">
      {/* Background FX */}
      <div className="lightning-overlay"></div>
      <div className="lightning-streak"></div>
      <div className="lightning-streak"></div>
      <div className="lightning-streak"></div>
      <div className="decorative-dot dot1"></div>
      <div className="decorative-dot dot2"></div>
      <div className="decorative-dot dot3"></div>
      <div className="glow-effect"></div>

      {/* Jam analog */}
      <div className="clock-container">
        <div className="radial-bg"></div>
        <div className="radial-bg-2"></div>
        <div className="clock-face">
          {renderClockMarkings()}
          <div className="clock-detail"></div>
          <div className="clock-inner-detail"></div>
          <div className="clock-hand hour-hand" style={{ transform: `translate(-50%, -100%) rotate(${hourAngle}deg)` }}></div>
          <div className="clock-hand minute-hand" style={{ transform: `translate(-50%, -100%) rotate(${minuteAngle}deg)` }}></div>
          <div className="clock-hand second-hand" style={{ transform: `translate(-50%, -100%) rotate(${secondAngle}deg)` }}></div>
          <div className="clock-center"></div>
          <div className="clock-reflection"></div>
        </div>
      </div>

      {/* Bar loading */}
      <div className="loading-bar-container">
        <div className="loading-bar" style={{ width: `${Math.round(loadingProgress)}%` }}></div>
      </div>
      <div className="loading-percentage">{Math.round(loadingProgress)}%</div>
    </div>
  );
};

export default LoadingScreen;