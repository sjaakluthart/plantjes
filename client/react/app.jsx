import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Layout from './layout.jsx';
import Home from './home.jsx';
import Register from './register.jsx';
import OnBoarding from './on-boarding.jsx';
import PlantList from './plant-list.jsx';
import Plant from './plant.jsx';

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Home} />
      <Route path="/register" component={Register} />
      <Route path="/on-boarding" component={OnBoarding} />
      <Route path="/plants" component={PlantList} />
      <Route path="/plant/:plantId" component={Plant} />
    </Route>
  </Router>
), document.getElementById('app'));
