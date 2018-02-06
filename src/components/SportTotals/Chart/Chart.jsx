import React from 'react';
import PropTypes from 'prop-types';

import classes from './Chart.scss';

const Chart = props => (
  <div className={classes.Content}>
    <p><strong>{props.label}</strong></p>
    <p>{`Count: ${props.data.count}`}</p>
    <p>{`Distance: ${(props.data.distance * 0.000621371).toFixed(2)} miles`}</p>
    <p>{`Moving Time: ${(props.data.moving_time * 0.0166667).toFixed(0)} minutes`}</p>
    <p>{`Elevation Gain: ${(props.data.elevation_gain * 3.28084).toFixed(0)} feet`}</p>
  </div>
);

Chart.propTypes = {
  label: PropTypes.string.isRequired,
  data: PropTypes.shape({
    count: PropTypes.number,
    distance: PropTypes.number,
    moving_time: PropTypes.number,
    elevation_gain: PropTypes.number,
  }).isRequired,
};

export default Chart;
