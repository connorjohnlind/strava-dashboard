import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import URLSearchParams from 'url-search-params';

import Aux from '../../hoc/Aux';
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
  render() {
    let dashboard;
    if (this.props.error) {
      localStorage.removeItem('accessToken'); // prevents error message on a reload
      dashboard = <Login error={this.props.error} />;
    } else if (this.props.loading) {
      dashboard = <Spinner />;
    } else if (!this.props.loading && !this.props.accessToken) {
      dashboard = <Login />;
    } else {
      dashboard = (
        <Aux>
          <Summary athlete={this.props.athlete} totals={this.props.totals} />
          <Totals totals={this.props.totals} />
        </Aux>
      );
    }
    return dashboard;
  }
}

const mapStateToProps = state => ({
  accessToken: state.auth.accessToken,
  athlete: state.auth.athlete,
  totals: state.auth.totals,
  error: state.auth.error,
  loading: state.auth.loading,
});

const mapDispatchToProps = dispatch => ({
  onAthleteGet: accessToken => dispatch(actions.athleteGet(accessToken)),
  onAuth: codeQuery => dispatch(actions.auth(codeQuery)),
  onAuthRevoke: () => dispatch(actions.authRevoke()),
});

Dashboard.propTypes = {
  accessToken: PropTypes.string,
  athlete: PropTypes.shape({}),
  totals: PropTypes.shape({}),
  error: PropTypes.shape({}),
  loading: PropTypes.bool.isRequired,
  onAthleteGet: PropTypes.func.isRequired,
  onAuth: PropTypes.func.isRequired,
  onAuthRevoke: PropTypes.func.isRequired,
};

Dashboard.defaultProps = {
  accessToken: null,
  athlete: null,
  totals: null,
  error: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
