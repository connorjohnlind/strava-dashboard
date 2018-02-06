import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import classes from './Totals.scss';
import Button from '../../components/UI/Button/Button';
import SportTotals from '../../components/SportTotals/SportTotals';

const sportTypes = [
  { label: 'Rides', key: 'ride' },
  { label: 'Runs', key: 'run' },
  { label: 'Swims', key: 'swim' },
];

const totalTypes = [
  { label: 'Recent', key: 'recent' },
  { label: 'YTD', key: 'ytd' },
  { label: 'All', key: 'all' },
];

class Totals extends Component {
  // redux imports the data retrieved from Strava
  // local state manages the UI of showing/hiding data
  state = {
    ride: true, // must be exactly identical to the sportTypes key
    run: true,
    swim: true,
    recent: true, // must be exactly identical to the totalTypes key
    ytd: true,
    all: true,
  }
  render() {
    // iterate through the sportTypes array to create buttons
    const sportButtons = sportTypes.map(sportType => (
      <Button
        key={`${sportType.key}_button`}
        clicked={() => { this.setState({ [sportType.key]: !this.state[sportType.key] }); }}
      >{sportType.label}
      </Button>
    ));

    // iterate through the totalTypes array to create buttons
    const totalsButtons = totalTypes.map(totalType => (
      <Button
        key={`${totalType.key}_button`}
        clicked={() => { this.setState({ [totalType.key]: !this.state[totalType.key] }); }}
      >{totalType.label}
      </Button>
    ));

    // iterate through the sportTypes array to create buttons and charts
    const sportTotals = sportTypes.map((sportType) => {
      if (this.state[sportType.key]) {
        return (
          <SportTotals
            key={`${sportType.key}_total`}
            sport={sportType.label}
            totalTypes={totalTypes}
            recent={this.state.recent ? this.props.totals[`recent_${sportType.key}_totals`] : null}
            ytd={this.state.ytd ? this.props.totals[`ytd_${sportType.key}_totals`] : null}
            all={this.state.all ? this.props.totals[`all_${sportType.key}_totals`] : null}
          />
        );
      }
      return null;
    });

    return (
      <div className={classes.Card} >
        <h3>Totals</h3>
        {sportButtons}
        {totalsButtons}
        {sportTotals}
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
