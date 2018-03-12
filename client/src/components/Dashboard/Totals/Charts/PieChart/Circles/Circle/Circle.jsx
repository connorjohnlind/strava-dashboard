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

export default Circle;
