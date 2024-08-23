const express = require('express');
const weatherRoutes = require('./routes/weatherRoutes');
const profileRoutes = require('./routes/profileRoutes');
const spotifyRoutes = require('./routes/spotifyRoutes');

const app = express();

app.use('/api/v1/weather', weatherRoutes);
app.use('/api/v1/dprofile', profileRoutes);
app.use('/api/v1/spotify', spotifyRoutes);

module.exports = app;
