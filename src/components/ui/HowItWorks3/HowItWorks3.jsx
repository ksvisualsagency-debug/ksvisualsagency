import clsx from 'clsx';
import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import Link from 'components/shared/link';
import LINKS from 'constants/links';

/**
 * HowItWorks3 component based on @reactbits-pro/how-it-works-3 specification:
 * Animated stepper with 3D perspective-shifting cards.
 *
 * Implements the 5 unified agency services:
 * 01 Digital Marketing (merged Brand Identity, Email Servicing, Content Strategy, Analytics & Insights)
 * 02 Web Development
 * 03 App Development
 * 04 AI Automations
 * 05 Software Development
 */

const servicesData = [
  {
    id: '01',
    number: '01',
    title: 'Digital Marketing',
    category: 'Full-Funnel Growth & Branding',
    tagline: 'Brand Identity, Email Servicing & Strategy',
    description:
      'A unified marketing engine merging memorable brand identity, high-converting email funnels, strategic content, and actionable analytics to scale your reach and drive measurable ROI.',
    capabilities: [
      'Brand Identity & Memorable Visual Positioning',
      'Email Servicing & High-Converting Automation Funnels',
      'Strategic Content Creation & Multi-Channel Distribution',
      'Data-Driven Analytics, PPC & Actionable Insights',
    ],
    metric: '250%',
    metricLabel: 'Average Revenue Growth',
    badge: 'Flagship Service',
    accentColor: '#ee2b6c',
    secondaryColor: '#2b4bee',
    illustrationIcon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
      </svg>
    ),
  },
  {
    id: '02',
    number: '02',
    title: 'Web Development',
    category: 'Modern Web Engineering',
    tagline: 'High-Performance, Scalable & Fast',
    description:
      'Bespoke web applications, responsive corporate sites, and modern e-commerce platforms engineered with React, Next.js, and Gatsby for peak speed, SEO dominance, and visual excellence.',
    capabilities: [
      'Custom React & Next.js Web Applications',
      'Responsive, Mobile-First Design & Fluid Motion',
      'Speed, SEO & Core Web Vitals Optimization',
      'Headless CMS & Fast Cloud API Integrations',
    ],
    metric: '99.8%',
    metricLabel: 'Lighthouse Performance Score',
    badge: 'Core Technology',
    accentColor: '#2b4bee',
    secondaryColor: '#00cc76',
    illustrationIcon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    id: '03',
    number: '03',
    title: 'App Development',
    category: 'Mobile Applications',
    tagline: 'Native & Cross-Platform iOS & Android',
    description:
      'Intuitive, high-performance mobile applications designed with fluid UI/UX, robust offline capabilities, and seamless cloud backends that captivate users and drive retention.',
    capabilities: [
      'iOS & Android Cross-Platform Mobile Apps',
      'Fluid 60FPS Micro-Animations & Intuitive UX',
      'Real-Time Cloud Synchronization & Push Alerts',
      'App Store Optimization & Frictionless Deployments',
    ],
    metric: '4.9★',
    metricLabel: 'User Experience Rating',
    badge: 'Mobile First',
    accentColor: '#00cc76',
    secondaryColor: '#2b4bee',
    illustrationIcon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: '04',
    number: '04',
    title: 'AI Automations',
    category: 'Intelligent Workflows',
    tagline: 'Autonomous Agents & Smart Pipelines',
    description:
      'Leverage cutting-edge AI agents, automated customer funnels, and intelligent workflow integrations to eliminate manual bottlenecks and scale business operations 10x faster.',
    capabilities: [
      'Custom AI Agents & LLM Model Integration',
      'Automated Lead Qualification & CRM Sync',
      'Intelligent Support & Client Onboarding Bots',
      'Data Extraction, Synthesis & Autonomous Workflows',
    ],
    metric: '10x',
    metricLabel: 'Operational Efficiency',
    badge: 'Next-Gen AI',
    accentColor: '#9333ea',
    secondaryColor: '#ee2b6c',
    illustrationIcon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    id: '05',
    number: '05',
    title: 'Software Development',
    category: 'Enterprise Engineering',
    tagline: 'Custom SaaS & Scalable Architecture',
    description:
      'Enterprise-grade custom software, bespoke SaaS products, and secure API infrastructure designed for mission-critical reliability, airtight security, and effortless scaling.',
    capabilities: [
      'Custom SaaS Platforms & Web Portals',
      'Scalable Cloud Architecture & Microservices',
      'Robust REST & GraphQL API Engineering',
      'End-to-End Security, CI/CD & 24/7 Monitoring',
    ],
    metric: '99.99%',
    metricLabel: 'Enterprise Cloud Uptime',
    badge: 'Enterprise Grade',
    accentColor: '#f59e0b',
    secondaryColor: '#ee2b6c',
    illustrationIcon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
];

