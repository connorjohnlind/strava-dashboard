import React from 'react';
import PropTypes from 'prop-types';

import classes from './SportTotals.scss';

const SportTotals = props => (
  <div className={classes.Content}>
    <h3>{`${props.sport}`}</h3>
    {props.children}
  </div>
);

SportTotals.propTypes = {
  sport: PropTypes.string.isRequired,
  children: PropTypes.node,
};

SportTotals.defaultProps = {
  children: null,
};

export default SportTotals;
