// Modules
import React from 'react';
import { browserHistory, Link } from 'react-router';
import $ from 'jquery';
import moment from 'moment';

import text from './text.json';

// Material-UI
import { AppBar, Avatar, CircularProgress, List, ListItem } from 'material-ui';

class PlantList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      plants: [],
      loading: true,
      userId: '',
      username: ''
    };
  }

  componentWillMount() {
    $.ajax({ url: '/check-user' })
    .then((data) => {
      if (data.authorised) {
        if (!data.user.onBoard) {
          browserHistory.push('/on-boarding');
          return false;
        }
        this.setState({
          userId: data.user._id,
          username: data.user.username
        });
      } else {
        browserHistory.push('/login');
      }
    });
  }

  componentDidMount() {
    $.ajax({ url: '/plant-list' })
    .then((data) => {
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
          title={this.state.username ? `${this.state.username}'s Plantjes` : text.appTitle}
        />
        {this.state.loading ? this.showLoading() : this.showContent()}
      </section>
    );
  }
}

export default PlantList;
