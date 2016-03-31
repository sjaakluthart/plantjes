import React from 'react';

import PlantPicture from './plant-picture.jsx';
import GrowthBar from './growth-bar.jsx';

const PlantInfo = React.createClass({
  displayName: 'PlantInfo',

  propTypes: {
    plant: React.PropTypes.object.isRequired
  },

  render() {
    let plantIcon = `assets/${this.props.plant.species}.svg`;
    return (
      <section className="plant-info">
        <PlantPicture plantId={this.props.plant._id} plantPicture={this.props.plant.plantPicture} />
        <GrowthBar plantedOn={this.props.plant.plantedOn} harvestOn={this.props.plant.harvestOn} plantIcon={plantIcon} />
      </section>
    );
  }
});

export default PlantInfo;
