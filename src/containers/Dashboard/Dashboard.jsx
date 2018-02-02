import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import URLSearchParams from 'url-search-params';

import Login from '../../components/Login/Login';
import classes from './Dashboard.scss';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';


class Dashboard extends Component {
  componentDidMount() {
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
      <div className={classes.Card}>
        <img className={classes.Avatar} src={this.props.profile} alt="Avatar" />
        <div className={classes.Content}>
          <p>{`${this.props.firstname} ${this.props.lastname}`}</p>
          <p>{`${this.props.city}, ${this.props.state}`}</p>
        </div>
      </div>
    );

    if (this.props.error) {
      dashboard = (
        <div>
          <p>{this.props.error.data.message}</p>
          <Login />
        </div>
      );
    } else if (this.props.loading) {
      dashboard = <Spinner />;
    } else if (!this.props.loading && !this.props.accessToken) {
      dashboard = <Login />;
    }

    return dashboard;
  }
}

const mapStateToProps = state => ({
  accessToken: state.auth.accessToken,
  error: state.auth.error,
  loading: state.auth.loading,
  firstname: state.auth.firstname,
  lastname: state.auth.lastname,
  city: state.auth.city,
  state: state.auth.state,
  profile: state.auth.profile,
});

const mapDispatchToProps = dispatch => ({
  onAuth: codeQuery => dispatch(actions.auth(codeQuery)),
  onAuthCheck: accessToken => dispatch(actions.authCheck(accessToken)),
  onAuthRevoke: () => dispatch(actions.authRevoke()),
});

Dashboard.propTypes = {
  accessToken: PropTypes.string,
  error: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  firstname: PropTypes.string,
  lastname: PropTypes.string,
  city: PropTypes.string,
  state: PropTypes.string,
  profile: PropTypes.string,
  onAuth: PropTypes.func.isRequired,
  onAuthCheck: PropTypes.func.isRequired,
  onAuthRevoke: PropTypes.func.isRequired,
};

Dashboard.defaultProps = {
  accessToken: null,
  error: null,
  firstname: null,
  lastname: null,
  city: null,
  state: null,
  profile: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
