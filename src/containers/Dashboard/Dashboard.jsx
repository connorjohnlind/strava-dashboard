import React, { Component } from 'react';
import axios from 'axios';
import URLSearchParams from 'url-search-params';

import classes from './Dashboard.scss';

class Dashboard extends Component {
  state = {
    access_token: '',
  }
  componentDidMount() {
    const query = new URLSearchParams(window.location.search);
    const code = query.get('code');
    if (code) {
      axios.post(`https://www.strava.com/oauth/token?client_id=23058&client_secret=7acf3779503a1e2f856a4574d3f7fbc2d22090f7&code=${code}`)
        .then((res) => {
          localStorage.setItem('access_token', res.data.access_token);
          this.setState({ access_token: res.data.access_token });
          // window.history.replaceState({}, document.title, '/');
        });
    }
  }
  render() {
    const accessToken = localStorage.getItem('access_token');
    return (
      <div className={classes.Content}>
        <h1>Dashboard</h1>
        <p>Your access token is: {accessToken}</p>
      </div>
    );
  }
}

export default Dashboard;
