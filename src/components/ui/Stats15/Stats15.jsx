import clsx from 'clsx';
import { animate, motion, useAnimation } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

const ValueCounter = ({ value, suffix = '', duration = 2 }) => {
  const nodeRef = useRef();

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    const numValue = Number(value);
    const controls = animate(0, numValue, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(val) {
        node.textContent = `${val.toFixed()}${suffix}`;
      },
    });

    return () => controls.stop();
  }, [value, suffix, duration]);

  return <span ref={nodeRef}>0{suffix}</span>;
};

const statsData = [
  {
    id: 'projects',
    value: '15',
    suffix: '+',
    label: 'Projects Delivered',
    badge: '100% On-Time',
    description: 'High-impact digital marketing, brand identities, and exhibition campaigns.',
    color: '#ee2b6c',
    ringRadius: 100,
    ringStroke: 10,
    percentage: 88,
  },
  {
    id: 'satisfaction',
    value: '97',
    suffix: '%',
    label: 'Client Satisfaction',
    badge: 'Top-Tier Rating',
    description: 'Direct client feedback and long-term retainer partnerships across sectors.',
    color: '#2b4bee',
    ringRadius: 80,
    ringStroke: 8,
    percentage: 97,
  },
  {
    id: 'experience',
    value: '3',
    suffix: '+',
    label: 'Years Experience',
    badge: 'Proven Track Record',
    description: 'Deep industry expertise with cutting-edge tools and creative strategies.',
    color: '#00cc76',
    ringRadius: 62,
    ringStroke: 6,
    percentage: 75,
  },
];

