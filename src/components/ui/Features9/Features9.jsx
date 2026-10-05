import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import Link from 'components/shared/link';
import LINKS from 'constants/links';

/**
 * Features9 component based on @reactbits-pro/features-9 specification:
 * Split integration map with orbital rings, labeled floating service nodes,
 * and a pulsing central hub.
 *
 * Tailored for K's visuals "Why Choose Us" section.
 */

// 6 interconnected service nodes positioned on the orbital integration map
// Coordinates are in percentages (0-100) relative to the 500x500 map coordinate system
const defaultNodes = [
  {
    id: 'marketing',
    title: 'Digital Marketing',
    shortLabel: 'PPC & Funnels',
    category: 'High-ROI Growth',
    metric: '+250% Avg. ROI',
    highlight: 'Full-funnel ads, email servicing, conversion rate optimization',
    accentColor: '#ee2b6c',
    x: 74,
    y: 19,
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
      </svg>
    ),
  },
  {
    id: 'webdev',
    title: 'Web & App Dev',
    shortLabel: 'React & Gatsby',
    category: 'Modern Web Engineering',
    metric: '99+ Lighthouse Speed',
    highlight: 'High-performance bespoke corporate sites, web apps, headless CMS',
    accentColor: '#2b4bee',
    x: 88,
    y: 56,
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    id: 'software',
    title: 'Custom CRM Software',
    shortLabel: 'Enterprise CRM',
    category: 'Business Infrastructure',
    metric: '10x Pipeline Speed',
    highlight: 'GUNATIT ENTERPRISE custom CRM, lead tracking, operational pipelines',
    accentColor: '#00cc76',
    x: 63,
    y: 75,
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2 1.5 3 3.5 3h9c2 0 3.5-1 3.5-3V7c0-2-1.5-3-3.5-3h-9C5.5 4 4 5 4 7z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6M9 16h4" />
      </svg>
    ),
  },
  {
    id: 'branding',
    title: 'Brand Identity',
    shortLabel: 'Visual Systems',
    category: 'Brand Architecture',
    metric: '100% Brand Recall',
    highlight: 'JP Architecture, NK Health Hub, bespoke luxury logo marks & collateral',
    accentColor: '#f59e0b',
    x: 22,
    y: 72,
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
  },
  {
    id: 'exhibition',
    title: 'Exhibition Media',
    shortLabel: 'Global Trade Shows',
    category: 'Exhibition & Collateral',
    metric: '350+ Global Leads',
    highlight: 'DIVINE Impex international trade show flyers, stand graphics & print',
    accentColor: '#ec4899',
    x: 12,
    y: 40,
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
  },
  {
    id: 'ai',
    title: 'AI & Automations',
    shortLabel: 'Intelligent Workflows',
    category: 'Automation & Analytics',
    metric: '40% Time Saved',
    highlight: 'Automated CRM sync, lead qualification bots, predictive reporting',
    accentColor: '#8b5cf6',
    x: 35,
    y: 17,
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
];

// 4 core value propositions displayed on the left column
const defaultAdvantages = [
  {
    id: 'team',
    num: '01',
    title: 'Expert Multi-Disciplinary Team',
    description:
      'Senior designers, full-stack engineers, and conversion marketers working as one cohesive powerhouse with zero agency overhead.',
    metric: '100% In-House',
    linkedNodeIds: ['branding', 'webdev'],
  },
  {
    id: 'datadriven',
    num: '02',
    title: 'Data-Driven & High-Converting Strategy',
    description:
      'Every brand asset, CRM workflow, and digital campaign is engineered based on audience analytics and proven conversion psychology.',
    metric: '+250% ROI',
    linkedNodeIds: ['marketing', 'ai'],
  },
  {
    id: 'velocity',
    num: '03',
    title: 'Rapid Velocity & 100% On-Time Execution',
    description:
      'Transparent milestone tracking, agile sprint cadences, and direct WhatsApp / Slack collaboration to launch ahead of schedule.',
    metric: '15+ Launches',
    linkedNodeIds: ['software', 'exhibition'],
  },
  {
    id: 'ecosystem',
    num: '04',
    title: 'Unified Brand & Technology Ecosystem',
    description:
      'Eliminate fragmented vendors. From visual identity to enterprise software and trade show media, your entire brand operates in harmony.',
    metric: '360° Coverage',
    linkedNodeIds: ['marketing', 'webdev', 'software', 'branding', 'exhibition', 'ai'],
  },
];

