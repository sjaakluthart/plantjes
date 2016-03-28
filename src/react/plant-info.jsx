import React from 'react'
import moment from 'moment'

import {GrowthBar} from './growth-bar.jsx'

const PlantInfo = React.createClass({
  displayName: 'PlantInfo',

  render() {
    let src = `assets/${this.props.plant.species}.jpg`;
    let plantIcon = `assets/${this.props.plant.species}.svg`;
    return (
      <section className="plant-info">
        <img className="plant-picture" src={src} />
        <GrowthBar plantedOn={this.props.plant.plantedOn} harvestOn={this.props.plant.harvestOn} plantIcon={plantIcon}/>
      </section>
    );
  }
});

export {PlantInfo}
