import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import URLSearchParams from 'url-search-params';

import classes from './Dashboard.scss';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';


class Dashboard extends Component {
  componentWillMount() {
    // check localStorage first
    if (localStorage.getItem('accessToken')) {
      this.props.onAuthSet(localStorage.getItem('accessToken'));
      return;
    }
    // check the query string next
    const query = new URLSearchParams(window.location.search);
    const code = query.get('code');
    if (code) this.props.onAuth(code);
  }
  render() {
    let dashboard = (
      <div className={classes.Content}>
        <h1>Dashboard</h1>
        <p>Your access token is: {this.props.accessToken}</p>
      </div>
    );

    if (this.props.loading) {
      dashboard = <Spinner />;
    } else if (!this.props.loading && !this.props.accessToken) {
      dashboard = <Redirect to="/login" />;
    }

    return dashboard;
  }
}

const mapStateToProps = state => ({
  accessToken: state.authReducer.accessToken,
  error: state.authReducer.error,
  loading: state.authReducer.loading,
});

const mapDispatchToProps = dispatch => ({
  onAuth: code => dispatch(actions.auth(code)),
  onAuthSet: token => dispatch(actions.authSet(token)),
});

Dashboard.propTypes = {
  accessToken: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  onAuth: PropTypes.func.isRequired,
  onAuthSet: PropTypes.func.isRequired,
};

Dashboard.defaultProps = {
  accessToken: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
