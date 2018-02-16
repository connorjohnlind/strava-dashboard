import React from 'react';
import PropTypes from 'prop-types';

import classes from './Summary.scss';

const Summary = props => (
  <div className={classes.Card} >
    <img className={classes.Avatar} src={props.athlete.profile_medium} alt="Avatar" />
    <div className={classes.Content}>
      <p><strong>{`${props.athlete.firstname} ${props.athlete.lastname}`}</strong></p>
      <p>{`${props.athlete.city}, ${props.athlete.state}`}</p>
      <p>{`Following: ${props.athlete.friend_count} | Followers: ${props.athlete.follower_count}`}</p>
      <p>{`Biggest Ride: ${props.totals.biggest_ride_distance}`}</p>
    </div>
  </div>
);

Summary.propTypes = {
  athlete: PropTypes.shape({
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    profile_medium: PropTypes.string,
    follower_count: PropTypes.number,
    friend_count: PropTypes.number,
  }),
  totals: PropTypes.shape({
    biggest_ride_distance: PropTypes.number,
  }),
};

Summary.defaultProps = {
  athlete: null,
  totals: null,
};

export default Summary;
