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
    const referenceValues = this.props.referenceValues;
    const sensorData = this.props.sensorData;

    const moistureLevel = this.getLevel(
      sensorData.moisture, referenceValues.moisture
    );
    const temperatureLevel = this.getLevel(
      sensorData.temperature, referenceValues.temperature
    );
    const lightLevel = this.getLevel(
      sensorData.light, referenceValues.light
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
      <div className="levels" style={this.props.plantPage ? style : null}>
        <figure>
          <div>
            <div style={this.getLevelStyles(levels.moistureLevel)}>
            </div>
            <img src="/assets/water.svg" alt="water" />
          </div>
          {this.props.plantPage ? <figcaption>Vocht</figcaption> : null}
        </figure>
        <figure>
          <div>
            <div style={this.getLevelStyles(levels.temperatureLevel)}>
            </div>
            <img src="/assets/thermometer.svg" alt="thermometer" />
          </div>
          {this.props.plantPage ? <figcaption>Temperatuur</figcaption> : null}
        </figure>
        <figure>
          <div>
            <div style={this.getLevelStyles(levels.lightLevel)}>
            </div>
            <img src="/assets/sun.svg" alt="sun" />
          </div>
          {this.props.plantPage ? <figcaption>Licht</figcaption> : null}
        </figure>
      </div>
    );
  }
}

Levels.propTypes = {
  referenceValues: React.PropTypes.object.isRequired,
  sensorData: React.PropTypes.object.isRequired,
  plantPage: React.PropTypes.bool
};

export default Levels;
