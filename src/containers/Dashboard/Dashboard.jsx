import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import URLSearchParams from 'url-search-params';

import * as actions from '../../store/actions/index';
import classes from './Dashboard.scss';

class Dashboard extends Component {
  componentWillMount() {
    // check localStorage first
    if (localStorage.getItem('accessToken')) {
      this.props.onSetAccessToken(localStorage.getItem('accessToken'));
      return;
    }
    // check the query string next
    const query = new URLSearchParams(window.location.search);
    const code = query.get('code');
    if (code) this.props.onFetchAccessToken(code);
  }
  render() {
    const dashboard = (
      <div className={classes.Content}>
        <h1>Dashboard</h1>
        <p>Your access token is: {localStorage.getItem('accessToken')}</p>
      </div>
    );

    // if nothing found in local storage and not loading
    const result = (!localStorage.getItem('accessToken') && !this.props.loading)
      ? <Redirect to="/login" />
      : dashboard;

    return result;
  }
}

const mapStateToProps = state => ({
  accessToken: state.authReducer.accessToken,
  error: state.authReducer.error,
  loading: state.authReducer.loading,
});

const mapDispatchToProps = dispatch => ({
  onSetAccessToken: code => dispatch(actions.setAccessToken(code)),
  onFetchAccessToken: code => dispatch(actions.fetchAccessToken(code)),
});

Dashboard.propTypes = {
  // accessToken: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  onFetchAccessToken: PropTypes.func.isRequired,
  onSetAccessToken: PropTypes.func.isRequired,
};

// Dashboard.defaultProps = {
//   accessToken: null,
// };

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
