import React from 'react';
import PropTypes from 'prop-types';

import classes from './WeekHeader.scss';

const WeekHeader = () => (
  <div className={classes.content}>
    <div>Sun</div>
    <div>Mon</div>
    <div>Tue</div>
    <div>Wed</div>
    <div>Thu</div>
    <div>Fri</div>
    <div>Sat</div>
  </div>
);

WeekHeader.propTypes = {

};

WeekHeader.defaultProps = {

};

export default WeekHeader;
