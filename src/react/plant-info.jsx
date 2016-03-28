import React from 'react'
import moment from 'moment'

const PlantInfo = React.createClass({
  displayName: 'PlantInfo',

  render() {
    let src = `assets/${this.props.plant.species}.jpg`;
    return (
      <section className="plant-info">
        <img className="plant-picture" src={src} />
        <p><strong>Geplant op:</strong> {moment(this.props.plant.plantedOn).format('DD-MM-YYYY')}</p>
      </section>
    );
  }
});

export {PlantInfo}
