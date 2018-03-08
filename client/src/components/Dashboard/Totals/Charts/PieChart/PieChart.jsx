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
  renderPiechart() {
    console.log(this);
    return (
      <svg viewBox="0 0 42 42" className={classes.donut}>
        <circle className={classes.donutHole} />
        <circle className={[classes.donutSegment, classes.run].join(' ')} strokeDasharray="60 40" strokeDashoffset="25" />
        <circle className={[classes.donutSegment, classes.ride].join(' ')} strokeDasharray="20 80" strokeDashoffset="65" />
        <circle className={[classes.donutSegment, classes.swim].join(' ')} strokeDasharray="20 80" strokeDashoffset="45" />
        <g className={classes.chartText}>
          <text x="50%" y="50%" className={classes.chartNumber}>
            100
          </text>
          <text x="50%" y="50%" className={classes.chartLabel}>
            Activities
          </text>
        </g>
      </svg>
    );
  }
  render() {
    return (
      <div className={classes.content}>
        {this.renderPiechart()}
      </div>
    );
  }
}

PieChart.propTypes = {
  filters: PropTypes.shape({

  }),
};

export default connect(({ auth, filters, demo }) => ({ auth, filters, demo }), actions)(PieChart);
