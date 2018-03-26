import React from 'react';
import { Route } from 'react-router-dom';
import { hot } from 'react-hot-loader';

import Layout from './components/Layout/Layout';
import Dashboard from './components/Dashboard/Dashboard';
import Demo from './components/Demo/Demo';

const example = () => (
  <div>Example</div>
)

const App = () => (
  <Layout>
    <Route path="/" exact component={Dashboard} />
    <Route path="/demo" component={Demo} />
  </Layout>
);

export default hot(module)(App);
