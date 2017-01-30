// @flow
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import WordClock from './containers/WordClock';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={WordClock} />
  </Route>
);
