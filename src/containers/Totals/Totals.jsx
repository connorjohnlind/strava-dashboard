import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import classes from './Totals.scss';
import Button from '../../components/UI/Button/Button';
import SportTotal from '../../components/SportTotal/SportTotal';

const sports = [
  { label: 'Rides', key: 'ride' },
  { label: 'Runs', key: 'run' },
  { label: 'Swims', key: 'swim' },
];

class Totals extends Component {
  state = {
    ride: true, // must be exactly identical to the sports key
    run: true,
    swim: true,
  }
  render() {
    const totals = sports.map((sport) => {
      if (this.state[sport.key]) {
        return (
          <SportTotal
            key={sport.key}
            sport={sport.label}
            recent={this.props.totals[`recent_${sport.key}_totals`]}
            ytd={this.props.totals[`ytd_${sport.key}_totals`]}
            all={this.props.totals[`all_${sport.key}_totals`]}
          />
        );
      }
      return null;
    });
    return (
      <div className={classes.Card} >
        <h3>Totals</h3>
        <Button clicked={() => { this.setState({ ride: !this.state.ride }); }}>Rides</Button>
        <Button clicked={() => { this.setState({ run: !this.state.run }); }}>Runs</Button>
        <Button clicked={() => { this.setState({ swim: !this.state.swim }); }}>Swims</Button>
        {/* <Button clicked={() => { this.setState({ ride: !this.state.ride }); }}>Recent</Button>
        <Button clicked={() => { this.setState({ ride: !this.state.ride }); }}>YTD</Button>
        <Button clicked={() => { this.setState({ ride: !this.state.ride }); }}>All</Button> */}
        {totals}
        <p>{`Biggest Ride: ${this.props.totals.biggest_ride_distance}`}</p>
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
