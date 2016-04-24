import React from 'react';
import $ from 'jquery';

import text from './text.json';

import { browserHistory, Link } from 'react-router';
import {
  AppBar,
  DatePicker,
  Divider,
  IconButton,
  MenuItem,
  RaisedButton,
  SelectField,
  TextField
} from 'material-ui';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';

class AddPlant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'zaadje',
      species: 'sla',
      plantedOn: '',
      name: '',
      canSubmit: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleSpeciesChange = this.handleSpeciesChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    console.log('bla')
  }

  handleNameChange(event) {
    this.setState({
      name: event.currentTarget.value
    });
  }

  handleTypeChange(event, index, value) {
    this.setState({ type: value });
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

  render() {
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
          <SelectField value={this.state.type} onChange={this.handleTypeChange}>
            <MenuItem value={'zaadje'} primaryText="zaadje" />
            <MenuItem value={'plantje'} primaryText="plantje" />
          </SelectField>

          <p>{`Mijn ${this.state.type} is een:`}</p>
          <SelectField value={this.state.species} onChange={this.handleSpeciesChange}>
            <MenuItem value={'sla'} primaryText={`sla ${this.state.type}`} />
            <MenuItem value={'wortel'} primaryText={`wortel ${this.state.type}`} />
          </SelectField>

          <p>{`Wanneer is je ${this.state.type} geplant?`}</p>
          <DatePicker
            hintText="Kies een datum"
            value={this.state.plantedOn}
            onChange={this.handleDateChange}
          />

          <p>{`Geef je ${this.state.type} een naam:`}</p>
          <TextField
            hintText={`Naam ${this.state.type}`}
            floatingLabelText={`Naam ${this.state.type}`}
            fullWidth
            onChange={this.handleNameChange}
            onBlur={this.handleBlur}
          />

          <h2>Sensoren</h2>
          <Divider />
          <h3>{text.addPlantSubTitle2}</h3>

          <TextField
            hintText="Vocht sensor pin nummer"
            floatingLabelText="Vocht sensor pin nummer"
            type="number"
            fullWidth
            onChange={this.handleNameChange}
            onBlur={this.handleBlur}
          />
          <TextField
            hintText="Licht sensor pin nummer"
            floatingLabelText="Licht sensor pin nummer"
            type="number"
            fullWidth
            onChange={this.handleNameChange}
            onBlur={this.handleBlur}
          />
          <TextField
            hintText="Temperatuur sensor pin nummer"
            floatingLabelText="Temperatuur sensor pin nummer"
            type="number"
            fullWidth
            onChange={this.handleNameChange}
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
