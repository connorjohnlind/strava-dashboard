import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '../../../../store/actions';
import classes from './Filters.scss';
import Button from '../../../UI/Button/Button';

import { sportTypes, rangeTypes } from './filterTypes';

const Filters = (props) => {
  // localStorage.setItem('totalsFilter', JSON.stringify({ ...this.state }));

  // iterate through the sportTypes array to create buttons
  const sportButtons = sportTypes.map(sportType => (
    <Button
      key={`${sportType.key}_button`}
      active={props.filters[sportType.key]===true}
      btnType="Filter"
      clicked={() => { props.toggleFilter(sportType.key); }}
    >{sportType.label}
    </Button>
  ));

  // iterate through the totalTypes array to create buttons
  const rangeButtons = rangeTypes.map(rangeType => (
    <Button
      key={`${rangeType.key}_button`}
      active={props.filters[rangeType.key]===true}
      btnType="Filter"
      clicked={() => { props.toggleFilter(rangeType.key); }}
    >{rangeType.label}
    </Button>
  ));

  return <div className={classes.Content}>{sportButtons}{rangeButtons}</div>;
};

export default connect(({ filters }) => ({ filters }), actions)(Filters);
