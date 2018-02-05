import React from 'react';
import PropTypes from 'prop-types';

import classes from './SportTotal.scss';

const SportTotal = props => (
  <div className={classes.Content}>
    <p>{`${props.sport}`}</p>
    <p>{`RECENT: ${props.recent.count}`}</p>
    <p>{`YTD: ${props.ytd.count}`}</p>
    <p>{`ALL: ${props.all.count}`}</p>
  </div>
);

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

export default SportTotal;
