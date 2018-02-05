import React from 'react';
import PropTypes from 'prop-types';

import classes from './Summary.scss';
import Profile from './Profile/Profile';
import Totals from './Totals/Totals';

const Summary = props => (
  <div className={classes.Card} >
    <Profile athlete={props.athlete} />
    <Totals totals={props.totals} />
  </div>
);

Summary.propTypes = {
  athlete: PropTypes.shape({}),
  totals: PropTypes.shape({}),
};

Summary.defaultProps = {
  athlete: null,
  totals: null,
};

export default Summary;
