import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '../../../../../store/actions';
import classes from './Graph.scss';
import Bars from './Bars/Bars';
import Aux from '../../../../hoc/Aux';

import { sports } from '../../Filters/filterTypes';

class Graph extends Component {
  state = {
    distance: null,
    time: null,
  }
  // builds an object of categorgy objects with key: sport and value: value
  getCategories() {
    const { range, auth, demo } = this.props;
    const mode = !demo.demoLoading ? demo : auth; // check if in demo mode

    const distances = {};
    const times = {};

    sports.forEach((sport) => {
      const { key } = sport;
      if (this.props.filters[key]) {
        const { distance, moving_time } = mode.totals[`${range}_${sport.key}_totals`];
        distances[key] = distance * 0.000621371;
        times[key] = moving_time * 0.0166667;
      }
    });

    return { distances, times };
  }
  // callback functions to respond to bar hover states
  handleMouseIn = (value, category) => {
    if (category === 'distance') {
      this.setState({
        distance: value,
      });
    } else if (category === 'time') {
      this.setState({
        time: value,
      });
    }
  }
  handleMouseOut = () => {
    this.setState({ distance: null, time: null });
  }
  render() {
    const categories = this.getCategories();

    return (
      <div className={classes.content}>
        <div className={classes.category}>
          <Bars
            data={categories.distances}
            mouseIn={this.handleMouseIn}
            mouseOut={this.handleMouseOut}
            max={this.props.maximums.distance}
            category="distance"
          />
          <p className={classes.label}>
            {this.state.distance ? `${this.state.distance.toFixed(1)} mi` : 'Distance'}
          </p>
        </div>
        <div className={classes.category}>
          <Bars
            data={categories.times}
            mouseIn={this.handleMouseIn}
            mouseOut={this.handleMouseOut}
            max={this.props.maximums.time}
            category="time"
          />
          <p>
            {this.state.time ? `${(this.state.time / 60).toFixed(1)} hr` : 'Time'}
          </p>
        </div>
      </div>
    );
  }
}

export default connect(({ auth, filters, demo }) => ({ auth, filters, demo }), actions)(Graph);
