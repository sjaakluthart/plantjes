import React from 'react';
import moment from 'moment';

import Paper from 'material-ui';

class GrowthBar extends React.Component {
  getDuration() {
    const start = moment(this.props.plantedOn);
    const end = moment(this.props.harvestOn);

    return end.diff(start, 'days');
  }

  getPosition() {
    const start = moment(this.props.plantedOn);
    const today = moment();

    return today.diff(start, 'days');
  }

  calculateGrowthPercentage() {
    const duration = this.getDuration();
    const position = this.getPosition();
    const percentage = Math.ceil((position / duration) * 100);

    return {
      width: `${percentage}%`
    };
  }

  render() {
    const style = {
      padding: '20px'
    };
    return (
      <div className="growth-bar">
        <Paper style={style}>
          <h1>Groei:<span>{this.getPosition()}/{this.getDuration()} dagen</span></h1>
          <section>
            <div style={this.calculateGrowthPercentage()}></div>
            <img src="/assets/seed.svg" alt="seed" />
            <img src={this.props.plantIcon} alt="plant icon" />
          </section>
        </Paper>
      </div>
    );
  }
}

GrowthBar.propTypes = {
  plantedOn: React.PropTypes.string.isRequired,
  plantIcon: React.PropTypes.string.isRequired,
  harvestOn: React.PropTypes.string.isRequired
};

export default GrowthBar;
