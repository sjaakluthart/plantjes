import React from 'react';
import $ from 'jquery';

import { Link } from 'react-router';

import { AppBar, ActionHome, CircularProgress, IconButton, SvgIcon } from 'material-ui';
import NavigationArrowBack from 'material-ui/lib/svg-icons/navigation/arrow-back';

import Header from './header.jsx';
import PlantInfo from './plant-info.jsx';
import Levels from './levels.jsx';

class Plant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true
    };
  }

  componentDidMount() {
    $.ajax({
      url: '/plant',
      data: { plantId: this.props.params.plantId }
    })
    .then((data) => {
      console.log(data);
      this.setState({ data, loading: false });
    });
  }

  showLoading() {
    return <CircularProgress className="loader" style={{position: 'absolute'}} />;
  }

  showContent() {
    return (
      <div className="plant">
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
  }

  render() {
    return (
      <section>
        <AppBar
          title={this.state.loading ? 'Plant wordt geladen...' : `${this.state.data.name} ${this.state.data.species}`}
          style={{
            backgroundColor: '#66BB6A',
            textTransform: 'capitalize'
          }}
          iconElementLeft={
            <Link to={''}>
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
