import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classes from './Scale.scss';

const Charts = props => (
  <div className={classes.content}>
    <div className={classes.barWrapper}>
      <div className={classes.barEnd} />
      <div className={classes.bar} />
    </div>
    <p className={classes.text}>{props.value} {props.label}</p>
    <div className={classes.barWrapper}>
      <div className={classes.bar} />
      <div className={classes.barEnd} />
    </div>
  </div>
);

Charts.propTypes = {};

export default Charts;
