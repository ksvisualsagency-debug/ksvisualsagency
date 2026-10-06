import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';

import Footer from 'components/shared/footer';
import Header from 'components/shared/header';
import MobileMenu from 'components/shared/mobile-menu';
import DotField from 'components/ui/DotField';

const Layout = ({ headerClassName, headerTheme, headerShowThemeButton, children }) => {
  const headerRef = useRef(null);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileMenuOutsideClick = () => {
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
  };

  const handleHeaderBurgerClick = () => {
    setIsMobileMenuOpen((isMobileMenuOpen) => !isMobileMenuOpen);
  };

  useEffect(() => {
    document.documentElement.classList.add('dark');
    if (typeof localStorage !== 'undefined') {
      localStorage.theme = 'dark';
    }
    document.documentElement.style.setProperty('--real-browser-height', `${window.innerHeight}px`);
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col bg-[#07070b] overflow-x-hidden">
      {/* Global Interactive DotField Mesh across all sections */}
      <div
        className="pointer-events-none fixed inset-0 z-0 h-screen w-screen overflow-hidden"
        aria-hidden="true"
      >
        <DotField
          dotRadius={1.1}
          dotSpacing={18}
          dotColor="rgba(140, 145, 160, 0.32)"
          gradientFrom="rgba(140, 145, 160, 0.32)"
          gradientTo="rgba(140, 145, 160, 0.32)"
          glowColor="rgba(140, 145, 160, 0.12)"
          cursorRadius={300}
          cursorForce={0.12}
          bulgeOnly={true}
          bulgeStrength={50}
          glowRadius={160}
          sparkle={false}
          waveAmplitude={0.8}
        />
      </div>

      <Header
        className={headerClassName}
        theme={headerTheme}
        isMobileMenuOpen={isMobileMenuOpen}
        ref={headerRef}
        showThemeButton={headerShowThemeButton}
        onBurgerClick={handleHeaderBurgerClick}
      />
      <main className="relative z-10 flex-grow">{children}</main>
      <Footer className="relative z-10" />
      <MobileMenu
        isOpen={isMobileMenuOpen}
        headerRef={headerRef}
        onOutsideClick={handleMobileMenuOutsideClick}
      />
    </div>
  );
};

Layout.propTypes = {
  seo: PropTypes.exact({
    title: PropTypes.string,
    description: PropTypes.string,
    ogImage: PropTypes.string,
  }),
  headerClassName: PropTypes.string,
  headerTheme: PropTypes.oneOf(['black', 'white']).isRequired,
  headerShowThemeButton: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

Layout.defaultProps = {
  seo: {},
  headerClassName: null,
  headerShowThemeButton: false,
};

export default Layout;
