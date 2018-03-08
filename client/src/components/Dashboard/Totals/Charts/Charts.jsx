import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '../../../../store/actions';
import classes from './Charts.scss';

import { sportTypes } from '../Filters/filterTypes';

class Charts extends Component {
  renderCounts() {
    const sportCounts = sportTypes.map((sportType) => {
      if (this.props.totals[sportType.key]) {
        return (
          <p key={`${this.props.id}_${sportType.key}`}>{sportType.label} Count: {this.props.auth.totals[`${this.props.id}_${sportType.key}_totals`].count}</p>
        );
      }
      return null;
    });

    return sportCounts;
  }
  render() {
    return (
      <div className={classes.Content}>
        <h3>{`${this.props.label}`}</h3>
        {this.renderCounts()}
      </div>
    );
  }
}

Charts.propTypes = {
  totals: PropTypes.shape({

  }),
};

export default connect(({ auth, totals }) => ({ auth, totals }), actions)(Charts);
