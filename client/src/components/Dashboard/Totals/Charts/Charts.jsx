import React from 'react';
import PropTypes from 'prop-types';

import classes from './Charts.scss';
import PieChart from './PieChart/PieChart';
import Graph from './Graph/Graph';

const Charts = (props) => {
  return (
    <div className={classes.Content}>
      <h3>{`${props.label}`}</h3>
      <PieChart key={`${props.range}_piechart`} range={props.range} />
      <Graph key={`${props.range}_graph`} range={props.range} />
    </div>
  );
};

Charts.propTypes = {};

export default Charts;
