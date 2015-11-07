import React from 'react';
import { Router, Route, IndexRedirect } from 'react-router';
import App from './components/App.jsx';
import DocPage from './pages/DocPage.jsx';
import AuthPage from './pages/AuthPage.jsx';

export default (
  <Router>
    <Route path='/' component={App}>
      <IndexRedirect to='/documentation'/>
      <Route path='documentation' component={DocPage}/>
      <Route path='auth' component={AuthPage}/>
    </Route>
  </Router>
);
