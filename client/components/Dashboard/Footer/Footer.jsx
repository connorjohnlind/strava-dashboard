import React from 'react';

import classes from './Footer.scss';

const Footer = () => {
  const d = new Date();
  return (
    <div className={classes.footer}>
      <p>Connor Lind &copy; {d.getFullYear()}</p>
      <p>Take a look under the hood on <a href="https://github.com/connorjohnlind/strava-dashboard">Github</a></p>
    </div>
  );
};

export default Footer;
