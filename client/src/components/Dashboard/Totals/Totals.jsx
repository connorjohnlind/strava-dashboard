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
      if (this.props.filters[range.key]) {
        return (
          <Charts key={range.key} range={range.key} label={range.label} />
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
        <div className={classes.Main}>{this.renderCharts()}</div>
      </div>
    );
  }
}

Totals.propTypes = {
  filters: PropTypes.shape({
  }).isRequired,
};

export default connect(({ filters }) => ({ filters }), actions)(Totals);
