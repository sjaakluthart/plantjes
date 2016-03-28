import React from 'react'
import $ from 'jquery'

import {Header} from './header.jsx'
import {PlantInfo} from './plant-info.jsx'
import {SensorData} from './sensor-data.jsx'

const Home = React.createClass({
  displayName: 'Home',

  getInitialState() {
    return {
      data: [],
      loading: true
    }
  },

  componentDidMount() {
    $.ajax({url: '/plant'})
    .then((data) => {
      console.log(data);
      this.setState({data: data[0], loading: false});
    });
  },

  showLoading() {
    return <p>Plant app is loading...</p>
  },

  showContent() {
    let src = `assets/${this.state.data.species}.jpg`;
    return (
      <div>
        <Header name={this.state.data.name} species={this.state.data.species} />
        <PlantInfo plant={this.state.data} />
        <SensorData sensorData={this.state.data.sensorReadings} />
      </div>
    );
  },

  render() {
    return (
      <section>
        {this.state.loading ? this.showLoading() : this.showContent()}
      </section>
    );
  }
});

export {Home}
