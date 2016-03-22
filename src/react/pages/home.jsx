var React = require('react');
var $ = require('jquery');

// A very simple page with a square on it.
var HomePage = React.createClass({
  getDefaultProps: function () {
    return {
      size: 100
    }
  },

  componentDidMount: function() {
    console.log('mounted');
    $.ajax({ url: '/test' })
    .then(function(data) {
      console.log(data);
      this.setState(data);
    }.bind(this));
  },

  render: function () {
    return (
      <section>
        <h1>Plantjes</h1>
        <h2>Graduation Project, Communication &amp; Multimedia Design, Amsterdam University of Applied Sciences</h2>
        <img src="assets/plant.svg" />
      </section>
    );
  }
});

module.exports = HomePage;
