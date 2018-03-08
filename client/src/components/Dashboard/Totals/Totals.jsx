import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions';
import classes from './Totals.scss';
import Filters from './Filters/Filters';
import Chart from './Total/Chart/Chart';
import Total from './Total/Total';
import Aux from '../../hoc/Aux';

import { sportTypes, rangeTypes } from './Filters/filterTypes';

class Totals extends Component {
  componentWillMount() {
    // const localStorageState = JSON.parse(localStorage.getItem('totalsFilter'));
    // this.setState({ ...this.state, ...localStorageState });
  }
  renderTotals() {
    const chart = null;
    const activeTotals = rangeTypes.map((range) => {
      if (this.props.totals[range.key]) {
        return (
          <Total
            key={`${range.key}_totals`}
            type={range.key}
          >
            {chart}
          </Total>
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
          {this.renderTotals()}
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
