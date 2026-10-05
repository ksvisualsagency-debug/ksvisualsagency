import { useRive, useStateMachineInput, Layout, Fit, Alignment } from '@rive-app/react-canvas';
import { useAnimation } from 'framer-motion';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import ImagePlaceholder from 'components/shared/image-placeholder';
import Link from 'components/shared/link';
import TitleAnimation from 'components/shared/title-animation';
import LINKS from 'constants/links';

import lgIllustration1 from './images/lg-illustration-1.svg';
import lgIllustration2 from './images/lg-illustration-2.svg';
import lgIllustration3 from './images/lg-illustration-3.svg';

const STATE_MACHINE_NAME = 'State Machine';
const INPUT_NAME = 'Fall Trigger';

const firstSectionTitleItems = [
  { value: 'Transform' },
  { value: 'Your' },
  { value: 'Brand', color: '#2b4bee' },
  { value: 'Into' },
  { value: 'a' },
  { value: 'Marketing' },
  { value: 'Powerhouse', color: '#ee2b6c' },
];

const secondSectionTitleItems = [
  { value: 'We' },
  { value: 'help' },
  { value: 'businesses', color: '#2b4bee' },
  { value: 'reach' },
  { value: 'their' },
  { value: 'full' },
  { value: 'potential', color: '#ee2b6c' },
];

const thirdSectionTitleItems = [
  { value: 'Through' },
  { value: 'innovative' },
  { value: 'marketing', color: '#2b4bee' },
  { value: 'strategies' },
  { value: '&' },
  { value: 'creative' },
  { value: 'solutions', color: '#ee2b6c' },
];

