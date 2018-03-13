import React from 'react';
import PropTypes from 'prop-types';

import classes from './Charts.scss';
import PieChart from './PieChart/PieChart';
import Graph from './Graph/Graph';

const Charts = props => (
  <div className={classes.content}>
    <h3 className={classes.title}>{`${props.label}`}</h3>
    <PieChart key={`${props.range}_piechart`} range={props.range} />
    <Graph key={`${props.range}_graph`} range={props.range} maximums={props.maximums} />
  </div>
);

Charts.propTypes = {
  label: PropTypes.string.isRequired,
  maximums: PropTypes.shape({}).isRequired,
  range: PropTypes.string.isRequired,
};

export default Charts;
