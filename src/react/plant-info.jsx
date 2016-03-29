import React from 'react'
import moment from 'moment'

import {PlantPicture} from './plant-picture.jsx'
import {GrowthBar} from './growth-bar.jsx'

const PlantInfo = React.createClass({
  displayName: 'PlantInfo',

  render() {
    let src = `assets/${this.props.plant.species}.jpg`;
    let plantIcon = `assets/${this.props.plant.species}.svg`;
    return (
      <section className="plant-info">
        <PlantPicture plantId={this.props.plant._id} plantPicture={this.props.plant.plantPicture} />
        <GrowthBar plantedOn={this.props.plant.plantedOn} harvestOn={this.props.plant.harvestOn} plantIcon={plantIcon}/>
      </section>
    );
  }
});

export {PlantInfo}
