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
    const activityMap = {};
    this.props.activities.forEach((activity) => {
      const date = dateFns.format(dateFns.parse(activity.start_date), 'YYYY-MM-DD');
      activityMap[date] = activityMap[date]
        ? [...activityMap[date], activity.type]
        : [activity.type];
    });

    const calendarDays = [];
    let dateCounter = dateFns.startOfWeek(this.state.currentMonth); // currentMonth set to the 1st

    for (let i = 0; i < 42; i += 1) {
      const dateCounterString = dateFns.format(dateCounter, 'YYYY-MM-DD');

      if (dateFns.getDate(dateCounter) === 1) {
        calendarDays.push(
          <Day
            key={dateCounter}
            date={dateCounter}
            currentMonth={this.state.currentMonth}
            firstOfMonth
            activities={activityMap[dateCounterString] ? activityMap[dateCounterString] : null}
          />,
        );
      } else {
        calendarDays.push(
          <Day
            key={dateCounter}
            date={dateCounter}
            currentMonth={this.state.currentMonth}
            activities={activityMap[dateCounterString] ? activityMap[dateCounterString] : null}
          />,
        );
      }
      dateCounter = dateFns.addDays(dateCounter, 1);
    }

    return (
      <div className={classes.card} >
        <CalendarHeader
          currentMonth={this.state.currentMonth}
          next={this.next}
          today={this.today}
          prev={this.prev}
        />
        <WeekHeader />
        <div className={classes.days}>
          {calendarDays}
        </div>
      </div>
    );
  }
}

Calendar.propTypes = {
};

Calendar.defaultProps = {
};

export default Calendar;
