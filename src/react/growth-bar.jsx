import React from 'react';
import moment from 'moment';

const GrowthBar = React.createClass({
  displayName: 'GrowthBar',

  propTypes: {
    plantedOn: React.PropTypes.string.isRequired,
    plantIcon: React.PropTypes.string.isRequired,
    harvestOn: React.PropTypes.string.isRequired
  },

  getDuration() {
    let start = moment(this.props.plantedOn);
    let end = moment(this.props.harvestOn);

    return end.diff(start, 'days');
  },

  getPosition() {
    let start = moment(this.props.plantedOn);
    let today = moment();

    return today.diff(start, 'days');
  },

  calculateGrowthPercentage() {
    let duration = this.getDuration();
    let position = this.getPosition();
    let percentage = Math.ceil((position / duration) * 100);

    return {
      width: `${percentage}%`
    };
  },

  render() {
    return (
      <div className="growth-bar">
        <h1>Groei:<span>{this.getPosition()}/{this.getDuration()} dagen</span></h1>
        <section>
          <div style={this.calculateGrowthPercentage()}></div>
          <img src="assets/seed.svg" />
          <img src={this.props.plantIcon} />
        </section>
      </div>
    );
  }
});

export { GrowthBar };
