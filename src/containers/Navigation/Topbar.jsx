import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import classes from './Topbar.scss';
import PoweredLogo from '../../assets/api_logo_pwrdBy_strava_stack_light.png';

class Topbar extends Component {
  logoutHandler = () => {
    localStorage.removeItem('accessToken');
    this.props.onAuthRevoke();
  }
  render() {
    let logout;
    if (this.props.accessToken) {
      logout = <button className={classes.Logout} onClick={this.logoutHandler}>Logout</button>;
    }
    return (
      <div className={classes.Topbar}>
        <img className={classes.PoweredLogo} src={PoweredLogo} alt="Powered By Stava" />
        {logout}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  accessToken: state.auth.accessToken,
});

const mapDispatchToProps = dispatch => ({
  onAuthRevoke: () => dispatch(actions.authRevoke()),
});

Topbar.propTypes = {
  accessToken: PropTypes.string,
  onAuthRevoke: PropTypes.func.isRequired,
};

Topbar.defaultProps = {
  accessToken: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(Topbar);
