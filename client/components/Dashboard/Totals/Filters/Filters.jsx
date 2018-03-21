import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '../../../../store/actions';
import classes from './Filters.scss';
import Button from '../../../UI/Button/Button';

import { sports, ranges } from './filterTypes';

const Filters = (props) => {
  // iterate through the sports array to create buttons
  const sportButtons = sports.map(sportType => (
    <Button
      key={`${sportType.key}_button`}
      active={props.filters[sportType.key] === true}
      btnType={sportType.key ? sportType.key : 'filter'}
      clicked={() => { props.toggleFilter(sportType.key); }}
    >{sportType.label}
    </Button>
  ));

  // iterate through the ranges array to create buttons
  const rangeButtons = ranges.map(rangeType => (
    <Button
      key={`${rangeType.key}_button`}
      active={props.filters[rangeType.key] === true}
      btnType="filter"
      clicked={() => { props.toggleFilter(rangeType.key); }}
    >{rangeType.label}
    </Button>
  ));

  return <div className={classes.content}>{sportButtons}{rangeButtons}</div>;
};

Filters.propTypes = {
  filters: PropTypes.shape({}).isRequired,
};

export default connect(({ filters }) => ({ filters }), actions)(Filters);