const HowItWorks3 = ({ className = '' }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [mouseTilt, setMouseTilt] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const [sectionRef, isInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const activeService = servicesData[activeIdx] || servicesData[0];

  // Auto-advance stepper every 6 seconds unless paused by user hover
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % servicesData.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused]);

  // Handle 3D perspective mouse tilt
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseTilt({ x: x * 15, y: -y * 15 });
  };

  const handleMouseLeave = () => {
    setMouseTilt({ x: 0, y: 0 });
    setIsPaused(false);
  };

  return (
    <div
      className={clsx('relative w-full', className)}
      ref={sectionRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Section Header */}
      <div className="max-w-[760px]">
        <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-widest text-red">
          <span className="h-1.5 w-1.5 rounded-full bg-red" />
          <span>Our Services · Comprehensive Capabilities</span>
        </div>
        <h2 className="with-text-highlight-red mt-3 text-4xl font-normal leading-snug lg:text-[32px] sm:text-2xl">
          What <span>We Deliver</span>
        </h2>
        <p className="mt-3 text-lg text-black/70 dark:text-white/70 sm:text-base">
          End-to-end digital marketing, web and mobile app development, autonomous AI automations, and enterprise software engineered to scale ambitious businesses.
        </p>
      </div>

      {/* Main Split Layout: Stepper on Left, 3D Perspective Card on Right */}
      <div className="mt-14 grid grid-cols-12 gap-10 lg:gap-8 md:block lg:mt-12 sm:mt-8">
        {/* Left Column: Interactive Stepper Navigation (5 Cols) */}
        <div className="col-span-5 flex flex-col justify-between space-y-3.5 md:space-y-3">
          {servicesData.map((service, idx) => {
            const isActive = activeIdx === idx;

            return (
              <button
                key={service.id}
                type="button"
                onClick={() => setActiveIdx(idx)}
                className={clsx(
                  'group relative flex w-full items-start rounded-2xl border p-5 text-left transition-all duration-300 sm:p-4',
                  'focus:outline-none',
                  isActive
                    ? 'border-red/60 bg-gray-1 shadow-md dark:border-red/60 dark:bg-gray-9/90'
                    : 'border-gray-4 bg-gray-1/40 hover:border-gray-5 dark:border-gray-8 dark:bg-gray-9/30 dark:hover:border-gray-7'
                )}
              >
                {/* Active step progress indicator line */}
                {isActive && (
                  <motion.div
                    layoutId="activeStepperIndicator"
                    className="absolute -left-1 top-3 bottom-3 w-1.5 rounded-full bg-red"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}

                {/* Step Number with Accent Ring */}
                <div
                  className={clsx(
                    'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold transition-all duration-300',
                    isActive
                      ? 'bg-red text-white shadow-sm'
                      : 'border border-gray-4 bg-white text-black/70 dark:border-gray-8 dark:bg-gray-8 dark:text-white/70'
                  )}
                >
                  {service.number}
                </div>

                {/* Step Info */}
                <div className="ml-4 flex-1">
                  <div className="flex items-center justify-between sm:flex-wrap sm:gap-1.5">
                    <h3
                      className={clsx(
                        'text-lg font-bold transition-colors duration-200 sm:text-sm',
                        isActive ? 'text-red' : 'text-black dark:text-white group-hover:text-red'
                      )}
                    >
                      {service.title}
                    </h3>
                    <span
                      className="rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase shrink-0"
                      style={{
                        backgroundColor: `${service.accentColor}15`,
                        color: service.accentColor,
                        border: `1px solid ${service.accentColor}30`,
                      }}
                    >
                      {service.badge}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-black/60 dark:text-white/60">
                    {service.tagline}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: 3D Perspective-Shifting Card Showcase (7 Cols) */}
        <div
          className="col-span-7 md:mt-8 [perspective:1200px]"
          ref={containerRef}
          onMouseMove={handleMouseMove}
        >
          <motion.div
            key={activeService.id}
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{
              opacity: 1,
              y: 0,
              rotateY: mouseTilt.x,
              rotateX: mouseTilt.y,
              scale: 1,
            }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformStyle: 'preserve-3d' }}
            className="relative overflow-hidden rounded-3xl border border-gray-8 bg-[#121218] p-9 shadow-2xl dark:border-gray-8 dark:bg-[#121218] lg:p-8 sm:p-5 xs:p-4"
          >
            {/* Glowing Ambient Background Orb */}
            <div
              className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full opacity-40 blur-3xl transition-all duration-700 sm:hidden"
              style={{
                background: `radial-gradient(circle, ${activeService.accentColor} 0%, ${activeService.secondaryColor} 50%, transparent 75%)`,
              }}
            />

            {/* Card Header */}
            <div className="relative z-10 flex items-start justify-between sm:flex-col sm:gap-3.5">
              <div className="flex items-center space-x-3.5 sm:space-x-2.5">
                <div
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl shadow-md sm:h-11 sm:w-11"
                  style={{
                    backgroundColor: `${activeService.accentColor}25`,
                    color: activeService.accentColor,
                    border: `1px solid ${activeService.accentColor}50`,
                  }}
                >
                  {activeService.illustrationIcon}
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-white/50 sm:text-[10px]">
                    {activeService.category}
                  </span>
                  <h3 className="text-2xl font-black tracking-tight text-white sm:text-lg">
                    {activeService.title}
                  </h3>
                </div>
              </div>

              {/* Key Metric Pill */}
              <div
                className="rounded-2xl border p-3 text-right sm:self-start sm:text-left sm:py-2 sm:px-3"
                style={{
                  borderColor: `${activeService.accentColor}40`,
                  backgroundColor: `${activeService.accentColor}18`,
                }}
              >
                <p
                  className="text-xl font-black leading-none sm:text-base"
                  style={{ color: activeService.accentColor }}
                >
                  {activeService.metric}
                </p>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-white/60 sm:text-[9px]">
                  {activeService.metricLabel}
                </p>
              </div>
            </div>

            {/* Description */}
            <p className="relative z-10 mt-6 text-base leading-relaxed text-white/80 sm:mt-4 sm:text-sm">
              {activeService.description}
            </p>

            {/* Key Capabilities Checklist */}
            <div className="relative z-10 mt-7 border-t border-gray-8 pt-6 sm:mt-5 sm:pt-4">
              <span className="text-xs font-bold uppercase tracking-wider text-white/60 sm:text-[11px]">
                Included Capabilities & Features:
              </span>
              <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-1 sm:mt-3">
                {activeService.capabilities.map((cap, i) => (
                  <li
                    key={i}
                    className="flex items-start rounded-xl border border-gray-8 bg-black/40 p-3 text-xs font-medium text-white/90 sm:p-2.5"
                  >
                    <span
                      className="mr-2 flex h-4 w-4 shrink-0 items-center justify-center rounded-full mt-0.5"
                      style={{
                        backgroundColor: `${activeService.accentColor}30`,
                        color: activeService.accentColor,
                      }}
                    >
                      <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>{cap}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Card Footer: CTA Action */}
            <div className="relative z-10 mt-8 flex items-center justify-between border-t border-gray-8 pt-6 sm:mt-5 sm:flex-col sm:items-start sm:gap-3 sm:pt-4">
              <div className="text-xs text-white/60">
                Tailored scope & execution strategy for your brand.
              </div>
              <Link
                to={LINKS.getStarted}
                size="base"
                theme="arrow-red"
                className="font-semibold"
              >
                Inquire About {activeService.title}
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks3;
