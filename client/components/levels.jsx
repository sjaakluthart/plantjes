import React from 'react';

import { Paper } from 'material-ui';

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
    const style = {
      padding: '20px'
    };
    return (
      <Paper className="levels" style={style}>
        <figure>
          <div>
            <div style={this.getLevelStyles(levels.moistureLevel)}>
            </div>
            <img src="/assets/water.svg" alt="water" />
          </div>
          <figcaption>{`Vocht: ${levels.moistureLevel}%`}</figcaption>
        </figure>
        <figure>
          <div>
            <div style={this.getLevelStyles(levels.temperatureLevel)}>
            </div>
            <img src="/assets/thermometer.svg" alt="thermometer" />
          </div>
          <figcaption>{`Temperatuur: ${levels.temperatureLevel}%`}</figcaption>
        </figure>
        <figure>
          <div>
            <div style={this.getLevelStyles(levels.lightLevel)}>
            </div>
            <img src="/assets/sun.svg" alt="sun" />
          </div>
          <figcaption>{`Licht: ${levels.lightLevel}%`}</figcaption>
        </figure>
      </Paper>
    );
  }
}

Levels.propTypes = {
  referenceValues: React.PropTypes.object.isRequired,
  sensorData: React.PropTypes.array.isRequired
};

export default Levels;
