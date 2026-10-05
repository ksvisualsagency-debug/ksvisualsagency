import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import Link from 'components/shared/link';
import LINKS from 'constants/links';
import logoWhiteSvg from 'images/logo-white.svg';

/**
 * Navigation13 component based on @reactbits-pro/navigation-13 specification:
 * Editorial split navbar featuring:
 * - A centered wordmark
 * - Text roll-up link hovers (dual-layer vertical rolling text animation)
 * - A full-screen curtain menu with staggered entrance and direct studio dispatch
 * - Glassmorphic fixed header with adaptive scroll states
 */

// Dual-layer text roll-up link hover component
const TextRollUp = ({ text, href, className = '', onClick = null, isLarge = false }) => (
  <Link
    to={href}
    onClick={onClick}
    className={clsx(
      'group relative inline-block overflow-hidden transition-colors',
      isLarge
        ? 'py-1 text-3xl font-bold tracking-tight text-white lg:text-2xl sm:text-xl'
        : 'py-0.5 text-xs font-semibold uppercase tracking-wider',
      className
    )}
  >
    {/* Default State: Rolls up and out on hover */}
    <span
      className={clsx(
        'block transform transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-full',
        isLarge ? 'text-white' : 'text-gray-3 group-hover:text-white'
      )}
    >
      {text}
    </span>

    {/* Hover State: Rolls in from bottom */}
    <span
      aria-hidden="true"
      className={clsx(
        'absolute inset-0 block transform translate-y-full transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-y-0 font-bold',
        isLarge ? 'text-red' : 'text-red'
      )}
    >
      {text}
    </span>
  </Link>
);

TextRollUp.propTypes = {
  text: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  isLarge: PropTypes.bool,
};

const leftNavLinks = [
  { text: 'Home', href: LINKS.home },
  { text: 'Services', href: LINKS.services },
  { text: 'Portfolio', href: LINKS.portfolio },
  { text: 'Why Choose Us', href: LINKS.about },
];


const curtainMenuItems = [
  { number: '01', text: 'Home', href: LINKS.home, subtitle: 'Digital Growth & Creative Architecture' },
  { number: '02', text: 'Services & Capabilities', href: LINKS.services, subtitle: 'Marketing, CRM, Web Dev, AI' },
  { number: '03', text: 'Featured Portfolio', href: LINKS.portfolio, subtitle: 'GUNATIT, DIVINE, JP Architecture' },
  { number: '04', text: 'Why Choose Us', href: LINKS.about, subtitle: 'Interconnected Growth Engine' },
  { number: '05', text: 'Founders & Vision', href: LINKS.founders, subtitle: 'Leadership by Krish Bodara & Krish Sutariya' },
  { number: '06', text: 'Frequently Asked', href: LINKS.faq, subtitle: 'Process, Pricing, Timelines & NDAs' },
  { number: '07', text: 'Start a Project', href: LINKS.contact, subtitle: 'Get a Strategic Blueprint in 2-4 Hours' },
];

