import React from 'react';
import PropTypes from 'prop-types';
import dateFns from 'date-fns';
import Button from '../../../UI/Button/Button';

import classes from './CalendarHeader.scss';

const CalendarHeader = props => (
  <div className={classes.content}>
    <div className={classes.month}>
      <Button clicked={props.prev}>&lt;</Button>
      <p>{dateFns.format(props.currentMonth, 'MMMM YYYY')}</p>
      <Button clicked={props.next}>&gt;</Button>
    </div>
    <Button className={classes.today} clicked={props.today}>Today</Button>
  </div>
);

CalendarHeader.propTypes = {
  currentMonth: PropTypes.shape({}).isRequired,
  next: PropTypes.func.isRequired,
  today: PropTypes.func.isRequired,
  prev: PropTypes.func.isRequired,
};

export default CalendarHeader;
