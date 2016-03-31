import React from 'react';

const Layout = React.createClass({
  displayName: 'Layout',

  propTypes: {
    children: React.PropTypes.object.isRequired
  },

  render() {
    return (
      <main>
        {this.props.children}
      </main>
    );
  }
});

export default Layout;
