import React from 'react';

import text from './text.json';

import Paper from 'material-ui';
import { Link } from 'react-router';

function Home() {
  return (
    <section className="home">
      <h1>{text.appTitle}</h1>
      <h2>
        {text.homeTitle}
      </h2>
      <h3>
        {text.homeSubtitle}
      </h3>
      <Paper style={{ borderRadius: '10px' }} className="app-icon" zDepth={2}>
        <img src="/assets/app-icon.svg" alt="app-icon" />
      </Paper>
      <Link className="button-start" to={'/register'}>
        aan de slag
      </Link>
    </section>
  );
}

export default Home;
