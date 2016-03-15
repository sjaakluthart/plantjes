import React from 'react'
import ReactDOM from 'react-dom'
import {Layout} from './layout.jsx'

routie({
  ''() {
    ReactDOM.render(
      <Layout />,
      document.getElementById('app')
    );
  }
});
