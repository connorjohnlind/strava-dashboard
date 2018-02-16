import React from 'react';
import PropTypes from 'prop-types';

import classes from './Filters.scss';

const Filters = props => (
  <div className={classes.Content}>
    {props.children}
  </div>
);

Filters.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Filters;
