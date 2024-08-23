const express = require('express');
const spotifyController = require('../controllers/spotifyController');

const router = express.Router();

router.get('/', spotifyController.getLastPlayedSong);

module.exports = router;
