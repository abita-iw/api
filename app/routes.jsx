import React from 'react';
import { Router, Route, DefaultRoute } from 'react-router';
import App from './components/App.jsx';
import DocPage from './pages/DocPage.jsx';

export default (
  <Route path='/' component={App}>
    <Route path='documentation' component={DocPage}/>
  </Route>
);
