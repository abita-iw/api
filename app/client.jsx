import React from 'react';
import { render } from 'react-dom';
import { createHistory } from 'history';
import Router from 'react-router';
import routes from './routes.jsx';

let history = createHistory();

document.addEventListener("DOMContentLoaded", function() {
  render(<Router history={history} routes={routes}/>, document.getElementById('content'));
});
