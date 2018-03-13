import React from 'react';
import PropTypes from 'prop-types';
import Aux from '../../../../../hoc/Aux';

import classes from './Circles.scss';
import Circle from './Circle/Circle';

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
      <Circle
        key={`${key}_circle_${Math.random()}`}
        className={[classes.donutSegment, classes[key]].join(' ')} // add special styles for keys
        strokeDasharray={`${stroke} ${remainder}`}
        strokeDashoffset={`${offset}`}
        mouseIn={props.mouseIn}
        mouseOut={props.mouseOut}
        value={data[key]}
        units={key}
      />,
    );
    strokeSum += stroke;
  }
  return (
    <Aux>
      <circle className={classes.donutHole} />
      {circles}
      <circle
        key="animated_circle"
        className={[classes.donutSegment, classes.animated].join(' ')} // add special styles for keys
        strokeDasharray="0 100"
        strokeDashoffset="25"
      />
    </Aux>
  );
};

Circles.propTypes = {
  data: PropTypes.shape({}).isRequired,
  mouseIn: PropTypes.func.isRequired,
  mouseOut: PropTypes.func.isRequired,
};

export default Circles;
