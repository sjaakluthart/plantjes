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
      canSubmit: false,
      step: 1
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleSpeciesChange = this.handleSpeciesChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.nextStep = this.nextStep.bind(this);
    this.prevStep = this.prevStep.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    console.log('bla');
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

  nextStep() {
    this.setState({
      step: 2
    });
  }

  prevStep() {
    this.setState({
      step: 1
    });
  }

  stepOne(buttonStyle) {
    return (
      <div>
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

        <RaisedButton
          label="volgende"
          className="button-submit"
          secondary
          onClick={this.nextStep}
        />
      </div>
    );
  }

  stepTwo(buttonStyle) {
    return (
      <div>
        <h2>{text.addPlantSubTitle2}</h2>
        <h3>{text.addPlantSubTitle3}</h3>

        <TextField
          hintText="Vocht sensor kanaal"
          floatingLabelText="Vocht sensor kanaal"
          type="number"
          fullWidth
          onChange={this.handleNameChange}
          onBlur={this.handleBlur}
        />
        <TextField
          hintText="Licht sensor kanaal"
          floatingLabelText="Licht sensor kanaal"
          type="number"
          fullWidth
          onChange={this.handleNameChange}
          onBlur={this.handleBlur}
        />
        <TextField
          hintText="Temperatuur sensor kanaal"
          floatingLabelText="Temperatuur sensor kanaal"
          type="number"
          fullWidth
          onChange={this.handleNameChange}
          onBlur={this.handleBlur}
        />
        <div className="button-submit">
          <RaisedButton
            style={buttonStyle}
            label="vorige"
            secondary
            onClick={this.prevStep}
          />
          <RaisedButton
            style={buttonStyle}
            label="voeg toe"
            primary
            type="submit"
            disabled={!this.state.canSubmit}
          />
        </div>
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

          {this.state.step === 1 ? this.stepOne(buttonStyle) : this.stepTwo(buttonStyle)}

        </form>
      </section>
    );
  }

}

export default AddPlant;
