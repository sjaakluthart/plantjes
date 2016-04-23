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
  SelectField,
  TextField
} from 'material-ui';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';

class OnBoarding extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      persons: 1,
      loading: true,
      userId: '',
      email: '',
      canSubmit: false
    };
    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
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

  handleChange(event, index, value) {
    this.setState({ persons: value });
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
        <SelectField value={this.state.persons} onChange={this.handleChange}>
          <MenuItem value={1} primaryText="1" />
        </SelectField>
        <h3>{text.onBoardingSubtitle2}</h3>
        <h3>{text.onBoardingSubtitle3}</h3>
        {this.renderEmailInputs()}
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
    // TODO dynamic amount of emails
    this.setState({
      email: event.currentTarget.value
    });
  }

  renderEmailInputs() {
    const inputs = [];
    for (let i = 0; i < this.state.persons; i++) {
      inputs.push(
        <TextField
          key={i}
          hintText={`E-mail ${i + 1}`}
          floatingLabelText={`E-mail ${i + 1}`}
          type="email"
          fullWidth
          onChange={this.handleEmailChange}
          onBlur={this.handleBlur}
        />
      );
    }

    return inputs;
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
