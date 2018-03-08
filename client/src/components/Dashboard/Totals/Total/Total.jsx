import React from 'react';
import PropTypes from 'prop-types';

import classes from './Total.scss';

const Total = props => (
  <div className={classes.Content}>
    <h3>{`${props.type}`}</h3>
    {props.children}
  </div>
);

Total.propTypes = {
  type: PropTypes.string.isRequired,
  children: PropTypes.node,
};

Total.defaultProps = {
  children: null,
};

export default Total;
