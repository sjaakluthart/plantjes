import React from 'react';
import { Link } from 'react-router';

class Header extends React.Component {
  render() {
    let src = `/assets/${this.props.species}.svg`;
    return (
      <header>
        <Link to={'/'}>
          <img className="back" src="/assets/arrow-back.svg" />
        </Link>
        <h1>{this.props.name} {this.props.species}</h1>
        <img src={src} />
      </header>
    );
  }
}

Header.propTypes = {
  name: React.PropTypes.string.isRequired,
  species: React.PropTypes.string.isRequired
};

export default Header;
