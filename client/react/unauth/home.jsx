import React from 'react';

import { Paper, RaisedButton } from 'material-ui';
import { Link } from 'react-router';

function Home() {
  return (
    <section className="home">
      <h1>Plantjes</h1>
      <h2>
        Veggies es bonus vobis, proinde vos postulo essum magis.
      </h2>
      <h3>
        Gumbo beet greens corn soko endive gumbo gourd. Parsley shallot courgette tatsoi pea sprouts fava bean collard.
      </h3>
      <Paper style={{ borderRadius: '10px' }} className="app-icon" zDepth={2}>
        <img src="/assets/app-icon.svg" alt="app-icon" />
      </Paper>
      <Link to={'/register'}>
        <RaisedButton
          className="button-start"
          label="aan de slag"
          primary
        />
      </Link>
      </section>
  );
}

export default Home;
