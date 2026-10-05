import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';

import Layout from 'components/shared/layout';
import Link from 'components/shared/link';
import SEO from 'components/shared/seo/seo';
import NeonReveal from 'components/ui/NeonReveal';
import LINKS from 'constants/links';
import SEO_DATA from 'constants/seo-data';
import sendFormEmail from 'utils/send-form-email';

const serviceOptions = [
  'Digital Marketing & PPC',
  'Brand Identity & Guidelines',
  'Custom Enterprise CRM',
  'Web & App Development',
  'Exhibition & Trade Media',
  'AI Workflows & Automations',
];

const budgetOptions = [
  '₹75,000 – ₹2,50,000 ($1k - $3k)',
  '₹2,50,000 – ₹7,50,000 ($3k - $10k)',
  '₹7,50,000+ ($10k+)',
  'Custom Retainer / Enterprise',
];

const timelineOptions = ['Immediate (< 2 weeks)', '1 to 2 Months', '3+ Months', 'Ongoing Partnership'];

const faqs = [
  {
    q: 'How fast can we kick off a project?',
    a: 'Following our initial discovery and proposal sign-off, we typically kick off sprint production within 3 to 5 business days.',
  },
  {
    q: 'Can we bundle multiple services together?',
    a: 'Yes. Most of our clients combine brand design with custom CRM software or web development and ongoing digital marketing funnels for maximum synergy.',
  },
  {
    q: 'Do you work with international clients?',
    a: 'Yes. We have delivered marketing collateral and software for international exhibitions and companies across multiple time zones.',
  },
  {
    q: 'Do you provide an NDA before project review?',
    a: 'Yes. We are happy to execute a bilateral Non-Disclosure Agreement (NDA) prior to reviewing proprietary business workflows or IP.',
  },
];

