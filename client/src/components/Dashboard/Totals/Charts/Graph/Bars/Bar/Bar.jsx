import React from 'react';
import PropTypes from 'prop-types';

const Bar = props => (
  <div
    onMouseEnter={() => props.mouseIn(props.value, props.category)}
    onMouseLeave={() => props.mouseOut()}
    className={props.className}
  />
);

Bar.propTypes = {
  category: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  mouseIn: PropTypes.func.isRequired,
  mouseOut: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
};

export default Bar;
