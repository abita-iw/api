import React from 'react';
import ReactDOM, { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { RoutingContext, match} from 'react-router'
import { createLocation } from 'history';
import routes from './routes.jsx';
import Html from './components/Html';

export default function (req, res) {
  let location = createLocation(req.url);

  match({routes, location}, (error, redirectLocation, renderProps) => {
    if (redirectLocation)
      res.redirect(301, redirectLocation.pathname + redirectLocation.search);
    else if (error)
      res.status(500).send(error.message);
    else if (renderProps == null)
      res.status(404).send('Not found');
    else {
      let markup = renderToString(<RoutingContext {...renderProps}/>);
      let html = renderToStaticMarkup(<Html markup={markup}/>);
      res.send('<!DOCTYPE html>' + html);
    }
  });

  ////match({routes, location}, (error, redirectLocation, renderProps))
  //Router.run(routes, req.url, function (error, redirectLocation, renderProps) {
  //
  //  var markup = ReactDOM.renderToString(<Handler routerState={renderProps}/>);
  //  var html   = ReactDOM.renderToStaticMarkup(<Html title={title} markup={markup} />);
  //
  //  res.send('<!DOCTYPE html>' + html);
  //});
};
