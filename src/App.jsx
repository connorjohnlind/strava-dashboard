import React from 'react';
import { Route } from 'react-router-dom';

import Layout from './layout/Layout';
import Home from './containers/Home/Home';
import Login from './components/Login/Login';
import Settings from './containers/Settings/Settings';

const App = () => (
  <Layout>
    <Route path="/" exact component={Home} />
    <Route path="/login" component={Login} />
    <Route path="/settings" component={Settings} />
  </Layout>
);

export default App;
