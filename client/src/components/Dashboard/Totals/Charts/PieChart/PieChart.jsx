import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '../../../../../store/actions';
import classes from './PieChart.scss';

import { sports } from '../../Filters/filterTypes';

class PieChart extends Component {
  renderCounts() {
    const { range, auth, demo } = this.props;
    const mode = !demo.demoLoading ? demo : auth; // check if in demo mode

    const sportCounts = sports.map((sport) => {
      if (this.props.filters[sport.key]) {
        const { label } = sport;
        const { count } = mode.totals[`${range}_${sport.key}_totals`];
        return (
          <p key={`${range}_${sport.key}`}>{label} Count: {count}</p>
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

export default connect(({ auth, filters, demo }) => ({ auth, filters, demo }), actions)(PieChart);
