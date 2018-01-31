import React from 'react';
import { Link, Route } from 'react-router-dom';

import Home from './containers/Home/Home';
import Login from './components/Login/Login';
import Settings from './containers/Settings/Settings';

const App = () => (
  <div>
    <div>
      <Link to="/">Home</Link> | <Link to="/settings">Settings</Link>
    </div>
    <div>
      <Route path="/" exact component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/settings" component={Settings} />
    </div>
  </div>
);

export default App;
