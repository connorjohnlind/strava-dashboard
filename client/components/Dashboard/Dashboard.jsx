import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import URLSearchParams from 'url-search-params';

import Aux from '../hoc/Aux';
import Calendar from './Calendar/Calendar';
import Summary from './Summary/Summary';
import Totals from './Totals/Totals';
import Login from '../Login/Login';
import Spinner from '../UI/Spinner/Spinner';
import Footer from './Footer/Footer';
import * as actions from '../../store/actions';

class Dashboard extends Component {
  componentDidMount() {
    const query = new URLSearchParams(window.location.search);
    if (query.get('code')) {
      this.props.authInit(query.get('code'));
    } else if (localStorage.getItem('accessToken')) {
      this.props.authRenew(localStorage.getItem('accessToken'));
    } else {
      this.props.authRevoke(); // cancels loading state
    }
  }
  render() {
    let dashboard;
    if (this.props.auth.error) {
      localStorage.removeItem('accessToken'); // prevents error message on a reload
      dashboard = <Login error={this.props.auth.error} />;
    } else if (this.props.auth.authLoading) {
      dashboard = <Spinner />;
    } else if (!this.props.auth.authLoading && !this.props.auth.accessToken) {
      dashboard = <Login />;
    } else {
      dashboard = (
        <Aux>
          <Summary athlete={this.props.auth.athlete} totals={this.props.auth.totals} />
          <Totals />
          <Calendar activities={this.props.auth.activities} />
          <Footer />
        </Aux>
      );
    }
    return <Aux>{dashboard}</Aux>;
  }
}

Dashboard.propTypes = {
  // auth reducer
  auth: PropTypes.shape({
    accessToken: PropTypes.string,
    activities: PropTypes.arrayOf(
      PropTypes.shape({}),
    ),
    athlete: PropTypes.shape({}),
    totals: PropTypes.shape({}),
    error: PropTypes.shape({}),
    authLoading: PropTypes.bool.isRequired,
  }).isRequired,
  // auth actions
  authRenew: PropTypes.func.isRequired,
  authInit: PropTypes.func.isRequired,
  authRevoke: PropTypes.func.isRequired,
};

export default connect(({ auth }) => ({ auth }), actions)(Dashboard);
