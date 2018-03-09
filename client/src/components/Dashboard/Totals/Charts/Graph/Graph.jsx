import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '../../../../../store/actions';
import classes from './Graph.scss';
import Aux from '../../../../hoc/Aux';

import { sports } from '../../Filters/filterTypes';

class Graph extends Component {
  renderCounts() {
    const { range, auth, demo } = this.props;
    const mode = !demo.demoLoading ? demo : auth;

    const sportCounts = sports.map((sport) => {
      if (this.props.filters[sport.key]) {
        const { label } = sport;
        const { distance, moving_time } = mode.totals[`${range}_${sport.key}_totals`];
        return (
          <Aux key={`${range}_${sport.key}_distance/time`}>
            <p key={`${range}_${sport.key}_distance`}>{label} Distance: {(distance * 0.000621371).toFixed(2)} miles</p>
            <p key={`${range}_${sport.key}_time`}>{label} Time: {(moving_time * 0.0166667).toFixed(0)} minutes</p>
          </Aux>
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

export default connect(({ auth, filters, demo }) => ({ auth, filters, demo }), actions)(Graph);
