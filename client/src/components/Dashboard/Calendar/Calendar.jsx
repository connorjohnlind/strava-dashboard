import React, { Component } from 'react';
import PropTypes from 'prop-types';
import dateFns from 'date-fns';

import classes from './Calendar.scss';
import CalendarHeader from './CalendarHeader/CalendarHeader';
import WeekHeader from './WeekHeader/WeekHeader';
import Day from './Day/Day';

class Calendar extends Component {
  state = {
    currentMonth: dateFns.setDate(new Date(), 1),
  }
  prev = () => {
    const prev = dateFns.subMonths(this.state.currentMonth, 1);
    this.setState({ currentMonth: prev });
  }
  next = () => {
    const next = dateFns.addMonths(this.state.currentMonth, 1);
    this.setState({ currentMonth: next });
  }
  today = () => {
    const today = dateFns.setDate(new Date(), 1);
    this.setState({ currentMonth: today });
  }
  render() {
    // const typesArray = this.props.activities.map(activity => (activity.type));

    const calendarDays = [];
    let dateIncrement = dateFns.startOfWeek(this.state.currentMonth); // currentMonth set to the 1st

    for (let i = 0; i < 42; i += 1) {
      if (dateFns.getDate(dateIncrement) === 1) {
        calendarDays.push(
          <Day
            date={dateIncrement}
            currentMonth={this.state.currentMonth}
            showMonth
          />,
        );
      } else {
        calendarDays.push(
          <Day
            date={dateIncrement}
            currentMonth={this.state.currentMonth}
          />,
        );
      }
      dateIncrement = dateFns.addDays(dateIncrement, 1);
    }

    return (
      <div className={classes.Card} >
        <h3>Calendar</h3>
        <div className={classes.Calendar}>
          <CalendarHeader
            currentMonth={this.state.currentMonth}
            next={this.next}
            today={this.today}
            prev={this.prev}
          />
          <WeekHeader />
          <div className={classes.Days}>
            {calendarDays}
          </div>
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
