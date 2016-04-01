import React from 'react';

import PlantPicture from './plant-picture.jsx';
import GrowthBar from './growth-bar.jsx';

function PlantInfo({ plant }) {
  const plantIcon = `assets/${plant.species}.svg`;
  return (
    <section className="plant-info">
      <PlantPicture
        plantId={plant._id}
        plantPicture={plant.plantPicture}
      />
      <GrowthBar
        plantedOn={plant.plantedOn}
        harvestOn={plant.harvestOn}
        plantIcon={plantIcon}
      />
    </section>
  );
}

PlantInfo.propTypes = {
  plant: React.PropTypes.object.isRequired
};

export default PlantInfo;
