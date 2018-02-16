import React from 'react';
import { Route } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import Dashboard from './containers/Dashboard/Dashboard';

const App = () => (
  <Layout>
    <Route path="/" exact component={Dashboard} />
  </Layout>
);

export default App;
