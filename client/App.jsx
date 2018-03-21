import React from 'react';
import { Route } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import Dashboard from './components/Dashboard/Dashboard';
import Demo from './components/Demo/Demo';

const App = () => (
  <Layout>
    <Route path="/demo" exact component={Demo} />
    <Route path="/" exact component={Dashboard} />
  </Layout>
);

export default App;
