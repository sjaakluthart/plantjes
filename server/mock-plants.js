const moment = require('moment');

const mockPlants = [{
  species: 'sla',
  name: 'sjon',
  plantedOn: moment().subtract(3, 'days').toDate(),
  harvestOn: moment().add(5, 'weeks').toDate(),
  referenceValues: {
    temperature: {
      min: 7,
      max: 24
    },
    moisture: {
      min: 7,
      max: 24
    },
    light: {
      min: 7,
      max: 24
    }
  },
  sensorReadings: [
    {
      moisture: 8,
      temperature: 5,
      humidity: 12,
      light: 16,
      readingTakenOn: moment().subtract(10, 'hours').toDate()
    },
    {
      moisture: 9,
      temperature: 3,
      humidity: 17,
      light: 7,
      readingTakenOn: moment().subtract(5, 'hours').toDate()
    },
    {
      moisture: 3,
      temperature: 10,
      humidity: 22,
      light: 12,
      readingTakenOn: moment().subtract(1, 'hours').toDate()
    }
  ]
}, {
  species: 'wortel',
  name: 'willy',
  plantedOn: moment().subtract(11, 'days').toDate(),
  harvestOn: moment().add(3, 'weeks').toDate(),
  referenceValues: {
    temperature: {
      min: 4,
      max: 27
    },
    moisture: {
      min: 2,
      max: 18
    },
    light: {
      min: 4,
      max: 20
    }
  },
  sensorReadings: [
    {
      moisture: 8,
      temperature: 5,
      humidity: 12,
      light: 16,
      readingTakenOn: moment().subtract(10, 'hours').toDate()
    },
    {
      moisture: 9,
      temperature: 3,
      humidity: 17,
      light: 7,
      readingTakenOn: moment().subtract(5, 'hours').toDate()
    },
    {
      moisture: 3,
      temperature: 10,
      humidity: 22,
      light: 12,
      readingTakenOn: moment().subtract(1, 'hours').toDate()
    }
  ]
}];

module.exports = mockPlants;
