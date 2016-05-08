import React from 'react';
import $ from 'jquery';

import text from './text.json';

import { browserHistory, Link } from 'react-router';
import {
  AppBar,
  Avatar,
  DatePicker,
  IconButton,
  ListItem,
  RaisedButton,
  SelectField,
  TextField
} from 'material-ui';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';

class AddPlant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      type: 'zaadje',
      species: 'sla',
      plantedOn: new Date(),
      name: '',
      canSubmit: false,
      moisture: 0,
      light: 1,
      temperture: 2
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleSpeciesChange = this.handleSpeciesChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  componentWillMount() {
    $.ajax({ url: '/checkUser' })
    .then((data) => {
      if (!data.authorised) {
        browserHistory.push('/login');
      } else {
        this.setState({
          userId: data.user._id
        });
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    $.ajax({
      method: 'POST',
      url: '/createPlant',
      data: {
        userId: this.state.userId,
        species: this.state.species,
        name: this.state.name,
        plantedOn: this.state.plantedOn,
        moisture: this.state.moisture,
        light: this.state.light,
        temperture: this.state.temperture
      }
    })
    .then(() => {
      browserHistory.push('/plants');
    });
  }

  handleNameChange(event) {
    this.setState({
      name: event.currentTarget.value
    });
  }

  handleTypeChange(event) {
    this.setState({ type: event.currentTarget.value });
  }

  handleSpeciesChange(event, index, value) {
    this.setState({ species: value });
  }

  handleDateChange(event, date) {
    // TODO format date in DD MM YYYY
    this.setState({ plantedOn: date });
  }

  handleBlur() {
    if (this.state.plantedOn && this.state.name) {
      this.setState({
        canSubmit: true
      });
    }
  }

  showDate() {
    if (this.state.type === 'zaadje') {
      return (
        <p>Plant je zaadje in een potje en zet 'm in het zonnetje.</p>
      );
    }

    return (
      <div>
        <p>{`Wanneer is je ${this.state.type} geplant?`}</p>
        <DatePicker
          hintText="Kies een datum"
          value={this.state.plantedOn}
          onChange={this.handleDateChange}
        />
      </div>
    );
  }

  render() {
    const buttonStyle = {
      margin: '1.4rem 5% 0',
      width: '40%'
    };
    return (
      <section className="add-plant">
        <AppBar
          title={text.addPlantTitle}
          iconElementLeft={
            <Link to={'/plants'}>
              <IconButton><NavigationArrowBack color="#FAFAFA" /></IconButton>
            </Link>
          }
        />
        <form onSubmit={this.handleSubmit} encType="multipart/form-data">
          <h1>{text.addPlantSubTitle}</h1>

          <p>Ik heb een:</p>
          <div>
            <RaisedButton
              style={buttonStyle}
              label="zaadje"
              value="zaadje"
              primary={this.state.type === 'zaadje'}
              onClick={this.handleTypeChange}
            />
            <RaisedButton
              style={buttonStyle}
              label="plantje"
              value="plantje"
              primary={this.state.type === 'plantje'}
              onClick={this.handleTypeChange}
            />
          </div>

          <p>{`Mijn ${this.state.type} is een:`}</p>
          <SelectField value={this.state.species} onChange={this.handleSpeciesChange}>
            <ListItem
              primaryText={`Sla ${this.state.type}`}
              leftAvatar={<Avatar src="assets/sla.svg" />}
              value="sla"
            />
            <ListItem
              primaryText={`Wortel ${this.state.type}`}
              leftAvatar={<Avatar src="assets/wortel.svg" />}
              value="wortel"
            />
            <ListItem
              primaryText={`Courgette ${this.state.type}`}
              leftAvatar={<Avatar src="assets/courgette.svg" />}
              value="courgette"
            />
            <ListItem
              primaryText={`Tomaat ${this.state.type}`}
              leftAvatar={<Avatar src="assets/tomaat.svg" />}
              value="tomaat"
            />
            <ListItem
              primaryText={`Aubergine ${this.state.type}`}
              leftAvatar={<Avatar src="assets/aubergine.svg" />}
              value="aubergine"
            />
            <ListItem
              primaryText={`Pompoen ${this.state.type}`}
              leftAvatar={<Avatar src="assets/pompoen.svg" />}
              value="pompoen"
            />
            <ListItem
              primaryText={`Ui ${this.state.type}`}
              leftAvatar={<Avatar src="assets/ui.svg" />}
              value="ui"
            />
          </SelectField>

          {this.showDate()}

          <p>{`Geef je ${this.state.type} een naam:`}</p>
          <TextField
            hintText={`Naam ${this.state.type}`}
            floatingLabelText={`Naam ${this.state.type}`}
            fullWidth
            onChange={this.handleNameChange}
            value={this.state.name}
            onBlur={this.handleBlur}
          />

          <RaisedButton
            className="button-submit"
            label="voeg toe"
            primary
            type="submit"
            disabled={!this.state.canSubmit}
          />
        </form>
      </section>
    );
  }

}

export default AddPlant;
