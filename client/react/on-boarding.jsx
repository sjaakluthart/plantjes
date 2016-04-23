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
      userId: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    $.ajax({ url: '/check-user' })
    .then((data) => {
      if (data.authorised) {
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
    browserHistory.push('/plants');
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
          <MenuItem value={2} primaryText="2" />
          <MenuItem value={3} primaryText="3" />
          <MenuItem value={4} primaryText="4" />
          <MenuItem value={5} primaryText="5" />
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
        />
      </form>
    );
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
