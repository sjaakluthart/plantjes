var React = require('react');
var $ = require('jquery');

var List = require('./list.jsx');

// A very simple page with a square on it.
var HomePage = React.createClass({
  getDefaultProps: function () {
    return {
      size: 100
    }
  },

  getInitialState: function() {
    return {
      data: []
    }
  },

  componentDidMount: function() {
    $.ajax({ url: '/test' })
    .then(function(data) {
      console.log(data);
      this.setState({data: data});
    }.bind(this));
  },

  render: function () {
    return (
      <section>
        <h1>Plantjes</h1>
        <h2>Graduation Project, Communication &amp; Multimedia Design, Amsterdam University of Applied Sciences</h2>
        <img src="assets/plant.svg" />
        <List data={this.state.data} />
      </section>
    );
  }
});

module.exports = HomePage;
