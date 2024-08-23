const express = require('express');
const weatherRoutes = require('./routes/weatherRoutes');
const profileRoutes = require('./routes/profileRoutes');
const spotifyRoutes = require('./routes/spotifyRoutes');

const app = express();

app.use('/weather', weatherRoutes);
app.use('/dprofile', profileRoutes);
app.use('/spotify', spotifyRoutes);

module.exports = app;
