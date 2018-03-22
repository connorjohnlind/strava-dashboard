import React from 'react';
import PropTypes from 'prop-types';

import classes from './Layout.scss';
import Topbar from './Navigation/Topbar';

const Layout = props => (
  <div>
    <Topbar />
    <main className={classes.dashboard}>
      {props.children}
    </main>
  </div>
);

Layout.propTypes = {
  children: PropTypes.node,
};

Layout.defaultProps = {
  children: undefined,
};

export default Layout;
