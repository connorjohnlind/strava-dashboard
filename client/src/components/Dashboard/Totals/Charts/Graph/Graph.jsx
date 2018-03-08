import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '../../../../../store/actions';
import classes from './Graph.scss';

import { sportTypes } from '../../Filters/filterTypes';

class Graph extends Component {
  renderCounts() {
    const sportCounts = sportTypes.map((sportType) => {
      if (this.props.filters[sportType.key]) {
        return (
          <p key={`${this.props.range}_${sportType.key}`}>{sportType.label} Distance: {(this.props.auth.totals[`${this.props.range}_${sportType.key}_totals`].distance * 0.000621371).toFixed(2)} miles</p>
        );
      }
      return null;
    });

    return sportCounts;
  }
  render() {
    return (
      <div className={classes.Content}>
        {this.renderCounts()}
      </div>
    );
  }
}

Graph.propTypes = {
  filters: PropTypes.shape({

  }),
};

export default connect(({ auth, filters }) => ({ auth, filters }), actions)(Graph);
