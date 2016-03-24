import React from 'react'

const List = React.createClass({
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

export {List}
