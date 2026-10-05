import clsx from 'clsx';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';

import LINKS from 'constants/links';
import krishBodaraImg from 'images/founders/krish-bodara.jpg';
import krishSutariyaImg from 'images/founders/krish-sutariya.jpg';
import LinkedInIcon from 'images/linkedin.inline.svg';

/**
 * About7 component based on @reactbits-pro/about-7 specification:
 * Executive Leadership & Team block featuring:
 * - Left: Krish Bodara (Co-Founder & Growth Lead)
 * - Right: Krish Sutariya (Co-Founder & Creative Director)
 * - Matched seamless dark charcoal studio backgrounds on both portraits
 * - Executive portrait framing boxes (aspect-[4/5]) ensuring faces, suits, and ties are seen properly
 * - Verified LinkedIn ID handle pills
 * - Key leadership focus metrics tags
 * - Interactive footer with "VIEW PROFILE" and yellow action button
 */

const defaultFounders = [
  {
    id: 'krish-bodara',
    name: 'Krish Bodara',
    role: 'Co-Founder & Growth Lead',
    badge: 'Co-Founder',
    image: krishBodaraImg,
    linkedin: LINKS.krishBodaraLinkedin || 'https://www.linkedin.com/in/krishbodara',
    linkedinHandle: 'linkedin.com/in/krishbodara',
    bio: 'Directs full-funnel marketing growth, strategic brand positioning, high-converting PPC funnels, and enterprise CRM software architecture that accelerates client revenue.',
    focus: 'Growth Architecture & Marketing Strategy',
    metrics: ['3+ Yrs Strategy', '15+ Launches', 'CRM & PPC Systems'],
    location: 'Surat, Gujarat, India',
    accent: '#ee2b6c',
  },
  {
    id: 'krish-sutariya',
    name: 'Krish Sutariya',
    role: 'Co-Founder & Creative Director',
    badge: 'Co-Founder',
    image: krishSutariyaImg,
    linkedin: LINKS.krishSutariyaLinkedin || 'https://www.linkedin.com/in/krish-sutariya-a934573a0',
    linkedinHandle: 'linkedin.com/in/krish-sutariya-a934573a0',
    bio: 'Spearheads brand identity architecture, visual systems, trade exhibition media, and cutting-edge digital aesthetics that establish prestige and command market attention.',
    focus: 'Brand Identity & Creative Direction',
    metrics: ['Brand Systems', 'Visual Direction', 'Exhibition Media'],
    location: 'Surat, Gujarat, India',
    accent: '#2b4bee',
  },
];

