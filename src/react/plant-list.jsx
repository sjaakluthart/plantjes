import React from 'react';
import $ from 'jquery';
import moment from 'moment';

class PlantList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      plants: [],
      loading: true
    };
  }

  componentDidMount() {
    $.ajax({ url: '/plant-list' })
    .then((data) => {
      console.log(data);
      this.setState({ plants: data, loading: false });
    });
  }

  showPlant(plantId) {
    routie(`plant/${plantId}`);
  }

  showLoading() {
    return <p>Plant app is loading...</p>;
  }

  showContent() {
    return (
      <ul>
        {this.state.plants.map((plant, index) => {
          let boundClick = this.showPlant.bind(this, plant._id);
          return (
            <li onClick={boundClick} key={index}>
              <img src={`assets/${plant.species}.svg`} alt={plant.species} />
              <span className="name">
                {plant.name} {plant.species}
              </span>
              <span>
                Geplant op: {moment(plant.plantedOn).format('DD-MM-YY')}
              </span>
            </li>
          );
        })}
      </ul>
    );
  }

  render() {
    return (
      <section className="plant-list">
        <header>
          <h1>Plantjes</h1>
          <img src="assets/plant.svg" />
        </header>
        {this.state.loading ? this.showLoading() : this.showContent()}
      </section>
    );
  }
}

export default PlantList;
