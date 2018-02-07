import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classes from './Calendar.scss';

class Calendar extends Component {
  componentWillMount() {
  }
  render() {
    const typesArray = this.props.activities.map(activity => (activity.type));
    console.log(typesArray);
    return (
      <div className={classes.Card} >
        <h3>Calendar</h3>
        <p>{`All Time Activities: ${this.props.activities.length}`}</p>
      </div>
    );
  }
}

Calendar.propTypes = {
  activities: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    }),
  ),
};

Calendar.defaultProps = {
  activities: null,
};

export default Calendar;