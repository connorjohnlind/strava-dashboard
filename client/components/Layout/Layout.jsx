import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import classes from './Layout.scss';
import Topbar from './Navigation/Topbar';

const Layout = props => (
  <div>
    <Topbar path={props.location.pathname} />
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

export default withRouter(Layout);
