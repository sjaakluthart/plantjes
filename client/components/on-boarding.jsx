import React from 'react';
import $ from 'jquery';

import text from './text.json';

import { browserHistory, Link } from 'react-router';
import {
  AppBar,
  CircularProgress,
  IconButton,
  MenuItem,
  RaisedButton,
  TextField
} from 'material-ui';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';

class OnBoarding extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      userId: '',
      email: '',
      canSubmit: false
    };
    this.handleBlur = this.handleBlur.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    $.ajax({ url: '/check-user' })
    .then((data) => {
      if (data.authorised) {
        if (data.user.onBoard) {
          browserHistory.push('/plants');
          return false;
        }
        this.setState({
          loading: false,
          userId: data.user._id
        });
      } else {
        browserHistory.push('/login');
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/complete-onboarding',
      data: { userId: this.state.userId, email: this.state.email }
    })
    .then((res) => {
      if (res.error) {
        alert(res.error);
        return false;
      }

      browserHistory.push('/plants');
      return res;
    });
  }

  showLoading() {
    return <CircularProgress className="loader" style={ { position: 'absolute' } } />;
  }

  showForm() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>{text.onBoardingSubtitle}</h1>
        <h2>{text.onBoardingSubtitle1}</h2>
        <h3>{text.onBoardingSubtitle2}</h3>
        <TextField
          hintText={`E-mail`}
          floatingLabelText={`E-mail`}
          type="email"
          fullWidth
          onChange={this.handleEmailChange}
          onBlur={this.handleBlur}
        />
        <p>
          {text.registerSecurityNotice}
        </p>
        <RaisedButton
          className="button-submit"
          label="bewaar instellingen"
          primary
          type="submit"
          disabled={!this.state.canSubmit}
        />
      </form>
    );
  }

  handleBlur() {
    if (this.state.email) {
      this.setState({
        canSubmit: true
      });
    }
  }

  handleEmailChange(event) {
    this.setState({
      email: event.currentTarget.value
    });
  }

  render() {
    return (
      <section className="on-boarding">
        <AppBar
          title={text.onBoardingTitle}
          iconElementLeft={
            <Link to={'/register'}>
              <IconButton><NavigationArrowBack color="#FAFAFA" /></IconButton>
            </Link>
          }
        />
        {this.state.loading ? this.showLoading() : this.showForm()}
      </section>
    );
  }
}

export default OnBoarding;
