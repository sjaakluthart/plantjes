import React from 'react'

const Header = React.createClass({
  displayName: 'Header',

  propTypes: {
    name: React.PropTypes.string.isRequired,
    species: React.PropTypes.string.isRequired
  },

  render() {
    console.log(this.props);
    return (
      <header>
        <h1>{this.props.name} {this.props.species}</h1>
      </header>
    );
  }

});

export {Header}
