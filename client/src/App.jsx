import React from 'react';
import { Route } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import Dashboard from './components/Dashboard/Dashboard';

const App = () => (
  <Layout>
    <Route path="/" exact component={Dashboard} />
  </Layout>
);

export default App;
