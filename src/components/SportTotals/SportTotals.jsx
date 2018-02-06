import React from 'react';
import PropTypes from 'prop-types';

import classes from './SportTotals.scss';
import Total from './Total/Total';

const SportTotals = (props) => {
  const totals = props.totalTypes.map(totalType => (
    props[totalType.key]
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


SportTotals.propTypes = {
  sport: PropTypes.string.isRequired,
  totalTypes: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      key: PropTypes.string,
    }),
  ).isRequired,
  /* eslint-disable react/no-unused-prop-types */
  // from the Strava API v3, passed down from totalTypes
  recent: PropTypes.shape({}),
  ytd: PropTypes.shape({}),
  all: PropTypes.shape({}),
  /* eslint-enable */
};

SportTotals.defaultProps = {
  recent: null,
  ytd: null,
  all: null,
};

export default SportTotals;
