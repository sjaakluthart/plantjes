var React = require('react');
var ReactDOM = require('react-dom');
var Layout = require('./layout.jsx')
var Home = require('./pages/home.jsx');

ReactDOM.render(<Layout><Home /></Layout>, document.getElementById('app'));
