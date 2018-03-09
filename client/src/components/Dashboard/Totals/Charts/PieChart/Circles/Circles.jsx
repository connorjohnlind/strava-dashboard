import React from 'react';
import PropTypes from 'prop-types';
import Aux from '../../../../../hoc/Aux';

import classes from './Circles.scss';

const Circles = (props) => {
  const { data } = props;
  const { length } = Object.keys(data);
  if (length < 1) return null;

  const circles = [];
  const totalCount = Object.values(data).reduce((a, b) => a + b);
  let strokeSum = 0;

  for (let i = 0; i < length; i += 1) {
    const key = Object.keys(data)[i];

    const stroke = !Object.keys(data)[i + 1] // if this is the last key
      ? 100 - strokeSum // close the remainder of the pie chart
      : Math.floor((100 * data[key]) / totalCount); // else calculate the percent

    const remainder = 100 - stroke;
    const offset = (i === 0) ? 25 : (100 - strokeSum) + 25;

    circles.push(
      <circle
        key={`${key}_circle_${Math.random()}`}
        className={[classes.donutSegment, classes[key]].join(' ')} // add special styles for keys
        strokeDasharray={`${stroke} ${remainder}`}
        strokeDashoffset={`${offset}`}
      />,
    );
    strokeSum += stroke;
  }
  return (
    <Aux>
      <circle className={classes.donutHole} />
      {circles}
    </Aux>
  );
};

export default Circles;