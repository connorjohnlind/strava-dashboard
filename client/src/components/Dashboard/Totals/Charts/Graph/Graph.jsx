import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '../../../../../store/actions';
import classes from './Graph.scss';
import Bars from './Bars/Bars';
import Aux from '../../../../hoc/Aux';

import { sports } from '../../Filters/filterTypes';

class Graph extends Component {
  getMetrics() {
    const { range, auth, demo } = this.props;
    const mode = !demo.demoLoading ? demo : auth; // check if in demo mode

    const metrics = {};

    sports.forEach((sport) => {
      const { key } = sport;
      if (this.props.filters[key]) {
        const { distance, moving_time } = mode.totals[`${range}_${sport.key}_totals`];
        metrics[key] = {
          miles: distance * 0.000621371,
          mins: moving_time * 0.0166667,
        };
      }
    });
    return metrics;
  }
  render() {
    return (
      <div className={classes.Content}>
        <div className={classes.graph}>
          <Bars data={this.getMetrics()} />
        </div>
      </div>
    );
  }
}

Graph.propTypes = {
  filters: PropTypes.shape({

  }),
};

export default connect(({ auth, filters, demo }) => ({ auth, filters, demo }), actions)(Graph);
