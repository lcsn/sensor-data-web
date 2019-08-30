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

TENDENCIES = [
  'up',
  'constant',
  'down'
]

app.get('/dht22/:location', function (req, res) {
  return res.json(DATA[req.params.location]);
});

// Start the app by listening on the default Heroku port    
app.listen(PORT, () => {
  let index = 0;
  setInterval(() => {
    DATA['kueche'].temperature = Math.round(Math.random() * 60);
    DATA['kueche'].humidity = Math.round(Math.random() * 100);
    DATA['kueche'].when = new Date();
    DATA['kueche'].tendency = TENDENCIES[Math.floor(Math.random()*TENDENCIES.length)];
    DATA['kinderzimmer'].temperature = Math.round(Math.random() * 60);
    DATA['kinderzimmer'].humidity = Math.round(Math.random() * 100);
    DATA['kinderzimmer'].when = new Date();
    DATA['kinderzimmer'].tendency = TENDENCIES[Math.floor(Math.random()*TENDENCIES.length)];
    DATA['wohnzimmer'].temperature = Math.round(Math.random() * 60);
    DATA['wohnzimmer'].humidity = Math.round(Math.random() * 100);
    DATA['wohnzimmer'].when = new Date();
    DATA['wohnzimmer'].tendency = TENDENCIES[Math.floor(Math.random()*TENDENCIES.length)];
    DATA['keller1'].temperature = Math.round(Math.random() * 60);
    DATA['keller1'].humidity = Math.round(Math.random() * 100);
    DATA['keller1'].when = new Date();
    DATA['keller1'].tendency = TENDENCIES[Math.floor(Math.random()*TENDENCIES.length)];
    DATA['schlafzimmer'].temperature = Math.round(Math.random() * 60);
    DATA['schlafzimmer'].humidity = Math.round(Math.random() * 100);
    DATA['schlafzimmer'].when = new Date();
    DATA['schlafzimmer'].tendency = TENDENCIES[Math.floor(Math.random()*TENDENCIES.length)];
  }, 5000);
  console.log(`Example app listening on port ${PORT}!`);
});