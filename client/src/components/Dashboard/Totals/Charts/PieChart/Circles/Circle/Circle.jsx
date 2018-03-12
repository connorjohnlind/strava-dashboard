import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classes from './Circle.scss';

const Circle = (props) => {
  return (
    <circle {...props}></circle>
  );
};

export default Circle;
