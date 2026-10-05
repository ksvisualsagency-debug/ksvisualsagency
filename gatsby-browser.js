import './src/styles/main.css';

// eslint-disable-next-line import/prefer-default-export
export const onRouteUpdate = ({ location }) => {
  // TODO: Fix of gatsby-plugin-image bug, that prevents images from being displayed
  // It happens because gatsby does not trigger a function that sets to an element opacity: 1
  // Bug is very hard to reproduce, it happens only in production builds

  const mainImages = document.querySelectorAll('.gatsby-image-wrapper [data-main-image]');
  mainImages.forEach((mainImage) => {
    if (mainImage.complete) {
      mainImage.classList.add('loaded');
    } else {
      mainImage.addEventListener('load', () => {
        mainImage.classList.add('loaded');
      });
    }
  });

  if (process.env.NODE_ENV === 'production' && typeof window.plausible !== 'undefined') {
    window.plausible('pageview');
  }

  document.documentElement.classList.add('dark');
  if (typeof localStorage !== 'undefined') {
    localStorage.theme = 'dark';
  }
};
