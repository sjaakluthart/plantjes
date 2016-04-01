import React from 'react';

class Header extends React.Component {
  showPlantlist() {
    routie('');
  }

  render() {
    let src = `assets/${this.props.species}.svg`;
    return (
      <header>
        <img onClick={this.showPlantlist} className="back" src="assets/arrow-back.svg" />
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
