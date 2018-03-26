import React from 'react';
import PropTypes from 'prop-types';
import dateFns from 'date-fns';

import classes from './Day.scss';

const Day = (props) => {
  let activities;
  if (props.activities) {
    activities = props.activities.map(activity => (
      <p key={`${activity}_${Math.random()}`}>{activity}</p>
    ));
  }
  return (
    <div className={classes.content}>
      <p>
        { props.firstOfMonth ? dateFns.format(props.date, 'MMM DD') : dateFns.format(props.date, 'D') }
      </p>
      {activities}
    </div>
  );
};

Day.propTypes = {
  currentMonth: PropTypes.shape({}).isRequired,
  date: PropTypes.shape({}).isRequired,
  firstOfMonth: PropTypes.bool,
};

Day.defaultProps = {

};

export default Day;
