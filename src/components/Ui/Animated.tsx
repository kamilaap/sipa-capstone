import React, { useState, useEffect, useRef } from 'react';

interface CursorPosition {
  x: number;
  y: number;
}

interface TrailPoint {
  x: number;
  y: number;
  opacity: number;
}

const AnimatedCursor: React.FC = () => {
  const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const [outerPosition, setOuterPosition] = useState<CursorPosition>({
    x: 0,
    y: 0,
  });
  const [trailPoints, setTrailPoints] = useState<TrailPoint[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const frameRef = useRef<number>(0);

  // Cursor configuration - balanced settings
  const config = {
    outerFollowSpeed: 0.4, // Moderate speed for outer circle (0-1)
    trailSpeed: 0.25, // Speed for trail points
    trailLength: 5, // Number of trailing dots
    trailFadeSpeed: 0.92, // How quickly the trail fades (0-1)
  };

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const handleMouseOverInteractive = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.tagName.toLowerCase() === 'input' ||
        target.tagName.toLowerCase() === 'textarea' ||
        target.tagName.toLowerCase() === 'select';

      // Explicitly set to boolean
      setIsHovering(!!isInteractive);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mousemove', handleMouseOverInteractive);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mousemove', handleMouseOverInteractive);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  // Main animation loop
  useEffect(() => {
    const animate = () => {
      // Update outer circle position with balanced speed
      setOuterPosition((current) => ({
        x: current.x + (position.x - current.x) * config.outerFollowSpeed,
        y: current.y + (position.y - current.y) * config.outerFollowSpeed,
      }));

      // Update trail points
      setTrailPoints((currentPoints) => {
        // Add new point at the beginning
        const newPoints = [
          {
            x: position.x,
            y: position.y,
            opacity: 0.6,
          },
          ...currentPoints,
        ];

        // Fade out existing points
        const updatedPoints = newPoints.map((point, index) => ({
          ...point,
          opacity: index === 0 ? 0.6 : point.opacity * config.trailFadeSpeed,
        }));

        // Keep only the specified number of points
        return updatedPoints.slice(0, config.trailLength);
      });

      frameRef.current = requestAnimationFrame(animate);
    };

    // Start animation loop
    frameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameRef.current);
    };
  }, [
    position,
    config.outerFollowSpeed,
    config.trailFadeSpeed,
    config.trailLength,
  ]);

  return (
    <>
      {/* Cursor Container - Added a parent container with high z-index */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 9999,
        }}
      >
        {/* Main cursor */}
        <div
          className="fixed w-3 h-3 bg-blue-500 rounded-full pointer-events-none transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-150"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
            transform: `translate(-50%, -50%) scale(${isClicking ? '0.5' : '1'})`,
            boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)',
            transition: 'transform 0.15s ease-out',
            opacity: isVisible ? 1 : 0,
          }}
        />

        {/* Trail points */}
        {trailPoints.map((point, index) => (
          <div
            key={index}
            className="fixed w-2 h-2 bg-blue-400 rounded-full pointer-events-none"
            style={{
              left: `${point.x}px`,
              top: `${point.y}px`,
              opacity: point.opacity,
              transform: 'translate(-50%, -50%) scale(0.8)',
            }}
          />
        ))}

        {/* Outer circle with balanced delay */}
        <div
          className="fixed border-2 pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${outerPosition.x}px`,
            top: `${outerPosition.y}px`,
            borderColor: isHovering
              ? 'rgba(59, 130, 246, 0.8)'
              : 'rgba(59, 130, 246, 0.5)',
            borderRadius: '50%',
            width: isHovering ? '2rem' : '1.5rem',
            height: isHovering ? '2rem' : '1.5rem',
            backgroundColor: isHovering
              ? 'rgba(59, 130, 246, 0.1)'
              : 'transparent',
            transform: `translate(-50%, -50%) scale(${isClicking ? '0.8' : '1'})`,
            transition:
              'width 0.2s ease, height 0.2s ease, transform 0.2s ease, background-color 0.2s ease',
            opacity: isVisible ? 1 : 0,
          }}
        />
      </div>
    </>
  );
};

export default AnimatedCursor;
