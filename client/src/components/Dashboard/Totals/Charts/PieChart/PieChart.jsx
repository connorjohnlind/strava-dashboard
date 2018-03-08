import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '../../../../../store/actions';
import classes from './PieChart.scss';

import { sportTypes } from '../../Filters/filterTypes';

class PieChart extends Component {
  renderCounts() {
    const sportCounts = sportTypes.map((sportType) => {
      if (this.props.filters[sportType.key]) {
        return (
          <p key={`${this.props.range}_${sportType.key}`}>{sportType.label} Count: {this.props.auth.totals[`${this.props.range}_${sportType.key}_totals`].count}</p>
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

PieChart.propTypes = {
  filters: PropTypes.shape({

  }),
};

export default connect(({ auth, filters }) => ({ auth, filters }), actions)(PieChart);
