import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import Link from 'components/shared/link';
import LINKS from 'constants/links';
import logoWhiteSvg from 'images/logo-white.svg';
import sendFormEmail from 'utils/send-form-email';

/**
 * Footer8 component based on @reactbits-pro/footer-8 specification:
 * Maximal sitemap footer featuring:
 * - Capsule column labels (// NAVIGATION, // SERVICES, // RESOURCES, // CONNECT)
 * - Newsletter signup card with live state feedback
 * - Dark-themed social icon strip with glowing hover states
 * - Edge-to-edge colossal brand wordmark (K'S VISUALS)
 * - Real-time timezone and availability status badge
 * - Smooth Back-to-Top trigger
 */

const sitemapData = {
  navigation: [
    { text: 'Home', to: LINKS.home },
    { text: 'Services', to: LINKS.services },
    { text: 'Featured Portfolio', to: LINKS.portfolio },
    { text: 'Why Choose Us', to: LINKS.about },
    { text: 'Founders & Vision', to: LINKS.founders },
    { text: 'Client Testimonials', to: '#testimonials' },
    { text: 'Frequently Asked Questions', to: LINKS.faq },
    { text: 'Get In Touch', to: LINKS.contact },
  ],
  services: [
    { text: 'Digital Marketing & Growth', to: LINKS.services, badge: 'Popular' },
    { text: 'Corporate Brand Identity', to: LINKS.services },
    { text: 'Custom Enterprise CRM', to: LINKS.services, badge: 'Enterprise' },
    { text: 'Modern Web & App Development', to: LINKS.services },
    { text: 'International Exhibition Media', to: LINKS.services },
    { text: 'AI Workflows & Automations', to: LINKS.services },
  ],
  caseStudies: [
    { text: 'GUNATIT ENTERPRISE — CRM & Brand', to: LINKS.portfolio },
    { text: 'DIVINE Impex — Global Trade Show', to: LINKS.portfolio },
    { text: 'JP Architecture — Luxury Identity', to: LINKS.portfolio },
    { text: 'NK The Health Hub — Healthcare Ecosystem', to: LINKS.portfolio },
    { text: 'Shree Radhe — Dairy Branding', to: LINKS.portfolio },
    { text: 'Dhaval Marble — Architectural Collateral', to: LINKS.portfolio },
  ],
};

