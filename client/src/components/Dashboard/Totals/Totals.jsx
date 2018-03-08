import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classes from './Totals.scss';
import Button from '../../UI/Button/Button';
import Filters from '../../UI/Filters/Filters';
import Chart from './Total/Chart/Chart';
import Total from './Total/Total';
import Aux from '../../hoc/Aux';

// label is rendered in DOM, key mirrors the Strava API
const sportTypes = [
  { label: 'Rides', key: 'ride' },
  { label: 'Runs', key: 'run' },
  { label: 'Swims', key: 'swim' },
];

const totalTypes = [
  { label: 'Month', key: 'recent' },
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
  componentWillMount() {
    const localStorageState = JSON.parse(localStorage.getItem('totalsFilter'));
    this.setState({ ...this.state, ...localStorageState });
  }
  renderMenuButtons() {
    localStorage.setItem('totalsFilter', JSON.stringify({ ...this.state }));
    // iterate through the sportTypes array to create buttons
    const sportButtons = sportTypes.map(sportType => (
      <Button
        key={`${sportType.key}_button`}
        active={this.state[sportType.key]}
        btnType="Filter"
        clicked={() => { this.setState({ [sportType.key]: !this.state[sportType.key] }); }}
      >{sportType.label}
      </Button>
    ));

    // iterate through the totalTypes array to create buttons
    const totalsButtons = totalTypes.map(totalType => (
      <Button
        key={`${totalType.key}_button`}
        active={this.state[totalType.key]}
        btnType="Filter"
        clicked={() => { this.setState({ [totalType.key]: !this.state[totalType.key] }); }}
      >{totalType.label}
      </Button>
    ));

    return <Aux>{sportButtons}{totalsButtons}</Aux>;
  }
  renderTotals() {
    let chart = null;
    const activeSports = [];
    sportTypes.forEach((sportType) => {
      if (this.state[sportType.key]) {
        activeSports.push(sportType.key);
      }
    });

    const totals = totalTypes.map((totalType) => {
      // loop through totaltypes, render a Total if found
      if (this.state[totalType.key]) {
        const data = {};

        activeSports.forEach((sport) => {
          data[sport] = this.props.totals[`${totalType.key}_${sport}_totals`];
        });

        chart = (
          <Chart
            key={`${totalType.key}_totals_chart`}
            label={totalType.label}
            totals={data}
          />
        );
        return (
          <Total
            key={`${totalType.key}_totals`}
            type={totalType.label}
            sportTypes={sportTypes}
          >
            {chart}
          </Total>
        );
      }
      return null;
    });
    return <Aux>{totals}</Aux>;
  }
  render() {
    return (
      <div className={classes.Card} >
        <h3>Totals</h3>
        <Filters>{this.renderMenuButtons()}</Filters>
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

export default Totals;
