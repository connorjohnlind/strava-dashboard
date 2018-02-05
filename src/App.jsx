import React from 'react';
import { Route } from 'react-router-dom';

import Layout from './layout/Layout';
import Dashboard from './containers/Dashboard/Dashboard';

const App = () => (
  <Layout>
    <Route path="/" exact component={Dashboard} />
  </Layout>
);

export default App;
