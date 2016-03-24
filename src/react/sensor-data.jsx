import React from 'react'
import moment from 'moment'

const SensorData = React.createClass({
  displayName: 'SensorData',

  render: function() {
    return (
      <section className="sensor-data">
        <h1>sensor data</h1>
        {this.props.sensorData.map(function(reading, index){
          return (
            <ul key={index}>
              <li>Gemeten op: {moment(reading.readingTakenOn).format('DD-MM-YYYY, h:mm:ss')}</li>
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