const Navigation13 = ({ className = '' }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCurtainOpen, setIsCurtainOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle escape key to close curtain
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsCurtainOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Lock background scroll when curtain menu is active
  useEffect(() => {
    if (isCurtainOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCurtainOpen]);

  return (
    <>
      {/* FIXED SPLIT NAVBAR */}
      <header
        className={clsx(
          'fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 safe-paddings',
          isScrolled
            ? 'border-b border-white/10 bg-[#07070b]/90 py-3 shadow-2xl backdrop-blur-2xl'
            : 'border-b border-white/5 bg-[#07070b]/50 py-4 backdrop-blur-md',
          className
        )}
      >
        <div className="container relative flex items-center justify-between">
          {/* Zone 1: Left Editorial Nav Links (Desktop) */}
          <nav className="flex flex-1 items-center gap-7 lg:gap-5 md:hidden">
            {leftNavLinks.map(({ text, href }) => (
              <TextRollUp key={text} text={text} href={href} />
            ))}
          </nav>

          {/* Zone 2: Centered Wordmark / Logo */}
          <div className="flex shrink-0 items-center justify-center md:flex-initial">
            <Link
              to={LINKS.home}
              className="group flex items-center gap-3 transition-transform hover:scale-105"
            >
              <img
                src={logoWhiteSvg}
                alt="K's visuals"
                width={140}
                height={32}
                className="h-8 w-auto"
                loading="eager"
              />
              <span className="hidden sm:inline-flex xs:hidden items-center gap-1.5 rounded-full border border-red/30 bg-red/10 px-2 py-0.5 text-[9px] font-mono font-bold text-red uppercase">
                <span className="h-1 w-1 rounded-full bg-red animate-pulse" />
                STUDIO
              </span>
            </Link>
          </div>

          {/* Zone 3: Right Editorial Links + CTA + Curtain Menu Trigger */}
          <div className="flex flex-1 items-center justify-end gap-6 lg:gap-4">

            {/* Start a Project Primary Action Pill */}
            <Link
              to={LINKS.contact}
              className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-red to-[#f43f5e] px-4 py-2 text-xs font-semibold text-white shadow-[0_0_15px_rgba(238,43,108,0.35)] transition-all hover:opacity-95 hover:shadow-[0_0_20px_rgba(238,43,108,0.5)] sm:hidden"
            >
              <span>Start a Project</span>
              <span className="text-white/80">→</span>
            </Link>

            {/* Full-Screen Curtain Menu Toggle Trigger */}
            <button
              type="button"
              onClick={() => setIsCurtainOpen(true)}
              aria-label="Open Fullscreen Navigation"
              className="group flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1.5 text-xs font-mono font-semibold tracking-wider text-white transition-all hover:border-red/60 hover:bg-white/[0.08] hover:shadow-[0_0_15px_rgba(238,43,108,0.25)]"
            >
              <span className="text-gray-4 group-hover:text-white transition-colors sm:hidden">
                MENU
              </span>
              <div className="flex flex-col gap-1 items-end">
                <span className="h-0.5 w-4 rounded-full bg-white transition-all group-hover:w-5 group-hover:bg-red" />
                <span className="h-0.5 w-3 rounded-full bg-white/70 transition-all group-hover:w-5 group-hover:bg-red" />
                <span className="h-0.5 w-5 rounded-full bg-white/50 transition-all group-hover:bg-red" />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* FULL-SCREEN CURTAIN MENU OVERLAY */}
      <AnimatePresence>
        {isCurtainOpen && (
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: '0%' }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[100] flex flex-col justify-between overflow-y-auto bg-[#07070c]/98 p-10 text-white shadow-2xl backdrop-blur-3xl safe-paddings lg:p-8 sm:p-5"
          >
            {/* Ambient Background Glows inside curtain */}
            <div className="pointer-events-none absolute -left-20 top-1/4 h-96 w-96 rounded-full bg-red/15 blur-[140px]" />
            <div className="pointer-events-none absolute -right-20 bottom-1/4 h-96 w-96 rounded-full bg-blue/15 blur-[140px]" />

            {/* Curtain Top Header */}
            <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-6">
              <Link
                to={LINKS.home}
                onClick={() => setIsCurtainOpen(false)}
                className="flex items-center gap-3"
              >
                <img
                  src={logoWhiteSvg}
                  alt="K's visuals"
                  width={140}
                  height={32}
                  className="h-8 w-auto"
                />
                <span className="inline-flex items-center gap-1.5 rounded-full border border-green/30 bg-green/10 px-2.5 py-0.5 text-[10px] font-semibold text-green shadow-[0_0_10px_rgba(0,204,118,0.2)] sm:hidden">
                  <span className="h-1.5 w-1.5 rounded-full bg-green animate-pulse" />
                  ACCEPTING CLIENTS
                </span>
              </Link>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsCurtainOpen(false)}
                aria-label="Close navigation"
                className="group flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 font-mono text-xs font-bold tracking-widest text-white transition-all hover:border-red hover:bg-red/10 hover:text-red hover:shadow-[0_0_20px_rgba(238,43,108,0.3)] sm:px-3 sm:py-1.5"
              >
                <span>CLOSE</span>
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-xs transition-transform group-hover:rotate-90">
                  ✕
                </span>
              </button>
            </div>

            {/* Curtain Main Content Grid */}
            <div className="relative z-10 my-auto grid grid-cols-12 gap-12 py-10 lg:gap-8 md:block md:space-y-10 sm:my-0 sm:py-6 sm:space-y-8">
              {/* Left Column: Giant Editorial Navigation Links */}
              <div className="col-span-7 lg:col-span-7 md:col-span-12">
                <div className="mb-4 inline-flex items-center gap-2 text-xs font-mono tracking-widest text-red uppercase">
                  <span className="h-1.5 w-1.5 rounded-full bg-red" />
                  <span>// DIRECT DIRECTORY</span>
                </div>

                <nav className="space-y-4 sm:space-y-2.5">
                  {curtainMenuItems.map(({ number, text, href, subtitle }, index) => (
                    <motion.div
                      key={text}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.15 + index * 0.05 }}
                    >
                      <Link
                        to={href}
                        onClick={() => setIsCurtainOpen(false)}
                        className="group flex items-baseline justify-between border-b border-white/5 pb-3 transition-colors hover:border-white/20"
                      >
                        <div className="flex items-baseline gap-4 sm:gap-2">
                          <span className="font-mono text-xs font-semibold text-gray-5 transition-colors group-hover:text-red">
                            {number}
                          </span>
                          <span className="text-3xl font-bold tracking-tight text-white transition-colors group-hover:text-red lg:text-2xl sm:text-lg">
                            {text}
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-xs text-gray-5 hidden xl:inline-block">
                            {subtitle}
                          </span>
                          <span className="text-lg text-gray-6 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white sm:text-base">
                            →
                          </span>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </nav>
              </div>

              {/* Right Column: Studio Dispatch & Coordinates */}
              <div className="col-span-5 lg:col-span-5 md:col-span-12 flex flex-col justify-between space-y-8">
                {/* Inquiry Card */}
                <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 shadow-xl backdrop-blur-xl sm:p-5">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-blue/30 bg-blue/10 px-3 py-0.5 text-xs font-semibold text-blue">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue" />
                    WORK WITH US
                  </span>

                  <h3 className="mt-3 text-xl font-bold text-white sm:text-lg">
                    Have a vision for your brand or enterprise?
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-gray-4">
                    From bespoke brand design to enterprise CRM software and multi-channel marketing campaigns, we engineer scalable growth engines.
                  </p>

                  <Link
                    to={LINKS.contact}
                    onClick={() => setIsCurtainOpen(false)}
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-red via-[#f43f5e] to-blue py-3.5 text-sm font-bold text-white shadow-[0_0_20px_rgba(238,43,108,0.4)] transition-all hover:opacity-95"
                  >
                    <span>Start Your Project</span>
                    <span>→</span>
                  </Link>
                </div>

                {/* Direct Connect Strip */}
                <div className="space-y-3 font-mono text-xs text-gray-4">
                  <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-5">EMAIL:</span>
                    <a
                      href={LINKS.email}
                      className="text-white hover:text-red transition-colors"
                    >
                      {LINKS.emailText}
                    </a>
                  </div>

                  <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-5">PHONE:</span>
                    <a
                      href={LINKS.phone1Tel}
                      className="text-white hover:text-green transition-colors"
                    >
                      +91 8488080517 / +91 7861926992
                    </a>
                  </div>

                  <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-5">INSTAGRAM:</span>
                    <a
                      href={LINKS.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-red transition-colors"
                    >
                      @ksvisuals.design
                    </a>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-5">HEADQUARTERS:</span>
                    <span className="text-white">Surat, Gujarat, India (UTC +5:30)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Curtain Bottom Meta Bar */}
            <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-6 text-xs text-gray-5 sm:flex-col sm:items-start sm:gap-2">
              <span>© 2025 K’s visuals. All rights reserved.</span>
              <span className="font-mono text-gray-4">
                ENGINEERED FOR VELOCITY & MEASURABLE IMPACT
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

Navigation13.propTypes = {
  className: PropTypes.string,
};

export default Navigation13;
