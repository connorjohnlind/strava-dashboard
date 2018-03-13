import React from 'react';
import PropTypes from 'prop-types';

const Circle = props => (
  <circle
    onMouseEnter={() => props.mouseIn(props.value, props.units)}
    onMouseLeave={() => props.mouseOut()}
    className={props.className}
    strokeDasharray={props.strokeDasharray}
    strokeDashoffset={props.strokeDashoffset}
  />
);

Circle.propTypes = {
  className: PropTypes.string.isRequired,
  mouseIn: PropTypes.func.isRequired,
  mouseOut: PropTypes.func.isRequired,
  strokeDasharray: PropTypes.string.isRequired,
  strokeDashoffset: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  units: PropTypes.string.isRequired,
};

export default Circle;
