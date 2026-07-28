import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [ringPosition, setRingPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Check if target is interactive
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.tagName === 'INPUT' ||
          target.closest('.glass-card') ||
          target.closest('button') ||
          target.getAttribute('role') === 'button')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  // Smooth ring follow effect with requestAnimationFrame
  useEffect(() => {
    let animId: number;
    const follow = () => {
      setRingPosition((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.18,
        y: prev.y + (position.y - prev.y) * 0.18,
      }));
      animId = requestAnimationFrame(follow);
    };
    animId = requestAnimationFrame(follow);
    return () => cancelAnimationFrame(animId);
  }, [position]);

  return (
    <>
      {/* Center Precision Dot */}
      <div
        className="fixed top-0 left-0 w-2 h-2 bg-cyan-400 rounded-full pointer-events-none z-50 transition-transform duration-75 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_#06b6d4]"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${
            isClicked ? 0.6 : isHovered ? 1.5 : 1
          })`,
        }}
      />
      {/* Follower Holographic Ring */}
      <div
        className={`fixed top-0 left-0 w-9 h-9 rounded-full border pointer-events-none z-50 transition-all duration-300 ease-out-expo -translate-x-1/2 -translate-y-1/2 ${
          isHovered
            ? 'border-cyan-400/80 bg-cyan-500/10 scale-150 shadow-[0_0_20px_rgba(6,182,212,0.4)]'
            : 'border-white/20 bg-transparent scale-100'
        }`}
        style={{
          transform: `translate3d(${ringPosition.x}px, ${ringPosition.y}px, 0) scale(${
            isClicked ? 0.8 : isHovered ? 1.6 : 1
          })`,
        }}
      />
    </>
  );
};
