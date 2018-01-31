import React, { Component } from 'react';

import classes from './Logout.scss';

class Logout extends Component {
  componentDidMount() {
    localStorage.removeItem('access_token');
  }
  render() {
    return (
      <div className={classes.Content}>
        You have been logged out!
      </div>
    );
  }
}

export default Logout;
