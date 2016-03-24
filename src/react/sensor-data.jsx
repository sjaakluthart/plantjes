import React from 'react'

const SensorData = React.createClass({
  displayName: 'SensorData',

  render: function() {
    console.log(this.props);
    return (
      <div>
        {this.props.sensorData.map(function(reading, index){
          return (
            <ul key={index}>
              <li>Luchtvochtigheid: {reading.humidity}</li>
              <li>Licht: {reading.light}</li>
              <li>Grondvochtigheid: {reading.moisture}</li>
              <li>Temperatuur: {reading.temperature}</li>
            </ul>
          );
        })}
      </div>
    );
  }
});

export {SensorData}
