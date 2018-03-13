import React from 'react';
import PropTypes from 'prop-types';
import connectStrava from '../../assets/btn_strava_connectwith_orange.png';

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
    errorMessage = (
      <div className={classes.error}>
        <p>Sorry, there has been an error:</p>
        <p>{props.error.data.message}</p>
      </div>
    );
  }
  return (
    <div className={classes.content}>
      {errorMessage}
      <h1>Strava Dash</h1>
      <p>an app by Connor Lind</p>
      <a className={classes.stravaConnect} onClick={stravaClick}>
        <img src={connectStrava} alt="Strava Connect" />
      </a>
      <p>Don&#39;t have Strava? Check out the <a href="/demo">demo</a>.</p>
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
