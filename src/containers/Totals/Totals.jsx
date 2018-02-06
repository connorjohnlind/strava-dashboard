import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classes from './Totals.scss';
import Button from '../../components/UI/Button/Button';
import SportTotals from '../../components/SportTotals/SportTotals';
import Total from '../../components/SportTotals/Total/Total';

// label is rendered in DOM, key mirrors the Strava API
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
  // receives the redux data retrieved from Strava as a totals prop
  // local state manages the UI of showing/hiding the data
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

    // iterate through the sportTypes array to create charts
    // note: duplicated iterators from the above components for easier readibility
    const sportTotals = sportTypes.map((sportType) => {
      if (this.state[sportType.key]) {
        const totals = totalTypes.map(totalType => (
          this.state[totalType.key]
            ? <Total key={`${totalType.key}_totals`} label={totalType.label} data={this.props.totals[`${totalType.key}_${sportType.key}_totals`]} />
            : null
        ));
        return (
          <SportTotals
            key={`${sportType.key}_total`}
            sport={sportType.label}
            totalTypes={totalTypes}
          >
            {totals}
          </SportTotals>
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

Totals.propTypes = {
  // from the Strava API v3
  // the above sportTypes and totalTypes arrays copy this strucutre
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

export default Totals;

// const dynamicProps = {};
// totalTypes.forEach((totalType) => {
//   this.state[totalType.key]
//     ? dynamicProps[totalType.key] = this.props.totals[`${totalType.key}_${sportType.key}_totals`]
//     : null
// });
