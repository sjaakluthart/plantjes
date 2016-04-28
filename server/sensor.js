const ADC = require('adc-pi-gpio');
const winston = require('winston');

const config = {
  tolerance: 2,
  interval: 300,
  channels: [0],
  SPICLK: 23,
  SPIMISO: 21,
  SPIMOSI: 19,
  SPICS: 24
};

const adc = new ADC(config);

process.on('SIGTERM', () => {
  adc.close();
});

process.on('SIGINT', () => {
  adc.close();
});

adc.init();

adc.on('ready', () => {
  winston.log('info', 'Pins ready, listening to channel');
});

adc.on('close', () => {
  winston.log('info', 'ADC terminated');
  process.exit();
});

function readSensor(channel, referenceValues) {
  adc.read(channel, (data) => {
    const percentage = Math.ceil((data / 1024) * 100);
    winston.log(
      'info',
      'Channel %s value is now %s. Which in proportion is: %s.',
      channel,
      data,
      percentage
    );
    winston.log('info', referenceValues);
  });
}

module.exports = readSensor;
