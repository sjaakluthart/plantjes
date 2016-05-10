import React from 'react';
import { Paper } from 'material-ui';

class Messages extends React.Component {

  generateMessages() {
    let moistureText = null;
    let lightText = null;
    const referenceValues = this.props.referenceValues;
    const sensorValue = this.props.sensorReadings;
    const plantName = this.props.name;

    // Moisture message
    // Regular values
    // Bit dry
    if (sensorValue.moisture >= 20) {
      moistureText = (
        <p>
          Je plantje <span className="name">{plantName}</span> heeft een beetje dorst! Geef
          <span className="name">{plantName}</span> wat te drinken.
        </p>
      );
    }
    // Less extreme values
    // Quite dry
    if (sensorValue.moisture >= 25) {
      moistureText = (
        <p>
          Je plantje <span className="name">{plantName}</span> heeft erg veel dorst! Geef
          <span className="name">{plantName}</span> snel wat te drinken.
        </p>
      );
    }
    // Quite moist
    if (sensorValue.moisture <= 10) {
      moistureText = (
        <p>
          Je plantje <span className="name">{plantName}</span> heeft een beetje te veel gedronken!
          Geef <span className="name">{plantName}</span> even niet te drinken.
        </p>
      );
    }
    // Extreme values
    // Extremely dry
    if (sensorValue.moisture >= referenceValues.moisture.min) {
      moistureText = (
        <p>
          Je plantje <span className="name">{plantName}</span> staat helemaal droog!
          Geef <span className="name">{plantName}</span> nu wat te drinken!
        </p>
      );
    }
    // Extremely moist
    if (sensorValue.moisture <= referenceValues.moisture.max) {
      moistureText = (
        <p>
          Je plantje <span className="name">{plantName}</span> staat helemaal onder water!
          Geef <span className="name">{plantName}</span> voorlopig geen water!
        </p>
      );
    }

    // Light message
    // Less extreme values
    // Quite dark
    if (sensorValue.light >= 65) {
      lightText = (
        <p>
          Je plantje <span className="name">{plantName}</span> staat erg donker!
          Zet <span className="name">{plantName}</span> op een zonniger plekje.
        </p>
      );
    }
    // Quite light
    if (sensorValue.light <= 35) {
      lightText = (
        <p>
          Je plantje <span className="name">{plantName}</span> heeft een het een beetje warm!
          Laat <span className="name">{plantName}</span> even afkoelen in de schaduw.
        </p>
      );
    }
    // Extreme values
    // Extremely dark
    if (sensorValue.light >= referenceValues.light.min) {
      lightText = (
        <p>
          Je plantje <span className="name">{plantName}</span> staat helemaal in het donker!
          Geef <span className="name">{plantName}</span> wat zonlicht!
        </p>
      );
    }
    // Extremely light
    if (sensorValue.light <= referenceValues.light.max) {
      lightText = (
        <p>
          Je plantje <span className="name">{plantName}</span> staat vol te branden in de zon!
          Geef <span className="name">{plantName}</span> snel wat verkoeling in de schaduw!
        </p>
      );
    }

    if (moistureText === null && lightText === null) {
      return [<p>Je plantje heeft geen aandacht nodig!</p>];
    }

    return [moistureText, lightText];
  }

  render() {
    const style = {
      padding: '20px',
      marginBottom: '15px'
    };
    const messages = this.generateMessages();

    return (
      <Paper style={style}>
        {messages.map((message, index) => (
          <div key={index} style={{ margin: '10px 0' }}>{message}</div>
        ))}
      </Paper>
    );
  }
}

Messages.propTypes = {
  referenceValues: React.PropTypes.object.isRequired,
  sensorReadings: React.PropTypes.object.isRequired,
  name: React.PropTypes.string.isRequired
};

export default Messages;
