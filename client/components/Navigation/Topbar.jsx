import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import * as actions from '../../store/actions/index';
import classes from './Topbar.scss';
import Button from '../UI/Button/Button';
import PoweredLogo from '../../assets/api_logo_pwrdBy_strava_stack_light.png';

class Topbar extends Component {
  logoutHandler = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('totalsFilter');
    this.props.authRevoke();
  }
  exitDemoHandler = () => {
    this.props.history.push('/');
  }
  render() {
    let logout;
    if (this.props.auth.accessToken) {
      logout = <Button clicked={this.logoutHandler}>Logout</Button>;
    } else if (window.location.href.indexOf('demo') > -1) {
      logout = <Button clicked={this.exitDemoHandler}>Exit</Button>;
    }
    return (
      <div className={classes.topbar}>
        <img className={classes.poweredLogo} src={PoweredLogo} alt="Powered By Stava" />
        {logout}
      </div>
    );
  }
}

Topbar.propTypes = {
  auth: PropTypes.shape({
    accessToken: PropTypes.string,
  }).isRequired,
  authRevoke: PropTypes.func.isRequired,
  history: PropTypes.shape({}).isRequired,
};

export default connect(({ auth }) => ({ auth }), actions)(withRouter(Topbar));
