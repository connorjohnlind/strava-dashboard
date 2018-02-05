import React from 'react';
import PropTypes from 'prop-types';

import Aux from '../../../hoc/Aux';
import classes from './Profile.scss';

const Profile = props => (
  <Aux>
    <img className={classes.Avatar} src={props.athlete.profile_medium} alt="Avatar" />
    <div className={classes.Content}>
      <p><strong>{`${props.athlete.firstname} ${props.athlete.lastname}`}</strong></p>
      <p>{`${props.athlete.city}, ${props.athlete.state}`}</p>
      <p>{`Following: ${props.athlete.friend_count} | Followers: ${props.athlete.follower_count}`}</p>
    </div>
  </Aux>
);

Profile.propTypes = {
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

Profile.defaultProps = {
  athlete: null,
};

export default Profile;
