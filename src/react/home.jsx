import React from 'react'
import $ from 'jquery'

import {List} from './list.jsx'

const Home = React.createClass({
  displayName: 'Home',

  getInitialState() {
    return {
      data: []
    }
  },

  componentDidMount() {
    $.ajax({url: '/test'})
    .then((data) => {
      this.setState({data});
    });
  },

  render() {
    return (
      <section>
        <h1>Plantjes</h1>
        <h2>Graduation Project, Communication &amp; Multimedia Design, Amsterdam University of Applied Sciences</h2>
        <img src="assets/plant.svg" />
        <List data={this.state.data} />
      </section>
    );
  }
});

export {Home}
