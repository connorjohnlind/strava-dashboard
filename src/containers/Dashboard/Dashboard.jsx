import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import URLSearchParams from 'url-search-params';

import Aux from '../../hoc/Aux';
import Calendar from '../Calendar/Calendar';
import Summary from '../../components/Summary/Summary';
import Totals from '../Totals/Totals';
import Login from '../../components/Login/Login';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';

class Dashboard extends Component {
  componentWillMount() {
    const query = new URLSearchParams(window.location.search);
    if (query.get('code')) {
      this.props.onAuth(query.get('code'));
    } else if (localStorage.getItem('accessToken')) {
      this.props.onAthleteGet(localStorage.getItem('accessToken'));
    } else {
      this.props.onAuthRevoke(); // cancels loading state
    }
  }
  componentDidUpdate() {
    // check if calendar hasn't loaded
    // this lifecycle method 'lazy loads' the data after the update from auth
    // alternatively, could add activities to the same auth reducer, and chain the GET requests,
    // but this would add 500+ms to the initial load
    if (!this.props.activities && this.props.accessToken) {
      this.props.onActivitiesGet(this.props.accessToken);
    }
  }
  render() {
    let dashboard;
    if (this.props.error) {
      localStorage.removeItem('accessToken'); // prevents error message on a reload
      dashboard = <Login error={this.props.error} />;
    } else if (this.props.authLoading) {
      dashboard = <Spinner />;
    } else if (!this.props.authLoading && !this.props.accessToken) {
      dashboard = <Login />;
    } else {
      dashboard = (
        <Aux>
          <Summary athlete={this.props.athlete} totals={this.props.totals} />
          <Totals totals={this.props.totals} />
        </Aux>
      );
    }
    const calendar = this.props.activities ? <Calendar activities={this.props.activities} /> : null;
    return (
      <Aux>
        {dashboard}
        {calendar}
      </Aux>
    );
  }
}

const mapStateToProps = state => ({
  accessToken: state.auth.accessToken,
  athlete: state.auth.athlete,
  activities: state.activities.data,
  totals: state.auth.totals,
  error: state.auth.error,
  authLoading: state.auth.loading,
});

const mapDispatchToProps = dispatch => ({
  onActivitiesGet: accessToken => dispatch(actions.activitiesGet(accessToken)),
  onAthleteGet: accessToken => dispatch(actions.athleteGet(accessToken)),
  onAuth: codeQuery => dispatch(actions.auth(codeQuery)),
  onAuthRevoke: () => dispatch(actions.authRevoke()),
});

Dashboard.propTypes = {
  accessToken: PropTypes.string,
  activities: PropTypes.arrayOf(
    PropTypes.shape({}),
  ),
  athlete: PropTypes.shape({}),
  totals: PropTypes.shape({}),
  error: PropTypes.shape({}),
  authLoading: PropTypes.bool.isRequired,
  onActivitiesGet: PropTypes.func.isRequired,
  onAthleteGet: PropTypes.func.isRequired,
  onAuth: PropTypes.func.isRequired,
  onAuthRevoke: PropTypes.func.isRequired,
};

Dashboard.defaultProps = {
  accessToken: null,
  activities: null,
  athlete: null,
  totals: null,
  error: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
