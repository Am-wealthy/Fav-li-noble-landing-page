import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  
  const posRef = useRef({ x: -100, y: -100 });
  const ringPosRef = useRef({ x: -100, y: -100 });
  const isHoveredRef = useRef(false);
  const isClickedRef = useRef(false);
  const lastClassHoverRef = useRef<boolean | null>(null);

  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Disable custom cursor on touch/mobile devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      posRef.current.x = e.clientX;
      posRef.current.y = e.clientY;

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
        isHoveredRef.current = true;
      } else {
        isHoveredRef.current = false;
      }
    };

    const onMouseDown = () => {
      isClickedRef.current = true;
    };
    const onMouseUp = () => {
      isClickedRef.current = false;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown, { passive: true });
    window.addEventListener('mouseup', onMouseUp, { passive: true });

    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (document.hidden) return;

      // Interpolate ring position smoothly
      ringPosRef.current.x += (posRef.current.x - ringPosRef.current.x) * 0.25;
      ringPosRef.current.y += (posRef.current.y - ringPosRef.current.y) * 0.25;

      const scaleDot = isClickedRef.current ? 0.6 : isHoveredRef.current ? 1.5 : 1;
      const scaleRing = isClickedRef.current ? 0.8 : isHoveredRef.current ? 1.6 : 1;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0) translate(-50%, -50%) scale(${scaleDot})`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPosRef.current.x}px, ${ringPosRef.current.y}px, 0) translate(-50%, -50%) scale(${scaleRing})`;
        
        // Only update class name when hover state actually changes to avoid layout thrashing
        if (lastClassHoverRef.current !== isHoveredRef.current) {
          lastClassHoverRef.current = isHoveredRef.current;
          if (isHoveredRef.current) {
            ringRef.current.className = 'fixed top-0 left-0 w-9 h-9 rounded-full border border-cyan-400/80 bg-cyan-500/10 pointer-events-none z-50 transition-colors duration-150 shadow-[0_0_20px_rgba(6,182,212,0.4)] will-change-transform';
          } else {
            ringRef.current.className = 'fixed top-0 left-0 w-9 h-9 rounded-full border border-white/20 bg-transparent pointer-events-none z-50 transition-colors duration-150 will-change-transform';
          }
        }
      }
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  if (isTouch) return null;

  return (
    <>
      {/* Center Precision Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-cyan-400 rounded-full pointer-events-none z-50 shadow-[0_0_10px_#06b6d4] will-change-transform"
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      />
      {/* Follower Holographic Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-9 h-9 rounded-full border border-white/20 bg-transparent pointer-events-none z-50 will-change-transform"
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      />
    </>
  );
};

