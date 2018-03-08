import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions';
import classes from './Totals.scss';
import Filters from './Filters/Filters';
import Charts from './Charts/Charts';
import Aux from '../../hoc/Aux';

import { rangeTypes } from './Filters/filterTypes';

class Totals extends Component {
  renderCharts() {
    const activeTotals = rangeTypes.map((range) => {
      if (this.props.totals[range.key]) {
        return (
          <Charts key={range.key} id={range.key} label={range.label} />
        );
      }
      return null;
    });
    return <Aux>{activeTotals}</Aux>;
  }
  render() {
    return (
      <div className={classes.Card} >
        <h3>Totals</h3>
        <Filters />
        <div className={classes.Main}>
          {this.renderCharts()}
        </div>
      </div>
    );
  }
}

Totals.propTypes = {
  totals: PropTypes.shape({
    biggest_ride_distance: PropTypes.number,
    recent_ride_totals: PropTypes.shape({}),
    recent_run_totals: PropTypes.shape({}),
    recent_swim_totals: PropTypes.shape({}),
    ytd_ride_totals: PropTypes.shape({}),
    ytd_run_totals: PropTypes.shape({}),
    ytd_swim_totals: PropTypes.shape({}),
    all_ride_totals: PropTypes.shape({}),
    all_run_totals: PropTypes.shape({}),
    all_swim_totals: PropTypes.shape({}),
  }).isRequired,
};

export default connect(({ totals }) => ({ totals }), actions)(Totals);
