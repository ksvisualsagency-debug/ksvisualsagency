export default {
  home: {
    title: 'K’s visuals — Premium Marketing & Creative Solutions',
    description:
      'K’s visuals helps businesses grow through digital marketing, brand identity, content strategy, PPC advertising and creative marketing solutions.',
  },
  servicesWebDesign: {
    title: 'Brand & Marketing Solutions — K’s visuals',
    description:
      'Boost your online presence with SEO, SEM, and social media marketing strategies that drive results.',
  },
  servicesWebDevelopment: {
    title: 'Digital & Growth Solutions — K’s visuals',
    description:
      'Email servicing, analytics, and targeted PPC campaigns delivering measurable business growth.',
  },
  about: {
    title: 'Why Choose Us — K’s visuals',
    description:
      'With over 3+ years of experience in marketing, we help businesses achieve their goals through innovative strategies.',
  },
  contact: {
    title: 'Start a Project & Get In Touch — K’s visuals',
    description:
      'Ready to accelerate your business? Contact K’s visuals for digital marketing, bespoke brand identities, custom CRM software, and web development.',
  },
  blog: {
    title: 'Insights & Resources — K’s visuals',
    description:
      'Marketing strategies, brand identity tips, and actionable business insights from K’s visuals.',
  },
  blogPost: ({ title, description, ogImage }) => ({
    title: `${title} — K’s visuals`,
    description,
    ogImage,
  }),
  caseStudies: {
    title: 'Our Portfolio — K’s visuals',
    description: 'See how we have helped brands achieve remarkable growth.',
  },
  caseStudy: ({ title, description }) => ({
    title: `${title} — K’s visuals`,
    description,
  }),
};
