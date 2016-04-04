import React from 'react';

class Levels extends React.Component {
  getLevel(value, reference) {
    const scale = reference.max - reference.min;

    return Math.ceil(((value - reference.min) / scale) * 100);
  }

  getLevelStyles(level) {
    let height;

    if (level >= 0) {
      height = `${level}%`;
    } else {
      height = 0;
    }

    return {
      height
    };
  }

  displayLevels() {
    const lastReading = this.props.sensorData[
      (this.props.sensorData.length - 1)
    ];
    const referenceValues = this.props.referenceValues;

    const moistureLevel = this.getLevel(
      lastReading.moisture, referenceValues.moisture
    );
    const temperatureLevel = this.getLevel(
      lastReading.temperature, referenceValues.temperature
    );
    const lightLevel = this.getLevel(
      lastReading.light, referenceValues.light
    );

    return {
      moistureLevel,
      temperatureLevel,
      lightLevel
    };
  }

  render() {
    const levels = this.displayLevels();
    return (
      <section className="levels">
        <figure>
          <div>
            <div style={this.getLevelStyles(levels.moistureLevel)}>
            </div>
          </div>
          <img src="/assets/water.svg" />
          <figcaption>Vocht: {levels.moistureLevel}%</figcaption>
        </figure>
        <figure>
          <div>
            <div style={this.getLevelStyles(levels.temperatureLevel)}>
            </div>
          </div>
          <img src="/assets/thermometer.svg" />
          <figcaption>Temperatuur: {levels.temperatureLevel}%</figcaption>
        </figure>
        <figure>
          <div>
            <div style={this.getLevelStyles(levels.lightLevel)}>
            </div>
          </div>
          <img src="/assets/sun.svg" />
          <figcaption>Licht: {levels.lightLevel}%</figcaption>
        </figure>
      </section>
    );
  }
}

Levels.propTypes = {
  referenceValues: React.PropTypes.object.isRequired,
  sensorData: React.PropTypes.array.isRequired
};

export default Levels;
