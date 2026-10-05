import clsx from 'clsx';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';

import Link from 'components/shared/link';
import LINKS from 'constants/links';

/**
 * HowItWorks4 component based on @reactbits-pro/how-it-works-4 specification.
 * Features:
 * - Timeline pills (Day 01, Week 01, Week 02, Ongoing)
 * - Dotted / gradient connector lines running between the steps
 * - Bordered checklist cards with deliverables and interactive hover states
 * - Modern dark theme aesthetic matching K's visuals design system
 */

const defaultSteps = [
  {
    step: '01',
    pill: 'Day 01',
    phase: 'Discovery',
    tagline: 'Understanding your goals & landscape',
    description:
      'We dive deep into your brand identity, business objectives, and target audience to uncover unique growth opportunities.',
    tag: 'Audit & Blueprint',
    checklist: [
      'Comprehensive brand & digital audit',
      'Target audience & competitor benchmarking',
      'KPI alignment & deliverables scope',
    ],
    accent: '#ee2b6c',
  },
  {
    step: '02',
    pill: 'Week 01',
    phase: 'Strategy',
    tagline: 'Engineering the growth masterplan',
    description:
      'We formulate a custom, data-backed marketing and creative roadmap tailored to differentiate your business in the market.',
    tag: 'Brand Positioning',
    checklist: [
      'Brand messaging & creative direction',
      'Multi-channel marketing architecture',
      'Content & advertising gameplan',
    ],
    accent: '#2b4bee',
  },
  {
    step: '03',
    pill: 'Week 02',
    phase: 'Execution',
    tagline: 'Bringing the vision to life',
    description:
      'Our team crafts high-converting assets, visual identities, and campaigns, deploying them across high-impact channels.',
    tag: 'Campaign Launch',
    checklist: [
      'High-impact visual & content production',
      'Ad campaign & email funnel deployment',
      'Conversion tracking & pixel setup',
    ],
    accent: '#00cc76',
  },
  {
    step: '04',
    pill: 'Ongoing',
    phase: 'Optimization',
    tagline: 'Continuous scaling & performance tuning',
    description:
      'We constantly measure, analyze, and refine every initiative to maximize your return on investment and compound growth.',
    tag: 'ROI & Scale',
    checklist: [
      'Real-time analytics & attribution tracking',
      'Conversion rate optimization (CRO)',
      'Transparent weekly performance reporting',
    ],
    accent: '#ee2b6c',
  },
];

