import React, { Component } from 'react';
import PropTypes from 'prop-types';

const Bar = (props) => {
  return (
    <div
      onMouseEnter={() => props.mouseIn(props.value, props.category)}
      onMouseLeave={() => props.mouseOut()}
      className={props.className}
    />
  );
};

export default Bar;
