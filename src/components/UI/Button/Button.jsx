import React from 'react';
import PropTypes from 'prop-types';

import classes from './Button.scss';

const Button = props => (
  <button
    disabled={props.disabled}
    className={[classes.Button, classes[props.btnType]].join(' ')}
    onClick={props.clicked}
  >{props.children}
  </button>
);

Button.propTypes = {
  btnType: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
  clicked: PropTypes.func.isRequired,
};

Button.defaultProps = {
  btnType: '',
  disabled: false,
};

export default Button;
