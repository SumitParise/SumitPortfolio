import { useEffect, useState, useRef } from 'react';

export const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  useEffect(() => {
    // Detect touch device
    const checkTouchDevice = () => {
      const match = window.matchMedia('(pointer: coarse)').matches;
      setIsTouchDevice(match);
    };
    checkTouchDevice();

    if (isTouchDevice) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const mousePos = { x: -100, y: -100 };
    const dotPos = { x: -100, y: -100 };
    const ringPos = { x: -100, y: -100 };

    const onMouseMove = (e: MouseEvent) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
    };

    window.addEventListener('mousemove', onMouseMove);

    // Event delegation for interactive elements hover
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('select') ||
        target.closest('[role="button"]') ||
        target.closest('.interactive')
      ) {
        setIsHovered(true);
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('select') ||
        target.closest('[role="button"]') ||
        target.closest('.interactive')
      ) {
        setIsHovered(false);
      }
    };

    window.addEventListener('mouseover', onMouseOver);
    window.addEventListener('mouseout', onMouseOut);

    let animationId: number;

    const updateCursor = () => {
      // Dot follows mouse directly
      dotPos.x = mousePos.x;
      dotPos.y = mousePos.y;
      dot.style.transform = `translate3d(${dotPos.x}px, ${dotPos.y}px, 0)`;

      // Ring follows mouse with lerp (lag)
      const lerpFactor = 0.15;
      ringPos.x += (mousePos.x - ringPos.x) * lerpFactor;
      ringPos.y += (mousePos.y - ringPos.y) * lerpFactor;
      ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0)`;

      animationId = requestAnimationFrame(updateCursor);
    };

    animationId = requestAnimationFrame(updateCursor);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mouseout', onMouseOut);
      cancelAnimationFrame(animationId);
    };
  }, [isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <>
      <div
        ref={dotRef}
        className={`custom-cursor-dot pointer-events-none fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 z-[10000] mix-blend-difference transition-transform duration-200 ease-out ${
          isHovered ? 'scale-[2.5] bg-accent' : 'scale-100 bg-[#00D4FF]'
        }`}
      />
      <div
        ref={ringRef}
        className={`custom-cursor-ring pointer-events-none fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 z-[9999] transition-[transform,border-color,background-color] duration-300 ease-out ${
          isHovered
            ? 'scale-[1.3] border-[#00D4FF] bg-[#00D4FF]/10'
            : 'scale-100 border-[#6C63FF]'
        }`}
      />
    </>
  );
};

export default CustomCursor;
