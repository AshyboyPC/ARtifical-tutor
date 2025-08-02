import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Add VT323 font import in a style tag
const fontStyle = `
  @import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');
  
  .font-vt323 {
    font-family: 'VT323', monospace;
    font-weight: 400;
    font-size: 1.5rem; /* 24px */
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
`;

interface TextArcEffectProps {
  text?: string;
  children: React.ReactNode;
  diameter?: number;
  className?: string;
}

export function TextArcEffect({
  text = "• CREATIVE DEVELOPER • FULL STACK • PROBLEM SOLVER • DESIGNER • PASSIONATE •",
  children,
  diameter = 300,
  className = ""
}: TextArcEffectProps) {
  const [currentDiameter, setCurrentDiameter] = useState(diameter * 1.1);
  const characters = text.split('');
  const radius = currentDiameter / 2;
  const angleStep = 360 / characters.length;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCurrentDiameter(diameter * 0.8);
      } else {
        setCurrentDiameter(diameter);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [diameter]);

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <style>{fontStyle}</style>
      {/* Animated Rotating Arc Text */}
      <motion.div
        className="absolute pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 30,
          ease: 'linear',
        }}
      >
        <div 
          className="relative" 
          style={{ width: currentDiameter, height: currentDiameter }}
        >
          {characters.map((char, index) => {
            const angle = angleStep * index;
            return (
              <div 
                key={index} 
                className="absolute text-gray-600 dark:text-gray-300 font-vt323"
                style={{
                  height: `${radius}px`,
                  transform: `rotate(${angle}deg)`,
                  transformOrigin: 'bottom center',
                  top: 0,
                  left: '50%',
                  marginLeft: '-0.4em',
                }}
              >
                {char}
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Central Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        whileHover={{ scale: 1.02 }}
        className="relative z-10"
      >
        {children}
      </motion.div>
    </div>
  );
}