const HowItWorks4 = ({
  steps = defaultSteps,
  title = 'Our Process',
  highlight = 'Process',
  subtitle = 'A clear, results-driven timeline engineered to transform and scale your brand.',
  ctaText = 'Get Started With Your Project',
  ctaLink = LINKS.getStarted,
  className = '',
}) => {
  const [wrapperRef, isInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className={clsx('relative w-full', className)} ref={wrapperRef}>
      {/* Header & Section Intro */}
      <div className="flex flex-col md:items-start justify-between md:flex-col">
        <div className="max-w-[760px]">
          <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-widest text-red">
            <span className="h-1.5 w-1.5 rounded-full bg-red" />
            <span>How It Works · 4-Step Framework</span>
          </div>
          <h2 className="with-text-highlight-red mt-3 text-4xl font-normal leading-snug lg:text-[32px] sm:text-2xl">
            Our <span>Process</span>
          </h2>
          <p className="mt-3 text-lg text-black/70 dark:text-white/70 sm:text-base">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Timeline Pills Bar with Dotted Connector (Desktop / Tablet) */}
      <div className="relative mt-14 hidden md:hidden lg:block xl:block 2xl:block">
        {/* Background dotted connector line */}
        <div className="absolute top-1/2 left-8 right-8 -translate-y-1/2 border-t-2 border-dashed border-gray-4 dark:border-gray-8 pointer-events-none" />

        <div className="relative z-10 grid grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const isActive = activeStep === idx;
            return (
              <button
                key={step.step}
                type="button"
                onClick={() => setActiveStep(idx)}
                className="group flex flex-col items-center text-center transition-all focus:outline-none"
              >
                <div
                  className={clsx(
                    'flex items-center space-x-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-all duration-300',
                    isActive
                      ? 'bg-red text-white shadow-[0_0_20px_rgba(238,43,108,0.4)]'
                      : 'border border-gray-4 bg-gray-1 text-black/70 hover:border-red/60 dark:border-gray-8 dark:bg-gray-9 dark:text-white/70 dark:hover:border-red/60'
                  )}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-current" />
                  <span>{step.pill}</span>
                </div>
                <span className="mt-2.5 text-sm font-semibold text-black dark:text-white group-hover:text-red transition-colors">
                  0{idx + 1}. {step.phase}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bordered Checklist Cards Grid */}
      <div className="mt-10 grid grid-cols-4 gap-6 lg:grid-cols-2 lg:gap-6 md:grid-cols-1 md:gap-5 sm:mt-8">
        {steps.map((step, index) => {
          const isActive = activeStep === index;

          return (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              onMouseEnter={() => setActiveStep(index)}
              className={clsx(
                'group relative flex flex-col justify-between rounded-2xl border p-7 transition-all duration-300 sm:p-6',
                'bg-gray-1 dark:bg-gray-9/70 shadow-sm',
                isActive
                  ? 'border-red/70 shadow-[0_12px_32px_rgba(238,43,108,0.14)] dark:border-red/70'
                  : 'border-gray-4 hover:border-gray-5 dark:border-gray-8 dark:hover:border-gray-7'
              )}
            >
              {/* Card Header: Step & Timeline Pill */}
              <div>
                <div className="flex items-center justify-between">
                  <span
                    className={clsx(
                      'flex h-10 w-10 items-center justify-center rounded-xl text-base font-bold transition-all',
                      isActive
                        ? 'bg-red text-white'
                        : 'border border-gray-4 bg-white text-black dark:border-gray-8 dark:bg-gray-8 dark:text-white'
                    )}
                  >
                    {step.step}
                  </span>

                  <span
                    className="rounded-full px-3 py-1 text-xs font-semibold tracking-wide"
                    style={{
                      backgroundColor: `${step.accent}15`,
                      color: step.accent,
                      border: `1px solid ${step.accent}33`,
                    }}
                  >
                    {step.pill}
                  </span>
                </div>

                <div className="mt-5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-black/50 dark:text-white/50">
                    {step.tag}
                  </span>
                  <h3 className="mt-1 text-2xl font-bold tracking-tight text-black dark:text-white lg:text-xl sm:text-lg">
                    {step.phase}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-red">
                    {step.tagline}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-black/70 dark:text-white/70">
                    {step.description}
                  </p>
                </div>

                {/* Bordered Checklist Items */}
                <div className="mt-6 border-t border-gray-4 pt-5 dark:border-gray-8/80">
                  <span className="text-xs font-semibold uppercase tracking-wider text-black/60 dark:text-white/60">
                    Key Deliverables:
                  </span>
                  <ul className="mt-3 space-y-2.5">
                    {step.checklist.map((item, i) => (
                      <li key={i} className="flex items-start text-xs leading-relaxed text-black/80 dark:text-white/80">
                        <span
                          className="mr-2 flex h-4 w-4 shrink-0 items-center justify-center rounded-full mt-0.5"
                          style={{
                            backgroundColor: `${step.accent}20`,
                            color: step.accent,
                          }}
                        >
                          <svg
                            className="h-2.5 w-2.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={3}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom indicator */}
              <div className="mt-6 flex items-center justify-between border-t border-gray-4/60 pt-4 dark:border-gray-8/60 text-xs">
                <span className="text-black/50 dark:text-white/50">Phase {step.step} of 04</span>
                <span
                  className={clsx(
                    'font-semibold transition-colors',
                    isActive ? 'text-red' : 'text-black/40 dark:text-white/40'
                  )}
                >
                  {isActive ? 'Active Focus' : 'Explore'} →
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom CTA Bar */}
      <div className="mt-12 flex items-center justify-between rounded-2xl border border-gray-4 bg-gray-1 p-6 dark:border-gray-8 dark:bg-gray-9/50 sm:flex-col sm:space-y-4 sm:p-5">
        <div className="flex items-center space-x-3.5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red/10 text-red">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <p className="text-base font-semibold text-black dark:text-white sm:text-sm">
              Ready to kick off your marketing transformation?
            </p>
            <p className="text-xs text-black/60 dark:text-white/60">
              Initial strategy blueprint ready within 5 business days.
            </p>
          </div>
        </div>
        <Link
          to={ctaLink}
          size="base"
          theme="arrow-red"
          className="shrink-0 font-semibold"
        >
          {ctaText}
        </Link>
      </div>
    </div>
  );
};

export default HowItWorks4;
