import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '../../../../../store/actions';
import classes from './PieChart.scss';

import { sports } from '../../Filters/filterTypes';

class PieChart extends Component {
  activeCounts() {
    const { range, auth, demo } = this.props;
    const mode = !demo.demoLoading ? demo : auth; // check if in demo mode

    const activeCounts = {};

    sports.forEach((sport) => {
      const { key } = sport;
      if (this.props.filters[key]) {
        const { count } = mode.totals[`${range}_${key}_totals`];
        activeCounts[key] = count;
      }
    });

    return activeCounts;
  }
  totalCount() {
    const activeCounts = this.activeCounts();
    if (Object.keys(activeCounts).length > 0) {
      return Object.values(activeCounts).reduce((a, b) => a + b);
    }
    return null;
  }
  renderCircles() {
    const activeCounts = this.activeCounts();
    const circles = [];

    const totalCount = this.totalCount();

    let strokeSum = 0;

    for (let i = 0; i < Object.keys(activeCounts).length; i += 1) {
      const sport = Object.keys(activeCounts)[i];

      const stroke = !Object.keys(activeCounts)[i + 1] // if this is the last sport
        ? 100 - strokeSum // close the remainder of the pie chart
        : Math.floor((100 * activeCounts[sport]) / totalCount); // else calculate the percent

      const remainder = 100 - stroke;
      const offset = (i === 0) ? 25 : (100 - strokeSum) + 25;

      circles.push(
        <circle
          key={`${sport}_circle_${Math.random()}`}
          className={[classes.donutSegment, classes[sport]].join(' ')}
          strokeDasharray={`${stroke} ${remainder}`}
          strokeDashoffset={`${offset}`}
        />,
      );

      strokeSum += stroke;
    }

    return circles;
  }
  renderPiechart() {
    const circles = this.renderCircles();
    return (
      <svg viewBox="0 0 42 42" className={classes.donut}>
        <circle className={classes.donutHole} />
        {circles}
        <g className={classes.chartText}>
          <text x="50%" y="50%" className={classes.chartNumber}>
            {this.totalCount()}
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
        {this.totalCount() > 0 ? this.renderPiechart() : null}
      </div>
    );
  }
}

PieChart.propTypes = {
  filters: PropTypes.shape({

  }),
};

export default connect(({ auth, filters, demo }) => ({ auth, filters, demo }), actions)(PieChart);
