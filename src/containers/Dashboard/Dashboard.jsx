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
      this.props.onAthleteGet(localStorage.getItem('accessToken'));
    } else {
      this.props.onAuthRevoke(); // cancels loading state
    }
  }
  render() {
    let dashboard;

    if (this.props.error) {
      localStorage.removeItem('accessToken'); // prevents error message on a reload
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
    } else {
      dashboard = (
        <div className={classes.Card}>
          <img className={classes.Avatar} src={this.props.athlete.profile_medium} alt="Avatar" />
          <div className={classes.Content}>
            <p><strong>{`${this.props.athlete.firstname} ${this.props.athlete.lastname}`}</strong></p>
            <p>{`${this.props.athlete.city}, ${this.props.athlete.state}`}</p>
            <p>{`Following: ${this.props.athlete.friend_count} | Followers: ${this.props.athlete.follower_count}`}</p>
          </div>
        </div>
      );
    }

    return dashboard;
  }
}

const mapStateToProps = state => ({
  accessToken: state.auth.accessToken,
  athlete: state.auth.athlete,
  error: state.auth.error, // combine errors from multiple reducers
  loading: state.auth.loading,
});

const mapDispatchToProps = dispatch => ({
  onAthleteGet: accessToken => dispatch(actions.athleteGet(accessToken)),
  onAuth: codeQuery => dispatch(actions.auth(codeQuery)),
  onAuthRevoke: () => dispatch(actions.authRevoke()),
});

Dashboard.propTypes = {
  accessToken: PropTypes.string,
  athlete: PropTypes.shape({
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    profile_medium: PropTypes.string,
    follower_count: PropTypes.number,
    friend_count: PropTypes.number,
  }),
  error: PropTypes.shape({
    data: PropTypes.shape({
      message: PropTypes.string,
    }),
  }),
  loading: PropTypes.bool.isRequired,
  onAthleteGet: PropTypes.func.isRequired,
  onAuth: PropTypes.func.isRequired,
  onAuthRevoke: PropTypes.func.isRequired,
};

Dashboard.defaultProps = {
  accessToken: null,
  athlete: null,
  error: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
