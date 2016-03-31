import React from 'react';
import ReactDOM from 'react-dom';

import Layout from './layout.jsx';
import PlantList from './plant-list.jsx';
import Plant from './plant.jsx';

routie({
  ''() {
    ReactDOM.render(
      <Layout>
        <PlantList />
      </Layout>,
      document.getElementById('app')
    );
  },

  'plant/:plantId'(plantId) {
    ReactDOM.render(
      <Layout>
        <Plant plantId={plantId} />
      </Layout>,
      document.getElementById('app')
    );
  }
});
