import React from 'react';

function Layout({ children }) {
  return (
    <main>
      {children}
    </main>
  );
}

Layout.propTypes = {
  children: React.PropTypes.object.isRequired
};

export default Layout;
