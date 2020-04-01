var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    cors = require('cors');

app.use(cors());

var planetController = require('./src/controllers/planet.controller');

app.route('/planets/:name').get(planetController.GetPlanet);

app.listen(port, () => {
    console.log(`server running on port ${port}`)
  });