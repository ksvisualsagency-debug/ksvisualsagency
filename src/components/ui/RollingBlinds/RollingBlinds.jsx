import clsx from 'clsx';
import { motion } from 'framer-motion';
import React, { useMemo } from 'react';

const RollingBlinds = ({
  count = 10,
  direction = 'horizontal',
  duration = 6,
  stagger = 0.2,
  color = '#ee2b6c',
  secondaryColor = '#2b4bee',
  opacity = 0.6,
  className = '',
}) => {
  const blinds = useMemo(() => Array.from({ length: count }, (_, i) => i), [count]);

  return (
    <div
      className={clsx(
        'pointer-events-none absolute inset-0 -z-10 overflow-hidden select-none [perspective:1000px]',
        className
      )}
      aria-hidden="true"
    >
      {/* Ambient background glow behind the blinds */}
      <div
        className="absolute inset-0 opacity-40 blur-3xl transition-opacity duration-1000"
        style={{
          background: `radial-gradient(circle at 50% 40%, ${color}25 0%, ${secondaryColor}15 45%, transparent 75%)`,
        }}
      />

      {/* Grid of Rolling Blinds / Slats */}
      <div
        className={clsx(
          'absolute inset-0 flex',
          direction === 'horizontal' ? 'flex-col justify-between' : 'flex-row justify-between'
        )}
      >
        {blinds.map((i) => {
          const isEven = i % 2 === 0;
          const bandColor = isEven ? color : secondaryColor;

          return (
            <motion.div
              key={i}
              className={clsx(
                'relative w-full overflow-hidden transition-all',
                direction === 'horizontal' ? 'h-full border-b' : 'w-full border-r',
                'border-white/[0.03] dark:border-white/[0.04]'
              )}
              initial={{
                opacity: 0.15,
                rotateX: direction === 'horizontal' ? -45 : 0,
                rotateY: direction === 'vertical' ? -45 : 0,
                scaleY: direction === 'horizontal' ? 0.35 : 1,
                scaleX: direction === 'vertical' ? 0.35 : 1,
              }}
              animate={{
                opacity: [0.15, 0.55 * opacity, 0.15],
                rotateX:
                  direction === 'horizontal' ? [-45, 0, 45, 0, -45] : 0,
                rotateY:
                  direction === 'vertical' ? [-45, 0, 45, 0, -45] : 0,
                scaleY:
                  direction === 'horizontal' ? [0.35, 1, 0.35] : 1,
                scaleX:
                  direction === 'vertical' ? [0.35, 1, 0.35] : 1,
              }}
              transition={{
                duration,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * stagger,
              }}
            >
              {/* Rolling Light Band */}
              <motion.div
                className="absolute inset-0 w-full h-full"
                animate={{
                  x: direction === 'horizontal' ? ['-100%', '100%'] : ['0%', '0%'],
                  y: direction === 'vertical' ? ['-100%', '100%'] : ['0%', '0%'],
                }}
                transition={{
                  duration: duration * 1.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * (stagger * 0.8),
                }}
                style={{
                  background:
                    direction === 'horizontal'
                      ? `linear-gradient(90deg, transparent 0%, ${bandColor}15 35%, ${bandColor}35 50%, ${bandColor}15 65%, transparent 100%)`
                      : `linear-gradient(180deg, transparent 0%, ${bandColor}15 35%, ${bandColor}35 50%, ${bandColor}15 65%, transparent 100%)`,
                }}
              />

              {/* Edge Sheen / Highlight line */}
              <div
                className={clsx(
                  'absolute opacity-30',
                  direction === 'horizontal'
                    ? 'bottom-0 left-0 right-0 h-[1px]'
                    : 'right-0 top-0 bottom-0 w-[1px]'
                )}
                style={{
                  background: `linear-gradient(90deg, transparent, ${bandColor}60, transparent)`,
                }}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Top and Bottom soft vignette masks for smooth section blending */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white dark:from-black to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white dark:from-black to-transparent pointer-events-none" />
    </div>
  );
};

export default RollingBlinds;
