import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classes from './Calendar.scss';

class Calendar extends Component {
  componentWillMount() {
  }
  render() {
    return (
      <div className={classes.Card} >
        <h3>Calendar</h3>
      </div>
    );
  }
}

Calendar.propTypes = {
};

export default Calendar;
