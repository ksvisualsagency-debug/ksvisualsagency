import { clientLogosBase64 } from './client-logos-base64';

const esc = (t) =>
  String(t || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const createClientCardSvg = ({ name, category, initial, color, quote, role, logoBase64, isLightLogo }) => {
  const safeName = esc(name);
  const safeCategory = esc(category ? category.toUpperCase() : '');
  const safeInitial = esc(initial);
  const safeQuote = esc(quote);
  const safeRole = esc(role);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#141418" />
      <stop offset="100%" stop-color="#08080b" />
    </linearGradient>
    <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${color}" />
      <stop offset="100%" stop-color="#ee2b6c" />
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="32%" r="52%">
      <stop offset="0%" stop-color="${color}" stop-opacity="0.35" />
      <stop offset="100%" stop-color="${color}" stop-opacity="0" />
    </radialGradient>
  </defs>

  <rect width="600" height="600" rx="36" fill="url(#bgGrad)" stroke="#2e2e36" stroke-width="3" />
  <circle cx="300" cy="205" r="230" fill="url(#glow)" />

  <rect x="44" y="44" width="130" height="32" rx="16" fill="#1f1f26" stroke="#373742" stroke-width="1.5" />
  <text x="109" y="65" fill="${color}" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="700" letter-spacing="1.5" text-anchor="middle">CLIENT</text>

  <text x="556" y="65" fill="#757585" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="600" letter-spacing="1" text-anchor="end">K'S VISUALS</text>

  <!-- Center Company Logo Showcase Frame -->
  <g transform="translate(300, 205)">
    <rect x="-150" y="-85" width="300" height="170" rx="20" fill="${isLightLogo ? '#ffffff' : '#0a0a0e'}" stroke="#2e2e38" stroke-width="2" />
    <rect x="-150" y="-85" width="300" height="170" rx="20" fill="none" stroke="url(#accentGrad)" stroke-width="2.5" opacity="0.8" />
    ${
      logoBase64
        ? `<image href="${logoBase64}" x="-135" y="-72" width="270" height="144" preserveAspectRatio="xMidYMid meet" />`
        : `<circle r="56" fill="none" stroke="${color}" stroke-opacity="0.3" stroke-width="2" stroke-dasharray="6 6" />
           <text y="14" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="34" font-weight="900" letter-spacing="2" text-anchor="middle">${safeInitial}</text>`
    }
  </g>

  <text x="300" y="345" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="30" font-weight="700" letter-spacing="0.5" text-anchor="middle">${safeName}</text>
  <text x="300" y="380" fill="${color}" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="600" letter-spacing="1.5" text-anchor="middle">${safeCategory}</text>

  <rect x="56" y="430" width="488" height="110" rx="18" fill="#18181f" stroke="#2c2c36" stroke-width="1.5" />
  <text x="300" y="475" fill="#ffffff" fill-opacity="0.95" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="17" font-weight="500" font-style="italic" text-anchor="middle">“${safeQuote}”</text>
  <text x="300" y="508" fill="#9e9eb0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="500" text-anchor="middle">${safeRole}</text>
</svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

export const clientCarouselItems = [
  {
    name: 'DHANVINE JEWELS',
    person: 'DHANVINE JEWELS',
    role: 'Luxury Jewels',
    category: 'Digital Marketing & Growth',
    initial: 'DJ',
    quote: 'Accelerated digital brand growth',
    color: '#ec4899',
    logoBase64: clientLogosBase64.dhanvine,
    isLightLogo: false,
    testimonialQuote:
      'Targeted ad strategy and social media branding that expanded our customer reach nationwide.',
  },
  {
    name: 'GMK Gems & Jewels',
    person: 'YASH MANGUKIYA',
    role: 'Chairman, GMK Gems',
    category: 'Jewelry & Luxury Branding',
    initial: 'GMK',
    quote: 'Professional, creative & results-oriented',
    color: '#d4af37',
    logoBase64: clientLogosBase64.gmk,
    isLightLogo: false,
    testimonialQuote:
      'Professional, creative, and results-oriented. They delivered everything they promised and more. Highly recommend their services!',
  },
  {
    name: 'DIVINE Impex',
    person: 'DIVINE Impex',
    role: 'Client Partner',
    category: 'Exhibition Marketing & Brand Flyer',
    initial: 'DI',
    quote: 'Exceptional creative solutions',
    color: '#ee2b6c',
    logoBase64: clientLogosBase64.divine,
    isLightLogo: false,
    testimonialQuote:
      'Creative flyers and strategic exhibition marketing that positioned our brand at the center of attention.',
  },
  {
    name: 'JP Builders & Architecture',
    person: 'RAVI DHOLA',
    role: 'CEO, JP Builders',
    category: 'Logo & Architectural Brand Design',
    initial: 'JP',
    quote: 'Revenue increased by 250%',
    color: '#2b4bee',
    logoBase64: clientLogosBase64.jp,
    isLightLogo: true,
    testimonialQuote:
      'Working with ksvisuals Agency has been a game-changer for our business. Their strategic approach and creative solutions helped us increase our revenue by 250%.',
  },
  {
    name: 'NK The Health Hub',
    person: 'NK The Health Hub',
    role: 'Healthcare & Wellness',
    category: 'Complete Brand Design',
    initial: 'NK',
    quote: 'Standout brand transformation',
    color: '#00cc76',
    logoBase64: clientLogosBase64.nk,
    isLightLogo: false,
    testimonialQuote:
      'Complete brand design that gives our health hub a modern, trustworthy, and welcoming presence.',
  },
  {
    name: 'Shree Diamonds',
    person: 'Shree Diamonds',
    role: 'Diamonds & Fine Jewelry',
    category: 'Digital Marketing & PPC',
    initial: 'SD',
    quote: 'Targeted high-converting campaigns',
    color: '#8b5cf6',
    logoBase64: clientLogosBase64.shree,
    isLightLogo: false,
    testimonialQuote:
      'High-performing digital marketing campaigns tailored specifically to luxury diamond buyers.',
  },
  {
    name: 'GUNATIT ENTERPRISE',
    person: 'JAY PAVASIYA',
    role: 'Founder',
    category: 'CRM Software & Brand Identity',
    initial: 'GE',
    quote: 'Transformed our online presence',
    color: '#2b4bee',
    logoBase64: clientLogosBase64.gunatit,
    isLightLogo: false,
    testimonialQuote:
      "The team's expertise in digital marketing is unmatched. They transformed our online presence and helped us reach our target audience effectively.",
  },
].map((item) => ({
  ...item,
  src: createClientCardSvg(item),
  alt: `${item.name} - ${item.category}`,
  title: item.name,
  subtitle: item.role,
  client: item.person,
  position: item.role,
  quote: item.testimonialQuote,
}));