const Stats15 = ({ className }) => {
  const [wrapperRef, isInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [activeItem, setActiveItem] = useState(statsData[1]); // Default: Client Satisfaction (97%)

  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('animate');
    }
  }, [isInView, controls]);

  return (
    <section
      className={clsx('safe-paddings mt-20 lg:mt-16 sm:mt-12 overflow-hidden', className)}
      ref={wrapperRef}
    >
      <div className="container">
        {/* Section Header */}
        <div className="max-w-[760px]">
          <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-widest text-red">
            <span className="h-1.5 w-1.5 rounded-full bg-red" />
            <span>Proven Track Record · Stats</span>
          </div>
          <h2 className="with-text-highlight-red mt-3 text-4xl font-normal leading-snug lg:text-[32px] sm:text-2xl">
            Measurable results that <span>speak for themselves</span>
          </h2>
        </div>

        {/* Stats 15: Dual-Ring Coverage Dial with Automation Ledger */}
        <div className="mt-14 rounded-3xl border border-gray-4 bg-gray-1 p-10 dark:border-gray-8 dark:bg-gray-9/70 shadow-lg lg:p-8 sm:p-4 xs:p-3">
          <div className="grid grid-cols-12 items-center gap-12 lg:gap-8 md:grid-cols-1 md:gap-8 sm:gap-6">
            {/* Left Column: Dual/Multi-Ring Coverage Dial */}
            <div className="col-span-5 flex flex-col items-center justify-center md:col-span-full">
              <div className="relative flex h-72 w-72 items-center justify-center lg:h-64 lg:w-64 sm:h-52 sm:w-52 xs:h-44 xs:w-44">
                <svg
                  className="h-full w-full -rotate-90 transform"
                  viewBox="0 0 240 240"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Background Track Rings */}
                  {statsData.map(({ id, ringRadius, ringStroke }) => (
                    <circle
                      key={`bg-${id}`}
                      cx="120"
                      cy="120"
                      r={ringRadius}
                      stroke="currentColor"
                      strokeWidth={ringStroke}
                      className="text-gray-3 dark:text-gray-8/60 opacity-40"
                    />
                  ))}

                  {/* Animated Active Data Rings */}
                  {statsData.map(({ id, ringRadius, ringStroke, color, percentage }) => {
                    const circumference = 2 * Math.PI * ringRadius;
                    const strokeDashoffset = circumference - (percentage / 100) * circumference;

                    return (
                      <motion.circle
                        key={`ring-${id}`}
                        cx="120"
                        cy="120"
                        r={ringRadius}
                        stroke={color}
                        strokeWidth={ringStroke}
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        initial={{ strokeDashoffset: circumference }}
                        animate={
                          isInView
                            ? { strokeDashoffset, transition: { duration: 2, ease: [0.16, 1, 0.3, 1] } }
                            : {}
                        }
                        style={{
                          filter: activeItem.id === id ? `drop-shadow(0 0 8px ${color}80)` : 'none',
                          opacity: activeItem.id === id ? 1 : 0.75,
                          transition: 'filter 0.3s ease, opacity 0.3s ease',
                        }}
                      />
                    );
                  })}
                </svg>

                {/* Center Value and Label */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span
                    className="text-5xl font-extrabold tracking-tight lg:text-4xl sm:text-3xl"
                    style={{ color: activeItem.color }}
                  >
                    {isInView && (
                      <ValueCounter
                        value={activeItem.value}
                        suffix={activeItem.suffix}
                        duration={2}
                      />
                    )}
                  </span>
                  <span className="mt-1 text-xs font-semibold uppercase tracking-wider text-black/70 dark:text-white/70">
                    {activeItem.label}
                  </span>
                </div>
              </div>

              {/* Dial Legend Indicator */}
              <div className="mt-6 flex flex-wrap justify-center gap-4 sm:gap-1.5">
                {statsData.map(({ id, label, color }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setActiveItem(statsData.find((s) => s.id === id))}
                    className={clsx(
                      'flex items-center space-x-2 rounded-full px-3 py-1 text-xs font-medium transition-all duration-200',
                      activeItem.id === id
                        ? 'border border-gray-4 bg-white shadow-sm dark:border-gray-7 dark:bg-gray-8'
                        : 'opacity-70 hover:opacity-100'
                    )}
                  >
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
                    <span className="text-black dark:text-white">{label.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column: Per-Workflow Automation & Metrics Ledger */}
            <div className="col-span-7 space-y-4 md:col-span-full">
              {statsData.map((stat) => {
                const isSelected = activeItem.id === stat.id;

                return (
                  <div
                    key={stat.id}
                    onClick={() => setActiveItem(stat)}
                    onMouseEnter={() => setActiveItem(stat)}
                    className={clsx(
                      'cursor-pointer rounded-2xl border p-6 transition-all duration-300 sm:p-4',
                      isSelected
                        ? 'border-red/60 bg-white/90 shadow-md dark:border-red/60 dark:bg-gray-8/90'
                        : 'border-gray-4 bg-white/40 hover:border-gray-5 dark:border-gray-8 dark:bg-gray-9/40 dark:hover:border-gray-7'
                    )}
                  >
                    <div className="flex items-center justify-between sm:flex-col sm:items-start sm:gap-2">
                      <div className="flex items-center space-x-4">
                        <div
                          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl font-bold text-white shadow-sm"
                          style={{ backgroundColor: stat.color }}
                        >
                          <span className="text-xl">
                            {stat.id === 'projects' ? '🚀' : stat.id === 'satisfaction' ? '⭐' : '⏳'}
                          </span>
                        </div>
                        <div>
                          <div className="flex items-center space-x-3">
                            <h3 className="text-3xl font-extrabold tracking-tight lg:text-2xl sm:text-xl">
                              {isInView ? (
                                <ValueCounter value={stat.value} suffix={stat.suffix} duration={2} />
                              ) : (
                                `0${stat.suffix}`
                              )}
                            </h3>
                            <span
                              className="rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider"
                              style={{
                                backgroundColor: `${stat.color}15`,
                                color: stat.color,
                              }}
                            >
                              {stat.badge}
                            </span>
                          </div>
                          <p className="mt-0.5 text-base font-medium text-black dark:text-white sm:text-sm">
                            {stat.label}
                          </p>
                        </div>
                      </div>

                      <div className="text-right sm:text-left sm:mt-1">
                        <span className="text-xs font-semibold uppercase tracking-widest text-gray-6">
                          Coverage: {stat.percentage}%
                        </span>
                      </div>
                    </div>

                    <p className="mt-3 text-sm leading-relaxed text-black/70 dark:text-white/70">
                      {stat.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats15;
