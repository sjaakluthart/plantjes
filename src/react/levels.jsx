import React from 'react'
import moment from 'moment'

const Levels = React.createClass({
  displayName: 'SensorData',

  getLevel(value, reference) {
    let scale = reference.max - reference.min;

    return Math.ceil(((value - reference.min) / scale) * 100);
  },

  displayLevels() {
    let lastReading = this.props.sensorData[(this.props.sensorData.length -1)];
    let referenceValues = this.props.referenceValues;

    let moistureLevel = this.getLevel(lastReading.moisture, referenceValues.moisture);
    let temperatureLevel = this.getLevel(lastReading.temperature, referenceValues.temperature);
    let lightLevel = this.getLevel(lastReading.light, referenceValues.light);

    return {
      moistureLevel,
      temperatureLevel,
      lightLevel
    }
  },

  getLevelStyles(level) {
    if (level >= 0) {
      return {
        height: `${level}%`
      }
    } else {
      return {
        height: 0
      }
    }
  },

  render: function() {
    let levels = this.displayLevels();
    return (
      <section className="levels">
        <figure>
          <div>
            <div style={this.getLevelStyles(levels.moistureLevel)}>
            </div>
          </div>
          <img src="assets/water.svg" />
          <figcaption>Vocht: {levels.moistureLevel}%</figcaption>
        </figure>
        <figure>
          <div>
            <div style={this.getLevelStyles(levels.temperatureLevel)}>
            </div>
          </div>
          <img src="assets/thermometer.svg" />
          <figcaption>Temperatuur: {levels.temperatureLevel}%</figcaption>
        </figure>
        <figure>
          <div>
            <div style={this.getLevelStyles(levels.lightLevel)}>
            </div>
          </div>
          <img src="assets/sun.svg" />
          <figcaption>Licht: {levels.lightLevel}%</figcaption>
        </figure>
      </section>
    );
  }
});

export {Levels}
