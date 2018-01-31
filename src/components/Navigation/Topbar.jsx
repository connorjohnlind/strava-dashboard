import React from 'react';
import { Link } from 'react-router-dom';

const Topbar = () => (
  <div>
    <Link to="/">Dashboard</Link> | <Link to="/logout">Logout</Link>
  </div>
);

export default Topbar;
