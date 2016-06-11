import React, { PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';

const Header = ( { version } ) => {
  const headerTitle = `Buka v${version}`;

  return (
    <header className='buka__header'>
      <AppBar title={headerTitle} />
    </header>
  );
};

Header.propTypes = {
  version: PropTypes.string.isRequired
};

export default Header;
