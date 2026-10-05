import clsx from 'clsx';
import React, { useState, useEffect } from 'react';

import CircularCarousel from 'components/ui/CircularCarousel/CircularCarousel';
import QuoteIcon from 'images/quote.inline.svg';

// Company Logos
import dhanvineJewelsLogo from 'images/portfolio/dhanvine-jewels.png';
import gmkJewelsLogo from 'images/portfolio/gmk-jewels.png';
import divineImpexLogo from 'images/portfolio/divine-impex.png';
import jpArchitectureLogo from 'images/portfolio/jp-architecture.png';
import nkHealthHubLogo from 'images/portfolio/nk-health-hub.png';
import shreeDiamondsLogo from 'images/portfolio/shree-diamonds.png';
import gunatitEnterpriseLogo from 'images/portfolio/gunatit-enterprise.png';

import { clientCarouselItems } from './client-cards-data';

const clientLogosMap = {
  0: { logo: dhanvineJewelsLogo, isLightLogo: false },
  1: { logo: gmkJewelsLogo, isLightLogo: false },
  2: { logo: divineImpexLogo, isLightLogo: false },
  3: { logo: jpArchitectureLogo, isLightLogo: true },
  4: { logo: nkHealthHubLogo, isLightLogo: false },
  5: { logo: shreeDiamondsLogo, isLightLogo: false },
  6: { logo: gunatitEnterpriseLogo, isLightLogo: false },
};

