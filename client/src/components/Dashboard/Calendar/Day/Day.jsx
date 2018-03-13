import React from 'react';
import PropTypes from 'prop-types';
import dateFns from 'date-fns';

import classes from './Day.scss';

const Day = (props) => {
  if (dateFns.isWeekend(props.date)) {
    // classes.push('Calendar_Day_Weekend')
  }

  if (dateFns.getMonth(props.currentMonth) !== dateFns.getMonth(props.date)) {
    // classes.push('Calendar_Day_Out_Of_Scope')
  }

  return (
    <div className={classes.content}>
      { props.showMonth ? dateFns.format(props.date, 'MMM DD') : dateFns.format(props.date, 'D') }
    </div>
  );
};

Day.propTypes = {
  currentMonth: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  showMonth: PropTypes.bool.isRequired,
};

Day.defaultProps = {

};

export default Day;
