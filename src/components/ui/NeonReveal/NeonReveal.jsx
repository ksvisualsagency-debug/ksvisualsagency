import clsx from 'clsx';
import { motion } from 'framer-motion';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

/**
 * NeonReveal component based on @reactbits-starter/neon-reveal-tw & React Bits Pro spec.
 * Provides a realistic glowing neon bar sweep effect with customizable direction,
 * colors, expansion origin, bloom intensity, and optional cursor/scroll triggers.
 */
const NeonReveal = ({
  revealDelay = 0,
  revealDuration = 1800,
  verticalOffset = 0.015,
  direction = 'horizontal',
  color = '#ee2b6c',
  secondaryColor = '#2b4bee',
  barWidth = 0.94,
  barHeight = 0.02,
  mirrored = true,
  expandFrom = 'center',
  animateOnScroll = true,
  scrollThreshold = 0,
  intensity = 1.0,
  glowSpread = 1.2,
  followCursor = true,
  onStart,
  onComplete,
  className = '',
  children,
}) => {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 30 });
  const [hasStarted, setHasStarted] = useState(false);

  const [inViewRef, isInView] = useInView({
    triggerOnce: true,
    threshold: scrollThreshold,
    rootMargin: '120px',
  });

  // Convert hue number (0-360) or return color string
  const resolveColor = (c) => {
    if (typeof c === 'number') {
      return `hsl(${c}, 100%, 60%)`;
    }
    return c || '#ee2b6c';
  };

  const primaryCol = useMemo(() => resolveColor(color), [color]);
  const secondaryCol = useMemo(() => resolveColor(secondaryColor), [secondaryColor]);

  // Handle transform origin based on expandFrom
  const originStyle = useMemo(() => {
    if (direction === 'vertical') {
      if (expandFrom === 'left' || expandFrom === 'top') return 'top center';
      if (expandFrom === 'right' || expandFrom === 'bottom') return 'bottom center';
      return 'center center';
    }
    if (expandFrom === 'left') return 'left center';
    if (expandFrom === 'right') return 'right center';
    return 'center center';
  }, [direction, expandFrom]);

  // Mouse move handler for interactive ambient glow
  const handleMouseMove = (e) => {
    if (!followCursor || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) {
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePos({
        x: Math.max(0, Math.min(100, x)),
        y: Math.max(0, Math.min(100, y)),
      });
    }
  };

  const shouldAnimate = animateOnScroll ? isInView : true;

  useEffect(() => {
    if (shouldAnimate && !hasStarted) {
      setHasStarted(true);
      if (onStart) onStart();
      const timer = setTimeout(() => {
        if (onComplete) onComplete();
      }, revealDelay + revealDuration);
      return () => clearTimeout(timer);
    }
  }, [shouldAnimate, hasStarted, onStart, onComplete, revealDelay, revealDuration]);

  // Compute percentage offsets
  const topPercent = `${Math.min(100, Math.max(0, verticalOffset * 100))}%`;
  const bottomPercent = `${Math.min(100, Math.max(0, (1 - verticalOffset) * 100))}%`;

  // Neon Bar subcomponent
  const NeonBar = ({ positionStyle, glowColor, altColor, isFlipped = false }) => {
    const isHorizontal = direction === 'horizontal';

    return (
      <div
        className="pointer-events-none absolute z-0 select-none overflow-visible flex items-center justify-center transition-opacity duration-700"
        style={{
          ...positionStyle,
          height: isHorizontal ? `${32 * glowSpread}px` : '100%',
          width: isHorizontal ? '100%' : `${32 * glowSpread}px`,
        }}
      >
        {/* Deep ambient back-illumination pool */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-3xl pointer-events-none"
          style={{
            left: '50%',
            top: '50%',
            width: isHorizontal ? '90vw' : `${200 * glowSpread}px`,
            height: isHorizontal ? `${200 * glowSpread}px` : '90vh',
            background: `radial-gradient(ellipse at center, ${glowColor}40 0%, ${altColor}20 45%, transparent 75%)`,
          }}
        />

        {/* Outer soft bloom */}
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{
            transformOrigin: originStyle,
            left: '50%',
            top: '50%',
            width: isHorizontal ? `${barWidth * 100}%` : `${40 * glowSpread}px`,
            height: isHorizontal ? `${40 * glowSpread}px` : `${barWidth * 100}%`,
            x: '-50%',
            y: '-50%',
            filter: `blur(${16 * glowSpread}px)`,
            background: `linear-gradient(${
              isHorizontal ? '90deg' : '180deg'
            }, transparent 0%, ${glowColor} 20%, ${altColor} 80%, transparent 100%)`,
          }}
          initial={{
            scaleX: isHorizontal ? 0 : 1,
            scaleY: isHorizontal ? 1 : 0,
            opacity: 0,
          }}
          animate={
            shouldAnimate
              ? {
                  scaleX: 1,
                  scaleY: 1,
                  opacity: [0, 0.9 * intensity, 0.75 * intensity],
                }
              : {}
          }
          transition={{
            duration: revealDuration / 1000,
            delay: revealDelay / 1000,
            ease: [0.16, 1, 0.3, 1],
          }}
        />

        {/* Medium neon aura with electrical breathing */}
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{
            transformOrigin: originStyle,
            left: '50%',
            top: '50%',
            width: isHorizontal ? `${barWidth * 100}%` : `${16 * glowSpread}px`,
            height: isHorizontal ? `${16 * glowSpread}px` : `${barWidth * 100}%`,
            x: '-50%',
            y: '-50%',
            filter: `blur(${6 * glowSpread}px)`,
            boxShadow: `0 0 ${20 * glowSpread}px ${glowColor}, 0 0 ${40 * glowSpread}px ${altColor}`,
            background: `linear-gradient(${
              isHorizontal ? '90deg' : '180deg'
            }, transparent 1%, ${glowColor} 25%, #ffffff 50%, ${altColor} 75%, transparent 99%)`,
          }}
          initial={{
            scaleX: isHorizontal ? 0 : 1,
            scaleY: isHorizontal ? 1 : 0,
            opacity: 0,
          }}
          animate={
            shouldAnimate
              ? {
                  scaleX: 1,
                  scaleY: 1,
                  opacity: [0, 1 * intensity, 0.85 * intensity],
                }
              : {}
          }
          transition={{
            duration: revealDuration / 1000,
            delay: revealDelay / 1000,
            ease: [0.16, 1, 0.3, 1],
          }}
        />

        {/* Intense Core Neon Tube */}
        <motion.div
          className="relative rounded-full overflow-hidden"
          style={{
            transformOrigin: originStyle,
            width: isHorizontal ? `${barWidth * 100}%` : '3px',
            height: isHorizontal ? '3px' : `${barWidth * 100}%`,
            background: '#ffffff',
            boxShadow: `
              0 0 2px #ffffff,
              0 0 8px ${glowColor},
              0 0 16px ${glowColor},
              0 0 32px ${altColor},
              0 0 64px ${glowColor}
            `,
          }}
          initial={{
            scaleX: isHorizontal ? 0 : 1,
            scaleY: isHorizontal ? 1 : 0,
            opacity: 0,
          }}
          animate={
            shouldAnimate
              ? {
                  scaleX: 1,
                  scaleY: 1,
                  opacity: 1,
                }
              : {}
          }
          transition={{
            duration: revealDuration / 1000,
            delay: revealDelay / 1000,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {/* Sweeping electrical gleam / comet across the neon tube */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              width: '25%',
              background:
                'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.95) 50%, transparent 100%)',
              filter: 'blur(1px)',
            }}
            animate={
              shouldAnimate
                ? {
                    x: ['-100%', '500%'],
                  }
                : {}
            }
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 1.5,
              ease: 'easeInOut',
            }}
          />
        </motion.div>
      </div>
    );
  };

  const content = (
    <>
      {/* Interactive cursor-responsive ambient backlight */}
      {followCursor && (
        <div
          className="pointer-events-none absolute inset-0 -z-20 transition-all duration-700 ease-out"
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x}% ${mousePos.y}%, ${primaryCol}12 0%, ${secondaryCol}08 35%, transparent 70%)`,
          }}
        />
      )}

      {/* Primary Neon Reveal Bar at Top of Post-Hero Section */}
      <NeonBar
        positionStyle={
          direction === 'horizontal'
            ? { top: topPercent, left: 0, right: 0 }
            : { left: topPercent, top: 0, bottom: 0 }
        }
        glowColor={primaryCol}
        altColor={secondaryCol}
      />

      {/* Mirrored Neon Reveal Bar near bottom of Post-Hero Section */}
      {mirrored && (
        <NeonBar
          positionStyle={
            direction === 'horizontal'
              ? { top: bottomPercent, left: 0, right: 0 }
              : { left: bottomPercent, top: 0, bottom: 0 }
          }
          glowColor={secondaryCol}
          altColor={primaryCol}
          isFlipped
        />
      )}

      {/* Subtle mid-section ambient neon horizontal beam accent */}
      <div
        className="pointer-events-none absolute left-0 right-0 -z-10 select-none overflow-hidden opacity-35"
        style={{ top: '50%', transform: 'translateY(-50%)' }}
      >
        <div
          className="h-[1px] w-full"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${primaryCol}50 25%, ${secondaryCol}50 75%, transparent 100%)`,
            filter: 'blur(0.5px)',
          }}
        />
      </div>
    </>
  );

  // If children are passed, wrap children inside the container
  if (children) {
    return (
      <div
        ref={(el) => {
          containerRef.current = el;
          inViewRef(el);
        }}
        onMouseMove={handleMouseMove}
        className={clsx('relative w-full overflow-hidden', className)}
      >
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
          {content}
        </div>
        <div className="relative z-10">{children}</div>
      </div>
    );
  }

  // Standalone background overlay mode
  return (
    <div
      ref={(el) => {
        containerRef.current = el;
        inViewRef(el);
      }}
      onMouseMove={handleMouseMove}
      className={clsx('pointer-events-none absolute inset-0 -z-10 overflow-hidden select-none', className)}
      aria-hidden="true"
    >
      {content}
    </div>
  );
};

export default NeonReveal;
