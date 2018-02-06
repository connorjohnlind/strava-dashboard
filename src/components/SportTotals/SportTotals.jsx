import React from 'react';
import PropTypes from 'prop-types';

import classes from './SportTotals.scss';
import Total from './Total/Total';

const SportTotals = (props) => {
  const totals = props.totalTypes.map(totalType => (
    (props.recent)
      ? <Total key={`${totalType.key}_totals`} label={totalType.label} data={props[totalType.key]} />
      : null
  ));
  return (
    <div className={classes.Content}>
      <h3>{`${props.sport}`}</h3>
      {totals}
    </div>
  );
};

/* eslint-disable react/no-unused-prop-types */
SportTotals.propTypes = {
  sport: PropTypes.string.isRequired,
  totalTypes: PropTypes.arrayOf({
    label: PropTypes.string,
    key: PropTypes.string,
  }).isRequired,
  recent: PropTypes.shape({}).isRequired,
  ytd: PropTypes.shape({}).isRequired,
  all: PropTypes.shape({}).isRequired,
};
/* eslint-enable */

export default SportTotals;