const Features9 = ({
  badge = 'Why Choose K’s visuals',
  title = 'Engineered for Velocity. Proven by Measurable Impact.',
  description = 'With 3+ years of specialized industry experience and 15+ high-impact client deliveries, we bridge creative mastery with full-stack digital execution. Explore how our integrated ecosystem drives sustainable growth for modern brands.',
  nodes = defaultNodes,
  advantages = defaultAdvantages,
  className = '',
}) => {
  const [activeNodeId, setActiveNodeId] = useState(nodes[0]?.id || 'marketing');
  const [hoveredAdvantageId, setHoveredAdvantageId] = useState(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  // Auto-cycle through nodes slowly when user is not manually interacting
  useEffect(() => {
    if (!isAutoPlaying) return undefined;
    const interval = setInterval(() => {
      setActiveNodeId((prevId) => {
        const currentIndex = nodes.findIndex((n) => n.id === prevId);
        const nextIndex = (currentIndex + 1) % nodes.length;
        return nodes[nextIndex].id;
      });
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nodes]);

  const activeNode = nodes.find((n) => n.id === activeNodeId) || nodes[0];

  // Map advantage hover to highlighting nodes
  const activeAdvantage = advantages.find((a) => a.id === hoveredAdvantageId);
  const highlightedNodeIds = activeAdvantage ? activeAdvantage.linkedNodeIds : [activeNodeId];

  return (
    <div
      ref={ref}
      className={clsx(
        'relative rounded-3xl border border-white/10 bg-[#0d0d12]/90 p-8 shadow-2xl backdrop-blur-2xl lg:p-6 sm:p-4 xs:p-3',
        className
      )}
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Ambient background glow accents */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-red/15 blur-[100px] sm:hidden" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-blue/15 blur-[100px] sm:hidden" />

      <div className="relative z-10 grid grid-cols-12 items-center gap-10 lg:gap-8 md:grid-cols-1">
        {/* Left Column: Editorial & Value Propositions */}
        <div className="col-span-6 lg:col-span-6 md:col-span-1">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-red/30 bg-red/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-red">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red" />
            </span>
            {badge}
          </div>

          {/* Heading */}
          <h2 className="mt-4 text-3xl font-semibold leading-tight text-white lg:text-2xl sm:text-xl">
            {title.includes('Impact') ? (
              <>
                Engineered for Velocity.{' '}
                <span className="bg-gradient-to-r from-red via-[#f43f5e] to-blue bg-clip-text text-transparent">
                  Proven by Measurable Impact.
                </span>
              </>
            ) : (
              title
            )}
          </h2>

          {/* Summary */}
          <p className="mt-4 text-base leading-relaxed text-gray-4 md:text-sm">{description}</p>

          {/* Interactive Key Advantages List */}
          <div className="mt-6 space-y-3">
            {advantages.map((adv) => {
              const isSelected =
                hoveredAdvantageId === adv.id ||
                (!hoveredAdvantageId && adv.linkedNodeIds.includes(activeNodeId));

              return (
                <div
                  key={adv.id}
                  className={clsx(
                    'group cursor-pointer rounded-2xl border p-4 transition-all duration-300',
                    isSelected
                      ? 'border-red/40 bg-white/[0.06] shadow-[0_0_20px_rgba(238,43,108,0.12)]'
                      : 'border-white/5 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]'
                  )}
                  onMouseEnter={() => {
                    setHoveredAdvantageId(adv.id);
                    if (adv.linkedNodeIds.length > 0) {
                      setActiveNodeId(adv.linkedNodeIds[0]);
                    }
                  }}
                  onMouseLeave={() => setHoveredAdvantageId(null)}
                  onClick={() => {
                    setHoveredAdvantageId(adv.id);
                    if (adv.linkedNodeIds.length > 0) {
                      setActiveNodeId(adv.linkedNodeIds[0]);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setActiveNodeId(adv.linkedNodeIds[0]);
                    }
                  }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <span
                        className={clsx(
                          'mt-0.5 font-mono text-sm font-bold transition-colors',
                          isSelected ? 'text-red' : 'text-gray-6 group-hover:text-white'
                        )}
                      >
                        {adv.num}.
                      </span>
                      <div>
                        <h4
                          className={clsx(
                            'text-base font-semibold transition-colors sm:text-sm',
                            isSelected ? 'text-white' : 'text-gray-3 group-hover:text-white'
                          )}
                        >
                          {adv.title}
                        </h4>
                        <p className="mt-1 text-xs leading-relaxed text-gray-5 sm:text-xs">
                          {adv.description}
                        </p>
                      </div>
                    </div>
                    <span className="shrink-0 rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] font-medium text-gray-3">
                      {adv.metric}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Action Row */}
          <div className="mt-6 flex flex-wrap items-center gap-4 pt-2">
            <Link
              to={LINKS.contact}
              className="inline-flex items-center gap-2 rounded-xl bg-red px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_20px_rgba(238,43,108,0.4)] transition-all hover:bg-red/90 hover:shadow-[0_0_30px_rgba(238,43,108,0.6)]"
            >
              Start Your Project
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>

            <Link
              to={LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-4 transition-colors hover:text-white"
            >
              <span>Follow on Instagram</span>
              <span className="text-red">@ksvisuals.design</span>
            </Link>
          </div>
        </div>

        {/* Right Column: React Bits Pro Features 9 Split Integration Map */}
        <div className="col-span-6 lg:col-span-6 md:col-span-1">
          <div className="relative mx-auto flex aspect-square w-full max-w-[500px] items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#13121d] to-[#09080e] p-4 shadow-2xl">
            {/* Subtle background tech grid */}
            <div
              className="pointer-events-none absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.25) 1px, transparent 0)',
                backgroundSize: '24px 24px',
              }}
            />

            {/* SVG Layer for Orbital Rings and Dynamic Connector Beams */}
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full"
              viewBox="0 0 500 500"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                {/* Active Beam Gradient */}
                <linearGradient id="activeBeam" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ee2b6c" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#2b4bee" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#00cc76" stopOpacity="0.9" />
                </linearGradient>

                {/* Pulse Filter */}
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Concentric Orbital Rings */}
              {/* Ring 1: Inner Orbit (r=95) */}
              <circle
                cx="250"
                cy="250"
                r="95"
                fill="none"
                stroke="rgba(255, 255, 255, 0.08)"
                strokeWidth="1"
                strokeDasharray="4 6"
              />

              {/* Ring 2: Middle Orbit (r=155) */}
              <circle
                cx="250"
                cy="250"
                r="155"
                fill="none"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="1.2"
                strokeDasharray="6 8"
              />

              {/* Ring 3: Outer Orbit (r=210) */}
              <circle
                cx="250"
                cy="250"
                r="210"
                fill="none"
                stroke="rgba(255, 255, 255, 0.06)"
                strokeWidth="1"
                strokeDasharray="3 6"
              />

              {/* Orbital Ticks / Compass Marks */}
              <g stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1.5">
                <line x1="250" y1="36" x2="250" y2="44" />
                <line x1="250" y1="456" x2="250" y2="464" />
                <line x1="36" y1="250" x2="44" y2="250" />
                <line x1="456" y1="250" x2="464" y2="250" />
              </g>

              {/* Connecting Laser Beams from Center (250, 250) to each Service Node */}
              {nodes.map((node) => {
                const isNodeActive = highlightedNodeIds.includes(node.id);
                const targetX = (node.x / 100) * 500;
                const targetY = (node.y / 100) * 500;

                return (
                  <g key={`beam-${node.id}`}>
                    {/* Inactive Base Beam */}
                    <line
                      x1="250"
                      y1="250"
                      x2={targetX}
                      y2={targetY}
                      stroke={isNodeActive ? node.accentColor : 'rgba(255, 255, 255, 0.12)'}
                      strokeWidth={isNodeActive ? '2' : '1'}
                      strokeDasharray={isNodeActive ? 'none' : '3 4'}
                      strokeOpacity={isNodeActive ? 0.85 : 0.4}
                      className="transition-all duration-300"
                    />

                    {/* Active Glowing Pulse Particle Traveling along the beam */}
                    {isNodeActive && (
                      <circle
                        r="3.5"
                        fill={node.accentColor}
                        filter="url(#glow)"
                        className="animate-pulse"
                      >
                        <animateMotion
                          path={`M 250 250 L ${targetX} ${targetY}`}
                          dur="1.8s"
                          repeatCount="indefinite"
                        />
                      </circle>
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Rotating Celestial Satellite Trackers */}
            <motion.div
              className="pointer-events-none absolute inset-0 flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            >
              <div className="relative h-[310px] w-[310px] rounded-full border border-dashed border-white/10">
                <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full border border-red bg-[#13121d] shadow-[0_0_8px_#ee2b6c]" />
                <span className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full border border-blue bg-[#13121d] shadow-[0_0_8px_#2b4bee]" />
              </div>
            </motion.div>

            {/* PULSING CENTRAL HUB (Center Core) */}
            <div className="relative z-20 flex flex-col items-center">
              {/* Radar Expanding Pulse Rings */}
              <div className="pointer-events-none absolute -inset-10 flex items-center justify-center">
                <motion.div
                  className="absolute h-24 w-24 rounded-full border border-red/40"
                  animate={{ scale: [1, 2.2], opacity: [0.6, 0] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
                />
                <motion.div
                  className="absolute h-24 w-24 rounded-full border border-blue/40"
                  animate={{ scale: [1, 2.2], opacity: [0.6, 0] }}
                  transition={{ duration: 2.4, delay: 1.2, repeat: Infinity, ease: 'easeOut' }}
                />
              </div>

              {/* Central Core Emblem */}
              <div className="group relative flex h-20 w-20 items-center justify-center rounded-2xl border-2 border-red/60 bg-gradient-to-br from-[#1d1b28] via-[#100f17] to-[#0a0a0f] shadow-[0_0_35px_rgba(238,43,108,0.4)] transition-transform duration-300 hover:scale-105">
                <div className="text-center">
                  <span className="bg-gradient-to-r from-red via-white to-blue bg-clip-text font-mono text-xl font-black tracking-widest text-transparent">
                    KV
                  </span>
                  <span className="block text-[8px] font-bold uppercase tracking-wider text-gray-4">
                    CORE
                  </span>
                </div>
              </div>

              {/* Core Status Pill */}
              <div className="mt-2.5 flex items-center gap-1.5 rounded-full border border-green/30 bg-green/10 px-2.5 py-0.5 text-[10px] font-semibold text-green shadow-[0_0_12px_rgba(0,204,118,0.2)]">
                <span className="h-1.5 w-1.5 rounded-full bg-green animate-pulse" />
                <span>INTEGRATION HUB</span>
              </div>
            </div>

            {/* LABELED FLOATING SERVICE NODES */}
            {nodes.map((node) => {
              const isNodeActive = highlightedNodeIds.includes(node.id);

              return (
                <div
                  key={node.id}
                  className="absolute z-30 -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                >
                  <motion.div
                    animate={
                      inView
                        ? {
                            y: [0, -4, 0],
                            transition: {
                              duration: 3 + (node.x % 3),
                              repeat: Infinity,
                              ease: 'easeInOut',
                            },
                          }
                        : {}
                    }
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setActiveNodeId(node.id);
                        setIsAutoPlaying(false);
                      }}
                      onMouseEnter={() => {
                        setActiveNodeId(node.id);
                        setIsAutoPlaying(false);
                      }}
                      className={clsx(
                        'group flex items-center gap-2 rounded-xl border p-1.5 transition-all duration-300',
                        isNodeActive
                          ? 'scale-110 border-white/60 bg-[#1f1e2c] shadow-[0_0_20px_rgba(255,255,255,0.2)]'
                          : 'border-white/10 bg-[#14131d]/90 hover:scale-105 hover:border-white/30'
                      )}
                      style={{
                        borderColor: isNodeActive ? node.accentColor : undefined,
                        boxShadow: isNodeActive
                          ? `0 0 25px ${node.accentColor}66`
                          : undefined,
                      }}
                    >
                      {/* Node Icon Circle */}
                      <span
                        className="flex h-7 w-7 items-center justify-center rounded-lg transition-transform"
                        style={{
                          backgroundColor: `${node.accentColor}20`,
                          color: node.accentColor,
                        }}
                      >
                        {node.icon}
                      </span>

                      {/* Node Compact Text */}
                      <span className="pr-1.5 text-left">
                        <span className="block text-[11px] font-semibold text-white leading-tight">
                          {node.shortLabel}
                        </span>
                        <span
                          className="block text-[9px] font-medium leading-none"
                          style={{ color: node.accentColor }}
                        >
                          {node.metric}
                        </span>
                      </span>
                    </button>
                  </motion.div>
                </div>
              );
            })}

            {/* Active Node Detail Glass Card (Bottom Overlay) */}
            <AnimatePresence mode="wait">
              {activeNode && (
                <motion.div
                  key={activeNode.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="pointer-events-none absolute bottom-3 left-4 right-4 z-40 rounded-2xl border border-white/15 bg-[#14121e]/95 p-3 shadow-xl backdrop-blur-xl"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: activeNode.accentColor }}
                      />
                      <span className="text-xs font-bold text-white">
                        {activeNode.title}
                      </span>
                      <span className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] text-gray-4">
                        {activeNode.category}
                      </span>
                    </div>
                    <span
                      className="text-xs font-mono font-bold"
                      style={{ color: activeNode.accentColor }}
                    >
                      {activeNode.metric}
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] leading-tight text-gray-4">
                    {activeNode.highlight}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

Features9.propTypes = {
  badge: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  nodes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      shortLabel: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      metric: PropTypes.string.isRequired,
      highlight: PropTypes.string.isRequired,
      accentColor: PropTypes.string.isRequired,
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
      icon: PropTypes.node.isRequired,
    })
  ),
  advantages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      num: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      metric: PropTypes.string.isRequired,
      linkedNodeIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ),
  className: PropTypes.string,
};

export default Features9;