const socialLinks = [
  {
    name: 'Instagram',
    handle: '@ksvisuals.design',
    href: LINKS.instagram,
    color: '#ee2b6c',
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeWidth={1.8} />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" strokeWidth={1.8} />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth={2.2} strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'Email Dispatch',
    handle: LINKS.emailText,
    href: LINKS.email,
    color: '#2b4bee',
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    name: 'Direct Line',
    handle: '+91 8488080517',
    href: LINKS.phone1Tel,
    color: '#00cc76',
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
  {
    name: 'Studio Headquarters',
    handle: 'Surat, Gujarat, India',
    href: LINKS.contact,
    color: '#f59e0b',
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

const Footer8 = ({ className = '' }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setIsSubmitting(true);
      await sendFormEmail(
        {
          subscriberEmail: email,
          formType: 'Newsletter Subscription',
          source: 'Website Footer Newsletter Signup',
        },
        {
          subject: `New Newsletter Subscriber: ${email} - K’s visuals`,
        }
      );
      setIsSubmitting(false);
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 4000);
    }
  };

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer
      className={clsx(
        'relative overflow-hidden bg-[#07070b]/80 backdrop-blur-sm pt-20 pb-8 text-white border-t border-white/10 safe-paddings',
        className
      )}
    >
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute left-1/4 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-red/10 blur-[130px]" />
      <div className="pointer-events-none absolute right-1/4 top-20 h-96 w-96 translate-x-1/2 rounded-full bg-blue/10 blur-[140px]" />

      <div className="container relative z-10">
        {/* Top Header Grid: Brand Intro & Newsletter Signup Card */}
        <div className="grid grid-cols-12 gap-10 lg:gap-8 pb-16 border-b border-white/10 md:grid-cols-1">
          {/* Brand Intro & Positioning */}
          <div className="col-span-6 lg:col-span-5 md:col-span-1 flex flex-col justify-between">
            <div>
              <Link to={LINKS.home} className="inline-block transition-transform hover:scale-105">
                <span className="sr-only">K's visuals</span>
                <img
                  className="h-10 w-auto"
                  width={160}
                  height={40}
                  src={logoWhiteSvg}
                  loading="lazy"
                  alt="K's visuals"
                />
              </Link>

              <div className="mt-4 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-red animate-pulse" />
                <span className="font-mono text-xs font-bold tracking-widest text-red uppercase">
                  MARKETING & CREATIVE STUDIO
                </span>
              </div>

              <p className="mt-4 max-w-[440px] text-base leading-relaxed text-gray-4 md:text-sm">
                Engineering high-converting digital marketing, bespoke brand identities, custom
                CRM platforms, and global trade exhibition experiences that turn visitors into
                long-term clients.
              </p>

              {/* Status and Timezone Capsule */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-green/30 bg-green/10 px-3 py-1 text-xs font-semibold text-green shadow-[0_0_12px_rgba(0,204,118,0.2)]">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green" />
                  </span>
                  <span>ACCEPTING SELECT CLIENTS</span>
                </div>

                <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-mono text-gray-4">
                  <svg className="h-3.5 w-3.5 text-gray-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>SURAT, IN • UTC+5:30</span>
                </div>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="mt-8 flex items-center gap-8 border-t border-white/5 pt-6 lg:gap-6">
              <div>
                <span className="block font-mono text-2xl font-bold text-white">3+ Years</span>
                <span className="text-xs text-gray-5">Market Expertise</span>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div>
                <span className="block font-mono text-2xl font-bold text-red">15+</span>
                <span className="text-xs text-gray-5">Delivered Projects</span>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div>
                <span className="block font-mono text-2xl font-bold text-blue">99.4%</span>
                <span className="text-xs text-gray-5">Client Satisfaction</span>
              </div>
            </div>
          </div>

          {/* Newsletter Signup Card */}
          <div className="col-span-6 lg:col-span-7 md:col-span-1">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#141320] via-[#0d0c15] to-[#08070e] p-8 shadow-2xl backdrop-blur-xl sm:p-6">
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-red/15 blur-3xl" />
              <div className="pointer-events-none absolute -left-16 -bottom-16 h-48 w-48 rounded-full bg-blue/15 blur-3xl" />

              <div className="relative z-10">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-red/30 bg-red/10 px-3 py-0.5 text-xs font-semibold text-red">
                  <span className="h-1.5 w-1.5 rounded-full bg-red" />
                  THE GROWTH DISPATCH
                </span>

                <h3 className="mt-3 text-2xl font-semibold text-white sm:text-xl">
                  Stay ahead of modern marketing & technology.
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-4">
                  Actionable brand teardowns, CRM automation strategies, and high-converting marketing insights delivered to your inbox once a month. No spam, ever.
                </p>

                <form onSubmit={handleSubscribe} className="mt-6">
                  <div className="flex items-center gap-2 rounded-2xl border border-white/15 bg-white/[0.04] p-1.5 transition-all focus-within:border-red focus-within:shadow-[0_0_20px_rgba(238,43,108,0.25)] sm:flex-col sm:items-stretch sm:border-0 sm:bg-transparent sm:p-0">
                    <input
                      type="email"
                      required
                      placeholder="Enter your work email address..."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-transparent px-4 py-2.5 text-sm text-white placeholder-gray-5 outline-none sm:rounded-xl sm:border sm:border-white/15 sm:bg-white/[0.04]"
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red to-[#f43f5e] px-6 py-2.5 text-sm font-semibold text-white shadow-[0_0_20px_rgba(238,43,108,0.4)] transition-all hover:opacity-95 hover:shadow-[0_0_25px_rgba(238,43,108,0.6)] disabled:opacity-50 sm:w-full"
                    >
                      {isSubmitting ? (
                        <span>Sending...</span>
                      ) : subscribed ? (
                        <>
                          <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Subscribed!</span>
                        </>
                      ) : (
                        <>
                          <span>Subscribe</span>
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </>
                      )}
                    </button>
                  </div>
                </form>

                <p className="mt-3 text-[11px] text-gray-5 flex items-center gap-1.5">
                  <svg className="h-3.5 w-3.5 text-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span>100% Privacy. Instant one-click unsubscribe anytime.</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Section: Maximal Sitemap with Capsule Column Labels */}
        <div className="grid grid-cols-12 gap-8 py-16 border-b border-white/10 md:grid-cols-2 sm:grid-cols-1">
          {/* Column 1: Navigation */}
          <div className="col-span-4 lg:col-span-4 md:col-span-1">
            {/* Capsule Column Label */}
            <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-mono tracking-wider uppercase text-gray-3">
              <span className="h-1.5 w-1.5 rounded-full bg-red" />
              <span>// NAVIGATION</span>
            </div>

            <ul className="mt-6 space-y-3">
              {sitemapData.navigation.map(({ text, to }, idx) => (
                <li key={idx}>
                  <Link
                    to={to}
                    className="group inline-flex items-center gap-2 text-sm text-gray-4 transition-colors hover:text-white"
                  >
                    <span className="h-1 w-1 rounded-full bg-white/20 transition-all group-hover:w-2 group-hover:bg-red" />
                    <span>{text}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Services */}
          <div className="col-span-4 lg:col-span-4 md:col-span-1">
            {/* Capsule Column Label */}
            <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-mono tracking-wider uppercase text-gray-3">
              <span className="h-1.5 w-1.5 rounded-full bg-blue" />
              <span>// SERVICES & EXPERTISE</span>
            </div>

            <ul className="mt-6 space-y-3">
              {sitemapData.services.map(({ text, to, badge }, idx) => (
                <li key={idx}>
                  <Link
                    to={to}
                    className="group inline-flex items-center justify-between gap-2 text-sm text-gray-4 transition-colors hover:text-white"
                  >
                    <span className="inline-flex items-center gap-2">
                      <span className="h-1 w-1 rounded-full bg-white/20 transition-all group-hover:w-2 group-hover:bg-blue" />
                      <span>{text}</span>
                    </span>
                    {badge && (
                      <span className="rounded-md border border-red/30 bg-red/10 px-1.5 py-0.5 text-[10px] font-semibold text-red">
                        {badge}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Case Studies & Portfolio */}
          <div className="col-span-4 lg:col-span-4 md:col-span-1">
            {/* Capsule Column Label */}
            <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-mono tracking-wider uppercase text-gray-3">
              <span className="h-1.5 w-1.5 rounded-full bg-green" />
              <span>// CLIENT CASE STUDIES</span>
            </div>

            <ul className="mt-6 space-y-3">
              {sitemapData.caseStudies.map(({ text, to }, idx) => (
                <li key={idx}>
                  <Link
                    to={to}
                    className="group inline-flex items-center gap-2 text-sm text-gray-4 transition-colors hover:text-white"
                  >
                    <span className="h-1 w-1 rounded-full bg-white/20 transition-all group-hover:w-2 group-hover:bg-green" />
                    <span className="leading-snug">{text}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Dark-Themed Social Icon Strip */}
        <div className="py-12 border-b border-white/10">
          <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-mono tracking-wider uppercase text-gray-3">
              <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
              <span>// CONNECT & COLLABORATE</span>
            </div>

            <span className="text-xs text-gray-5 font-mono">
              DIRECT ACCESS • FAST RESPONSE
            </span>
          </div>

          <div className="grid grid-cols-4 gap-4 lg:grid-cols-2 sm:grid-cols-1">
            {socialLinks.map(({ name, handle, href, color, icon }) => (
              <a
                key={name}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group relative flex items-center gap-3.5 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-all duration-300 hover:border-white/30 hover:bg-white/[0.06] hover:shadow-[0_0_20px_rgba(255,255,255,0.06)]"
              >
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                  style={{
                    backgroundColor: `${color}15`,
                    color,
                    boxShadow: `0 0 15px ${color}20`,
                  }}
                >
                  {icon}
                </div>
                <div className="min-w-0 flex-1">
                  <span className="block text-xs text-gray-5 font-medium">{name}</span>
                  <span className="block truncate text-sm font-semibold text-white transition-colors group-hover:text-red">
                    {handle}
                  </span>
                </div>
                <svg
                  className="h-4 w-4 shrink-0 text-gray-6 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* EDGE-TO-EDGE BRAND WORDMARK */}
        <div className="relative pt-12 pb-4 text-center select-none overflow-hidden max-w-full">
          <h2
            className="font-black tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-white/20 via-white/[0.08] to-transparent pointer-events-none"
            style={{
              fontSize: 'clamp(2rem, 11vw, 12rem)',
              letterSpacing: '-0.04em',
            }}
          >
            K'S VISUALS
          </h2>
        </div>

        {/* Bottom Meta Row & Back-to-Top */}
        <div className="flex items-center justify-between gap-6 pt-6 border-t border-white/10 text-xs text-gray-5 flex-wrap sm:flex-col sm:items-start sm:gap-4">
          <div className="flex items-center gap-4 flex-wrap">
            <span>© 2025 K’s visuals. All rights reserved.</span>
            <span className="h-1 w-1 rounded-full bg-white/20 sm:hidden" />
            <span className="sm:hidden">Engineered for Velocity & Measurable Impact</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={scrollToTop}
              className="group inline-flex items-center gap-2 font-mono text-xs font-semibold text-gray-4 transition-colors hover:text-white"
            >
              <span>BACK TO TOP</span>
              <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/15 bg-white/5 transition-transform group-hover:-translate-y-0.5 group-hover:border-red group-hover:text-red">
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

Footer8.propTypes = {
  className: PropTypes.string,
};

export default Footer8;
