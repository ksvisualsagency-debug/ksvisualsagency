import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';

const faqs = [
  {
    question: 'What services do you offer?',
    answer:
      'Digital marketing, brand identity, email servicing, content strategy, analytics, and PPC.',
  },
  {
    question: 'How soon can we start?',
    answer: 'Most projects begin within 1-2 weeks after scope confirmation.',
  },
  {
    question: 'Do you work with startups?',
    answer: 'Yes engagements range from MVP branding to growth campaigns.',
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="safe-paddings relative mt-28 overflow-hidden py-12 lg:mt-24 sm:mt-16" id="faq">
      <div className="container relative z-10 max-w-[960px]">
        <div>
          <h2 className="with-text-highlight-red text-4xl font-normal leading-snug lg:text-[32px] sm:text-2xl">
            <span>FAQ</span>
          </h2>
          <p className="mt-3 text-lg text-gray-7 text-black/70 dark:text-white/70 sm:text-base">
            Answers to common questions
          </p>
        </div>

        <div className="mt-14 divide-y divide-gray-4 border-y border-gray-4 dark:divide-gray-8 dark:border-gray-8 lg:mt-12 sm:mt-8">
          {faqs.map(({ question, answer }, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={index} className="overflow-hidden">
                <button
                  type="button"
                  className="flex w-full items-center justify-between py-6 text-left text-2xl font-normal transition-colors duration-200 hover:text-red lg:text-xl sm:py-5 sm:text-lg"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                >
                  <span className="pr-6">{question}</span>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gray-4 text-black dark:border-gray-8 dark:text-white sm:h-7 sm:w-7">
                    <svg
                      className="h-3.5 w-3.5 transition-transform duration-300"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <line
                        x1="0"
                        y1="7"
                        x2="14"
                        y2="7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <line
                        x1="7"
                        y1="0"
                        x2="7"
                        y2="14"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        className={`transition-opacity duration-200 ${isOpen ? 'opacity-0' : 'opacity-100'}`}
                      />
                    </svg>
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 text-lg leading-relaxed text-black/70 dark:text-white/70 sm:pb-5 sm:text-base">
                        {answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
