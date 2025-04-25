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
      {/* Grid Overlay */}
      <div className="grid-overlay" />
      
      {/* Glow Effect Following Mouse */}
      <div
        className="glow-effect"
        style={{
          transform: `translate(${mousePosition.x * 30 - 15}px, ${mousePosition.y * 30 - 15}px)`,
        }}
      />

      {/* Electric Flow Particles Moving Up */}
      <div className="electric-flow">
        {Array.from({ length: 20 }).map((_, index) => (
          <div
            key={index}
            className="electric-particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Floating Nodes for Extra Futuristic Feel */}
      <div className="nodes-container">
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            className="node"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${10 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default FuturisticBackground;;