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
      email: '',
      password: '',
      passwordConfirm: '',
      canSubmit: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handlePasswordConfirmChange = this.handlePasswordConfirmChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    $.ajax({
      method: 'POST',
      url: '/createUser',
      data: {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password
      }
    })
    .then((data) => {
      browserHistory.push('/plants');
    });
  }

  handleUsernameChange(event) {
    this.setState({
      username: event.currentTarget.value
    });
  }

  handleEmailChange(event) {
    this.setState({
      email: event.currentTarget.value
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
          <h2>{text.registerSubtitle2}</h2>
          <TextField
            hintText="Naam"
            floatingLabelText="Naam"
            fullWidth
            onChange={this.handleUsernameChange}
          />
          <TextField
            hintText="E-mail"
            floatingLabelText="E-mail"
            type="email"
            fullWidth
            onChange={this.handleEmailChange}
            onBlur={this.handleBlur}
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
