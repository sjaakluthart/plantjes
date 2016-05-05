import React from 'react';
import $ from 'jquery';

import { browserHistory, Link } from 'react-router';

import { AppBar, CircularProgress, IconButton, Paper } from 'material-ui';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';

import PlantPicture from './plant-picture.jsx';
import GrowthBar from './growth-bar.jsx';
import Levels from './levels.jsx';

class Plant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true
    };
  }

  componentWillMount() {
    $.ajax({ url: '/checkUser' })
    .then((data) => {
      if (data.authorised) {
        this.setState({
          userId: data.user._id,
          username: data.user.username
        });
        this.getData();
      } else {
        browserHistory.push('/login');
      }
    });
  }

  getData() {
    $.ajax({
      url: '/plantData',
      data: { plantId: this.props.params.plantId }
    })
    .then((data) => {
      this.setState({ data, loading: false });
    });
  }

  showLoading() {
    return <CircularProgress className="loader" style={{ position: 'absolute' }} />;
  }

  showMessage() {
    return (
      <p>
        <span className="name">{this.state.data.name}</span> heeft erg veel dorst en het een beetje koud, geef <span className="name">{this.state.data.name}</span> wat te drinken en zet 'm op een warmer plekje.
      </p>
    );
  }

  showContent() {
    const style = {
      padding: '20px',
      marginBottom: '15px'
    };

    const plantIcon = `/assets/${this.state.data.species}.svg`;
    return (
      <div className="plant">
        <Paper style={style}>
          {this.showMessage()}
        </Paper>
        <PlantPicture
          plantId={this.state.data._id}
          plantPicture={this.state.data.plantPicture}
        />
        <GrowthBar
          plantedOn={this.state.data.plantedOn}
          harvestOn={this.state.data.harvestOn}
          plantIcon={plantIcon}
        />
        <Levels
          sensorData={this.state.data.sensorReadings}
          referenceValues={this.state.data.referenceValues}
        />
      </div>
    );
  }

  render() {
    return (
      <section>
        <AppBar
          title={
            this.state.loading
            ? 'Plant wordt geladen...'
            : `${this.state.data.name} ${this.state.data.species}`
          }
          style={{
            textTransform: 'capitalize'
          }}
          iconElementLeft={
            <Link to={'/plants'}>
              <IconButton><NavigationArrowBack color="#FAFAFA" /></IconButton>
            </Link>
          }
        />
        {this.state.loading ? this.showLoading() : this.showContent()}
      </section>
    );
  }
}

Plant.propTypes = {
  params: React.PropTypes.object.isRequired
};

export default Plant;
