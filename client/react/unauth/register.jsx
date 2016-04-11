import React from 'react';

import text from '../text.json';

import { browserHistory, Link } from 'react-router';
import { AppBar, IconButton, RaisedButton, SelectField, TextField } from 'material-ui';
import MenuItem from 'material-ui/lib/menus/menu-item';
import NavigationArrowBack from 'material-ui/lib/svg-icons/navigation/arrow-back';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      persons: 1
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, index, value) {
    this.setState({ persons: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    browserHistory.push('/plants');
  }

  renderTelInputs() {
    const inputs = [];
    for (let i = 0; i < this.state.persons; i++) {
      inputs.push(
        <TextField
          key={i}
          hintText={`Telefoon ${i + 1}`}
          floatingLabelText={`Telefoon ${i + 1}`}
          type="tel"
          fullWidth
        />
      );
    }

    return inputs;
  }

  render() {
    return (
      <section className="register">
        <AppBar
          title={text.registerTitle}
          iconElementLeft={
            <Link to={'/'}>
              <IconButton><NavigationArrowBack color="#FAFAFA" /></IconButton>
            </Link>
          }
        />
        <form onSubmit={this.handleSubmit}>
          <h1>{text.registerSubtitle}</h1>
          <h2>{text.registerSubtitle1}</h2>
          <TextField
            hintText="Naam"
            floatingLabelText="Naam"
            fullWidth
          />
          <TextField
            hintText="E-mail"
            floatingLabelText="E-mail"
            type="email"
            fullWidth
          />
          <TextField
            hintText="Wachtwoord"
            floatingLabelText="Wachtwoord"
            type="password"
            fullWidth
          />
          <TextField
            hintText="Bevestig wachtwoord"
            floatingLabelText="Bevestig wachtwoord"
            type="password"
            fullWidth
          />
          <h3>
            Hoe veel mensen gaan voor je plantjes zorgen?
          </h3>
          <SelectField value={this.state.persons} onChange={this.handleChange}>
            <MenuItem value={1} primaryText="1" />
            <MenuItem value={2} primaryText="2" />
            <MenuItem value={3} primaryText="3" />
            <MenuItem value={4} primaryText="4" />
            <MenuItem value={5} primaryText="5" />
          </SelectField>
          <h3>Om je op de hoogte te houden over je plantjes hebben we je telefoonnummer nodig.</h3>
          {this.renderTelInputs()}
          <RaisedButton
            className="button-submit"
            label="registreer"
            primary
            type="submit"
          />
        </form>
      </section>
    );
  }

}

export default Register;
