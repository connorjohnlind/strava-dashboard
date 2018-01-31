import React from 'react';
import { Route } from 'react-router-dom';

import Layout from './layout/Layout';
import Dashboard from './containers/Dashboard/Dashboard';
import Login from './components/Login/Login';
import Logout from './containers/Logout/Logout';

const App = () => (
  <Layout>
    <Route path="/" exact component={Dashboard} />
    <Route path="/login" component={Login} />
    <Route path="/logout" component={Logout} />
  </Layout>
);

export default App;
