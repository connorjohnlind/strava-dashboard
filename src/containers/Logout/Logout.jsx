import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import classes from './Logout.scss';

class Logout extends Component {
  componentDidMount() {
    localStorage.removeItem('accessToken');
    this.props.onSetAccessToken(null);
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
  onSetAccessToken: token => dispatch(actions.setAccessToken(token)),
});

Logout.propTypes = {
  onSetAccessToken: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Logout);
