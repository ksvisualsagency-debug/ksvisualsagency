import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';

import Navigation13 from 'components/ui/Navigation13';

const Header = forwardRef(({ className }, ref) => (
  <div ref={ref}>
    <Navigation13 className={className} />
  </div>
));

Header.propTypes = {
  className: PropTypes.string,
};

Header.defaultProps = {
  className: null,
};

export default Header;
