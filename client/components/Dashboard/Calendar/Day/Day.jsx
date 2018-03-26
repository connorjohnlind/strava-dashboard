import React from 'react';
import PropTypes from 'prop-types';
import dateFns from 'date-fns';

import classes from './Day.scss';

const Day = (props) => {
  if (dateFns.isWeekend(props.date)) {
    // classes.push('Calendar_Day_Weekend')
  }

  return (
    <div className={classes.content}>
      <p>
        { props.firstOfMonth ? dateFns.format(props.date, 'MMM DD') : dateFns.format(props.date, 'D') }
      </p>
    </div>
  );
};

Day.propTypes = {
  currentMonth: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  firstOfMonth: PropTypes.bool.isRequired,
};

Day.defaultProps = {

};

export default Day;
