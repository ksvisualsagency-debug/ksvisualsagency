import clsx from 'clsx';
import { useAnimation, motion, animate } from 'framer-motion';
import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

const defaultItems = [
  {
    name: 'Projects Delivered',
    value: '15',
    suffix: '+',
    circleValue: 85,
  },
  {
    name: 'Client Satisfaction',
    value: '97',
    suffix: '%',
    circleValue: 97,
  },
  {
    name: 'Years Experience',
    value: '3',
    suffix: '+',
    circleValue: 75,
  },
];

const itemCircleVariants = {
  initial: { pathLength: 0 },
  animate: ({ value }) => ({
    pathLength: value / 100,
    transition: { duration: 2 },
  }),
};

const Value = ({ className, value, suffix }) => {
  const nodeRef = useRef();

  useEffect(() => {
    const node = nodeRef.current;

    const controls = animate(0, Number(value), {
      duration: 2,
      onUpdate(val) {
        node.textContent = `${val.toFixed()}${suffix || ''}`;
      },
    });

    return () => controls.stop();
  }, [value, suffix]);

  return <span className={className} ref={nodeRef} />;
};

Value.propTypes = {
  className: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  suffix: PropTypes.string,
};

Value.defaultProps = {
  suffix: '',
};

const Lighthouse = ({ title, items = defaultItems, className }) => {
  const [itemsWrapperRef, isItemsWrapperInView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const itemsWrapperControls = useAnimation();

  useEffect(() => {
    if (isItemsWrapperInView) itemsWrapperControls.start('animate');
  }, [isItemsWrapperInView, itemsWrapperControls]);

  return (
    <section className={clsx('safe-paddings mt-52 lg:mt-36 sm:mt-20', className)}>
      <div className="container">
        {title !== false && (
          <h2 className="with-text-highlight-red mx-auto max-w-[1008px] text-center text-6xl font-normal leading-snug lg:max-w-[782px] lg:text-[42px] md:text-4xl sm:text-2xl">
            {title || (
              <>
                Proven track record of <span>measurable results</span>
              </>
            )}
          </h2>
        )}
        <motion.ul
          className="mt-16 flex justify-center space-x-32 lg:mt-14 lg:space-x-24 md:mt-12 md:justify-around md:space-x-0 sm:mt-11 sm:flex-wrap sm:gap-y-8"
          initial="initial"
          animate={itemsWrapperControls}
          ref={itemsWrapperRef}
        >
          {items.map(({ name, value, suffix, circleValue }, index) => (
            <li
              className={clsx('sm:basis-1/2', index === 2 && 'sm:basis-full sm:mt-4')}
              key={index}
            >
              <div className="relative mx-auto h-36 w-36 lg:h-28 lg:w-28 md:h-24 md:w-24">
                <div
                  className="h-full w-full rounded-full border-[6px] border-green border-opacity-20 lg:border-[5px]"
                  aria-hidden
                />
                <svg
                  className="absolute top-1/2 left-1/2 h-full w-full"
                  width="144"
                  height="144"
                  viewBox="0 0 144 144"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ transform: 'scale(1, -1) rotate(-90deg) translate(-50%, -50%)' }}
                  aria-hidden
                >
                  <motion.path
                    className="stroke-green"
                    d="M3.49609 72.0001C3.49609 109.834 34.1664 140.504 72.0001 140.504C109.834 140.504 140.504 109.834 140.504 72.0001C140.504 34.1664 109.834 3.49609 72.0001 3.49609C34.1664 3.49609 3.49609 34.1664 3.49609 72.0001Z"
                    strokeWidth="6"
                    strokeLinecap="round"
                    custom={{ value: circleValue }}
                    variants={itemCircleVariants}
                  />
                </svg>
                {isItemsWrapperInView && (
                  <Value
                    className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-5xl font-normal lg:text-4xl md:text-3xl whitespace-nowrap"
                    value={value}
                    suffix={suffix}
                  />
                )}
              </div>
              <div className="mt-4 text-center text-lg font-normal sm:text-base">{name}</div>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
};

export default Lighthouse;
