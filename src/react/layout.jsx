var React = require('react');

var Layout = React.createClass({
  displayName: 'Layout',

  render: function() {
    return (
      <main>
        {this.props.children}
      </main>
    )
  }
});

module.exports = Layout;
