var React = require('react');

var List = React.createClass({

  displayName: 'List',

  render: function() {
    return (
      <ul>
        {this.props.data.map(function(item, index){
          return <li key={index}>{item.a}</li>
        })}
      </ul>
    );
  }

});

module.exports = List;
