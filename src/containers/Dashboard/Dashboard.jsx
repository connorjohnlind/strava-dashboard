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
    const query = new URLSearchParams(window.location.search);
    if (query.get('code')) {
      this.props.onAuth(query.get('code'));
    } else if (localStorage.getItem('accessToken')) {
      this.props.onAuthCheck(localStorage.getItem('accessToken'));
    } else {
      this.props.onAuthRevoke(); // cancels loading state
    }
  }
  render() {
    let dashboard = (
      <div className={classes.Content}>
        <h1>Dashboard</h1>
        <p>Your access token is: {this.props.accessToken}</p>
      </div>
    );

    if (this.props.error) {
      dashboard = <p>{this.props.error.data.message}</p>;
    } else if (this.props.loading) {
      dashboard = <Spinner />;
    } else if (!this.props.loading && !this.props.accessToken) {
      dashboard = <Redirect to="/login" />;
    }

    return dashboard;
  }
}

const mapStateToProps = state => ({
  accessToken: state.authReducer.accessToken,
  athlete: state.authReducer.athlete,
  error: state.authReducer.error,
  loading: state.authReducer.loading,
});

const mapDispatchToProps = dispatch => ({
  onAuth: codeQuery => dispatch(actions.auth(codeQuery)),
  onAuthCheck: accessToken => dispatch(actions.authCheck(accessToken)),
  onAuthRevoke: () => dispatch(actions.authRevoke()),
});

Dashboard.propTypes = {
  accessToken: PropTypes.string,
  athlete: PropTypes.object,
  error: PropTypes.node,
  loading: PropTypes.bool.isRequired,
  onAuth: PropTypes.func.isRequired,
  onAuthCheck: PropTypes.func.isRequired,
  onAuthRevoke: PropTypes.func.isRequired,
};

Dashboard.defaultProps = {
  accessToken: null,
  athlete: null,
  error: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
