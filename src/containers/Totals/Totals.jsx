import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import classes from './Totals.scss';
import SportTotal from '../../components/SportTotal/SportTotal';

class Totals extends Component {
  componentWillMount() {
  }
  render() {
    return (
      <div className={classes.Card} >
        <h3>Totals</h3>
        <p>{`Biggest Ride: ${this.props.totals.biggest_ride_distance}`}</p>
        <SportTotal
          sport="Rides"
          recent={this.props.totals.recent_ride_totals}
          ytd={this.props.totals.ytd_ride_totals}
          all={this.props.totals.all_ride_totals}
        />
        <SportTotal
          sport="Runs"
          recent={this.props.totals.recent_run_totals}
          ytd={this.props.totals.ytd_run_totals}
          all={this.props.totals.all_run_totals}
        />
        <SportTotal
          sport="Swims"
          recent={this.props.totals.recent_swim_totals}
          ytd={this.props.totals.ytd_swim_totals}
          all={this.props.totals.all_swim_totals}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  totals: state.auth.totals,
});

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

export default connect(mapStateToProps)(Totals);
