import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classes from './Chart.scss';

class Chart extends Component {
  renderSports() {
    return <p>Ride Count: {this.props.totals.ride.count}</p>
  }

  render() {
    return (
      <div className={classes.Content}>
        {this.renderSports()}
      </div>
    );
  }
}

Chart.propTypes = {
  totals: PropTypes.shape({

  }).isRequired,
};

export default Chart;
