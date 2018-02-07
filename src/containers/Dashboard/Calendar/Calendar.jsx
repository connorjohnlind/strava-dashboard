import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import dateFns from 'date-fns';

import classes from './Calendar.scss';
import CalendarHeader from '../../../components/calendar/CalendarHeader/CalendarHeader';
import WeekHeader from '../../../components/calendar/WeekHeader/WeekHeader';
import Day from '../../../components/calendar/Day/Day';

class Calendar extends Component {
  componentWillMount() {
  }
  render() {
    // const typesArray = this.props.activities.map(activity => (activity.type));
    return (
      <div className={classes.Card} >
        <h3>Calendar</h3>
        <div className={classes.Calendar}>
          <CalendarHeader />
          <WeekHeader />
          <Day />
        </div>
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
