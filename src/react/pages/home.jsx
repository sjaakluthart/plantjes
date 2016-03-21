var React = require('react');

// A very simple page with a square on it.
var HomePage = React.createClass({
  getDefaultProps: function () {
    return {
      size: 100
    }
  },

  render: function () {
    return (
      <img src="assets/plant.svg" />
    );
  }
});

module.exports = HomePage;
