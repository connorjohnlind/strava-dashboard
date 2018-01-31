import React from 'react';
import { Link } from 'react-router-dom';

const Topbar = () => (
  <div>
    <Link to="/">Home</Link> | <Link to="/settings">Settings</Link>
  </div>
);

export default Topbar;
