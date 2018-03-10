import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classes from './Scale.scss';

const Charts = props => (
  <div className={classes.content}>
    <div className={classes.barEnd} />
    <div className={classes.bar} />
    <p className={classes.text}>
      {props.label}
    </p>
    <div className={classes.bar} />
    <div className={classes.barEnd} />
  </div>
);

Charts.propTypes = {};

export default Charts;
