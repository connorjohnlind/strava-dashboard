import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import URLSearchParams from 'url-search-params';

import * as actions from '../../store/actions/index';
import classes from './Dashboard.scss';

class Dashboard extends Component {
  componentDidMount() {
    const query = new URLSearchParams(window.location.search);
    const code = query.get('code');
    if (code) {
      this.props.onFetchAccessToken(code);
    }
  }
  render() {
    const accessToken = localStorage.getItem('accessToken');
    return (
      <div className={classes.Content}>
        <h1>Dashboard</h1>
        <p>Your access token is: {accessToken}</p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  accessToken: state.accessToken,
  error: state.error,
});

const mapDispatchToProps = dispatch => ({
  onFetchAccessToken: code => dispatch(actions.fetchAccessToken(code)),
});

Dashboard.propTypes = {
  // accessToken: PropTypes.string,
  // history: PropTypes.node.isRequired,
  onFetchAccessToken: PropTypes.func.isRequired,
};

Dashboard.defaultProps = {
  // accessToken: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
