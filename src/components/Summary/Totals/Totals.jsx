import React from 'react';
import PropTypes from 'prop-types';

import classes from './Totals.scss';

const Totals = props => (
  <div className={classes.Content}>
    <p>{`Biggest Ride: ${props.totals.biggest_ride_distance}`}</p>
  </div>
);

Totals.propTypes = {
  totals: PropTypes.shape({
    biggest_ride_distance: PropTypes.number,
  }),
};

Totals.defaultProps = {
  totals: null,
};

export default Totals;
