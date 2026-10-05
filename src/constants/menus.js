import LINKS from 'constants/links';

export default {
  header: [
    {
      text: 'Home',
      to: LINKS.home,
    },
    {
      text: 'Services',
      to: LINKS.services,
      items: [
        {
          iconName: 'webDesign',
          text: 'Digital Marketing & Branding',
          description:
            'Boost your online presence and build a memorable brand that resonates with your audience.',
          linkText: 'Explore services',
          to: LINKS.services,
        },
        {
          iconName: 'webDevelopment',
          text: 'Campaigns & Analytics',
          description:
            'Email servicing, content strategy, PPC advertising, and actionable business insights.',
          linkText: 'Explore services',
          to: LINKS.services,
        },
      ],
    },
    {
      text: 'Portfolio',
      to: LINKS.portfolio,
    },
    {
      text: 'About',
      to: LINKS.about,
    },
    {
      text: 'Contact',
      to: LINKS.contact,
    },
  ],
  footer: [
    [
      { text: 'Home', to: LINKS.home },
      { text: 'Services', to: LINKS.services },
      { text: 'Portfolio', to: LINKS.portfolio },
      { text: 'About', to: LINKS.about },
      { text: 'FAQ', to: LINKS.faq },
      { text: 'Contact', to: LINKS.contact },
    ],
    [
      { text: 'Digital Marketing', to: LINKS.services },
      { text: 'Brand Identity', to: LINKS.services },
      { text: 'Email Servicing', to: LINKS.services },
      { text: 'Content Strategy', to: LINKS.services },
    ],
    [
      { text: 'Instagram: @ksvisuals.design', to: LINKS.instagram },
      { text: 'ksvisualsagency@gmail.com', to: LINKS.email },
      { text: '+91 8488080517', to: LINKS.phone1Tel },
    ],
  ],
  footerSm: [
    [
      { text: 'Home', to: LINKS.home },
      { text: 'Services', to: LINKS.services },
      { text: 'Portfolio', to: LINKS.portfolio },
      { text: 'About', to: LINKS.about },
    ],
    [
      { text: 'FAQ', to: LINKS.faq },
      { text: 'Contact', to: LINKS.contact },
      { text: 'Instagram', to: LINKS.instagram },
    ],
  ],
  mobile: [
    {
      text: 'Home',
      to: LINKS.home,
    },
    {
      text: 'Services',
      to: LINKS.services,
    },
    {
      text: 'Portfolio',
      to: LINKS.portfolio,
    },
    {
      text: 'About',
      to: LINKS.about,
    },
    {
      text: 'Founders',
      to: LINKS.founders,
    },
    {
      text: 'FAQ',
      to: LINKS.faq,
    },
    {
      text: 'Contact',
      to: LINKS.contact,
    },
  ],
};

