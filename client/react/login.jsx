import React from 'react';
import $ from 'jquery';

import text from './text.json';

import { browserHistory, Link } from 'react-router';
import { AppBar, IconButton, RaisedButton, TextField } from 'material-ui';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      canSubmit: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    $.ajax({
      method: 'POST',
      url: '/log-in',
      data: { username: this.state.username, password: this.state.password }
    })
    .then((res) => {
      if (res.error) {
        alert(res.error);
        return false;
      }

      if (res.user.onBoard) {
        browserHistory.push('/plants');
      } else {
        browserHistory.push('/on-boarding');
      }
      return res;
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

  handleBlur() {
    if (this.state.username && this.state.password) {
      this.setState({
        canSubmit: true
      });
    }
  }

  render() {
    return (
      <section className="register">
        <AppBar
          title={text.logInTitle}
          iconElementLeft={
            <Link to={'/'}>
              <IconButton><NavigationArrowBack color="#FAFAFA" /></IconButton>
            </Link>
          }
        />
        <form onSubmit={this.handleSubmit} encType="multipart/form-data">
          <h1>{text.logInSubtitle}</h1>
          <TextField
            hintText="Naam"
            floatingLabelText="Naam"
            fullWidth
            onChange={this.handleUsernameChange}
            onBlur={this.handleBlur}
          />
          <TextField
            hintText="Wachtwoord"
            floatingLabelText="Wachtwoord"
            type="password"
            fullWidth
            onChange={this.handlePasswordChange}
            onBlur={this.handleBlur}
          />
          <RaisedButton
            className="button-submit"
            label="log in"
            primary
            type="submit"
            disabled={!this.state.canSubmit}
          />
        </form>
      </section>
    );
  }

}

export default LogIn;