const ContactPage = () => {
  const [selectedServices, setSelectedServices] = useState(['Digital Marketing & PPC']);
  const [selectedBudget, setSelectedBudget] = useState(budgetOptions[0]);
  const [selectedTimeline, setSelectedTimeline] = useState(timelineOptions[0]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const toggleService = (service) => {
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    );
  };

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
        phone: formData.phone,
        company: formData.company || 'Not specified',
        services: selectedServices.join(', '),
        budget: selectedBudget,
        timeline: selectedTimeline,
        message: formData.message,
        formSource: 'Start a Project Page (/contact)',
      },
      {
        subject: `New Project Inquiry from ${formData.name} - K's visuals`,
      }
    );
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <Layout headerTheme="white">
      <div className="relative overflow-hidden bg-[#07070b] pt-36 pb-24 text-white safe-paddings lg:pt-28 md:pt-24 sm:pt-20">
        {/* Neon Reveal ambient glow backdrop */}
        <NeonReveal
          color="#ee2b6c"
          secondaryColor="#2b4bee"
          verticalOffset={-60}
          mirrored
          animateOnScroll
          intensity={1.0}
          glowSpread={1.3}
          followCursor
        />

        <div className="container relative z-10">
          {/* Breadcrumb / Category */}
          <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-gray-5 uppercase">
            <Link to={LINKS.home} className="hover:text-red transition-colors">
              HOME
            </Link>
            <span>/</span>
            <span className="text-red">START YOUR PROJECT</span>
          </div>

          {/* Page Hero Header */}
          <div className="mt-6 max-w-[820px]">
            <div className="inline-flex items-center gap-2 rounded-full border border-green/30 bg-green/10 px-3.5 py-1 text-xs font-semibold text-green shadow-[0_0_15px_rgba(0,204,118,0.2)]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green" />
              </span>
              <span>ACCEPTING SELECT CLIENTS • 2-4 HOUR RESPONSE</span>
            </div>

            <h1 className="mt-4 text-5xl font-semibold leading-tight text-white lg:text-4xl md:text-3xl sm:text-2xl">
              Let’s Build Something{' '}
              <span className="bg-gradient-to-r from-red via-[#f43f5e] to-blue bg-clip-text text-transparent">
                Extraordinary Together.
              </span>
            </h1>

            <p className="mt-4 text-xl leading-relaxed text-gray-4 lg:text-lg md:text-base">
              Ready to scale your brand with battle-tested digital marketing, bespoke brand
              identities, custom enterprise CRM software, or web applications? Fill out the brief
              below, or reach out to us directly.
            </p>
          </div>

          {/* Split Content Grid: Left Channels & Right Interactive Inquiry Form */}
          <div className="mt-16 grid grid-cols-12 gap-12 lg:gap-8 md:block md:space-y-12">
            {/* Left Column: Direct Channels, Roadmap & FAQs */}
            <div className="col-span-5 md:col-span-12 space-y-8">
              {/* Direct Communication Channels */}
              <div className="rounded-3xl border border-white/10 bg-[#0f0e18]/80 p-7 shadow-xl backdrop-blur-xl sm:p-5">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-red" />
                  <span className="font-mono text-xs font-bold tracking-widest text-red uppercase">
                    DIRECT CONTACT CHANNELS
                  </span>
                </div>

                <div className="mt-6 space-y-4">
                  {/* WhatsApp Quick Chat */}
                  <a
                    href="https://wa.me/918488080517?text=Hi%20K's%20visuals,%20I'm%20interested%20in%20starting%20a%20project!"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-all hover:border-green/50 hover:bg-green/[0.08]"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green/15 text-green shadow-[0_0_12px_rgba(0,204,118,0.25)]">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      </div>
                      <div>
                        <span className="block text-xs font-semibold text-gray-4">Instant Chat</span>
                        <span className="text-sm font-bold text-white group-hover:text-green transition-colors">
                          WhatsApp: +91 8488080517
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-green flex items-center gap-1">
                      <span>Chat</span>
                      <span>→</span>
                    </span>
                  </a>

                  {/* Email */}
                  <a
                    href={LINKS.email}
                    className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-all hover:border-blue/50 hover:bg-blue/[0.08]"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue/15 text-blue shadow-[0_0_12px_rgba(43,75,238,0.25)]">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <span className="block text-xs font-semibold text-gray-4">Email Dispatch</span>
                        <span className="text-sm font-bold text-white group-hover:text-blue transition-colors">
                          {LINKS.emailText}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-blue flex items-center gap-1">
                      <span>Write</span>
                      <span>→</span>
                    </span>
                  </a>

                  {/* Phone Call */}
                  <a
                    href={LINKS.phone1Tel}
                    className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-all hover:border-red/50 hover:bg-red/[0.08]"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red/15 text-red shadow-[0_0_12px_rgba(238,43,108,0.25)]">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <span className="block text-xs font-semibold text-gray-4">Direct Voice</span>
                        <span className="text-sm font-bold text-white group-hover:text-red transition-colors">
                          +91 8488080517 / +91 7861926992
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-red flex items-center gap-1">
                      <span>Call</span>
                      <span>→</span>
                    </span>
                  </a>

                  {/* Instagram */}
                  <a
                    href={LINKS.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-all hover:border-red/50 hover:bg-red/[0.08]"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red/15 text-red shadow-[0_0_12px_rgba(238,43,108,0.25)]">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeWidth={1.8} />
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" strokeWidth={1.8} />
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth={2.2} strokeLinecap="round" />
                        </svg>
                      </div>
                      <div>
                        <span className="block text-xs font-semibold text-gray-4">Instagram DM</span>
                        <span className="text-sm font-bold text-white group-hover:text-red transition-colors">
                          @ksvisuals.design
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-red flex items-center gap-1">
                      <span>Follow</span>
                      <span>→</span>
                    </span>
                  </a>
                </div>
              </div>

              {/* What to Expect Roadmap Card */}
              <div className="rounded-3xl border border-white/10 bg-[#0f0e18]/80 p-7 shadow-xl backdrop-blur-xl sm:p-5">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue" />
                  <span className="font-mono text-xs font-bold tracking-widest text-blue uppercase">
                    WHAT HAPPENS NEXT?
                  </span>
                </div>

                <div className="mt-5 space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue/20 font-mono text-xs font-bold text-blue">
                      1
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold text-white">Review & Research (2-4 hrs)</h4>
                      <p className="mt-0.5 text-xs text-gray-4">
                        We review your business goals, competitors, and project requirements.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red/20 font-mono text-xs font-bold text-red">
                      2
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold text-white">Discovery Call (30 mins)</h4>
                      <p className="mt-0.5 text-xs text-gray-4">
                        A focused consultation to define scope, tech stack, and deliverables.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green/20 font-mono text-xs font-bold text-green">
                      3
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold text-white">Blueprint & Sprint Kickoff</h4>
                      <p className="mt-0.5 text-xs text-gray-4">
                        You receive a fixed-cost proposal, sprint milestones, and launch timeline.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick FAQs */}
              <div className="rounded-3xl border border-white/10 bg-[#0f0e18]/80 p-7 shadow-xl backdrop-blur-xl sm:p-5">
                <div className="flex items-center gap-2 mb-4">
                  <span className="h-1.5 w-1.5 rounded-full bg-yellow-400" />
                  <span className="font-mono text-xs font-bold tracking-widest text-yellow-400 uppercase">
                    FREQUENTLY ASKED
                  </span>
                </div>

                <div className="space-y-4">
                  {faqs.map(({ q, a }, idx) => (
                    <div key={idx} className="border-b border-white/5 pb-3 last:border-0 last:pb-0">
                      <h5 className="text-xs font-semibold text-white">{q}</h5>
                      <p className="mt-1 text-[11px] leading-relaxed text-gray-4">{a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: High-Converting Project Inquiry Form */}
            <div className="col-span-7 md:col-span-12">
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0f0e18]/90 p-8 shadow-2xl backdrop-blur-2xl sm:p-6">
                {/* Background ambient lighting */}
                <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-red/15 blur-3xl" />
                <div className="pointer-events-none absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-blue/15 blur-3xl" />

                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="py-16 text-center"
                    >
                      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border border-green/40 bg-green/10 text-green shadow-[0_0_30px_rgba(0,204,118,0.3)]">
                        <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>

                      <h3 className="mt-6 text-3xl font-bold text-white sm:text-2xl">
                        Inquiry Received!
                      </h3>
                      <p className="mt-3 max-w-[480px] mx-auto text-base text-gray-3 leading-relaxed">
                        Thank you, <strong className="text-white">{formData.name || 'there'}</strong>!
                        Krish and the K’s visuals team have received your project details. We will
                        reach out to <span className="text-red font-medium">{formData.email}</span>{' '}
                        within 2 to 4 business hours.
                      </p>

                      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                        <a
                          href={`https://wa.me/918488080517?text=Hi%20K's%20visuals,%20I%20just%20submitted%20a%20project%20inquiry%20for%20${encodeURIComponent(formData.name)}!`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-xl bg-green px-6 py-3 text-sm font-semibold text-black shadow-[0_0_20px_rgba(0,204,118,0.3)] transition-all hover:bg-green/90"
                        >
                          <span>Chat on WhatsApp Now</span>
                          <span>→</span>
                        </a>

                        <button
                          type="button"
                          onClick={() => setIsSubmitted(false)}
                          className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                        >
                          Submit Another Project
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
                      <div>
                        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-red">
                          STEP 01
                        </span>
                        <h3 className="mt-1 text-xl font-semibold text-white sm:text-lg">
                          Which services does your project need?
                        </h3>
                        <p className="mt-1 text-xs text-gray-4">
                          Select all that apply to help us tailor our team:
                        </p>

                        <div className="mt-4 flex flex-wrap gap-2.5">
                          {serviceOptions.map((service) => {
                            const isSelected = selectedServices.includes(service);
                            return (
                              <button
                                key={service}
                                type="button"
                                onClick={() => toggleService(service)}
                                className={clsx(
                                  'rounded-xl border px-3.5 py-2 text-xs font-medium transition-all duration-200',
                                  isSelected
                                    ? 'border-red/80 bg-red/15 text-white shadow-[0_0_15px_rgba(238,43,108,0.25)]'
                                    : 'border-white/10 bg-white/[0.03] text-gray-4 hover:border-white/20 hover:text-white'
                                )}
                              >
                                {isSelected ? '✓ ' : '+ '}
                                {service}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Step 2: Budget */}
                      <div>
                        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-blue">
                          STEP 02
                        </span>
                        <h3 className="mt-1 text-xl font-semibold text-white sm:text-lg">
                          Estimated Investment Budget
                        </h3>
                        <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-1">
                          {budgetOptions.map((budget) => {
                            const isSelected = selectedBudget === budget;
                            return (
                              <button
                                key={budget}
                                type="button"
                                onClick={() => setSelectedBudget(budget)}
                                className={clsx(
                                  'rounded-xl border p-3 text-left text-xs font-medium transition-all duration-200',
                                  isSelected
                                    ? 'border-blue/80 bg-blue/15 text-white shadow-[0_0_15px_rgba(43,75,238,0.25)]'
                                    : 'border-white/10 bg-white/[0.03] text-gray-4 hover:border-white/20 hover:text-white'
                                )}
                              >
                                <span className="block text-xs font-bold">{budget}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Step 3: Timeline */}
                      <div>
                        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-green">
                          STEP 03
                        </span>
                        <h3 className="mt-1 text-xl font-semibold text-white sm:text-lg">
                          Estimated Kickoff & Launch Timeline
                        </h3>
                        <div className="mt-4 flex flex-wrap gap-2.5">
                          {timelineOptions.map((timeline) => {
                            const isSelected = selectedTimeline === timeline;
                            return (
                              <button
                                key={timeline}
                                type="button"
                                onClick={() => setSelectedTimeline(timeline)}
                                className={clsx(
                                  'rounded-xl border px-3.5 py-2 text-xs font-medium transition-all duration-200',
                                  isSelected
                                    ? 'border-green/80 bg-green/15 text-white shadow-[0_0_15px_rgba(0,204,118,0.25)]'
                                    : 'border-white/10 bg-white/[0.03] text-gray-4 hover:border-white/20 hover:text-white'
                                )}
                              >
                                {timeline}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Step 4: Contact & Project Details */}
                      <div>
                        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-purple-400">
                          STEP 04
                        </span>
                        <h3 className="mt-1 text-xl font-semibold text-white sm:text-lg">
                          Your Information & Project Brief
                        </h3>

                        <div className="mt-4 space-y-4">
                          <div className="grid grid-cols-2 gap-4 sm:grid-cols-1">
                            <div>
                              <label className="block text-xs font-medium text-gray-4 mb-1">
                                Your Full Name *
                              </label>
                              <input
                                type="text"
                                required
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="e.g. John Doe"
                                className="w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-gray-6 outline-none transition-all focus:border-red focus:shadow-[0_0_15px_rgba(238,43,108,0.25)]"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-4 mb-1">
                                Work Email Address *
                              </label>
                              <input
                                type="email"
                                required
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="name@company.com"
                                className="w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-gray-6 outline-none transition-all focus:border-red focus:shadow-[0_0_15px_rgba(238,43,108,0.25)]"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4 sm:grid-cols-1">
                            <div>
                              <label className="block text-xs font-medium text-gray-4 mb-1">
                                Phone / WhatsApp Number *
                              </label>
                              <input
                                type="tel"
                                required
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="+91 98765 43210"
                                className="w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-gray-6 outline-none transition-all focus:border-red focus:shadow-[0_0_15px_rgba(238,43,108,0.25)]"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-4 mb-1">
                                Company / Brand Name
                              </label>
                              <input
                                type="text"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                placeholder="e.g. Acme Enterprise"
                                className="w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-gray-6 outline-none transition-all focus:border-red focus:shadow-[0_0_15px_rgba(238,43,108,0.25)]"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-gray-4 mb-1">
                              Project Details & Key Objectives *
                            </label>
                            <textarea
                              required
                              name="message"
                              rows={4}
                              value={formData.message}
                              onChange={handleChange}
                              placeholder="Tell us about what you want to build, current challenges, target audience, or specific requirements..."
                              className="w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-gray-6 outline-none transition-all focus:border-red focus:shadow-[0_0_15px_rgba(238,43,108,0.25)]"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Action Button */}
                      <div>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full rounded-2xl bg-gradient-to-r from-red via-[#f43f5e] to-blue py-4 text-base font-bold text-white shadow-[0_0_25px_rgba(238,43,108,0.4)] transition-all hover:opacity-95 hover:shadow-[0_0_35px_rgba(238,43,108,0.6)] disabled:opacity-50"
                        >
                          {isSubmitting ? (
                            <span className="flex items-center justify-center gap-2">
                              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                              <span>Submitting Project Brief...</span>
                            </span>
                          ) : (
                            <span className="flex items-center justify-center gap-2">
                              <span>Submit Project Inquiry</span>
                              <span>→</span>
                            </span>
                          )}
                        </button>

                        <div className="mt-3 flex items-center justify-between text-[11px] text-gray-5 sm:flex-col sm:gap-1 sm:text-center">
                          <span className="flex items-center gap-1.5">
                            <svg className="h-3.5 w-3.5 text-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>100% Confidentiality & Bilateral NDA Guarantee</span>
                          </span>
                          <span>Typically answered within 2–4 hours</span>
                        </div>
                      </div>
                    </form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;

export const Head = () => <SEO {...SEO_DATA.contact} />;
