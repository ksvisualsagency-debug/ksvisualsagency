import { Alignment, Fit, Layout, useRive } from '@rive-app/react-canvas';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import ImagePlaceholder from 'components/shared/image-placeholder';
import Link from 'components/shared/link';
import LINKS from 'constants/links';
import sendFormEmail from 'utils/send-form-email';

const CTA = ({ className, withTopMargin }) => {
  const [wrapperRef, isWrapperInView] = useInView({ triggerOnce: true, rootMargin: '500px' });
  const [animationWrapperRef, isAnimationWrapperInView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { RiveComponent, rive } = useRive({
    src: '/animations/shared/cta-10-06-2022.riv',
    autoplay: false,
    layout: new Layout({
      fit: Fit.FitWidth,
      alignment: Alignment.Center,
    }),
  });

  useEffect(() => {
    if (isAnimationWrapperInView && rive) rive.play();
  }, [isAnimationWrapperInView, rive]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await sendFormEmail(
      {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        source: 'Consultation CTA Section',
      },
      {
        subject: `New Consultation Message from ${formData.name} (${formData.subject}) - K’s visuals`,
      }
    );
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <section
      className={clsx(
        'safe-paddings bg-black py-24 text-white lg:py-20 md:py-16 sm:py-12',
        withTopMargin && 'mt-28 lg:mt-24 md:mt-20 sm:mt-16',
        className
      )}
      id="contact"
      ref={wrapperRef}
    >
      <div className="container">
        <div className="grid grid-cols-12 gap-12 lg:gap-8 md:block">
          {/* Left Column: Heading, Supporting Text, Contact Details, Rive Animation */}
          <div className="col-span-5 md:col-span-full">
            <h2 className="text-6xl font-normal leading-snug lg:text-[42px] md:text-[32px] sm:text-2xl">
              Get In Touch
            </h2>
            <p className="mt-4 text-xl text-white/80 lg:text-lg sm:text-base">
              Ready to grow your business? Let's start a conversation.
            </p>

            <div className="mt-10 space-y-6 lg:mt-8 sm:mt-6 sm:space-y-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-red">
                  Email
                </span>
                <p className="mt-1">
                  <a
                    href="mailto:ksvisualsagency@gmail.com"
                    className="text-lg transition-colors hover:text-red sm:text-base"
                  >
                    ksvisualsagency@gmail.com
                  </a>
                </p>
              </div>

              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-red">
                  Instagram
                </span>
                <p className="mt-1">
                  <a
                    href="https://instagram.com/ksvisuals.design"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg transition-colors hover:text-red sm:text-base"
                  >
                    @ksvisuals.design
                  </a>
                </p>
              </div>

              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-red">
                  Phone
                </span>
                <p className="mt-1 flex flex-col space-y-1 text-lg sm:text-base">
                  <a href="tel:+918488080517" className="transition-colors hover:text-red">
                    +91 8488080517
                  </a>
                  <a href="tel:+917861926992" className="transition-colors hover:text-red">
                    +91 7861926992
                  </a>
                </p>
              </div>

              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-red">
                  Address
                </span>
                <p className="mt-1 text-lg text-white/90 sm:text-base">Surat, Gujarat, India</p>
              </div>
            </div>

            <div className="mt-10 max-w-[340px] md:hidden" ref={animationWrapperRef}>
              <ImagePlaceholder width={340} height={320}>
                {isWrapperInView && <RiveComponent width={340} height={320} />}
              </ImagePlaceholder>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="col-start-7 col-end-13 md:mt-12 md:col-span-full sm:mt-10">
            <div className="rounded-2xl border border-gray-8 bg-gray-9/60 p-8 sm:p-6">
              {isSubmitted ? (
                <div className="py-12 text-center">
                  <span className="text-4xl text-green">✓</span>
                  <h3 className="mt-4 text-2xl font-normal">Thank you!</h3>
                  <p className="mt-2 text-white/80">
                    Your message has been sent. We'll be in touch with you shortly.
                  </p>
                </div>
              ) : (
                <form className="space-y-6 sm:space-y-5" onSubmit={handleSubmit}>
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-semibold uppercase tracking-wider text-gray-5"
                    >
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      className="mt-2 w-full rounded-xl border border-gray-8 bg-gray-9 px-4 py-3.5 text-base text-white placeholder-gray-6 transition-colors duration-200 focus:border-red focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-semibold uppercase tracking-wider text-gray-5"
                    >
                      Your Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your Email"
                      className="mt-2 w-full rounded-xl border border-gray-8 bg-gray-9 px-4 py-3.5 text-base text-white placeholder-gray-6 transition-colors duration-200 focus:border-red focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-subject"
                      className="block text-xs font-semibold uppercase tracking-wider text-gray-5"
                    >
                      Subject
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Subject"
                      className="mt-2 w-full rounded-xl border border-gray-8 bg-gray-9 px-4 py-3.5 text-base text-white placeholder-gray-6 transition-colors duration-200 focus:border-red focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-semibold uppercase tracking-wider text-gray-5"
                    >
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Message"
                      className="mt-2 w-full resize-none rounded-xl border border-gray-8 bg-gray-9 px-4 py-3.5 text-base text-white placeholder-gray-6 transition-colors duration-200 focus:border-red focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex w-full items-center justify-center rounded-xl bg-red px-8 py-4 text-base font-semibold text-white transition-colors duration-200 hover:bg-[#d6205c] disabled:opacity-50"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

CTA.propTypes = {
  className: PropTypes.string,
  withTopMargin: PropTypes.bool,
};

CTA.defaultProps = {
  className: null,
  withTopMargin: false,
};

export default CTA;
