// Modules
import React from 'react';
import { Link } from 'react-router';
import $ from 'jquery';
import moment from 'moment';

// Material-UI
import { AppBar, Avatar, CircularProgress, List, ListItem } from 'material-ui';

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

  showLoading() {
    return <CircularProgress className="loader" style={ { position: 'absolute' } } />;
  }

  showContent() {
    let style = {
      textTransform: 'capitalize'
    };
    return (
      <List>
        {this.state.plants.map(plant => (
          <Link to={`/plant/${plant._id}`} key={plant._id}>
            <ListItem
              primaryText={`${plant.name} ${plant.species}`}
              secondaryText={`Geplant op: ${moment(plant.plantedOn).format('DD-MM-YY')}`}
              leftAvatar={<Avatar src={`assets/${plant.species}.svg`} />}
              style={style}
            />
          </Link>
        ))}
      </List>
    );
  }

  render() {
    return (
      <section className="plant-list">
        <AppBar
          title="Plantjes"
          style={{
            backgroundColor: '#66BB6A'
          }}
        />
        {this.state.loading ? this.showLoading() : this.showContent()}
      </section>
    );
  }
}

export default PlantList;
