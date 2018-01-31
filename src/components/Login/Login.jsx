import React from 'react';

import classes from './Login.scss';

const stravaClick = () => {
  let redirectUrl = 'https://www.strava.com/oauth/authorize?client_id=23058&response_type=code';
  // check if in development
  if (window.location.href.includes('localhost')) {
    redirectUrl += '&redirect_uri=http://localhost:8080/';
  } else {
    redirectUrl += '&redirect_uri=http://connorlind.com';
  }
  window.location.replace(redirectUrl);
};

const Login = () => (
  <div className={classes.Content}>
    <h1>Login</h1>
    <button
      onClick={stravaClick}
      className={classes.StravaConnect}
      alt="Strava Connect"
    />
  </div>
);

export default Login;