const Hero = () => {
  const [wrapperRef, isWrapperInView] = useInView({ triggerOnce: true });
  const [secondSectionRef, isSecondSectionInView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });
  const [thirdSectionRef, isThirdSectionInView] = useInView({ triggerOnce: true, threshold: 0.5 });

  const firstSectionTitleControls = useAnimation();
  const secondSectionTitleControls = useAnimation();
  const thirdSectionTitleControls = useAnimation();

  const { RiveComponent, rive } = useRive({
    src: '/animations/pages/home/hero.riv',
    autoplay: true,
    stateMachines: STATE_MACHINE_NAME,
    layout: new Layout({
      fit: Fit.FitWidth,
      alignment: Alignment.TopCenter,
    }),
  });

  const containerRef = useRef();
  const firstSectionRef = useRef();
  const [containerHeight, setContainerHeight] = useState(0);
  const [firstSectionHeight, setFirstSectionHeight] = useState(0);
  const [currentAnimState, setCurrentAnimState] = useState('');

  const fallState = useStateMachineInput(rive, STATE_MACHINE_NAME, INPUT_NAME);

  useLayoutEffect(() => {
    if (containerRef.current && firstSectionRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const firstSectionRect = firstSectionRef.current.getBoundingClientRect();
      setFirstSectionHeight(firstSectionRect.height);
      setContainerHeight(containerRect.height);
    }
  }, []);

  useEffect(() => {
    if (rive) {
      try {
        rive.play('State Machine');
      } catch (err) {
        // Safe catch if already playing
      }
    }
  }, [rive]);

  useEffect(() => {
    if (isWrapperInView) {
      firstSectionTitleControls.start('animate');
    }
  }, [isWrapperInView, firstSectionTitleControls]);

  useEffect(() => {
    if (isSecondSectionInView) {
      secondSectionTitleControls.start('animate');
    }
  }, [isSecondSectionInView, secondSectionTitleControls]);

  useEffect(() => {
    if (isThirdSectionInView) {
      thirdSectionTitleControls.start('animate');
    }
  }, [isThirdSectionInView, thirdSectionTitleControls]);

  useEffect(() => {
    // Add event listener to window scroll
    const handleScroll = () => {
      if (
        currentAnimState !== 'fall' &&
        rive &&
        window.scrollY > Math.max(firstSectionHeight - 600, 100)
      ) {
        window.rive = rive;
        setCurrentAnimState('fall');
        if (fallState && typeof fallState.fire === 'function') {
          fallState.fire();
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [containerHeight, rive, currentAnimState, firstSectionHeight, fallState]);

  return (
    <section
      className="safe-paddings overflow-hidden bg-transparent text-white md:py-36 sm:pt-28 sm:pb-20"
      ref={wrapperRef}
    >
      <div className="container grid-gap-x relative grid grid-cols-2 md:block" ref={containerRef}>
        <div className="relative z-10 text-6xl font-normal leading-snug lg:text-[42px] md:mx-auto md:text-4xl sm:text-2xl">
          <div className="flex h-screen items-center md:block md:h-auto" ref={firstSectionRef}>
            <div>
              <div className="flex items-center space-x-2.5 mb-5 text-sm font-semibold tracking-wider uppercase md:mb-4 sm:text-xs">
                <span className="text-red">K's visuals</span>
                <span className="text-white/40">/</span>
                <span className="text-white/70">MARKETING SOLUTIONS</span>
              </div>
              <TitleAnimation
                className="md:max-w-[574px]"
                tag="h1"
                items={firstSectionTitleItems}
                animationName="first"
                controls={firstSectionTitleControls}
              />
              <p className="mt-6 max-w-[520px] text-lg font-normal leading-relaxed text-white/80 md:mt-4 sm:mt-3 sm:text-base">
                We help businesses reach their full potential through innovative marketing strategies and creative solutions.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-6 md:mt-6 sm:mt-5 sm:gap-4">
                <Link to={LINKS.getStarted} size="base" theme="arrow-red" className="text-lg font-semibold sm:text-base">
                  Get Started
                </Link>
                <Link to={LINKS.portfolio} size="base" theme="underline-red" className="text-lg sm:text-base">
                  View Our Work
                </Link>
              </div>
            </div>
            <ImagePlaceholder
              className="mx-auto mt-11 hidden max-w-[468px] md:block sm:mt-8 sm:max-w-full"
              width={468}
              height={380}
              aria-hidden
            >
              <img
                className="remove-image-loading-visual w-full h-auto object-contain max-w-full"
                src={lgIllustration1}
                width={468}
                height={380}
                loading="lazy"
                alt="Hero Illustration"
              />
            </ImagePlaceholder>
          </div>
          <div
            className="flex items-center pt-[100px] pb-[500px] lg:pb-[400px] md:mt-36 md:block md:py-0 sm:mt-16"
            ref={secondSectionRef}
          >
            <TitleAnimation
              className="md:max-w-[530px]"
              tag="h2"
              items={secondSectionTitleItems}
              animationName="first"
              controls={secondSectionTitleControls}
            />
            <ImagePlaceholder
              className="mx-auto mt-11 hidden max-w-[590px] md:block sm:mt-8 sm:max-w-full"
              width={590}
              height={700}
              aria-hidden
            >
              <img
                className="remove-image-loading-visual w-full h-auto object-contain max-w-full"
                src={lgIllustration2}
                width={590}
                height={700}
                loading="lazy"
                alt="Hero Illustration"
              />
            </ImagePlaceholder>
          </div>
          <div
            className="flex items-center pt-[200px] pb-[80px] lg:pt-[150px] lg:pb-[60px] md:mt-36 md:block md:py-0 sm:mt-16"
            ref={thirdSectionRef}
          >
            <TitleAnimation
              className="md:max-w-[434px]"
              tag="h2"
              items={thirdSectionTitleItems}
              animationName="first"
              controls={thirdSectionTitleControls}
            />
            <ImagePlaceholder
              className="mx-auto mt-11 hidden max-w-[590px] md:block sm:mt-8 sm:max-w-full"
              width={590}
              height={766}
              aria-hidden
            >
              <img
                className="remove-image-loading-visual w-full h-auto object-contain max-w-full"
                src={lgIllustration3}
                width={590}
                height={766}
                loading="lazy"
                alt="Hero Illustration"
              />
            </ImagePlaceholder>
          </div>
        </div>
        <div className="md:hidden">
          <div className="absolute top-0 h-[3000px] w-[1100px] translate-y-[calc(-505px_-_480px_/_2_+_100vh_/_2)] translate-x-[-254px] lg:h-[2307px] lg:w-[846px] lg:translate-y-[calc(-388px_-_369px_/_2_+_100vh_/_2)] lg:translate-x-[-174px] md:hidden">
            <RiveComponent />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
