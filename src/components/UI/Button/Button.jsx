import React from 'react';
import PropTypes from 'prop-types';

import classes from './Button.scss';

const Button = (props) => {
  const activeClass = props.active ? classes.Active : null;
  return (
    <button
      disabled={props.disabled}
      className={[classes.Button, classes[props.btnType], activeClass].join(' ')}
      onClick={props.clicked}
    >{props.children}
    </button>
  );
};

Button.propTypes = {
  active: PropTypes.bool,
  btnType: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
  clicked: PropTypes.func.isRequired,
};

Button.defaultProps = {
  active: false,
  btnType: null,
  disabled: false,
};

export default Button;
