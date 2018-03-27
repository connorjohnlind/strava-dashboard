import React from 'react';
import PropTypes from 'prop-types';
import dateFns from 'date-fns';
import Aux from '../../../hoc/Aux';

import classes from './Day.scss';

const Day = (props) => {
  let dayClasses;
  let content;

  if (props.activities) {
    const activities = props.activities.filter(activity => (
      activity === 'Run' || 'Ride' || 'Swim' || 'WeightTraining' // only support these four types
    ));
    const firstActivity = activities[0]; // only support one at a time
    content = (
      <div className={classes[firstActivity]} />
    );
  }

  if (props.today) dayClasses = classes.today;
  if (props.activities) dayClasses = [dayClasses, classes.hideDay].join(' ');

  return (
    <div className={classes.content}>
      <p className={dayClasses}>
        { props.firstOfMonth ? dateFns.format(props.date, 'MMM DD') : dateFns.format(props.date, 'D') }
      </p>
      {content}
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