const featuredTestimonials = [
  {
    quote:
      'Targeted ad strategy, luxury catalog design, and social media branding that expanded our customer reach nationwide and significantly scaled our revenue.',
    client: 'DHANVINE JEWELS',
    position: 'Luxury Jewels Label',
    initial: 'DJ',
    logo: dhanvineJewelsLogo,
    isLightLogo: false,
    index: 0,
  },
  {
    quote:
      'Professional, creative, and results-oriented. They delivered everything they promised and more. Highly recommend their services!',
    client: 'YASH MANGUKIYA',
    position: 'Chairman, GMK Gems & Jewels',
    initial: 'GMK',
    logo: gmkJewelsLogo,
    isLightLogo: false,
    index: 1,
  },
  {
    quote:
      'Working with ksvisuals Agency has been a game-changer for our business. Their strategic approach and creative solutions helped us increase our revenue by 250%.',
    client: 'RAVI DHOLA',
    position: 'CEO, JP Builders & Architecture',
    initial: 'JP',
    logo: jpArchitectureLogo,
    isLightLogo: true,
    index: 3,
  },
  {
    quote:
      "The team's expertise in digital marketing is unmatched. They transformed our online presence and helped us reach our target audience effectively.",
    client: 'JAY PAVASIYA',
    position: 'Founder, GUNATIT ENTERPRISE',
    initial: 'GE',
    logo: gunatitEnterpriseLogo,
    isLightLogo: false,
    index: 6,
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 767);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const activeItem = clientCarouselItems[activeIndex] || clientCarouselItems[0];
  const activeQuote = activeItem.quote || featuredTestimonials[0].quote;
  const activeClient = activeItem.client || featuredTestimonials[0].client;
  const activePosition = activeItem.position || featuredTestimonials[0].position;
  const activeInitial = activeItem.initial || featuredTestimonials[0].initial;

  // Real company logo for the active spotlight card
  const activeLogo = clientLogosMap[activeIndex]?.logo || dhanvineJewelsLogo;
  const activeIsLightLogo = clientLogosMap[activeIndex]?.isLightLogo || false;

  return (
    <section className="safe-paddings relative mt-28 overflow-hidden py-12 lg:mt-24 sm:mt-16" id="testimonials">
      <div className="container relative">
        <div className="max-w-[700px]">
          <h2 className="with-text-highlight-red text-4xl font-normal leading-snug lg:text-[32px] sm:text-2xl">
            What <span>Our Clients Say</span>
          </h2>
          <p className="mt-3 text-lg text-gray-7 text-black/70 dark:text-white/70 sm:text-base">
            Trusted by ambitious founders, innovators, and industry leaders
          </p>
        </div>


        {/* 3D Circular Carousel for Clients - Featuring Rotating Company Logos */}
        <div className="relative mt-12 h-[500px] w-full overflow-hidden rounded-3xl bg-[#09090b]/80 backdrop-blur-md border border-gray-4 dark:border-gray-8/80 shadow-2xl md:h-[440px] sm:h-[350px]">
          <CircularCarousel
            items={clientCarouselItems}
            preset="cylinder"
            cardWidth={isMobile ? 180 : 240}
            aspectRatio={1}
            gap={isMobile ? 18 : 26}
            curve={1}
            tilt={-5}
            autoplay="drift"
            speed={12}
            draggable
            snap
            pauseOnHover
            focusOnClick
            depthFade={0.65}
            fadeColor="#09090b"
            captions={false}
            onChange={(idx) => setActiveIndex(idx)}
            className="h-full w-full"
          />
          <div className="pointer-events-none absolute bottom-4 left-0 right-0 flex justify-center text-xs font-semibold uppercase tracking-widest text-white/40 sm:text-[10px]">
            Drag to rotate or click cards to focus
          </div>
        </div>

        {/* Active Client Spotlight Quote Card with Company Logo */}
        <div className="mt-10 rounded-2xl border border-gray-4 bg-gray-1 p-8 dark:border-gray-8 dark:bg-gray-9 lg:p-7 sm:p-5">
          <div className="flex items-start justify-between sm:flex-col sm:space-y-4">
            <div className="max-w-[820px]">
              <QuoteIcon className="h-8 w-8 text-red/80" aria-hidden />
              <p className="mt-4 text-xl font-normal leading-relaxed text-black/90 dark:text-white/90 lg:text-lg sm:text-base">
                "{activeQuote}"
              </p>
              <div className="mt-6 flex items-center space-x-4 border-t border-gray-4 pt-5 dark:border-gray-8">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-black border border-white/10 p-1.5 shadow-sm sm:h-12 sm:w-12">
                  {activeLogo ? (
                    <img
                      src={activeLogo}
                      alt={activeClient}
                      className={clsx('h-full w-full object-contain', activeIsLightLogo && 'bg-white p-1 rounded-md')}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center rounded-lg bg-red font-bold text-white text-sm">
                      {activeInitial}
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-base font-semibold leading-snug sm:text-sm">
                    {activeClient}
                  </h3>
                  <p className="text-sm text-gray-7 text-black/60 dark:text-white/60 sm:text-xs">
                    {activePosition}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick switcher buttons for key client testimonials */}
            <div className="ml-6 flex flex-col space-y-2 sm:ml-0 sm:mt-5 sm:flex-row sm:space-y-0 sm:gap-2 sm:overflow-x-auto sm:pb-1.5 no-scrollbar sm:w-full">
              {featuredTestimonials.map((t) => {
                const isSelected = activeClient === t.client;
                return (
                  <button
                    key={t.client}
                    type="button"
                    onClick={() => setActiveIndex(t.index)}
                    className={`shrink-0 rounded-lg px-3.5 py-2 text-xs font-semibold uppercase tracking-wider transition-colors duration-200 text-left ${
                      isSelected
                        ? 'bg-red text-white shadow-sm'
                        : 'border border-gray-4 bg-white text-black hover:border-red dark:border-gray-8 dark:bg-gray-9 dark:text-white dark:hover:border-red'
                    }`}
                  >
                    {t.initial} — {t.client.split(' ')[0]}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Featured Client Testimonial Cards with Official Company Logos */}
        <div className="mt-8 grid grid-cols-4 gap-6 lg:grid-cols-2 sm:grid-cols-1">
          {featuredTestimonials.map(({ quote, client, position, initial, logo, isLightLogo, index }) => (
            <div
              key={client}
              onClick={() => setActiveIndex(index)}
              className="flex cursor-pointer flex-col justify-between rounded-2xl border border-gray-4 bg-gray-1 p-6 transition-all duration-200 hover:border-red dark:border-gray-8 dark:bg-gray-9 sm:p-5"
            >
              <div>
                <QuoteIcon className="h-6 w-6 text-red/80" aria-hidden />
                <p className="mt-3 text-base leading-relaxed text-black/80 dark:text-white/80 sm:text-sm">
                  "{quote}"
                </p>
              </div>
              <div className="mt-6 flex items-center space-x-3.5 border-t border-gray-4 pt-4 dark:border-gray-8 sm:mt-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-black border border-white/10 p-1.5 shadow-sm">
                  {logo ? (
                    <img
                      src={logo}
                      alt={client}
                      className={clsx('h-full w-full object-contain', isLightLogo && 'bg-white p-1 rounded-md')}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center rounded-lg bg-red text-xs font-bold text-white">
                      {initial}
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="text-sm font-semibold leading-snug">{client}</h4>
                  <p className="text-xs text-gray-7 text-black/60 dark:text-white/60">
                    {position}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
