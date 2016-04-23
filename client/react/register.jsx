import React from 'react';
import $ from 'jquery';

import text from './text.json';

import { browserHistory, Link } from 'react-router';
import { AppBar, IconButton, RaisedButton, TextField } from 'material-ui';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      passwordConfirm: '',
      canSubmit: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handlePasswordConfirmChange = this.handlePasswordConfirmChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    $.ajax({
      method: 'POST',
      url: '/create-user',
      data: { username: this.state.username, password: this.state.password }
    })
    .then((data) => {
      browserHistory.push('/on-boarding');
    });
  }

  handleUsernameChange(event) {
    this.setState({
      username: event.currentTarget.value
    });
  }

  handlePasswordChange(event) {
    this.setState({
      password: event.currentTarget.value
    });
  }

  handlePasswordConfirmChange(event) {
    this.setState({
      passwordConfirm: event.currentTarget.value
    });
  }

  handleBlur() {
    if (this.state.password === this.state.passwordConfirm) {
      this.setState({
        canSubmit: true
      });
    }
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
        <form onSubmit={this.handleSubmit} encType="multipart/form-data">
          <h1>{text.registerSubtitle}</h1>
          <h2>{text.registerSubtitle1}</h2>
          <TextField
            hintText="Naam"
            floatingLabelText="Naam"
            fullWidth
            onChange={this.handleUsernameChange}
          />
          <TextField
            hintText="Wachtwoord"
            floatingLabelText="Wachtwoord"
            type="password"
            fullWidth
            onChange={this.handlePasswordChange}
          />
          <TextField
            hintText="Bevestig wachtwoord"
            floatingLabelText="Bevestig wachtwoord"
            type="password"
            fullWidth
            onChange={this.handlePasswordConfirmChange}
            onBlur={this.handleBlur}
          />
          <p>
            {text.registerSecurityNotice}
          </p>
          <RaisedButton
            className="button-submit"
            label="registreer"
            primary
            type="submit"
            disabled={!this.state.canSubmit}
          />
        </form>
      </section>
    );
  }

}

export default Register;
