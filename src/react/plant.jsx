import React from 'react';
import $ from 'jquery';

import Header from './header.jsx';
import PlantInfo from './plant-info.jsx';
import Levels from './levels.jsx';

const Plant = React.createClass({
  displayName: 'Plant',

  propTypes: {
    plantId: React.PropTypes.string.isRequired
  },

  getInitialState() {
    return {
      data: [],
      loading: true
    };
  },

  componentDidMount() {
    $.ajax({
      url: '/plant',
      data: { plantId: this.props.plantId }
    })
    .then((data) => {
      console.log(data);
      this.setState({ data, loading: false });
    });
  },

  showLoading() {
    return <p>Plant app is loading...</p>;
  },

  showContent() {
    return (
      <div className="plant">
        <Header name={this.state.data.name} species={this.state.data.species} />
        <PlantInfo plant={this.state.data} />
        <p>
          <span className="name">{this.state.data.name}</span> heeft erg veel dorst en het een beetje koud, geef <span className="name">{this.state.data.name}</span> wat te drinken en zet 'm op een warmer plekje.
        </p>
        <Levels
          sensorData={this.state.data.sensorReadings}
          referenceValues={this.state.data.referenceValues}
        />
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

export default Plant;
