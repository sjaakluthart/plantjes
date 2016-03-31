var React = require('react');

const Layout = React.createClass({
  displayName: 'Layout',

  render() {
    return (
      <main>
        {this.props.children}
      </main>
    );
  }
});

export { Layout };
