import React from 'react';

class ListLevels extends React.Component {
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
    return (
      <div className="levels">
        <figure>
          <div>
            <div style={this.getLevelStyles(levels.moistureLevel)}>
            </div>
            <img src="/assets/water.svg" alt="water" />
          </div>
        </figure>
        <figure>
          <div>
            <div style={this.getLevelStyles(levels.temperatureLevel)}>
            </div>
            <img src="/assets/thermometer.svg" alt="thermometer" />
          </div>
        </figure>
        <figure>
          <div>
            <div style={this.getLevelStyles(levels.lightLevel)}>
            </div>
            <img src="/assets/sun.svg" alt="sun" />
          </div>
        </figure>
      </div>
    );
  }
}

ListLevels.propTypes = {
  referenceValues: React.PropTypes.object.isRequired,
  sensorData: React.PropTypes.object.isRequired
};

export default ListLevels;
