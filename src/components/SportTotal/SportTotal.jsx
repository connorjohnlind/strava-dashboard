import React from 'react';
import PropTypes from 'prop-types';

import classes from './SportTotal.scss';

const totals = [
  { label: 'Recent', key: 'recent' },
  { label: 'YTD', key: 'ytd' },
  { label: 'All', key: 'all' },
];

const SportTotal = props => (
  <div className={classes.Content}>
    <h3>{`${props.sport}`}</h3>
    {totals.map(total => (
      <div key={total.key} className={classes.Content}>
        <p><strong>{total.label}</strong></p>
        <p>{`Count: ${props[total.key].count}`}</p>
        <p>{`Distance: ${(props[total.key].distance * 0.000621371).toFixed(2)} miles`}</p>
        <p>{`Moving Time: ${(props[total.key].moving_time * 0.0166667).toFixed(0)} minutes`}</p>
        <p>{`Elevation Gain: ${(props[total.key].elevation_gain * 3.28084).toFixed(0)} feet`}</p>
      </div>
    ))}
  </div>
);

/* eslint-disable react/no-unused-prop-types */
SportTotal.propTypes = {
  sport: PropTypes.string.isRequired,
  recent: PropTypes.shape({
    count: PropTypes.number,
    distance: PropTypes.number,
    moving_time: PropTypes.number,
    elevation_gain: PropTypes.number,
  }).isRequired,
  ytd: PropTypes.shape({
    count: PropTypes.number,
    distance: PropTypes.number,
    moving_time: PropTypes.number,
    elevation_gain: PropTypes.number,
  }).isRequired,
  all: PropTypes.shape({
    count: PropTypes.number,
    distance: PropTypes.number,
    moving_time: PropTypes.number,
    elevation_gain: PropTypes.number,
  }).isRequired,
};
/* eslint-enable */

export default SportTotal;
