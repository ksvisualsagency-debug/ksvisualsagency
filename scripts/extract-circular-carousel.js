const fs = require('fs');
const path = require('path');

const contentMd = fs.readFileSync(
  'C:/Users/Krish/.gemini/antigravity-ide/brain/6c685130-3866-4e5b-a927-c6c578610813/.system_generated/steps/617/content.md',
  'utf8'
);
const jsonStart = contentMd.indexOf('{');
const jsonStr = contentMd.slice(jsonStart);
const data = JSON.parse(jsonStr);
const jsxFile = data.files.find((f) => f.path.endsWith('.jsx'));

let jsxContent = jsxFile.content;

// Add React import and safe useIsomorphicLayoutEffect for Gatsby SSR
jsxContent =
  "import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';\n" +
  "const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;\n" +
  jsxContent.replace(
    "import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';",
    ''
  );

// Replace all occurrences of useLayoutEffect with useIsomorphicLayoutEffect
jsxContent = jsxContent.split('useLayoutEffect(').join('useIsomorphicLayoutEffect(');

// Ensure window / ResizeObserver / IntersectionObserver checks are safe
const targetPath = path.join(
  __dirname,
  '..',
  'src',
  'components',
  'ui',
  'CircularCarousel',
  'CircularCarousel.jsx'
);

fs.writeFileSync(targetPath, jsxContent, 'utf8');
console.log('Successfully wrote clean CircularCarousel.jsx to:', targetPath);
