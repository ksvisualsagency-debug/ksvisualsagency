import React from 'react';

import About from 'components/pages/home/about/about';
import FAQ from 'components/pages/home/faq/faq';
import Features from 'components/pages/home/features';
import Founders from 'components/pages/home/founders/founders';
import Hero from 'components/pages/home/hero';
import Testimonials from 'components/pages/home/testimonials/testimonials';
import Workflow from 'components/pages/home/workflow';
import Stats15 from 'components/ui/Stats15/Stats15';
import CaseStudies from 'components/shared/case-studies';
import Layout from 'components/shared/layout';
import SEO from 'components/shared/seo/seo';

const HomePage = () => (
  <Layout headerTheme="white">
    <Hero />
    <div className="relative z-10">
      <Stats15 />
      <Features />
      <CaseStudies />
      <About />
      <Workflow />
      <Founders />
      <Testimonials />
      <FAQ />
    </div>
  </Layout>
);

export default HomePage;

export const Head = () => <SEO />;
