const express = require('express');
const cors = require('cors');
const weatherRoutes = require('./routes/weatherRoutes');
const profileRoutes = require('./routes/profileRoutes');
const spotifyRoutes = require('./routes/spotifyRoutes');
const blogRoutes = require('./routes/blogRoutes');

const app = express();

app.use(cors());

app.use('/api/v1/weather', weatherRoutes);
app.use('/api/v1/dprofile', profileRoutes);
app.use('/api/v1/spotify', spotifyRoutes);
app.use('/api/v1/blogs', blogRoutes);

module.exports = app;
