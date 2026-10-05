import clsx from 'clsx';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import React from 'react';
import { useInView } from 'react-intersection-observer';

import LINKS from 'constants/links';
import krishBodaraImg from 'images/founders/krish-bodara.jpg';
import krishSutariyaImg from 'images/founders/krish-sutariya.jpg';
import LinkedInIcon from 'images/linkedin.inline.svg';

/**
 * About6 component based on @reactbits-pro/about-6 specification:
 * Side-by-side founder profile cards:
 * 1. Krish Sutariya (Co-Founder & Creative Director)
 * 2. Krish Bodara (Co-Founder & Growth Lead)
 *
 * Fitted in a vertical portrait box (aspect-[4/5]) so both founders'
 * executive studio portraits, expressions, and posture are seen properly.
 */

const defaultFounders = [
  {
    name: 'Krish Sutariya',
    role: 'Co-Founder & Creative Director',
    badge: 'Co-Founder',
    image: krishSutariyaImg,
    linkedin: LINKS.krishSutariyaLinkedin || 'https://www.linkedin.com/in/krish-sutariya-a934573a0',
    linkedinHandle: 'linkedin.com/in/krish-sutariya-a934573a0',
    bio: 'Spearheads brand identity architecture, visual systems, trade exhibition media, and cutting-edge digital aesthetics that establish prestige and command market attention.',
    focus: 'Creative Direction & Brand Systems',
    location: 'Surat, Gujarat, India',
  },
  {
    name: 'Krish Bodara',
    role: 'Co-Founder & Growth Lead',
    badge: 'Co-Founder',
    image: krishBodaraImg,
    linkedin: LINKS.krishBodaraLinkedin || 'https://www.linkedin.com/in/krishbodara',
    linkedinHandle: 'linkedin.com/in/krishbodara',
    bio: 'Directs full-funnel marketing growth, strategic brand positioning, high-converting PPC funnels, and enterprise CRM software architecture that accelerates client revenue.',
    focus: 'Marketing Strategy & Growth Architecture',
    location: 'Surat, Gujarat, India',
  },
];

const About6 = ({
  badge = 'Leadership · K’s visuals',
  watermark = 'FOUNDERS',
  title = 'Meet the visionaries',
  titleHighlight = 'leading K’s visuals',
  description = 'Passionate marketing and creative strategists dedicated to transforming brands into market powerhouses through unified design and technical execution.',
  founders = defaultFounders,
  className = '',
}) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  return (
    <div ref={ref} className={clsx('relative', className)}>
      {/* Background Large Wordmark */}
      <div
        className="pointer-events-none absolute -top-12 left-0 -z-10 select-none font-black uppercase leading-none tracking-tighter text-white/[0.03] lg:-top-8 lg:text-[88px] md:-top-6 md:text-[68px] sm:-top-4 sm:text-[48px]"
        style={{ fontSize: 'clamp(3rem, 10vw, 8rem)' }}
        aria-hidden="true"
      >
        {watermark}
      </div>

      {/* Header Section */}
      <div className="relative z-10 max-w-[700px]">
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

      {/* Founder Profile Cards Grid - Side-by-Side 2-Column Architecture */}
      <div className="mt-10 grid grid-cols-2 gap-6 lg:gap-5 md:gap-4 sm:grid-cols-2 xs:grid-cols-1">
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
            location,
          } = founder;

          return (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: index * 0.12 }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#121214] p-5 shadow-xl transition-all duration-300 hover:border-white/25 hover:shadow-[0_16px_40px_rgba(0,0,0,0.6)] sm:p-4"
            >
              <div>
                {/* Executive Portrait Frame Box (aspect-[4/5] so portrait is seen properly) */}
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-[#18181c] border border-white/10 shadow-inner sm:aspect-[4/5]">
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

                  {/* Co-Founder Badge Pill */}
                  <span className="absolute top-3 right-3 rounded-full border border-white/20 bg-black/75 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-md">
                    {founderBadge}
                  </span>
                </div>

                {/* Founder Name & Role */}
                <div className="mt-4">
                  <h3 className="text-xl font-bold tracking-tight text-white lg:text-lg sm:text-base">
                    {name}
                  </h3>

                  <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-wider text-gray-4">
                    {role}
                  </p>

                  {/* Verified LinkedIn ID Handle */}
                  {linkedin && (
                    <div className="mt-2.5">
                      <a
                        href={linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-md border border-[#0077b5]/30 bg-[#0077b5]/10 px-2 py-0.5 text-[11px] font-medium text-[#0077b5] transition-all duration-200 hover:border-[#0077b5] hover:bg-[#0077b5]/20 hover:text-white"
                      >
                        <LinkedInIcon className="h-3 w-3 shrink-0" />
                        <span className="font-mono text-[10px] tracking-tight">
                          {linkedinHandle || linkedin.replace('https://www.', '').replace('https://', '')}
                        </span>
                      </a>
                    </div>
                  )}

                  {/* Bio */}
                  <p className="mt-3 text-xs leading-relaxed text-gray-3 line-clamp-3 sm:line-clamp-2">
                    {bio}
                  </p>

                  <div className="mt-2.5 flex items-center gap-2 text-[11px] text-gray-5 sm:hidden">
                    <span>📍 {location}</span>
                    <span>•</span>
                    <span className="text-gray-4 font-medium">{focus}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Action Row: VIEW PROFILE + Yellow Circular Arrow */}
              <div className="relative z-10 mt-5 flex items-center justify-between border-t border-white/10 pt-3.5 sm:mt-4 sm:pt-3">
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-bold uppercase tracking-wider text-white transition-colors duration-200 group-hover:text-yellow-400"
                >
                  VIEW PROFILE
                </a>

                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${name}'s profile on LinkedIn`}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f5b820] text-black shadow-md transition-all duration-300 group-hover:scale-110 group-hover:bg-[#fbbf24] sm:h-8 sm:w-8"
                >
                  <svg
                    className="h-3.5 w-3.5"
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

About6.propTypes = {
  badge: PropTypes.string,
  watermark: PropTypes.string,
  title: PropTypes.string,
  titleHighlight: PropTypes.string,
  description: PropTypes.string,
  founders: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
      badge: PropTypes.string.isRequired,
      image: PropTypes.string,
      linkedin: PropTypes.string,
      linkedinHandle: PropTypes.string,
      bio: PropTypes.string.isRequired,
      focus: PropTypes.string.isRequired,
      location: PropTypes.string,
    })
  ),
  className: PropTypes.string,
};

export default About6;
