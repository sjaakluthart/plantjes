import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

import Layout from './layout.jsx';
import PlantList from './plant-list.jsx';
import Plant from './plant.jsx';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={PlantList} />
      <Route path="/plant/:plantId" component={Plant}/>
    </Route>
  </Router>
), document.getElementById('app'))

// routie({
//   ''() {
//     ReactDOM.render(
//       <Layout>
//         <PlantList />
//       </Layout>,
//       document.getElementById('app')
//     );
//   },
//
//   'plant/:plantId'(plantId) {
//     ReactDOM.render(
//       <Layout>
//         <Plant plantId={plantId} />
//       </Layout>,
//       document.getElementById('app')
//     );
//   }
// });
