const fs = require('fs');
const path = require('path');

const clientsDir = path.join(__dirname, '..', 'static', 'images', 'clients');
if (!fs.existsSync(clientsDir)) {
  fs.mkdirSync(clientsDir, { recursive: true });
}

const clients = [
  {
    id: 'jp-builders',
    name: 'JP Builders',
    person: 'RAVI DHOLA',
    role: 'CEO, JP Builders',
    category: 'Real Estate & Construction',
    initial: 'JP',
    quote: 'Revenue increased by 250%',
    color: '#ee2b6c',
  },
  {
    id: 'gunatit-enterprise',
    name: 'GUNATIT ENTERPRISE',
    person: 'JAY PAVASIYA',
    role: 'Founder',
    category: 'Logo & Brand Design',
    initial: 'GE',
    quote: 'Transformed our online presence',
    color: '#2b4bee',
  },
  {
    id: 'gmk-gems',
    name: 'GMK Gems',
    person: 'YASH MANGUKIYA',
    role: 'Chairman',
    category: 'Jewelry & Luxury',
    initial: 'GMK',
    quote: 'Professional, creative & results-oriented',
    color: '#00cc76',
  },
  {
    id: 'divine-impex',
    name: 'DIVINE Impex',
    person: 'DIVINE Impex',
    role: 'Client Partner',
    category: 'Exhibition Marketing Flyer',
    initial: 'DI',
    quote: 'Exceptional creative solutions',
    color: '#ee2b6c',
  },
  {
    id: 'jp-architecture',
    name: 'JP Architecture',
    person: 'JP Architecture',
    role: 'Architecture & Design',
    category: 'Logo & Brand Design',
    initial: 'JA',
    quote: 'Complete visual identity',
    color: '#2b4bee',
  },
  {
    id: 'nk-health-hub',
    name: 'NK The Health Hub',
    person: 'NK The Health Hub',
    role: 'Healthcare & Wellness',
    category: 'Complete Brand Design',
    initial: 'NK',
    quote: 'Standout brand transformation',
    color: '#00cc76',
  },
  {
    id: 'shree-diamonds',
    name: 'Shree Diamonds',
    person: 'Shree Diamonds',
    role: 'Diamonds & Fine Jewelry',
    category: 'Digital Marketing',
    initial: 'SD',
    quote: 'Targeted high-converting campaigns',
    color: '#ee2b6c',
  },
  {
    id: 'dhanvine-jewels',
    name: 'DHANVINE JEWELS',
    person: 'DHANVINE JEWELS',
    role: 'Luxury Jewels',
    category: 'Digital Marketing',
    initial: 'DJ',
    quote: 'Accelerated digital brand growth',
    color: '#2b4bee',
  },
];

clients.forEach((c) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#141416" />
      <stop offset="100%" stop-color="#0a0a0c" />
    </linearGradient>
    <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${c.color}" />
      <stop offset="100%" stop-color="#ee2b6c" />
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="30%" r="50%">
      <stop offset="0%" stop-color="${c.color}" stop-opacity="0.25" />
      <stop offset="100%" stop-color="${c.color}" stop-opacity="0" />
    </radialGradient>
  </defs>

  <rect width="600" height="600" rx="36" fill="url(#bgGrad)" stroke="#26262b" stroke-width="3" />
  <circle cx="300" cy="220" r="240" fill="url(#glow)" />

  <rect x="44" y="44" width="130" height="32" rx="16" fill="#1f1f24" stroke="#33333a" stroke-width="1.5" />
  <text x="109" y="65" fill="${c.color}" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="700" letter-spacing="1.5" text-anchor="middle">CLIENT</text>

  <text x="556" y="65" fill="#666672" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="600" letter-spacing="1" text-anchor="end">K'S VISUALS</text>

  <g transform="translate(300, 220)">
    <circle r="68" fill="#121215" stroke="url(#accentGrad)" stroke-width="4" />
    <circle r="56" fill="none" stroke="${c.color}" stroke-opacity="0.2" stroke-width="2" stroke-dasharray="6 6" />
    <text y="14" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="34" font-weight="900" letter-spacing="2" text-anchor="middle">${c.initial}</text>
  </g>

  <text x="300" y="360" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="30" font-weight="700" letter-spacing="0.5" text-anchor="middle">${c.name}</text>
  <text x="300" y="400" fill="${c.color}" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="600" letter-spacing="1.5" text-anchor="middle">${c.category.toUpperCase()}</text>

  <rect x="60" y="450" width="480" height="90" rx="18" fill="#18181d" stroke="#2a2a32" stroke-width="1.5" />
  <text x="300" y="492" fill="#ffffff" fill-opacity="0.9" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="17" font-weight="500" font-style="italic" text-anchor="middle">“${c.quote}”</text>
  <text x="300" y="520" fill="#888894" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="500" text-anchor="middle">${c.role}</text>
</svg>`;

  fs.writeFileSync(path.join(clientsDir, `${c.id}.svg`), svg, 'utf8');
});

console.log('Successfully generated 8 client cards in:', clientsDir);
