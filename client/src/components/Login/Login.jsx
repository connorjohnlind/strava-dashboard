import React from 'react';
import PropTypes from 'prop-types';

import classes from './Login.scss';

const stravaClick = () => {
  let redirectUrl = 'https://www.strava.com/oauth/authorize?client_id=23058&response_type=code';
  // check if in development
  if (window.location.href.includes('localhost')) {
    redirectUrl += '&redirect_uri=http://localhost:8080/';
  } else {
    redirectUrl += '&redirect_uri=https://stravadash.herokuapp.com/';
  }
  window.location.replace(redirectUrl);
};

const Login = (props) => {
  let errorMessage;
  if (props.error) {
    errorMessage = <p>{props.error.data.message}</p>;
  }
  return (
    <div className={classes.Content}>
      {errorMessage}
      <h1>Login</h1>
      <button
        onClick={stravaClick}
        className={classes.StravaConnect}
        alt="Strava Connect"
      />
    </div>
  );
};

Login.propTypes = {
  error: PropTypes.shape({
    data: PropTypes.shape({
      message: PropTypes.string,
    }),
  }),
};

Login.defaultProps = {
  error: null,
};

export default Login;
