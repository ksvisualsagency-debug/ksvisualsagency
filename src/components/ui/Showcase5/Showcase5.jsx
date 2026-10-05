import { Alignment, Fit, Layout, useRive } from '@rive-app/react-canvas';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import React, { useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import Link from 'components/shared/link';
import LINKS from 'constants/links';

// Client Company Logos
import dhanvineJewelsLogo from 'images/portfolio/dhanvine-jewels.png';
import gmkJewelsLogo from 'images/portfolio/gmk-jewels.png';
import divineImpexLogo from 'images/portfolio/divine-impex.png';
import jpArchitectureLogo from 'images/portfolio/jp-architecture.png';
import nkHealthHubLogo from 'images/portfolio/nk-health-hub.png';
import shreeDiamondsLogo from 'images/portfolio/shree-diamonds.png';
import gunatitEnterpriseLogo from 'images/portfolio/gunatit-enterprise.png';

/**
 * Showcase5 component based on @reactbits-pro/showcase-5 specification:
 * Tabbed creator showcase with slide carousel for studios, creators, and teams.
 *
 * Ordered portfolio projects with authentic client logos:
 * 1. DHANVINE JEWELS
 * 2. GMK Jewels & Gems
 * 3. DIVINE Impex
 * 4. JP Architecture
 * 5. NK The Health Hub
 * 6. Shree Diamonds
 * 7. GUNATIT ENTERPRISE
 */

const portfolioProjects = [
  {
    id: 'dhanvine',
    client: 'DHANVINE JEWELS',
    logo: dhanvineJewelsLogo,
    category: 'Digital Marketing & Direct-to-Consumer Growth',
    subtitle: 'Fine Jewelry Positioning & Social Campaigns',
    description:
      'Scaled an exclusive fine jewelry label into a recognized digital presence with viral social campaigns, influencer partnerships, and targeted high-converting acquisition funnels.',
    deliverables: [
      'Full-Funnel Social Growth',
      'Creative Performance Ads',
      'High-Ticket Retargeting',
      'E-Commerce Catalog Strategy',
    ],
    tabs: ['all', 'marketing'],
    badge: 'Fine Jewelry Growth',
    accent: '#ec4899',
    secondary: '#2b4bee',
    initials: 'DJ',
    metric: '250% Revenue Increase',
  },
  {
    id: 'gmk',
    client: 'GMK Jewels & Gems',
    logo: gmkJewelsLogo,
    category: 'Luxury Brand Identity & Performance Marketing',
    subtitle: 'Prestige Diamond Jewelry & Global Acquisition',
    description:
      'Crafted luxury brand identity, bespoke marketing collaterals, and high-conversion ad funnels for an esteemed diamond and fine jewelry manufacturer commanding global trust.',
    deliverables: [
      'Prestige Brand Guidelines',
      'High-End Print & Digital Collateral',
      'Omnichannel Performance Marketing',
      'VIP Buyer Funnel Architecture',
    ],
    tabs: ['all', 'branding', 'marketing'],
    badge: 'Luxury Jewelry & Gems',
    accent: '#d4af37',
    secondary: '#ee2b6c',
    initials: 'GMK',
    metric: '3.8x Client Reach',
  },
  {
    id: 'divine',
    client: 'DIVINE Impex',
    logo: divineImpexLogo,
    category: 'Exhibition Marketing & Brand Flyer',
    subtitle: 'International Trade Exhibition & Collateral',
    description:
      'Created high-impact global trade exhibition collateral, promotional flyers, and corporate brand assets that commanded attention and generated record-breaking distributor leads.',
    deliverables: [
      'Exhibition Marketing Flyers',
      'International Trade Show Collateral',
      'High-Resolution Print Production',
      'Digital B2B Promo Strategy',
    ],
    tabs: ['all', 'marketing', 'branding'],
    badge: 'Exhibition Marketing',
    accent: '#ee2b6c',
    secondary: '#2b4bee',
    initials: 'DI',
    metric: '350+ Qualified Leads',
  },
  {
    id: 'jp',
    client: 'JP Architecture',
    logo: jpArchitectureLogo,
    category: 'Logo & Architectural Brand Design',
    subtitle: 'Minimalist Visual Identity & Luxury Collateral',
    description:
      'Crafted a bespoke, geometric architectural logo and comprehensive brand identity system for an elite studio, reflecting spatial precision and modern luxury aesthetic.',
    deliverables: [
      'Bespoke Geometric Logo',
      'Architectural Portfolio Template',
      'Luxury Stationery & Palette',
      'Social Visual Identity System',
    ],
    tabs: ['all', 'branding'],
    badge: 'Architecture Brand',
    accent: '#f59e0b',
    secondary: '#ee2b6c',
    initials: 'JA',
    metric: '100% Brand Resonance',
  },
  {
    id: 'nk',
    client: 'NK The Health Hub',
    logo: nkHealthHubLogo,
    category: 'Complete Brand Design & Healthcare Strategy',
    subtitle: 'Holistic Wellness & Modern Healthcare Identity',
    description:
      'Designed an end-to-end healthcare identity and clinic branding framework, blending clinical authority with inviting warmth to attract patients across wellness verticals.',
    deliverables: [
      'Full Clinic Brand Ecosystem',
      'Signage & Environmental Graphics',
      'Patient Wellness Kits',
      'Multi-Channel Social Kit',
    ],
    tabs: ['all', 'branding', 'marketing'],
    badge: 'Healthcare Branding',
    accent: '#00cc76',
    secondary: '#2b4bee',
    initials: 'NK',
    metric: '40% Growth in Inquiries',
  },
  {
    id: 'shree',
    client: 'Shree Diamonds',
    logo: shreeDiamondsLogo,
    category: 'Digital Marketing & Luxury E-Commerce',
    subtitle: 'High-Ticket Luxury Diamond Growth Campaign',
    description:
      'Formulated an omnichannel digital marketing campaign, targeted performance advertising, and bespoke creative assets, driving high-ticket diamond conversions globally.',
    deliverables: [
      'Omnichannel Digital Marketing',
      'Precision PPC Advertising',
      'Conversion Rate Optimization',
      'Luxury Storytelling Content',
    ],
    tabs: ['all', 'marketing'],
    badge: 'Luxury Marketing',
    accent: '#8b5cf6',
    secondary: '#ee2b6c',
    initials: 'SD',
    metric: '4.2x ROAS Delivered',
  },
  {
    id: 'gunatit',
    client: 'GUNATIT ENTERPRISE',
    logo: gunatitEnterpriseLogo,
    category: 'CRM Software, Logo & Brand Design',
    subtitle: 'Custom CRM Architecture & Corporate Identity',
    description:
      'Engineered an enterprise-grade custom CRM software ecosystem paired with a prestigious logo mark and corporate brand identity, accelerating client operations and sales pipeline tracking.',
    deliverables: [
      'Custom CRM Web Software',
      'Sales Pipeline & Lead Tracking',
      'Corporate Logo Design',
      'Complete Brand Guidelines',
    ],
    tabs: ['all', 'software', 'branding'],
    badge: 'Featured Software & Brand',
    accent: '#2b4bee',
    secondary: '#ee2b6c',
    initials: 'GE',
    metric: '10x Pipeline Speed',
  },
];

const categoryTabs = [
  { id: 'all', label: 'All Projects' },
  { id: 'branding', label: 'Brand & Logo Design' },
  { id: 'marketing', label: 'Digital Marketing & Growth' },
  { id: 'software', label: 'CRM & Software' },
];

const ProjectCard = ({ project, isWrapperInView }) => {
  const { RiveComponent, rive } = useRive({
    src: '/animations/shared/case-studies-card.riv',
    autoplay: false,
    layout: new Layout({
      fit: Fit.FitHeight,
      alignment: Alignment.Center,
    }),
  });

  const handleMouseEnter = () => {
    if (rive && !rive.isPlaying) {
      const animNum = Math.floor(Math.random() * 5) + 1;
      rive.play([`hover-${animNum}`]);
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      className="group relative flex h-full flex-col justify-between rounded-3xl border border-gray-8 bg-[#121218] p-7 transition-all duration-300 hover:border-red/60 hover:shadow-[0_16px_40px_rgba(238,43,108,0.12)] sm:p-5"
    >
      {/* Top Visual Area with Ambient Glow and Real Company Logo */}
      <div>
        <div className="relative flex h-52 w-full items-center justify-center overflow-hidden rounded-2xl bg-black border border-gray-8/60 sm:h-44">
          {/* Subtle Ambient Radial Glow */}
          <div
            className="absolute inset-0 opacity-40 blur-2xl transition-opacity duration-500 group-hover:opacity-70"
            style={{
              background: `radial-gradient(circle at center, ${project.accent}33 0%, ${project.secondary}15 50%, transparent 80%)`,
            }}
          />

          {/* Interactive Rive canvas */}
          {isWrapperInView && (
            <RiveComponent className="absolute inset-0 h-full w-full pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity" />
          )}

          {/* Client Company Logo Display */}
          <div className="relative z-10 flex h-full w-full items-center justify-center p-6 sm:p-4">
            <img
              src={project.logo}
              alt={`${project.client} logo`}
              className={clsx(
                'max-h-28 w-auto max-w-[85%] object-contain transition-transform duration-300 group-hover:scale-105 sm:max-h-24',
                project.id === 'jp' && 'rounded-xl bg-white p-2.5 shadow-lg'
              )}
              loading="lazy"
            />
          </div>

          {/* Metric Badge */}
          <div className="absolute top-3 right-3 z-10 rounded-full border border-white/10 bg-black/60 px-3 py-1 text-[11px] font-semibold text-white/90 backdrop-blur-md">
            {project.metric}
          </div>
        </div>

        {/* Project Meta & Heading */}
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <span
              className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider"
              style={{
                backgroundColor: `${project.accent}15`,
                color: project.accent,
                border: `1px solid ${project.accent}30`,
              }}
            >
              {project.badge}
            </span>
          </div>

          <h3 className="mt-2.5 text-2xl font-bold tracking-tight text-white group-hover:text-red transition-colors duration-200 sm:text-xl">
            {project.client}
          </h3>
          <p className="mt-1 text-sm font-semibold text-red">
            {project.category}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-white/75 sm:text-xs">
            {project.description}
          </p>
        </div>

        {/* Deliverables Checklist Chips */}
        <div className="mt-6 border-t border-gray-8 pt-5">
          <span className="text-xs font-bold uppercase tracking-wider text-white/50">
            Scope & Deliverables:
          </span>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.deliverables.map((item, i) => (
              <span
                key={i}
                className="rounded-lg border border-gray-8 bg-black/50 px-2.5 py-1 text-xs font-medium text-white/80"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card Footer */}
      <div className="mt-7 flex items-center justify-between border-t border-gray-8/80 pt-5 sm:flex-col sm:items-start sm:gap-2.5 sm:mt-5 sm:pt-4">
        <span className="text-xs text-white/50">Client Success Case Study</span>
        <Link
          to={LINKS.getStarted}
          size="base"
          theme="arrow-red"
          className="text-sm font-semibold"
        >
          Inquire Similar Scope
        </Link>
      </div>
    </div>
  );
};

const Showcase5 = ({ className = '', title, description }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [currentPage, setCurrentPage] = useState(0);
  const [wrapperRef, isWrapperInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  // Filter projects by active category tab
  const filteredProjects = useMemo(() => {
    if (activeTab === 'all') return portfolioProjects;
    return portfolioProjects.filter((p) => p.tabs.includes(activeTab));
  }, [activeTab]);

  // Display 2 projects per carousel slide page
  const totalPages = Math.ceil(filteredProjects.length / 2);
  const safeCurrentPage = Math.min(currentPage, Math.max(0, totalPages - 1));

  const visibleProjects = useMemo(() => {
    const startIdx = safeCurrentPage * 2;
    return filteredProjects.slice(startIdx, startIdx + 2);
  }, [filteredProjects, safeCurrentPage]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setCurrentPage(0);
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const handlePrev = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <div ref={wrapperRef} className={clsx('relative', className)}>
      {/* Header section with Title & Category Tabs */}
      <div className="flex flex-col gap-6 lg:gap-5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-[700px]">
            {/* Live Indicator Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-red/30 bg-red/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-red">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-red" />
              </span>
              <span>Case Studies · Selected Work</span>
            </div>

            <h2 className="mt-4 text-4xl font-semibold leading-snug text-white lg:text-[32px] sm:text-2xl">
              {title || (
                <>
                  Proven Results for{' '}
                  <span className="bg-gradient-to-r from-red via-[#f43f5e] to-blue bg-clip-text text-transparent">
                    Industry Leaders
                  </span>
                </>
              )}
            </h2>

            {description && (
              <p className="mt-3 text-lg leading-relaxed text-gray-4 md:text-base">{description}</p>
            )}
          </div>

          {/* Carousel Arrows (Desktop) */}
          {totalPages > 1 && (
            <div className="flex items-center gap-3 sm:hidden">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous portfolio projects"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-8 bg-[#121218] text-white transition-all hover:border-red hover:bg-red/10 hover:text-red active:scale-95"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <span className="font-mono text-xs text-gray-5">
                {safeCurrentPage + 1} / {totalPages}
              </span>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next portfolio projects"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-8 bg-[#121218] text-white transition-all hover:border-red hover:bg-red/10 hover:text-red active:scale-95"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Filter Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-gray-8/80 pb-4 sm:flex-nowrap sm:overflow-x-auto sm:pb-3 no-scrollbar">
          {categoryTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTabChange(tab.id)}
                className={clsx(
                  'rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-200 shrink-0',
                  isActive
                    ? 'bg-red text-white shadow-[0_0_15px_rgba(238,43,108,0.4)]'
                    : 'border border-gray-8/80 bg-white/[0.02] text-gray-4 hover:border-gray-7 hover:text-white'
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects Grid Carousel */}
      <div className="mt-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeTab}-${safeCurrentPage}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="grid grid-cols-2 gap-8 lg:gap-6 md:grid-cols-1"
          >
            {visibleProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                isWrapperInView={isWrapperInView}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Mobile Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-6 hidden items-center justify-between sm:flex">
          <button
            type="button"
            onClick={handlePrev}
            className="rounded-full border border-gray-8 bg-[#121218] px-4 py-2 text-xs font-semibold text-white"
          >
            ← Previous
          </button>
          <span className="font-mono text-xs text-gray-5">
            {safeCurrentPage + 1} / {totalPages}
          </span>
          <button
            type="button"
            onClick={handleNext}
            className="rounded-full border border-gray-8 bg-[#121218] px-4 py-2 text-xs font-semibold text-white"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
};

export default Showcase5;
