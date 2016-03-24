import React from 'react'

const SensorData = React.createClass({
  displayName: 'SensorData',

  render: function() {
    return (
      <section className="sensor-data">
        <h1>sensor data</h1>
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
      </section>
    );
  }
});

export {SensorData}
