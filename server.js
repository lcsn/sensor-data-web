const _ = require('lodash');

//Install express server    
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

DATA = {
  kueche: { temperature: 20, humidity: 45 },
  kinderzimmer: { temperature: 21, humidity: 46 },
  wohnzimmer: { temperature: 22, humidity: 47 },
  keller1: { temperature: 23, humidity: 48 },
  schlafzimmer: { temperature: 24, humidity: 49 }
}

ranges = {
  '3h': { num: 36 },
  '6h': { num: 72 },
  '12h': { num: 144 },
  '1d': { num: 288 }
};

TENDENCIES = [
  'up',
  'constant',
  'down'
]

BATTERY= [
  'battery-empty',
  'battery-quarter',
  'battery-half',
  'battery-three-quarters',
  'battery-full'
];

app.get('/dht22/:location', (req, res) => {
  return res.json(DATA[req.params.location]);
});

app.get('/dht22/:location/temperature/chart', (req, res) => {
  console.log(req.query);
  const range = req.query.range;
  const offset = req.query.offset;
  return res.json({
    labels: _.range(1, ranges[range].num),
    values: Array.from({ length: ranges[range].num }, () => _.random(-100, 100))
  });
});

app.get('/dht22/:location/humidity/chart', (req, res) => {
  console.log(req.query);
  const range = req.query.range;
  const offset = req.query.offset;
  return res.json({
    labels: _.range(1, ranges[range].num),
    values: Array.from({ length: ranges[range].num }, () => _.random(-100, 100))
  });
});

app.get('/dht22/:location/table', (req, res) => {
  console.log(req.query);
  const from = req.query.from;
  const until = req.query.until;
  return res.json([
    { id: 1, temperature: 19, humidity: 39, creationDate: new Date() },
    { id: 2, temperature: 20, humidity: 40, creationDate: new Date() },
    { id: 3, temperature: 21, humidity: 41, creationDate: new Date() },
    { id: 4, temperature: 22, humidity: 42, creationDate: new Date() },
    { id: 5, temperature: 23, humidity: 43, creationDate: new Date() },
    { id: 6, temperature: 24, humidity: 44, creationDate: new Date() },
    { id: 8, temperature: 25, humidity: 45, creationDate: new Date() },
    { id: 3, temperature: 21, humidity: 41, creationDate: new Date() },
    { id: 4, temperature: 22, humidity: 42, creationDate: new Date() },
    { id: 5, temperature: 23, humidity: 43, creationDate: new Date() },
    { id: 6, temperature: 24, humidity: 44, creationDate: new Date() },
    { id: 8, temperature: 25, humidity: 45, creationDate: new Date() }
  ]);
});

// Start the app by listening on the default Heroku port    
app.listen(PORT, () => {
  let index = 0;
  setInterval(() => {
    DATA['kueche'].temperature = Math.round(Math.random() * 60);
    DATA['kueche'].humidity = Math.round(Math.random() * 100);
    DATA['kueche'].when = new Date();
    DATA['kueche'].tendency = TENDENCIES[Math.floor(Math.random()*TENDENCIES.length)];
    DATA['kueche'].battery = BATTERY[Math.floor(Math.random()*BATTERY.length)];
    DATA['kinderzimmer'].temperature = Math.round(Math.random() * 60);
    DATA['kinderzimmer'].humidity = Math.round(Math.random() * 100);
    DATA['kinderzimmer'].when = new Date();
    DATA['kinderzimmer'].tendency = TENDENCIES[Math.floor(Math.random()*TENDENCIES.length)];
    DATA['kinderzimmer'].battery = BATTERY[Math.floor(Math.random()*BATTERY.length)];
    DATA['wohnzimmer'].temperature = Math.round(Math.random() * 60);
    DATA['wohnzimmer'].humidity = Math.round(Math.random() * 100);
    DATA['wohnzimmer'].when = new Date();
    DATA['wohnzimmer'].tendency = TENDENCIES[Math.floor(Math.random()*TENDENCIES.length)];
    DATA['wohnzimmer'].battery = BATTERY[Math.floor(Math.random()*BATTERY.length)];
    DATA['keller1'].temperature = Math.round(Math.random() * 60);
    DATA['keller1'].humidity = Math.round(Math.random() * 100);
    DATA['keller1'].when = new Date();
    DATA['keller1'].tendency = TENDENCIES[Math.floor(Math.random()*TENDENCIES.length)];
    DATA['keller1'].battery = BATTERY[Math.floor(Math.random()*BATTERY.length)];
    DATA['schlafzimmer'].temperature = Math.round(Math.random() * 60);
    DATA['schlafzimmer'].humidity = Math.round(Math.random() * 100);
    DATA['schlafzimmer'].when = new Date();
    DATA['schlafzimmer'].tendency = TENDENCIES[Math.floor(Math.random()*TENDENCIES.length)];
    DATA['schlafzimmer'].battery = BATTERY[Math.floor(Math.random()*BATTERY.length)];
  }, 5000);
  console.log(`Example app listening on port ${PORT}!`);
});