import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions';
import classes from './Totals.scss';
import Filters from './Filters/Filters';
import Charts from './Charts/Charts';
import Scale from './Scale/Scale';
import Aux from '../../hoc/Aux';

import { sports, ranges } from './Filters/filterTypes';

class Totals extends Component {
  getChartMaximums() {
    const { auth, demo } = this.props;
    const mode = !demo.demoLoading ? demo : auth; // check if in demo mode

    const maximums = { distance: 0, time: 0 };

    ranges.forEach((range) => {
      if (this.props.filters[range.key]) {
        sports.forEach((sport) => {
          if (this.props.filters[sport.key]) {
            let { distance, moving_time } = mode.totals[`${range.key}_${sport.key}_totals`];
            distance *= 0.000621371;
            moving_time *= 0.0166667;
            maximums.distance = distance > maximums.distance
              ? distance
              : maximums.distance;
            maximums.time = moving_time > maximums.time
              ? moving_time
              : maximums.time;
          }
        });
      }
    });
    return maximums;
  }
  renderCharts() {
    const activeTotals = ranges.map((range) => {
      if (this.props.filters[range.key]) {
        return (
          <Charts
            key={range.key}
            range={range.key}
            label={range.label}
            maximums={this.getChartMaximums()}
          />
        );
      }
      return null;
    });
    return <Aux>{activeTotals}</Aux>;
  }
  render() {
    return (
      <div className={classes.card} >
        <h3>Totals</h3>
        <Filters />
        <div className={classes.main}>
          <Scale value={"300000"} label="miles" />
          {this.renderCharts()}
          <Scale value={"400000"} label="mins" />
        </div>
      </div>
    );
  }
}

Totals.propTypes = {
  filters: PropTypes.shape({
  }).isRequired,
};

export default connect(({ auth, demo, filters }) => ({ auth, demo, filters }), actions)(Totals);
