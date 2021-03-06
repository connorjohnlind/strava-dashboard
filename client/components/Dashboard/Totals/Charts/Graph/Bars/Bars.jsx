import React from 'react';
import PropTypes from 'prop-types';
import Bar from './Bar/Bar';

import classes from './Bars.scss';

const Bars = (props) => {
  const { data } = props;
  // if (Object.keys(data).length < 1) return null;
  const entries = Object.entries(data);

  const bars = entries.map((entry) => {
    const key = entry[0];
    const barData = entry[1];
    let percent = ((barData / props.max) * 100).toFixed();
    if (+percent === 0) percent = '1';
    return (
      <Bar
        key={`${key}_bar_${Math.random()}`}
        className={[classes[`value-${percent}`], classes[key]].join(' ')}
        mouseIn={props.mouseIn}
        mouseOut={props.mouseOut}
        value={barData}
        category={props.category}
      />
    );
  });

  const style = { gridTemplateColumns: `repeat(${bars.length}, 1fr)` };

  return (
    <div style={style} className={classes.graph}>
      {bars}
    </div>
  );
};

Bars.propTypes = {
  category: PropTypes.string.isRequired,
  data: PropTypes.shape({}).isRequired,
  max: PropTypes.number.isRequired,
  mouseIn: PropTypes.func.isRequired,
  mouseOut: PropTypes.func.isRequired,
};

export default Bars;
