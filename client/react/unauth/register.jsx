import React from 'react';

import { browserHistory, Link } from 'react-router';
import { AppBar, IconButton, RaisedButton, TextField } from 'material-ui';
import NavigationArrowBack from 'material-ui/lib/svg-icons/navigation/arrow-back';

class Register extends React.Component {

  handleSubmit(event) {
    event.preventDefault();
    browserHistory.push('/plants');
  }

  render() {
    return (
      <section className="register">
        <AppBar
          title="Plantjes Account"
          iconElementLeft={
            <Link to={'/'}>
              <IconButton><NavigationArrowBack color="#FAFAFA" /></IconButton>
            </Link>
          }
        />
        <form onSubmit={this.handleSubmit}>
          <h1>Wat leuk dat je de Plantjes app wilt gebruiken!</h1>
          <h2>Vul je gegevens in en maak een account aan.</h2>
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
