import React, { useEffect, useState } from 'react';
import '../styles/Background.css';

const FuturisticBackground: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="futuristic-background">
      <div className="grid-overlay" />
      <div
        className="glow-effect"
        style={{
          transform: `translate(${mousePosition.x * 50 - 25}px, ${mousePosition.y * 50 - 25}px)`,
        }}
      />
      <div className="nodes-container">
        {Array.from({ length: 15 }).map((_, index) => (
          <div
            key={index}
            className="node"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${8 + Math.random() * 12}s`,
            }}
          />
        ))}
      </div>
      <div className="flare-overlay" />
    </div>
  );
};

export default FuturisticBackground;