const About7 = ({
  badge = 'Leadership · K’s visuals',
  watermark = 'FOUNDERS',
  title = 'Meet the visionaries',
  titleHighlight = 'leading K’s visuals',
  description = 'Passionate marketing and creative strategists dedicated to transforming brands into market powerhouses through unified design and technical execution.',
  founders = defaultFounders,
  className = '',
}) => {
  const [activeTab, setActiveTab] = useState('all');
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  return (
    <div ref={ref} className={clsx('relative', className)}>
      {/* Background Large Wordmark with luminous gradient & mirror sheen */}
      <div
        className="pointer-events-none absolute -top-14 left-0 -z-10 select-none font-black uppercase leading-none tracking-tighter bg-gradient-to-b from-white/25 via-white/10 to-transparent bg-clip-text text-transparent lg:-top-10 lg:text-[88px] md:-top-6 md:text-[68px] sm:-top-4 sm:text-[38px] max-w-full overflow-hidden"
        style={{ fontSize: 'clamp(2.5rem, 10vw, 8.5rem)' }}
        aria-hidden="true"
      >
        {watermark}
      </div>

      {/* Ambient background illumination pools */}
      <div className="pointer-events-none absolute -top-12 left-1/4 -z-10 h-80 w-80 -translate-x-1/2 rounded-full bg-red/20 blur-[130px] sm:hidden" />
      <div className="pointer-events-none absolute top-10 right-1/4 -z-10 h-80 w-80 translate-x-1/2 rounded-full bg-blue/20 blur-[130px] sm:hidden" />

      {/* Header Section */}
      <div className="relative z-10 flex flex-col justify-between md:flex-col gap-6">
        <div className="max-w-[720px]">
          <div className="inline-flex items-center gap-2 rounded-full border border-red/30 bg-red/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-red">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red" />
            </span>
            <span>{badge}</span>
          </div>

          <h2 className="mt-3.5 text-3xl font-semibold leading-snug text-white lg:text-2xl sm:text-xl">
            {title}{' '}
            <span className="bg-gradient-to-r from-red via-[#f43f5e] to-blue bg-clip-text text-transparent">
              {titleHighlight}
            </span>
          </h2>

          <p className="mt-2.5 text-base leading-relaxed text-gray-4 md:text-sm">{description}</p>
        </div>
      </div>

      {/* Founder Profile Cards Grid: Stack to 1 column on mobile (<768px) */}
      <div className="mt-10 grid grid-cols-2 gap-8 lg:gap-6 md:gap-5 sm:grid-cols-1">
        {founders.map((founder, index) => {
          const {
            name,
            role,
            badge: founderBadge,
            image,
            linkedin,
            linkedinHandle,
            bio,
            focus,
            metrics,
            location,
            accent,
          } = founder;

          return (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/15 bg-[#14141c]/90 backdrop-blur-xl p-6 shadow-2xl transition-all duration-300 hover:border-red/40 hover:bg-[#181826]/95 hover:shadow-[0_20px_60px_rgba(238,43,108,0.25)] sm:p-4"
            >
              {/* Glass mirror top edge specular highlight line */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/35 to-transparent" />

              {/* Subtle background ambient corner glow */}
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full blur-3xl opacity-30 transition-opacity duration-300 group-hover:opacity-50"
                style={{ backgroundColor: accent }}
              />

              <div>
                {/* Executive Box Framing with aspect-[4/5] so portrait, suit & tie are seen properly */}
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-[#16161b] border border-white/10 shadow-inner sm:aspect-[4/5]">
                  {image ? (
                    <img
                      src={image}
                      alt={name}
                      className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#1a1926] to-[#0d0c14] text-3xl font-extrabold text-white">
                      {name.split(' ').map((n) => n[0]).join('')}
                    </div>
                  )}

                  {/* Co-Founder Badge Capsule */}
                  <span className="absolute top-3.5 right-3.5 rounded-full border border-white/20 bg-black/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur-md">
                    {founderBadge}
                  </span>
                </div>

                {/* Founder Info */}
                <div className="mt-5">
                  <h3 className="text-2xl font-bold tracking-tight text-white lg:text-xl sm:text-lg">
                    {name}
                  </h3>

                  <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-red">
                    {role}
                  </p>

                  {/* Verified LinkedIn ID Handle */}
                  {linkedin && (
                    <div className="mt-3">
                      <a
                        href={linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-[#0077b5]/30 bg-[#0077b5]/10 px-2.5 py-1 text-xs font-medium text-[#0077b5] transition-all duration-200 hover:border-[#0077b5] hover:bg-[#0077b5]/20 hover:text-white"
                      >
                        <LinkedInIcon className="h-3.5 w-3.5 shrink-0" />
                        <span className="font-mono text-[11px] tracking-tight">
                          {linkedinHandle || linkedin.replace('https://www.', '').replace('https://', '')}
                        </span>
                      </a>
                    </div>
                  )}

                  {/* Executive Bio */}
                  <p className="mt-3.5 text-sm leading-relaxed text-gray-3 sm:text-xs">
                    {bio}
                  </p>

                  {/* Focus & Metrics Badges (About-7 feature) */}
                  {metrics && metrics.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {metrics.map((m, i) => (
                        <span
                          key={i}
                          className="rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] font-medium text-gray-4 transition-colors group-hover:border-white/20"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-3 flex items-center gap-2 text-xs text-gray-5 sm:hidden">
                    <span>📍 {location}</span>
                    <span>•</span>
                    <span className="text-gray-4 font-medium">{focus}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Action Row: VIEW PROFILE + Yellow Circular Arrow */}
              <div className="relative z-10 mt-6 flex items-center justify-between border-t border-white/10 pt-4 sm:mt-5 sm:pt-3">
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold uppercase tracking-wider text-white transition-colors duration-200 group-hover:text-yellow-400"
                >
                  VIEW PROFILE
                </a>

                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${name}'s profile on LinkedIn`}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f5b820] text-black shadow-md transition-all duration-300 group-hover:scale-110 group-hover:bg-[#fbbf24] sm:h-9 sm:w-9"
                >
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

About7.propTypes = {
  badge: PropTypes.string,
  watermark: PropTypes.string,
  title: PropTypes.string,
  titleHighlight: PropTypes.string,
  description: PropTypes.string,
  founders: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
      badge: PropTypes.string.isRequired,
      image: PropTypes.string,
      linkedin: PropTypes.string,
      linkedinHandle: PropTypes.string,
      bio: PropTypes.string.isRequired,
      focus: PropTypes.string.isRequired,
      metrics: PropTypes.arrayOf(PropTypes.string),
      location: PropTypes.string,
      accent: PropTypes.string,
    })
  ),
  className: PropTypes.string,
};

export default About7;
