import React from 'react';
import PropTypes from 'prop-types';

import classes from './Summary.scss';

const Summary = props => (
  <div className={classes.card} >
    <img className={classes.avatar} src={props.athlete.profile_medium} alt="Avatar" />
    <div className={classes.content}>
      <h3>{`${props.athlete.firstname} ${props.athlete.lastname}`}</h3>
      <div className={classes.stats}>
        <p>{`${props.athlete.city}, ${props.athlete.state}`}</p>
        <p>{`Following: ${props.athlete.friend_count} | Followers: ${props.athlete.follower_count}`}</p>
      </div>
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
};

Summary.defaultProps = {
  athlete: null,
};

export default Summary;
