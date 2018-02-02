import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import classes from './Logout.scss';

class Logout extends Component {
  componentDidMount() {
    localStorage.removeItem('accessToken');
    this.props.onAuthRevoke();
  }
  render() {
    return (
      <div className={classes.Content}>
        You have been logged out!
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onAuthRevoke: () => dispatch(actions.authRevoke()),
});

Logout.propTypes = {
  onAuthRevoke: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Logout);
