import React from 'react';

import * as Colors from 'material-ui/lib/styles/colors';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';

class Layout extends React.Component {

  getChildContext() {
    const mytheme = {
      palette: {
        primary1Color: Colors.green400,
        primary2Color: Colors.green300,
        primary3Color: Colors.green900,
        accent1Color: Colors.blue400,
        accent2Color: Colors.blue300,
        accent3Color: Colors.blue900
      }
    };
    return {
      muiTheme: getMuiTheme(mytheme)
    };
  }

  render() {
    return (
      <main>
        {this.props.children}
      </main>
    );
  }

}

Layout.propTypes = {
  children: React.PropTypes.object.isRequired
};

Layout.childContextTypes = {
  muiTheme: React.PropTypes.object,
};

export default Layout;
