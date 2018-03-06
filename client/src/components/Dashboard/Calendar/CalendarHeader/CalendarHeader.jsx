import React from 'react';
import PropTypes from 'prop-types';
import dateFns from 'date-fns';
import Button from '../../../UI/Button/Button';

import classes from './CalendarHeader.scss';

const CalendarHeader = props => (
  <div className={classes.Content}>
    <p>{dateFns.format(props.currentMonth, 'MMMM YYYY')}</p>
    <div>
      <Button clicked={props.prev}>&lt;</Button>
      <Button clicked={props.today}>Today</Button>
      <Button clicked={props.next}>&gt;</Button>
    </div>
  </div>
);

CalendarHeader.propTypes = {
  currentMonth: PropTypes.shape({}).isRequired,
  next: PropTypes.func.isRequired,
  today: PropTypes.func.isRequired,
  prev: PropTypes.func.isRequired,
};

export default CalendarHeader;
