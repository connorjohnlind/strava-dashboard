import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '../../../../../store/actions';
import classes from './Graph.scss';
import Bars from './Bars/Bars';
import Aux from '../../../../hoc/Aux';

import { sports } from '../../Filters/filterTypes';

class Graph extends Component {
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

    return [distances, times];
  }
  render() {
    const categories = this.getCategories();

    return (
      <div className={classes.Content}>
        <Bars label="Distance" data={categories[0]} max={Math.max(...Object.values(categories[0]))} />
        <Bars label="Time" data={categories[1]} max={Math.max(...Object.values(categories[1]))} />
      </div>
    );
  }
}

Graph.propTypes = {
  filters: PropTypes.shape({

  }),
};

export default connect(({ auth, filters, demo }) => ({ auth, filters, demo }), actions)(Graph);
