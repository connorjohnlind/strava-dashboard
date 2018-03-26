import React from 'react';
import PropTypes from 'prop-types';
import dateFns from 'date-fns';
import Aux from '../../../hoc/Aux';

import classes from './Day.scss';

const Day = (props) => {
  let content;
  if (props.activities) {
    const firstActivity = props.activities[0];
    content = (
      <Aux>
        <p className={classes.hideDay}>
          { props.firstOfMonth ? dateFns.format(props.date, 'MMM DD') : dateFns.format(props.date, 'D') }
        </p>
        <div className={classes[firstActivity]} />
      </Aux>
    );
  } else {
    content = (
      <p className={classes}>
        { props.firstOfMonth ? dateFns.format(props.date, 'MMM DD') : dateFns.format(props.date, 'D') }
      </p>
    );
  };

  return (
    <div className={classes.content}>
      {content}
    </div>
  )
};

Day.propTypes = {
  currentMonth: PropTypes.shape({}).isRequired,
  date: PropTypes.shape({}).isRequired,
  firstOfMonth: PropTypes.bool,
};

Day.defaultProps = {

};

export default Day;
